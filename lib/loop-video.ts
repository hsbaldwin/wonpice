export type LoopVideoStatus = 'poster' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error';

type Connection = EventTarget & { saveData?: boolean };
type VideoWindow = Window & {
  ResizeObserver?: typeof ResizeObserver;
  navigator: Navigator & { connection?: Connection };
};
type Candidate = {
  frame: HTMLElement;
  prepare: () => number;
  activate: (active: boolean) => void;
};

// A document owns one playback slot, including while adjacent scenes are partly visible.
const coordinators = new WeakMap<Document, ReturnType<typeof createCoordinator>>();

function createCoordinator(ownerDocument: Document, ownerWindow: VideoWindow) {
  const entries = new Set<Candidate>();
  let scheduled = 0;
  let current: Candidate | undefined;
  const resize = ownerWindow.ResizeObserver ? new ownerWindow.ResizeObserver(schedule) : undefined;

  function update(preferred?: Candidate) {
    let winner: Candidate | undefined;
    let best = 0;
    for (const entry of entries) {
      const score = entry.prepare();
      if (score > best || (score > 0 && score === best && entry === current)) {
        winner = entry;
        best = score;
      }
      if (entry === preferred && score > 0) {
        winner = entry;
        best = Number.POSITIVE_INFINITY;
      }
    }
    current = winner;
    for (const entry of entries) if (entry !== winner) entry.activate(false);
    winner?.activate(true);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = ownerWindow.requestAnimationFrame(() => {
      scheduled = 0;
      update();
    });
  }
  const visibility = () => update();
  ownerWindow.addEventListener('scroll', schedule, { passive: true });
  ownerWindow.addEventListener('resize', schedule, { passive: true });
  ownerWindow.visualViewport?.addEventListener('resize', schedule);
  ownerDocument.addEventListener('visibilitychange', visibility);
  return {
    update,
    add(entry: Candidate) {
      entries.add(entry);
      resize?.observe(entry.frame);
    },
    remove(entry: Candidate) {
      entries.delete(entry);
      resize?.unobserve(entry.frame);
      if (entries.size) return update();
      ownerWindow.cancelAnimationFrame(scheduled);
      resize?.disconnect();
      ownerWindow.removeEventListener('scroll', schedule);
      ownerWindow.removeEventListener('resize', schedule);
      ownerWindow.visualViewport?.removeEventListener('resize', schedule);
      ownerDocument.removeEventListener('visibilitychange', visibility);
      coordinators.delete(ownerDocument);
    },
  };
}

/** Browser lifecycle kept outside React so playback races and cleanup can be verified. */
export function enhanceLoopVideo({
  frame,
  video,
  src,
  mobileSrc,
  onStatus,
  ownerDocument = document,
  ownerWindow = window,
}: {
  frame: HTMLElement;
  video: HTMLVideoElement;
  src: string;
  mobileSrc?: string;
  onStatus: (status: LoopVideoStatus) => void;
  ownerDocument?: Document;
  ownerWindow?: VideoWindow;
}) {
  let coordinator = coordinators.get(ownerDocument);
  if (!coordinator) {
    coordinator = createCoordinator(ownerDocument, ownerWindow);
    coordinators.set(ownerDocument, coordinator);
  }
  const manager = coordinator;
  const motion = ownerWindow.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = ownerWindow.matchMedia('(max-width: 1023px)');
  const connection = ownerWindow.navigator.connection;
  let intent: 'auto' | 'play' | 'pause' = 'auto';
  let status: LoopVideoStatus = 'poster';
  let disposed = false;
  let painted = false;
  let active = false;
  let pending = false;
  let blocked = false;
  let failed = false;
  let played = false;
  let loadedSource = '';
  let attempt = 0;
  let paintFrame = 0;

  const setStatus = (next: LoopVideoStatus) => {
    if (disposed || status === next) return;
    status = next;
    onStatus(next);
  };
  const source = () => (mobile.matches && mobileSrc ? mobileSrc : src);
  const allowed = () => intent === 'play' || (!motion.matches && !connection?.saveData);
  function load() {
    if (loadedSource === source()) return;
    loadedSource = source();
    video.src = loadedSource;
    video.preload = 'metadata';
    video.load();
  }
  function stop() {
    active = false;
    pending = false;
    attempt++;
    video.pause();
    if (!failed && !blocked) setStatus(played ? 'paused' : 'poster');
  }
  function activate(next: boolean) {
    if (!next) {
      if (active || pending || !video.paused) stop();
      return;
    }
    if (active && (pending || !video.paused)) return;
    active = true;
    pending = true;
    const token = ++attempt;
    load();
    setStatus('loading');
    try {
      const result = video.play();
      result?.then(
        () => {
          if (disposed || token !== attempt) return;
          pending = false;
          if (!active) video.pause();
        },
        () => {
          if (disposed || token !== attempt || !active) return;
          blocked = true;
          pending = false;
          active = false;
          video.pause();
          setStatus('blocked');
          manager.update();
        },
      );
    } catch {
      blocked = true;
      pending = false;
      active = false;
      setStatus('blocked');
      manager.update();
    }
  }
  const entry: Candidate = {
    frame,
    activate,
    prepare() {
      if (disposed || !painted || ownerDocument.visibilityState === 'hidden') return 0;
      const bounds = frame.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return 0;
      const height = ownerWindow.innerHeight;
      const width = ownerWindow.innerWidth;
      const header = ownerDocument.querySelector<HTMLElement>('.site-header');
      let viewportTop = 0;
      if (header) {
        const headerBounds = header.getBoundingClientRect();
        const position = ownerWindow.getComputedStyle(header).position;
        if ((position === 'fixed' || position === 'sticky') && headerBounds.top <= 0)
          viewportTop = Math.max(0, Math.min(height, headerBounds.bottom));
      }
      const near = bounds.bottom > viewportTop && bounds.top < height + 200;
      if (near && allowed() && intent !== 'pause' && !failed && !blocked) load();
      const visibleWidth = Math.max(0, Math.min(bounds.right, width) - Math.max(bounds.left, 0));
      const visibleHeight = Math.max(
        0,
        Math.min(bounds.bottom, height) - Math.max(bounds.top, viewportTop),
      );
      if (!allowed() || intent === 'pause' || failed || blocked) return 0;
      if (!visibleWidth || !visibleHeight) return 0;
      return (
        (visibleWidth * visibleHeight) /
        Math.min(bounds.width * bounds.height, width * (height - viewportTop))
      );
    },
  };
  function onPlaying() {
    if (disposed || !active) {
      video.pause();
      return;
    }
    played = true;
    pending = false;
    setStatus('playing');
  }
  function onPause() {
    // A queued pause event may belong to the previous source after a breakpoint swap.
    if (!video.paused || pending) return;
    active = false;
    if (!failed && !blocked) setStatus(played ? 'paused' : 'poster');
  }
  function onError() {
    if (disposed || !loadedSource) return;
    failed = true;
    stop();
    setStatus('error');
    manager.update();
  }
  function onPreference() {
    manager.update();
  }
  function onSize() {
    if (loadedSource && loadedSource !== source()) {
      stop();
      loadedSource = '';
      blocked = false;
      failed = false;
      played = false;
      setStatus('poster');
      video.removeAttribute('src');
      video.load();
    }
    manager.update();
  }
  video.addEventListener('playing', onPlaying);
  video.addEventListener('pause', onPause);
  video.addEventListener('error', onError);
  motion.addEventListener('change', onPreference);
  mobile.addEventListener('change', onSize);
  connection?.addEventListener('change', onPreference);
  manager.add(entry);
  // Two frames ensure the server-rendered poster can paint before assigning a video URL.
  paintFrame = ownerWindow.requestAnimationFrame(() => {
    paintFrame = ownerWindow.requestAnimationFrame(() => {
      paintFrame = 0;
      painted = true;
      manager.update();
    });
  });
  return {
    toggle() {
      if (disposed) return;
      if (active || pending) {
        intent = 'pause';
        stop();
        manager.update();
      } else {
        intent = 'play';
        blocked = false;
        if (failed) {
          loadedSource = '';
          failed = false;
        }
        painted = true;
        manager.update(entry);
      }
    },
    destroy() {
      disposed = true;
      ownerWindow.cancelAnimationFrame(paintFrame);
      stop();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
      motion.removeEventListener('change', onPreference);
      mobile.removeEventListener('change', onSize);
      connection?.removeEventListener('change', onPreference);
      manager.remove(entry);
      video.removeAttribute('src');
      video.load();
    },
  };
}

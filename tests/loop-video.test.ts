import assert from 'node:assert/strict';
import test from 'node:test';
import { enhanceLoopVideo, type LoopVideoStatus } from '../lib/loop-video';

class Target extends EventTarget {
  listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();
  override addEventListener(type: string, listener: EventListenerOrEventListenerObject | null) {
    if (listener) {
      const set = this.listeners.get(type) ?? new Set();
      set.add(listener);
      this.listeners.set(type, set);
    }
    super.addEventListener(type, listener);
  }
  override removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null) {
    if (listener) this.listeners.get(type)?.delete(listener);
    super.removeEventListener(type, listener);
  }
  get listenerCount() {
    return [...this.listeners.values()].reduce((count, set) => count + set.size, 0);
  }
}

function fixture({ reduced = false, saveData = false, mobile = false, headerHeight = 0 } = {}) {
  const motion = Object.assign(new Target(), { matches: reduced });
  const compact = Object.assign(new Target(), { matches: mobile });
  const connection = Object.assign(new Target(), { saveData });
  const header = { getBoundingClientRect: () => ({ top: 0, bottom: headerHeight }) };
  const document = Object.assign(new Target(), {
    visibilityState: 'visible',
    querySelector: () => (headerHeight ? header : null),
  });
  let id = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const window = Object.assign(new Target(), {
    innerWidth: 1200,
    innerHeight: 800,
    navigator: { connection },
    getComputedStyle: () => ({ position: 'sticky' }),
    matchMedia: (query: string) => (query.includes('reduced-motion') ? motion : compact),
    requestAnimationFrame: (callback: FrameRequestCallback) => {
      frames.set(++id, callback);
      return id;
    },
    cancelAnimationFrame: (frame: number) => frames.delete(frame),
  });
  function tick() {
    const batch = [...frames.entries()];
    for (const [key, callback] of batch) {
      frames.delete(key);
      callback(16);
    }
  }
  function scroll() {
    window.dispatchEvent(new Event('scroll'));
    tick();
  }
  function visibility(hidden: boolean) {
    document.visibilityState = hidden ? 'hidden' : 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
  }
  function player(top = 0, height = 800) {
    const rectangle = { top, bottom: top + height, left: 0, right: 1200, width: 1200, height };
    const frame = { getBoundingClientRect: () => rectangle };
    const outcomes: Array<{ resolve: () => void; reject: () => void }> = [];
    const events = new Target();
    const video = Object.assign(events, {
      src: '',
      preload: 'none',
      paused: true,
      plays: 0,
      loads: 0,
      behavior: 'resolve' as 'resolve' | 'reject' | 'pending',
      load() {
        this.loads++;
      },
      pause() {
        const wasPlaying = !this.paused;
        this.paused = true;
        if (wasPlaying) events.dispatchEvent(new Event('pause'));
      },
      play() {
        this.plays++;
        if (this.behavior === 'reject') return Promise.reject(new Error('autoplay denied'));
        if (this.behavior === 'pending')
          return new Promise<void>((resolve, reject) => {
            outcomes.push({
              resolve: () => {
                this.paused = false;
                events.dispatchEvent(new Event('playing'));
                resolve();
              },
              reject: () => reject(new Error('interrupted')),
            });
          });
        this.paused = false;
        events.dispatchEvent(new Event('playing'));
        return Promise.resolve();
      },
      removeAttribute(name: string) {
        if (name === 'src') this.src = '';
      },
    });
    const statuses: LoopVideoStatus[] = [];
    const controller = enhanceLoopVideo({
      frame: frame as HTMLElement,
      video: video as unknown as HTMLVideoElement,
      src: '/desktop.mp4',
      mobileSrc: '/mobile.mp4',
      onStatus: (status) => statuses.push(status),
      ownerDocument: document as unknown as Document,
      ownerWindow: window as unknown as Window,
    });
    return {
      ...controller,
      video,
      statuses,
      outcomes,
      move(top: number) {
        rectangle.top = top;
        rectangle.bottom = top + rectangle.height;
      },
    };
  }
  return {
    player,
    window,
    document,
    motion,
    compact,
    connection,
    frames,
    tick,
    scroll,
    visibility,
  };
}

test('posters paint before a video URL is assigned; distant scenes do not download video', () => {
  const f = fixture();
  const first = f.player();
  const next = f.player(1800);
  assert.equal(first.video.src, '');
  f.tick();
  assert.equal(first.video.src, '');
  f.tick();
  assert.equal(first.video.src, '/desktop.mp4');
  assert.equal(first.video.paused, false);
  assert.equal(next.video.src, '');
  next.move(950);
  f.scroll();
  assert.equal(next.video.src, '/desktop.mp4');
  assert.equal(next.video.plays, 0, 'nearby preload must not start playback outside the viewport');
  first.destroy();
  next.destroy();
});

test('only the most visible video plays across adjacent and taller-than-screen sections', () => {
  const f = fixture();
  const first = f.player();
  const next = f.player(650, 1600);
  f.tick();
  f.tick();
  assert.equal(first.video.paused, false);
  assert.equal(next.video.paused, true);
  first.move(-650);
  next.move(0);
  f.scroll();
  assert.equal(first.video.paused, true);
  assert.equal(next.video.paused, false, 'a tall frame does not require 50% of its total height');
  assert.equal([first, next].filter((p) => !p.video.paused).length, 1);
  first.destroy();
  next.destroy();
});

test('a frame fully covered by the sticky header neither loads nor starts when another is paused', () => {
  const f = fixture({ headerHeight: 96 });
  const first = f.player(-704);
  const helper = f.player(96, 704);
  f.tick();
  f.tick();
  assert.equal(helper.video.paused, false);
  assert.equal(first.video.src, '', 'the 96px behind the header is not visible preload content');
  helper.toggle();
  assert.equal(first.video.plays, 0);
  assert.equal(first.video.paused, true);
  assert.equal(helper.video.paused, true);
  first.destroy();
  helper.destroy();
});

test('scrolling a playing frame fully behind the header stops it and does not resume on helper pause', () => {
  const f = fixture({ headerHeight: 96 });
  const first = f.player();
  const helper = f.player(800, 704);
  f.tick();
  f.tick();
  assert.equal(first.video.paused, false);
  first.move(-704);
  helper.move(96);
  f.scroll();
  assert.equal(first.video.paused, true);
  assert.equal(helper.video.paused, false);
  helper.toggle();
  assert.equal(first.video.paused, true);
  assert.equal(first.video.plays, 1);
  first.destroy();
  helper.destroy();
});

test('an explicit pause survives leaving and returning to the scene and browser tab', () => {
  const f = fixture();
  const p = f.player();
  f.tick();
  f.tick();
  p.toggle();
  assert.equal(p.video.paused, true);
  p.move(1000);
  f.scroll();
  p.move(0);
  f.scroll();
  f.visibility(true);
  f.visibility(false);
  assert.equal(p.video.plays, 1);
  p.toggle();
  assert.equal(p.video.paused, false);
  f.visibility(true);
  assert.equal(p.video.paused, true);
  f.visibility(false);
  assert.equal(p.video.paused, false);
  p.destroy();
});

for (const preference of ['reduced', 'saveData'] as const) {
  test(`${preference} keeps a static poster without downloading until the user plays`, () => {
    const f = fixture({ [preference]: true });
    const p = f.player();
    f.tick();
    f.tick();
    assert.equal(p.video.src, '');
    p.toggle();
    assert.equal(p.video.paused, false);
    p.move(1000);
    f.scroll();
    assert.equal(p.video.paused, true);
    p.destroy();
  });
}

test('changing the motion preference stops automatic playback but allows manual opt-in', () => {
  const f = fixture();
  const p = f.player();
  f.tick();
  f.tick();
  f.motion.matches = true;
  f.motion.dispatchEvent(new Event('change'));
  assert.equal(p.video.paused, true);
  p.toggle();
  assert.equal(p.video.paused, false);
  p.destroy();
});

test('a browser-initiated pause can be resumed with a single play-button click', () => {
  const f = fixture();
  const p = f.player();
  f.tick();
  f.tick();
  p.video.pause();
  assert.equal(p.statuses.at(-1), 'paused');
  p.toggle();
  assert.equal(p.statuses.at(-1), 'playing');
  assert.equal(p.video.paused, false);
  p.destroy();
});

test('autoplay rejection keeps the poster and permits a deliberate retry without scroll retry loops', async () => {
  const f = fixture();
  const p = f.player();
  p.video.behavior = 'reject';
  f.tick();
  f.tick();
  await Promise.resolve();
  assert.equal(p.statuses.at(-1), 'blocked');
  f.scroll();
  f.scroll();
  assert.equal(p.video.plays, 1);
  p.video.behavior = 'resolve';
  p.toggle();
  assert.equal(p.statuses.at(-1), 'playing');
  p.destroy();
});

test('network failure returns to the poster and retry reloads the source', () => {
  const f = fixture();
  const p = f.player();
  f.tick();
  f.tick();
  p.video.dispatchEvent(new Event('error'));
  assert.equal(p.statuses.at(-1), 'error');
  assert.equal(p.video.paused, true);
  const loads = p.video.loads;
  p.toggle();
  assert.equal(p.video.loads, loads + 1);
  assert.equal(p.statuses.at(-1), 'playing');
  p.destroy();
});

test('crossing the mobile breakpoint loads the proper file without restarting a user-paused video', () => {
  const f = fixture();
  const p = f.player();
  f.tick();
  f.tick();
  f.compact.matches = true;
  f.compact.dispatchEvent(new Event('change'));
  assert.equal(p.video.src, '/mobile.mp4');
  assert.equal(p.video.paused, false);
  p.toggle();
  f.compact.matches = false;
  f.compact.dispatchEvent(new Event('change'));
  assert.equal(p.video.src, '');
  p.toggle();
  assert.equal(p.video.src, '/desktop.mp4');
  p.destroy();
});

test('a delayed play completion cannot continue after its scene leaves the viewport', async () => {
  const f = fixture();
  const p = f.player();
  p.video.behavior = 'pending';
  f.tick();
  f.tick();
  assert.equal(p.statuses.at(-1), 'loading');
  p.move(1000);
  f.scroll();
  p.outcomes[0].resolve();
  await Promise.resolve();
  assert.equal(p.video.paused, true);
  assert.notEqual(p.statuses.at(-1), 'playing');
  p.destroy();
});

test('an old rejected play request does not block a new visible playback attempt', async () => {
  const f = fixture();
  const p = f.player();
  p.video.behavior = 'pending';
  f.tick();
  f.tick();
  p.move(1000);
  f.scroll();
  p.move(0);
  f.scroll();
  p.outcomes[0].reject();
  await Promise.resolve();
  assert.equal(p.statuses.at(-1), 'loading');
  p.outcomes[1].resolve();
  await Promise.resolve();
  assert.equal(p.statuses.at(-1), 'playing');
  p.destroy();
});

test('cleanup releases listeners, queued paints and media, and permits a clean Strict Mode remount', () => {
  const f = fixture();
  const first = f.player();
  first.destroy();
  f.tick();
  f.tick();
  assert.equal(first.video.plays, 0);
  assert.equal(f.frames.size, 0);
  assert.equal(f.window.listenerCount + f.document.listenerCount + first.video.listenerCount, 0);
  assert.equal(f.motion.listenerCount + f.compact.listenerCount + f.connection.listenerCount, 0);
  const second = f.player();
  f.tick();
  f.tick();
  assert.equal(second.video.paused, false);
  second.destroy();
  assert.equal(second.video.src, '');
  assert.equal(second.video.paused, true);
  assert.equal(f.window.listenerCount + f.document.listenerCount, 0);
});

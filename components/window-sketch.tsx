export function WindowSketch({
  width = '',
  height = '',
  compact = false,
}: {
  width?: string;
  height?: string;
  compact?: boolean;
}) {
  const parsedWidth = Number(width),
    parsedHeight = Number(height);
  const w = Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : 360,
    h = Number.isFinite(parsedHeight) && parsedHeight > 0 ? parsedHeight : 240;
  const scale = Math.min(230 / w, 142 / h);
  const rw = w * scale,
    rh = h * scale,
    x = (320 - rw) / 2,
    y = (210 - rh) / 2;
  return (
    <svg
      className={compact ? 'window-sketch compact' : 'window-sketch'}
      viewBox="0 0 320 230"
      role="img"
      aria-label={`입력 치수 비례 안내: 가로 ${width || '미입력'} cm, 세로 ${height || '미입력'} cm`}
    >
      <defs>
        <pattern
          id={compact ? 'fold-small' : 'fold-large'}
          width="13"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect width="13" height="12" fill="#e5e9ea" />
          <rect width="3" height="12" fill="#c5d1d7" opacity=".5" />
        </pattern>
      </defs>
      <rect x={x} y={y} width={rw} height={rh} rx="2" fill="#edf4f6" stroke="#acbdc6" />
      <path d={`M${x + rw / 2},${y} v${rh} M${x},${y + rh / 2} h${rw}`} stroke="#c7d5dc" />
      <rect
        x={x}
        y={y}
        width={rw * 0.32}
        height={rh}
        fill={`url(#${compact ? 'fold-small' : 'fold-large'})`}
      />
      <rect
        x={x + rw * 0.68}
        y={y}
        width={rw * 0.32}
        height={rh}
        fill={`url(#${compact ? 'fold-small' : 'fold-large'})`}
      />
      <path
        d={`M${x - 5},${y - 3} h${rw + 10}`}
        stroke="#677d8a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M${x},${y + rh + 15}h${rw} M${x},${y + rh + 11}v8 M${x + rw},${y + rh + 11}v8 M${x - 15},${y}v${rh} M${x - 19},${y}h8 M${x - 19},${y + rh}h8`}
        stroke="#8a9fac"
        strokeWidth="1"
      />
      <text x="160" y={y + rh + 34} textAnchor="middle" fill="#526d7e" fontSize="12">
        {width ? `${width} cm` : '가로'}
      </text>
      <text
        transform={`translate(${x - 23},${y + rh / 2}) rotate(-90)`}
        textAnchor="middle"
        fill="#526d7e"
        fontSize="12"
      >
        {height ? `${height} cm` : '세로'}
      </text>
    </svg>
  );
}

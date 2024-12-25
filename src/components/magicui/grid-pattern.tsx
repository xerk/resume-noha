interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 200,
  maxOpacity = 0.5,
  duration = 1,
  repeatDelay = 0.5,
}: GridPatternProps) {
  const patternId = "pattern";

  return (
    <svg className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M${height} 0L0 0 0 ${width}`}
            fill="none"
            stroke="currentColor"
            strokeDasharray={strokeDasharray}
            strokeOpacity={maxOpacity}
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill={`url(#${patternId})`}
        className="animate-grid-pattern"
      />
    </svg>
  );
}
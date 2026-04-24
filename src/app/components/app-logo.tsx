import svgPaths from "../../imports/svg-puu9ef7n37";

interface AppLogoProps {
  color?: string;
  size?: number;
  className?: string;
}

export function AppLogo({ color = "#091201", size = 120, className = "" }: AppLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 1.009 }}>
      {/* Outer ring with text */}
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 543.192 548.1">
        <g>
          <g>
            <path d={svgPaths.p229854f0} fill={color} />
            <path d={svgPaths.pab14280} fill={color} />
            <path d={svgPaths.p313ac380} fill={color} />
            <path d={svgPaths.p3c754a00} fill={color} />
            <path d={svgPaths.p2cd90d00} fill={color} />
          </g>
          <path d={svgPaths.p31e85800} fill={color} />
          <path d={svgPaths.p16299800} fill={color} />
          <path d={svgPaths.p3dfb5c00} fill={color} />
          <path d={svgPaths.p11394df0} fill={color} />
          <path d={svgPaths.p2d962e00} fill={color} />
          <path d={svgPaths.pd23c880} fill={color} />
          <path d={svgPaths.p20afe280} fill={color} />
          <path d={svgPaths.p135e0000} fill={color} />
          <path d={svgPaths.p1175c900} fill={color} />
          <path d={svgPaths.p6a37d80} fill={color} />
          <path d={svgPaths.p4318500} fill={color} />
          <path d={svgPaths.p55d6a00} fill={color} />
          <path d={svgPaths.p12149600} fill={color} />
          <path d={svgPaths.p1df74080} fill={color} />
          <path d={svgPaths.p2c2ace00} fill={color} />
          <path d={svgPaths.p1cb37080} fill={color} />
          <path d={svgPaths.p2eecd1c0} fill={color} />
          <path d={svgPaths.p11ce7580} fill={color} />
          <path d={svgPaths.p3ff9fd00} fill={color} />
          <path d={svgPaths.p23f8d300} fill={color} />
          <g>
            <path d={svgPaths.p3fb1a800} fill={color} />
            <path d={svgPaths.p17c5a900} fill={color} />
            <path d={svgPaths.p24417880} fill={color} />
            <path d={svgPaths.p2e3426fa} fill={color} />
            <path d={svgPaths.p98f580} fill={color} />
          </g>
        </g>
      </svg>
      {/* Inner "n" text */}
      <div className="absolute" style={{ inset: '35.33% 24.51% 35.36% 23.99%' }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 279.744 160.671">
          <g>
            <path d={svgPaths.p38059400} fill={color} />
            <g>
              <path d={svgPaths.pe5ec980} fill={color} />
              <path d={svgPaths.p1ec8ba80} fill={color} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

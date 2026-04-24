import svgPaths from "../../imports/svg-4upcoz5h0a";
import imgRectangle from "figma:asset/be251f56abc10965fc8982ad13d0717830b32dca.png";

interface AppIconProps {
  size?: number;
  className?: string;
}

export function AppIcon({ size = 80, className = "" }: AppIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Rounded square background with gradient */}
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 309.37 309.37">
        <path d={svgPaths.p10394600} fill="url(#appIconGrad)" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="appIconGrad" x1="154.68" x2="154.68" y1="309.36" y2="0">
            <stop stopColor="#6A002C" />
            <stop offset="1" stopColor="#CB0723" />
          </linearGradient>
        </defs>
      </svg>
      {/* Inner wave pattern */}
      <div className="absolute" style={{ inset: '19.57% 0.85% 19.67% 6.1%' }}>
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgRectangle} />
      </div>
      {/* Inner "n" symbol */}
      <div className="absolute" style={{ inset: '28.12% 11.91%' }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 235.682 135.376">
          <path d={svgPaths.p1155d300} fill="#F9F9F7" />
          <g>
            <path d={svgPaths.p9d64580} fill="#F9F9F7" />
            <path d={svgPaths.p3564a1f0} fill="#F9F9F7" />
          </g>
        </svg>
      </div>
    </div>
  );
}

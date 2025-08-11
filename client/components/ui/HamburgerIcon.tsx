interface HamburgerIconProps {
  className?: string;
  size?: number;
}

export default function HamburgerIcon({ className = "", size = 24 }: HamburgerIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
    >
      <path 
        d="M3 12H21M3 6H21M3 18H21" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

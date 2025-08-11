import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children?: ReactNode;
  className?: string;
  showBorder?: boolean;
}

export default function FilterSection({ 
  title, 
  children, 
  className = "",
  showBorder = true 
}: FilterSectionProps) {
  const borderClass = showBorder ? "border-b border-[#04040514]" : "";
  
  return (
    <div className={`mb-6 pb-6 ${borderClass} ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-[#040405] text-sm font-medium font-montserrat">{title}</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </div>
      {children}
    </div>
  );
}

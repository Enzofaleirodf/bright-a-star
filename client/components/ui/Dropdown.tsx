import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Dropdown({ children, icon, className = "", onClick }: DropdownProps) {
  return (
    <button 
      className={`h-12 px-6 bg-[#0404050D] flex items-center gap-3 text-[#040405] text-sm font-montserrat ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{children}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}

import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SearchInput({ 
  placeholder = "Buscar cidade ou estado",
  value,
  onChange,
  className = ""
}: SearchInputProps) {
  return (
    <div className={`h-12 border border-[#00000014] bg-[#04040505] px-4 md:px-6 flex items-center gap-4 ${className}`}>
      <Search className="w-4 h-4 text-[#00000099]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 bg-transparent text-[#040405CC] placeholder:text-[#04040580] text-sm outline-none font-montserrat"
      />
    </div>
  );
}

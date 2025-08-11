import React, { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface SortDropdownProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const sortOptions = [
  { value: "latest", label: "Últimos adicionados" },
  { value: "ending", label: "Encerrando" },
  { value: "lowest-price", label: "Menor preço" },
  { value: "highest-price", label: "Maior preço" },
  { value: "highest-discount", label: "Maior desconto" },
];

export default function SortDropdown({ value = "latest", onValueChange }: SortDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  
  const selectedOption = sortOptions.find(option => option.value === selectedValue);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-11 md:h-12 px-3 md:px-6 bg-[#0404050D] text-[#040405] font-montserrat hover:bg-[#04040520] gap-2 w-full max-w-full focus-visible:ring-0 focus-visible:ring-offset-0 justify-between"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="font-medium text-sm truncate text-left">{selectedOption?.label || "Ordenar"}</span>
          </div>
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[215px] p-3 bg-white border border-[#16161A14]"
        align="start"
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleValueChange(option.value)}
            className="flex items-center justify-between px-3 py-3 h-[35px] text-[#040405] text-[13px] font-medium font-montserrat hover:bg-[#0404050A] cursor-pointer text-left"
          >
            <span>{option.label}</span>
            {selectedValue === option.value && (
              <div className="flex items-center">
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 13 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1.83594 5.57115L5.26451 8.99972L12.1217 2.14258" 
                    stroke="#FEDA03" 
                    strokeWidth="1.71429" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Input } from "./input";
import { Label } from "./label";

interface ValorFilterProps {
  className?: string;
  showBorder?: boolean;
}

export default function ValorFilter({ className = "", showBorder = true }: ValorFilterProps) {
  const [menorValue, setMenorValue] = useState("");
  const [maiorValue, setMaiorValue] = useState("");

  const borderClass = showBorder ? "border-b border-[#04040514]" : "";

  return (
    <Collapsible className={`mb-6 pb-6 ${borderClass} ${className}`}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <span className="text-[#040405] text-sm font-medium font-montserrat">Valor</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-5">
        <div className="flex items-start gap-3">
          {/* Menor */}
          <div className="flex-1 md:max-w-[135px]">
            <Label 
              htmlFor="valor-menor" 
              className="text-[#00000099] text-xs font-medium font-montserrat mb-3 block"
            >
              Menor
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#04040599] text-sm font-medium font-montserrat pointer-events-none">
                R$
              </span>
              <Input
                id="valor-menor"
                type="number"
                value={menorValue}
                onChange={(e) => setMenorValue(e.target.value)}
                placeholder="0"
                className="h-12 pl-10 border-[#00000014] bg-[#04040505] text-[#040405] placeholder:text-[#00000080] font-montserrat text-sm"
              />
            </div>
          </div>

          {/* Maior */}
          <div className="flex-1 md:max-w-[135px]">
            <Label 
              htmlFor="valor-maior" 
              className="text-[#00000099] text-xs font-medium font-montserrat mb-3 block"
            >
              Maior
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#04040599] text-sm font-medium font-montserrat pointer-events-none">
                R$
              </span>
              <Input
                id="valor-maior"
                type="number"
                value={maiorValue}
                onChange={(e) => setMaiorValue(e.target.value)}
                placeholder="0"
                className="h-12 pl-10 border-[#00000014] bg-[#04040505] text-[#040405] placeholder:text-[#00000080] font-montserrat text-sm"
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Input } from "./input";
import { Label } from "./label";

interface AnoFilterProps {
  className?: string;
  showBorder?: boolean;
}

export default function AnoFilter({ className = "", showBorder = true }: AnoFilterProps) {
  const [menorValue, setMenorValue] = useState("");
  const [maiorValue, setMaiorValue] = useState("");

  const borderClass = showBorder ? "border-b border-[#04040514]" : "";

  return (
    <Collapsible className={`mb-6 pb-6 ${borderClass} ${className}`}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <span className="text-[#040405] text-sm font-medium font-montserrat">Ano</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-5">
        <div className="flex items-start gap-3">
          {/* Menor */}
          <div className="flex-1 md:max-w-[135px]">
            <Label
              htmlFor="ano-menor"
              className="text-[#00000099] text-xs font-medium font-montserrat mb-3 block"
            >
              Menor
            </Label>
            <div className="relative flex items-center">
              <Input
                id="ano-menor"
                type="number"
                value={menorValue}
                onChange={(e) => setMenorValue(e.target.value)}
                placeholder="1990"
                className="h-12 border-[#00000014] bg-[#04040505] text-[#040405] placeholder:text-[#04040580] font-montserrat text-sm"
              />
            </div>
          </div>

          {/* Maior */}
          <div className="flex-1 md:max-w-[135px]">
            <Label
              htmlFor="ano-maior"
              className="text-[#00000099] text-xs font-medium font-montserrat mb-3 block"
            >
              Maior
            </Label>
            <div className="relative flex items-center">
              <Input
                id="ano-maior"
                type="number"
                value={maiorValue}
                onChange={(e) => setMaiorValue(e.target.value)}
                placeholder="2024"
                className="h-12 border-[#00000014] bg-[#04040505] text-[#040405] placeholder:text-[#04040580] font-montserrat text-sm"
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

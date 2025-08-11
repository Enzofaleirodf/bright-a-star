import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface MontaOption {
  name: string;
  count: number;
  checked: boolean;
}

const montaOptions: MontaOption[] = [
  { name: "Monta", count: 234, checked: false },
  { name: "Média monta", count: 189, checked: false },
  { name: "Pequena monta", count: 156, checked: false },
  { name: "Não informado", count: 67, checked: false }
];

export default function MontaFilter() {
  const [montaSelected, setMontaSelected] = useState(montaOptions);

  const handleMontaChange = (index: number, checked: boolean) => {
    const updated = [...montaSelected];
    updated[index].checked = checked;
    setMontaSelected(updated);
  };

  return (
    <Collapsible className="mb-6 pb-6 border-b border-[#04040514]">
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <span className="text-[#040405] text-sm font-medium font-montserrat">Monta</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-5">
        <div className="space-y-4">
          {montaSelected.map((option, index) => (
            <div key={option.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`monta-${index}`}
                  checked={option.checked}
                  onCheckedChange={(checked) => handleMontaChange(index, checked as boolean)}
                  className="w-[18px] h-[18px] border-2 border-[#0404051A] data-[state=checked]:bg-[#FEDA03] data-[state=checked]:border-[#FEDA03]"
                />
                <Label 
                  htmlFor={`monta-${index}`}
                  className="text-[#04040599] text-sm font-medium font-montserrat cursor-pointer"
                >
                  {option.name}
                </Label>
              </div>
              <span className="text-[#0404054D] text-xs font-montserrat font-medium">{option.count}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface CondicaoOption {
  name: string;
  count: number;
  checked: boolean;
}

const condicaoOptions: CondicaoOption[] = [
  { name: "Avarias em transporte", count: 45, checked: false },
  { name: "Colisão", count: 123, checked: false },
  { name: "Consórcio", count: 89, checked: false },
  { name: "Depenado", count: 34, checked: false },
  { name: "Enchente", count: 67, checked: false },
  { name: "Financiamento", count: 234, checked: false },
  { name: "Frota", count: 156, checked: false },
  { name: "Inteiro", count: 345, checked: false },
  { name: "Queimado", count: 23, checked: false },
  { name: "Roubo/furto", count: 78, checked: false },
  { name: "Sinistrado", count: 98, checked: false },
  { name: "Média de Conservação", count: 134, checked: false },
  { name: "Não informado", count: 45, checked: false }
];

export default function CondicaoFilter() {
  const [condicaoSelected, setCondicaoSelected] = useState(condicaoOptions);

  const handleCondicaoChange = (index: number, checked: boolean) => {
    const updated = [...condicaoSelected];
    updated[index].checked = checked;
    setCondicaoSelected(updated);
  };

  return (
    <Collapsible className="mb-6 pb-6 border-b border-[#0404051A]">
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <span className="text-[#040405] text-sm font-medium font-montserrat">Condição</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-5">
        <div className="space-y-4">
          {condicaoSelected.map((option, index) => (
            <div key={option.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`condicao-${index}`}
                  checked={option.checked}
                  onCheckedChange={(checked) => handleCondicaoChange(index, checked as boolean)}
                  className="w-[18px] h-[18px] border-2 border-[#0404051A] data-[state=checked]:bg-[#FEDA03] data-[state=checked]:border-[#FEDA03]"
                />
                <Label 
                  htmlFor={`condicao-${index}`}
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

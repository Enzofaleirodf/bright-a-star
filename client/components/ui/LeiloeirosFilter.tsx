import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface LeiloeirosFilterProps {
  type?: "property" | "vehicle";
  isMobile?: boolean;
}

const propertyLeiloeiros = [
  { name: "Todos leiloeiros", count: 892 },
  { name: "Alfa Leilões", count: 234 },
  { name: "Beta Leilões", count: 156 },
  { name: "Gamma Leilões", count: 89 },
  { name: "Delta Leilões", count: 123 },
  { name: "Omega Leilões", count: 67 },
  { name: "Hoppe Leilões", count: 45 }
];

const vehicleLeiloeiros = [
  { name: "Todos leiloeiros", count: 892 },
  { name: "Auto Leilões", count: 234 },
  { name: "Veíc Leilões", count: 156 },
  { name: "Motor Leilões", count: 89 },
  { name: "Roda Leilões", count: 123 },
  { name: "Speed Leilões", count: 67 }
];

export default function LeiloeirosFilter({ type = "property", isMobile = false }: LeiloeirosFilterProps) {
  const [selectedLeiloeiro, setSelectedLeiloeiro] = useState("");
  const [open, setOpen] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const leiloeiros = type === "vehicle" ? vehicleLeiloeiros : propertyLeiloeiros;

  // Detectar teclado virtual no mobile
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialViewportHeight = window.innerHeight;

    const detectKeyboard = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;

      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      // Teclado ativo se diferença > 150px
      const isKeyboardActive = heightDifference > 150;
      setKeyboardActive(isKeyboardActive);

      // Log para debug
      console.log('Height difference:', heightDifference, 'Keyboard active:', isKeyboardActive);
    };

    const handleFocusIn = () => {
      // Força detecção quando um input ganha foco
      setTimeout(detectKeyboard, 300);
    };

    const handleFocusOut = () => {
      // Força detecção quando um input perde foco
      setTimeout(() => setKeyboardActive(false), 300);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', detectKeyboard);
    }
    window.addEventListener('resize', detectKeyboard);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', detectKeyboard);
      }
      window.removeEventListener('resize', detectKeyboard);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Evitar problemas de foco em mobile
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && typeof document !== 'undefined') {
      // Remove focus do input quando fecha no mobile
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        // Reset keyboard state
        setKeyboardActive(false);
        // Force scroll to ensure other elements are visible
        window.scrollTo({ top: window.scrollY, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSelect = (currentValue: string) => {
    setSelectedLeiloeiro(currentValue === selectedLeiloeiro ? "" : currentValue);
    setOpen(false);
  };

  return (
    <Collapsible className="mb-6 pb-6 border-b border-[#0404051A]">
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <span className="text-[#040405] text-sm font-medium font-montserrat">Leiloeiros</span>
        <ChevronDown className="w-4 h-4 text-[#0404054D]" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-5">
        <div>
          <label className="text-[#040405] text-sm font-medium font-montserrat mb-2 block">
            Selecionar Leiloeiro
          </label>

          {isMobile ? (
            <Sheet open={open} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-10 bg-[#0404050D] border-none font-montserrat text-sm text-[#04040599] hover:bg-[#04040514]"
                >
                  {selectedLeiloeiro || "Selecione um leiloeiro..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh] z-[10003]">
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 pb-4">
                    <h3 className="text-lg font-semibold">Selecionar Leiloeiro</h3>
                  </div>
                  <Command className="flex-1">
                    <CommandInput
                      placeholder="Buscar leiloeiro..."
                      className="h-12 text-base"
                      autoFocus={false}
                    />
                    <CommandList className="flex-1">
                      <CommandEmpty>Nenhum leiloeiro encontrado.</CommandEmpty>
                      <CommandGroup>
                        {leiloeiros.map((leiloeiro) => (
                          <CommandItem
                            key={leiloeiro.name}
                            value={leiloeiro.name}
                            onSelect={handleSelect}
                            className="flex items-center justify-between py-4 text-base"
                          >
                            <div className="flex items-center">
                              <Check
                                className={cn(
                                  "mr-3 h-5 w-5",
                                  selectedLeiloeiro === leiloeiro.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {leiloeiro.name}
                            </div>
                            <span className="text-[#0404054D] text-sm font-montserrat font-medium">
                              {leiloeiro.count}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-10 bg-[#0404050D] border-none font-montserrat text-sm text-[#04040599] hover:bg-[#04040514]"
                >
                  {selectedLeiloeiro || "Selecione um leiloeiro..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[var(--radix-popover-trigger-width)] max-w-[95vw] p-0 z-[10001] ${
                  keyboardActive ? 'keyboard-active' : ''
                }`}
                align="start"
                side={keyboardActive ? "top" : "bottom"}
                sideOffset={keyboardActive ? 8 : 4}
              >
                <Command>
                  <CommandInput
                    placeholder="Buscar leiloeiro..."
                    className="h-9"
                    autoFocus={false}
                  />
                  <CommandList className="max-h-[200px] md:max-h-[300px]">
                    <CommandEmpty>Nenhum leiloeiro encontrado.</CommandEmpty>
                    <CommandGroup>
                      {leiloeiros.map((leiloeiro) => (
                        <CommandItem
                          key={leiloeiro.name}
                          value={leiloeiro.name}
                          onSelect={handleSelect}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedLeiloeiro === leiloeiro.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {leiloeiro.name}
                          </div>
                          <span className="text-[#0404054D] text-xs font-montserrat font-medium">
                            {leiloeiro.count}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

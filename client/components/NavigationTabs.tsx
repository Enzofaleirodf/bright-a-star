import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="hidden md:block border-b border-[#04040533] pt-3">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="h-auto bg-transparent p-0 space-x-4">
          <TabsTrigger
            value="Imóveis"
            className="pb-4 px-0 border-b-2 border-transparent data-[state=active]:border-[#040405] data-[state=active]:text-[#040405] text-[#04040599] font-semibold font-montserrat bg-transparent data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:shadow-none rounded-none"
          >
            Imóveis
          </TabsTrigger>
          <TabsTrigger
            value="Veículos"
            className="pb-4 px-0 border-b-2 border-transparent data-[state=active]:border-[#040405] data-[state=active]:text-[#040405] text-[#04040599] font-semibold font-montserrat bg-transparent data-[state=active]:bg-transparent hover:bg-transparent data-[state=active]:shadow-none rounded-none"
          >
            Veículos
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

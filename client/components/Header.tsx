import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Logo from "./ui/Logo";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Header({ activeTab = "Imóveis", onTabChange }: HeaderProps) {
  return (
    <div className="w-full bg-white border-b border-[#04040533]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-8 xl:px-16">
        <div className="h-16 md:h-24 flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <Logo />

            {/* Navigation - only on desktop */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onTabChange?.("Imóveis")}
                className={`px-4 py-2 font-montserrat font-semibold text-base transition-colors ${
                  activeTab === "Imóveis"
                    ? "text-[#040405] border-b-2 border-[#040405]"
                    : "text-[#04040599] hover:text-[#040405]"
                }`}
              >
                Imóveis
              </button>
              <button
                onClick={() => onTabChange?.("Veículos")}
                className={`px-4 py-2 font-montserrat font-semibold text-base transition-colors ${
                  activeTab === "Veículos"
                    ? "text-[#040405] border-b-2 border-[#040405]"
                    : "text-[#04040599] hover:text-[#040405]"
                }`}
              >
                Veículos
              </button>
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3 md:gap-6">
            <Button className="px-4 md:px-6 py-2 bg-[#040405] text-white text-sm font-medium font-montserrat hover:bg-[#040405CC]">
              Assinar Pro
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex w-12 h-12 bg-[#04040526] hover:bg-[#04040540]"
            >
              <Menu className="w-5 h-5 text-[#040405]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

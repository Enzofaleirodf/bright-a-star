import React, { useState } from "react";
import {
  BuildingOfficeIcon,
  HeartIcon,
  UserIcon,
  ScaleIcon
} from "@heroicons/react/24/solid";
import { IoCarSport } from "react-icons/io5";

interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { id: "home", icon: BuildingOfficeIcon, label: "Imóveis" },
  { id: "car", icon: IoCarSport, label: "Veículos" },
  { id: "heart", icon: HeartIcon, label: "Favoritos" },
  { id: "gavel", icon: ScaleIcon, label: "Leilões" },
  { id: "user", icon: UserIcon, label: "Perfil" },
];

interface MobileBottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function MobileBottomNavigation({ 
  activeTab = "home", 
  onTabChange 
}: MobileBottomNavigationProps) {
  const [active, setActive] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="md:hidden fixed bottom-[6.5rem] left-1/2 transform -translate-x-1/2 z-40 safe-area-bottom">
      <div className="bg-white/95 backdrop-blur-xl border border-black/5 rounded-full px-10 py-3 shadow-xl">
        <div className="flex items-center justify-center gap-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'bg-black scale-110'
                    : 'hover:bg-black/5 active:scale-95'
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive
                      ? 'text-gray-400 scale-110'
                      : 'text-black/60 hover:text-black/80'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

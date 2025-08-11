import { useState, useEffect } from "react";
import { BellPlus, ChevronLeft, Search, ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import SortDropdown from "./ui/SortDropdown";

interface ControlsBarProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
  activeFiltersCount?: number;
  onResetFilters?: () => void;
  resetKey?: number;
}

export default function ControlsBar({
  viewMode,
  onViewModeChange,
  sidebarVisible,
  onToggleSidebar,
  activeFiltersCount = 0,
  onResetFilters,
  resetKey = 0
}: ControlsBarProps) {
  // Note: Novos and Com desconto toggles moved to sidebar

  // Count active filters from sidebar
  // Note: "Todos" and "Todas" options are NOT considered filters
  // Note: Novos and Com desconto toggles moved to sidebar
  const getTotalActiveFiltersCount = () => {
    return activeFiltersCount;
  };

  return (
    <div className="py-6 md:py-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-12 px-4 bg-[#0404050D] hover:bg-[#04040520] rounded"
            onClick={onToggleSidebar}
          >
            {sidebarVisible ? (
              <ChevronLeft className="w-4 h-4 text-[#040405]" />
            ) : (
              <SlidersHorizontal className="w-4 h-4 text-[#040405]" />
            )}
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-12 px-6 bg-[#0404050D] text-[#16161A] font-montserrat hover:bg-[#04040520] rounded"
              onClick={onResetFilters}
            >
              Resetar filtros
            </Button>
            {getTotalActiveFiltersCount() > 0 && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 bg-[#FEDA03] text-[#040405] text-xs px-2 py-0 h-5 font-medium min-w-5 flex items-center justify-center"
              >
                {getTotalActiveFiltersCount()}
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0 relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#00000099]" />
            <Input
              placeholder="Buscar cidade ou estado"
              className="w-full h-12 pl-14 border-[#00000014] bg-[#04040505] text-[#040405CC] placeholder:text-[#04040580] font-montserrat"
            />
          </div>

          <Button variant="ghost" size="icon" className="h-12 w-12 px-4 bg-[#0404050D] hover:bg-[#04040520] rounded">
            <BellPlus className="w-4 h-4 text-[#040405]" />
          </Button>
        </div>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as "grid" | "list")}
          className="bg-[#0404050D] p-1 rounded overflow-hidden"
        >
          <ToggleGroupItem
            value="grid"
            className="w-10 h-10 rounded overflow-hidden data-[state=on]:bg-[#0404051A]"
          >
            <LayoutGrid className="w-4 h-4 text-[#04040566]" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            className="w-10 h-10 rounded overflow-hidden data-[state=on]:bg-[#0404051A]"
          >
            <List className="w-4 h-4 text-[#040405]" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {/* Primeira linha: apenas busca */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#00000099]" />
            <Input
              placeholder="Buscar cidade ou estado"
              className="w-full h-11 md:h-12 pl-12 border-[#00000014] bg-[#04040505] text-[#040405CC] placeholder:text-[#04040580] font-montserrat"
            />
          </div>
        </div>

        {/* Segunda linha: ordenar, alertas e view toggle */}
        <div className="flex gap-2">
          <div className="flex-1 min-w-0 max-w-full">
            <SortDropdown />
          </div>
          <Button variant="ghost" size="icon" className="h-11 w-11 md:h-12 md:w-12 bg-[#0404050D] hover:bg-[#04040520]">
            <BellPlus className="w-4 h-4 text-[#040405]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 md:h-12 md:w-12 bg-[#0404050D] hover:bg-[#04040520]"
            onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <List className="w-4 h-4 text-[#040405]" />
            ) : (
              <LayoutGrid className="w-4 h-4 text-[#040405]" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "./button";

interface SidebarFooterProps {
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  onApplyFilters?: () => void;
  isMobile?: boolean;
}

export default function SidebarFooter({
  hasActiveFilters = false,
  onResetFilters,
  onApplyFilters,
  isMobile = false
}: SidebarFooterProps) {
  return (
    <div className="bg-[#F7F7F7] px-7 py-8 flex-shrink-0 relative z-10" style={{
      boxShadow: isMobile
        ? '0 -2px 18px 0 rgba(0,0,0,0.16)'
        : '0 -2px 8px 0 rgba(0,0,0,0.08)',
      marginTop: isMobile ? '-1px' : '0'
    }}>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={onResetFilters}
          className={`flex-1 h-12 text-sm font-medium font-montserrat rounded-none ${
            hasActiveFilters
              ? "bg-[#04040526] text-[#040405] hover:bg-[#04040533]"
              : "bg-[#0404051A] text-[#04040566] hover:bg-[#04040526]"
          }`}
        >
          Resetar
        </Button>

        {isMobile && (
          <Button
            onClick={onApplyFilters}
            className="flex-1 h-12 text-sm font-medium font-montserrat bg-[#FEDA03] hover:bg-[#040405] text-[#040405] hover:text-white rounded-none"
          >
            Aplicar filtros
          </Button>
        )}
      </div>
    </div>
  );
}

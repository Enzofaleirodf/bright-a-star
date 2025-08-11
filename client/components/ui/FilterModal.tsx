import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import Sidebar from "../Sidebar";
import VehicleSidebar from "../VehicleSidebar";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ name: string; count: number; active: boolean }>;
  type?: "property" | "vehicle";
}

export default function FilterModal({ isOpen, onClose, categories, type = "property" }: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[9999] bg-black bg-opacity-75" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="h-full flex flex-col">
            {type === "vehicle" ? (
              <VehicleSidebar
                categories={categories}
                isMobile={true}
                onApplyFilters={onClose}
              />
            ) : (
              <Sidebar
                categories={categories}
                isMobile={true}
                onApplyFilters={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

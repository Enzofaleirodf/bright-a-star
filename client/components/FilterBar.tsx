import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface FilterBarProps {
  onSearch?: (filters: FilterData) => void;
}

interface FilterData {
  location: string;
  category: string;
  type: string;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Residencial");
  const [type, setType] = useState("Apartamento");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const categories = ["Residencial", "Comercial", "Industrial", "Rural"];
  const types = ["Apartamento", "Casa", "Terreno", "Sala Comercial", "Galpão"];

  const handleSearch = () => {
    onSearch?.({ location, category, type });
  };

  const clearLocation = () => {
    setLocation("");
  };

  return (
    <div className="w-full bg-[#FAFAFA] border-b border-[#04040508]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-8 xl:px-16 py-6">
        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center bg-white rounded-lg shadow-sm border border-[#04040512] overflow-hidden max-w-4xl mx-auto">
          
          {/* Location Search */}
          <div className="flex-1 px-4 py-4 border-r border-[#04040512]">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-[#040405] opacity-60" strokeWidth={2} />
              <div className="flex-1">
                <label className="block text-[#04040599] font-montserrat text-xs font-medium mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Buscar por cidade ou estado"
                  className="w-full text-[#040405] font-montserrat text-sm font-normal bg-transparent border-none outline-none placeholder:text-[#04040560]"
                />
              </div>
              {location && (
                <button
                  onClick={clearLocation}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-[#040405] opacity-60" />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative border-r border-[#04040512]">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-4 hover:bg-gray-50 transition-colors min-w-[180px]"
            >
              <div className="flex-1 text-left">
                <span className="block text-[#04040599] font-montserrat text-xs font-medium mb-1">
                  Categoria
                </span>
                <span className="block text-[#040405] font-montserrat text-sm font-semibold">
                  {category}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#040405] opacity-60" />
            </button>
            
            {/* Category Dropdown Menu */}
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#04040512] rounded-md shadow-lg z-10 mt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 font-montserrat text-sm text-[#040405] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type Dropdown */}
          <div className="relative border-r border-[#04040512]">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex items-center gap-2 px-4 py-4 hover:bg-gray-50 transition-colors min-w-[180px]"
            >
              <div className="flex-1 text-left">
                <span className="block text-[#04040599] font-montserrat text-xs font-medium mb-1">
                  Tipo
                </span>
                <span className="block text-[#040405] font-montserrat text-sm font-semibold">
                  {type}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#040405] opacity-60" />
            </button>
            
            {/* Type Dropdown Menu */}
            {showTypeDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#04040512] rounded-md shadow-lg z-10 mt-1">
                {types.map((typ) => (
                  <button
                    key={typ}
                    onClick={() => {
                      setType(typ);
                      setShowTypeDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 font-montserrat text-sm text-[#040405] transition-colors"
                  >
                    {typ}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="px-4 py-4">
            <Button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-[#040405] hover:bg-[#040405E6] text-white font-montserrat font-semibold text-sm transition-colors"
            >
              Pesquisar
            </Button>
          </div>
        </div>

        {/* Mobile Filter Bar */}
        <div className="md:hidden">
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm border border-[#04040512]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#040405] opacity-60" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Buscar por cidade ou estado"
                className="w-full pl-10 pr-4 py-3 border border-[#04040512] rounded-md font-montserrat text-sm outline-none focus:border-[#040405] focus:ring-1 focus:ring-[#040405]"
              />
              {location && (
                <button
                  onClick={clearLocation}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-[#040405] opacity-60" />
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-3 py-3 border border-[#04040512] rounded-md font-montserrat text-sm outline-none focus:border-[#040405] focus:ring-1 focus:ring-[#040405]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="flex-1 px-3 py-3 border border-[#04040512] rounded-md font-montserrat text-sm outline-none focus:border-[#040405] focus:ring-1 focus:ring-[#040405]"
              >
                {types.map((typ) => (
                  <option key={typ} value={typ}>{typ}</option>
                ))}
              </select>
            </div>
            
            <Button
              onClick={handleSearch}
              className="w-full py-3 bg-[#040405] hover:bg-[#040405E6] text-white font-montserrat font-semibold text-sm"
            >
              Pesquisar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

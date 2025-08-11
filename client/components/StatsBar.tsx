import { ChevronDown } from "lucide-react";
import SortDropdown from "./ui/SortDropdown";

export default function StatsBar() {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="border border-[#0404051A] flex-1 py-3 rounded overflow-hidden">
        <div className="px-3 md:px-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-sm font-montserrat">
              <span className="text-[#04040599] font-medium">Encontramos</span>
              <span className="text-[#040405] font-semibold text-base">42.000</span>
              <span className="text-[#04040599] font-medium">leilões em</span>
              <span className="text-[#040405] font-semibold text-base">741</span>
              <span className="text-[#04040599] font-medium">sites</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-montserrat" style={{ fontSize: '0.85em' }}>
              <button className="text-[#FF5757] font-semibold underline hover:text-[#FF4747] cursor-pointer transition-colors">
                12 novos leilões
              </button>
              <span className="text-[#04040580]">adicionados hoje</span>
            </div>
          </div>

          <div className="hidden md:block">
            <SortDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

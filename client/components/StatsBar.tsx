import { useEffect, useState } from "react";
import SortDropdown from "./ui/SortDropdown";
import { supabase } from "@/integrations/supabase/client";

export default function StatsBar() {
  const [totalAuctions, setTotalAuctions] = useState<number | null>(null);
  const [totalSites, setTotalSites] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [propCount, vehCount, siteCount] = await Promise.all([
        supabase.from("lots_property").select("*", { count: "exact", head: true }),
        supabase.from("lots_vehicle").select("*", { count: "exact", head: true }),
        supabase.from("leiloeiros").select("*", { count: "exact", head: true }),
      ]);
      if (!mounted) return;
      const total = (propCount.count ?? 0) + (vehCount.count ?? 0);
      setTotalAuctions(total);
      setTotalSites(siteCount.count ?? 0);
    };
    load().catch(() => {
      if (!mounted) return;
      setTotalAuctions(0);
      setTotalSites(0);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const auctionsLabel = totalAuctions != null ? totalAuctions.toLocaleString("pt-BR") : "—";
  const sitesLabel = totalSites != null ? (totalSites || 0).toLocaleString("pt-BR") : "—";

  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="border border-[#0404051A] flex-1 py-3 rounded overflow-hidden">
        <div className="px-3 md:px-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-sm font-montserrat">
              <span className="text-[#04040599] font-medium">Encontramos</span>
              <span className="text-[#040405] font-semibold text-base">{auctionsLabel}</span>
              <span className="text-[#04040599] font-medium">leilões em</span>
              <span className="text-[#040405] font-semibold text-base">{sitesLabel}</span>
              <span className="text-[#04040599] font-medium">sites</span>
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

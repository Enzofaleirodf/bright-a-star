import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  value: "grid" | "list";
  onChange: (value: "grid" | "list") => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="bg-[#0404050D] p-1 flex">
      <button
        className={`w-10 h-10 flex items-center justify-center ${
          value === "grid" ? "bg-[#0404051A]" : ""
        }`}
        onClick={() => onChange("grid")}
      >
        <Grid3X3 className="w-4 h-4 text-[#04040566]" />
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center ${
          value === "list" ? "bg-[#0404051A]" : ""
        }`}
        onClick={() => onChange("list")}
      >
        <List className="w-4 h-4 text-[#040405]" />
      </button>
    </div>
  );
}

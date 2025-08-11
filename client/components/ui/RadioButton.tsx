interface RadioButtonProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
}

export default function RadioButton({ 
  label, 
  count,
  checked, 
  onChange,
  name 
}: RadioButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div 
          className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center cursor-pointer ${
            checked 
              ? "bg-[#FEDA03] border-[#FEDA03]" 
              : "border-[#0404051A]"
          }`}
          onClick={() => onChange(!checked)}
        >
          {checked && (
            <div className="w-[6px] h-[6px] bg-[#040405] rounded-full"></div>
          )}
        </div>
        <label 
          className="text-[#04040599] text-sm font-medium font-montserrat cursor-pointer"
          onClick={() => onChange(!checked)}
        >
          {label}
        </label>
      </div>
      {count !== undefined && (
        <span className="text-[#0404054D] text-xs font-montserrat font-medium">{count}</span>
      )}
    </div>
  );
}

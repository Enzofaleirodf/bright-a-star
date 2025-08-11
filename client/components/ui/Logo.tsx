interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const titleSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`bg-[#FEDA03] rounded-lg flex items-center justify-center ${sizeClasses[size]}`}>
        <span className={`text-[#040405] font-bold ${textSizeClasses[size]}`}>L</span>
      </div>
      <h1 className={`font-bold text-[#040405] font-montserrat ${titleSizeClasses[size]}`}>Lailo</h1>
    </div>
  );
}

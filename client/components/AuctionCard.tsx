import { Heart, Calendar } from "lucide-react";
import { useState } from "react";

interface AuctionCardProps {
  // Data props
  id: string;
  imageUrl?: string;
  title: string;
  subtitle?: string;
  location: string;
  evaluation: string;
  currentBid: string;
  auctioneer: string;
  date: string;
  
  // Optional data
  discount?: string;
  isNew?: boolean;
  isVerified?: boolean;
  
  // Control props
  layout: "vertical" | "horizontal";
  auctionType: "property" | "vehicle";
}

export default function AuctionCard({
  imageUrl,
  title,
  subtitle,
  location,
  evaluation,
  currentBid,
  auctioneer,
  date,
  discount,
  isNew,
  isVerified,
  layout,
  auctionType
}: AuctionCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Função para extrair valor numérico das strings de preço
  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[R$.,\s]/g, '').replace(',', '.'));
  };

  // Calcular cor do valor de praça baseado na comparação com avaliação
  const getBidColor = () => {
    const evaluationValue = parsePrice(evaluation);
    const bidValue = parsePrice(currentBid);

    if (bidValue > evaluationValue) {
      return 'text-[#FF4444]'; // Vermelho para valores acima da avaliação
    } else if (bidValue === evaluationValue) {
      return 'text-[#040405]'; // Preto para valores iguais à avaliação
    } else {
      return 'text-[#28B833]'; // Verde para valores abaixo da avaliação
    }
  };

  // Determinar se deve mostrar badge de desconto (apenas quando bid < evaluation)
  const shouldShowDiscount = () => {
    const evaluationValue = parsePrice(evaluation);
    const bidValue = parsePrice(currentBid);
    return bidValue < evaluationValue && discount;
  };

  // Favorite button component
  const FavoriteButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggleFavorite}
      className={`group transition-all duration-200 hover:scale-110 ${className}`}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 rounded-full ${
          isFavorited
            ? 'text-[#FEDA03] fill-[#FEDA03] stroke-[#FEDA03]'
            : 'text-white stroke-white group-hover:text-[#FEDA03] group-hover:stroke-[#FEDA03]'
        }`}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))'
        }}
        strokeWidth={1.5}
      />
    </button>
  );

  // Verified badge SVG
  const VerifiedBadge = () => (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.78117 1.2431C5.29164 0.252299 6.70826 0.252299 7.21872 1.2431C7.52545 1.83846 8.21742 2.12509 8.8553 1.92099C9.91685 1.58134 10.9186 2.58304 10.5789 3.6446C10.3748 4.28247 10.6614 4.97445 11.2568 5.28117C12.2476 5.79164 12.2476 7.20826 11.2568 7.71872C10.6614 8.02545 10.3748 8.71742 10.5789 9.3553C10.9186 10.4168 9.91685 11.4186 8.8553 11.0789C8.21742 10.8748 7.52545 11.1614 7.21872 11.7568C6.70826 12.7476 5.29164 12.7476 4.78117 11.7568C4.47445 11.1614 3.78247 10.8748 3.1446 11.0789C2.08304 11.4186 1.08134 10.4168 1.42099 9.3553C1.62509 8.71742 1.33846 8.02545 0.743103 7.71872C-0.247701 7.20826 -0.247701 5.79164 0.743103 5.28117C1.33846 4.97445 1.62509 4.28247 1.42099 3.6446C1.08134 2.58304 2.08304 1.58134 3.1446 1.92099C3.78247 2.12509 4.47445 1.83846 4.78117 1.2431Z" fill="#FEDA03"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.44053 4.73984C8.64715 4.93908 8.65313 5.26809 8.45389 5.4747L5.40696 8.63448L3.54795 6.70662C3.34871 6.5 3.35469 6.17099 3.56131 5.97175C3.76793 5.77252 4.09694 5.7785 4.29618 5.98511L5.40696 7.13704L7.70567 4.7532C7.9049 4.54658 8.23391 4.5406 8.44053 4.73984Z" fill="#040405"/>
    </svg>
  );

  // Image placeholder component
  const ImagePlaceholder = ({ className }: { className?: string }) => (
    <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
      {/* Simple image icon placeholder */}
      <div className="flex flex-col items-center justify-center opacity-30">
        <div className="w-8 h-8 mb-2 rounded bg-gray-300 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-3 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Property-specific placeholder elements */}
      {auctionType === "property" && (
        <div className="absolute bottom-2 right-2 opacity-20">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
      )}

      {/* Vehicle-specific placeholder elements */}
      {auctionType === "vehicle" && (
        <div className="absolute bottom-2 right-2 opacity-20">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        </div>
      )}
    </div>
  );

  // Badge components
  const StatusBadges = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`flex items-center gap-1 ${isMobile ? 'gap-1' : 'gap-2'}`}>
      {isNew && (
        <div className={`flex justify-center items-center rounded bg-[#FF5757] shadow-sm ${
          isMobile ? 'min-w-5 px-1 py-[1px]' : 'min-w-5 px-2 py-[2px]'
        }`}>
          <span className={`text-white text-center font-montserrat font-medium ${
            isMobile ? 'text-[12px]' : 'text-[14px]'
          }`}>Novo</span>
        </div>
      )}
      {shouldShowDiscount() && (
        <div className={`flex justify-center items-center rounded bg-[#28B833] shadow-sm ${
          isMobile ? 'min-w-5 px-1 py-[1px]' : 'min-w-5 px-2 py-[2px]'
        }`}>
          <span className={`text-white text-center font-montserrat font-medium ${
            isMobile ? 'text-[12px]' : 'text-[14px]'
          }`}>{discount}</span>
        </div>
      )}
    </div>
  );

  // Footer component
  const Footer = ({ className = "" }: { className?: string }) => (
    <div className={`flex justify-between items-center px-2 py-1.5 rounded bg-[#16161A0A] ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-[#16161A99] font-montserrat text-[13px] font-medium">{auctioneer}</span>
        {isVerified && <VerifiedBadge />}
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4 text-[#16161A] opacity-80" />
        <span className="text-[#16161A99] font-montserrat text-[13px] font-medium">{date}</span>
      </div>
    </div>
  );

  if (layout === "horizontal") {
    // Horizontal Layout - responsive for desktop and mobile
    return (
      <div className="flex flex-col w-full border border-[#16161A14] bg-white rounded-md overflow-hidden p-2 sm:p-[10px]">
        {/* Main horizontal container */}
        <div className="flex items-start gap-2.5 sm:gap-[10px] w-full pb-1.5 sm:pb-0">
          {/* Image Container - replaced with placeholder */}
          <div className="relative w-[105px] sm:w-[195px] lg:w-[189px] h-[105px] sm:h-[120px] lg:h-[130px] flex-shrink-0 rounded overflow-hidden">
            <ImagePlaceholder className="w-full h-full rounded" />

            {/* Badges positioned on image */}
            <div className="absolute top-1.5 left-1.5 z-10">
              <StatusBadges isMobile={true} />
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col justify-between flex-1 min-h-0">
            {/* Header section */}
            <div className="flex flex-col gap-0.5 sm:gap-1 mb-3 sm:mb-4">
              {/* Title and Favorite */}
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#040405] font-montserrat font-bold leading-tight truncate">
                    <span className="text-base sm:text-base lg:text-xl">{title}</span>
                    {subtitle && (
                      <span className="text-sm sm:text-sm lg:text-base text-[#16161A66] ml-1">{subtitle}</span>
                    )}
                  </h3>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="flex-shrink-0 ml-2 p-1 transition-all duration-200 hover:scale-110"
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-200 ${
                      isFavorited
                        ? 'text-[#FEDA03] fill-[#FEDA03] stroke-[#FEDA03]'
                        : 'text-[#040405] stroke-[#040405] hover:text-[#FEDA03] hover:stroke-[#FEDA03]'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              
              {/* Location */}
              <p className="text-[#16161A66] font-montserrat text-xs sm:text-xs font-normal leading-tight">
                {location}
              </p>
            </div>

            {/* Pricing section */}
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[#16161A80] font-montserrat text-sm sm:text-sm font-medium">Avaliado em:</span>
                <span className="text-[#040405] font-montserrat text-base sm:text-sm font-medium">{evaluation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#16161A80] font-montserrat text-sm sm:text-sm font-medium">2ª Praça:</span>
                <span className={`${getBidColor()} font-montserrat text-lg sm:text-lg font-bold`}>{currentBid}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Below on mobile, inline for desktop */}
        <div className="block sm:hidden mt-1.5">
          <Footer />
        </div>
        <div className="hidden sm:block">
          <Footer className="mt-2" />
        </div>
      </div>
    );
  }

  // Vertical Layout - same for desktop and mobile
  return (
    <div className="flex w-full border border-[#16161A14] bg-white p-[10px] rounded-lg overflow-hidden">
      <div className="flex flex-col gap-[10px] flex-1">
        {/* Image Container - replaced with placeholder */}
        <div className="relative h-[200px] self-stretch rounded overflow-hidden">
          <ImagePlaceholder className="w-full h-full rounded" />

          {/* Content overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex justify-between items-start">
            <StatusBadges />
            <FavoriteButton />
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col self-stretch">
          {/* Title section */}
          <div className="flex px-2 pb-4 flex-col self-stretch">
            <div className="flex flex-col gap-1 self-stretch">
              <h3 className="text-[#040405] font-montserrat font-bold leading-[22px]">
                <span className="text-xl sm:text-2xl">{title}</span>
                {subtitle && (
                  <span className="text-base text-[#16161A66] ml-1">{subtitle}</span>
                )}
              </h3>
              <p className="text-[#16161A66] font-montserrat text-[15px] font-normal leading-[15px]">
                {location}
              </p>
            </div>
          </div>

          {/* Pricing section */}
          <div className="flex px-3 pb-3 flex-col self-stretch">
            <div className="flex h-[22px] justify-between items-start self-stretch">
              <span className="text-[#16161A80] font-montserrat text-base font-medium">Avaliado em:</span>
              <span className="text-[#040405] font-montserrat text-base font-medium">{evaluation}</span>
            </div>
            <div className="flex h-[22px] justify-between items-start self-stretch mt-1">
              <span className="text-[#16161A80] font-montserrat text-base font-medium">2ª Praça:</span>
              <span className={`${getBidColor()} font-montserrat text-xl font-bold`}>{currentBid}</span>
            </div>
          </div>

          {/* Footer */}
          <Footer className="mx-2" />
        </div>
      </div>
    </div>
  );
}

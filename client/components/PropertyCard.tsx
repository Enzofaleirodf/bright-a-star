import { Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PropertyCardProps {
  id: string;
  type?: string;
  area?: string;
  location: string;
  evaluation: string;
  currentBid: string;
  discount?: string;
  auction: string;
  date: string;
  auctioneer: string;
  isNew?: boolean;
  isVerified?: boolean;
  viewMode?: "grid" | "list";
  // Vehicle-specific props
  marca?: string;
  modelo?: string;
  year?: string;
}

export default function PropertyCard({
  type,
  area,
  location,
  evaluation,
  currentBid,
  discount,
  auction,
  date,
  auctioneer,
  isNew,
  isVerified,
  viewMode = "grid",
  marca,
  modelo,
  year
}: PropertyCardProps) {
  // Determine if this is a vehicle card
  const isVehicle = marca && modelo;

  // Build title and subtitle based on type
  const title = isVehicle ? `${marca} ${modelo}` : type;
  const subtitle = isVehicle ? year : area;

  if (viewMode === "list") {
    // Horizontal List View
    return (
      <div className="flex flex-col w-full p-2 border border-[#16161A14] bg-white rounded-md overflow-hidden">
        <div className="flex items-start gap-[10px] w-full">
          {/* Compact Image */}
          <div className="w-[95px] p-[6px] rounded bg-[#04040505] flex-shrink-0 self-stretch sm:w-[95px]">
            <div className="flex items-center gap-1">
              {isNew && (
                <div className="flex h-5 min-w-5 px-1 py-[1px] justify-center items-center rounded bg-[#FF5757]">
                  <span className="text-white text-center font-inter text-[10px] font-medium">Novo</span>
                </div>
              )}
              {discount && (
                <div className="flex h-5 min-w-5 px-1 py-[1px] justify-center items-center rounded bg-[#28B833]">
                  <span className="text-white text-center font-inter text-[10px] font-medium">{discount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col justify-between flex-1">
            {/* Header with title and heart */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-[2px]">
                <h3 className="text-[#040405] font-inter text-sm font-bold leading-[22px]">
                  {title}
                </h3>
                <Heart className="w-4 h-4 text-[#040405] stroke-[#040405]" />
              </div>
              <p className="text-[#16161A99] font-inter text-[10px] font-normal leading-[15px] mb-3 sm:mb-4">
                {location}
              </p>

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[#16161A99] font-inter text-xs font-medium">Avaliado em:</span>
                  <span className="text-[#040405] font-inter text-sm font-medium">{evaluation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#16161A99] font-inter text-xs font-medium">2ª Praça:</span>
                  <span className="text-[#28B833] font-inter text-base font-bold">{currentBid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Below the horizontal container */}
        <div className="flex justify-between items-center px-[6px] py-1 rounded bg-[#16161A0A] mt-[6px]">
          <div className="flex items-center gap-1">
            <span className="text-[#16161A99] font-inter text-[10px] font-medium">{auctioneer}</span>
            {isVerified && (
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.78117 1.2431C5.29164 0.252299 6.70826 0.252299 7.21872 1.2431C7.52545 1.83846 8.21742 2.12509 8.8553 1.92099C9.91685 1.58134 10.9186 2.58304 10.5789 3.6446C10.3748 4.28247 10.6614 4.97445 11.2568 5.28117C12.2476 5.79164 12.2476 7.20826 11.2568 7.71872C10.6614 8.02545 10.3748 8.71742 10.5789 9.3553C10.9186 10.4168 9.91685 11.4186 8.8553 11.0789C8.21742 10.8748 7.52545 11.1614 7.21872 11.7568C6.70826 12.7476 5.29164 12.7476 4.78117 11.7568C4.47445 11.1614 3.78247 10.8748 3.1446 11.0789C2.08304 11.4186 1.08134 10.4168 1.42099 9.3553C1.62509 8.71742 1.33846 8.02545 0.743103 7.71872C-0.247701 7.20826 -0.247701 5.79164 0.743103 5.28117C1.33846 4.97445 1.62509 4.28247 1.42099 3.6446C1.08134 2.58304 2.08304 1.58134 3.1446 1.92099C3.78247 2.12509 4.47445 1.83846 4.78117 1.2431Z" fill="#FEDA03"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.44053 4.73984C8.64715 4.93908 8.65313 5.26809 8.45389 5.4747L5.40696 8.63448L3.54795 6.70662C3.34871 6.5 3.35469 6.17099 3.56131 5.97175C3.76793 5.77252 4.09694 5.7785 4.29618 5.98511L5.40696 7.13704L7.70567 4.7532C7.9049 4.54658 8.23391 4.5406 8.44053 4.73984Z" fill="#040405"/>
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.33333 1.3335V4.00016M10.6667 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="#16161A" strokeOpacity="0.8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#16161A99] font-inter text-[10px] font-medium">{date}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="flex w-full align-items-center border border-[#16161A14] bg-white p-[10px] relative rounded-md overflow-hidden">
      <div className="flex flex-col align-items-flex-start gap-[10px] flex-1 relative">
        {/* Image Container */}
        <div className="flex h-[165px] p-[10px] flex-col align-items-flex-start gap-[10px] align-self-stretch bg-[#04040505] relative rounded overflow-hidden">
          <div className="flex justify-between align-items-flex-start align-self-stretch relative">
            <div className="flex w-[162.938px] align-items-center gap-2 relative">
              {isNew && (
                <div className="flex h-5 min-w-5 px-2 py-[2px] justify-center align-items-center rounded border-0 bg-[#FF5757] relative">
                  <span className="text-white text-center font-inter text-[10px] font-medium">Novo</span>
                </div>
              )}
              {discount && (
                <div className="flex h-5 min-w-5 px-2 py-[2px] justify-center align-items-center rounded border-0 bg-[#28B833] relative">
                  <span className="text-white text-center font-inter text-[10px] font-medium">{discount}</span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="w-4 h-4 p-[2px] justify-between align-items-flex-start relative">
              <Heart className="w-4 h-4 text-white stroke-white" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col align-items-flex-start align-self-stretch relative">
          {/* Title Section */}
          <div className="flex px-3 pb-4 flex-col align-items-flex-start align-self-stretch relative">
            <div className="flex flex-col align-items-flex-start gap-1 align-self-stretch relative">
              <div className="flex flex-col align-items-flex-start align-self-stretch relative">
                <h3 className="align-self-stretch text-[#040405] font-inter text-lg font-bold leading-[22px] relative">
                  {title}
                </h3>
              </div>
              <div className="flex align-items-center align-self-stretch relative">
                <div className="flex pr-[6px] flex-col align-items-flex-start relative">
                  <p className="text-[#16161A99] font-inter text-sm font-normal leading-[15px] relative">
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex h-14 px-3 pb-3 flex-col align-items-flex-start align-self-stretch relative">
            <div className="flex h-[22px] justify-between align-items-flex-start flex-shrink-0 align-self-stretch relative">
              <div className="flex w-[86px] flex-col align-items-flex-start relative self-start">
                <span className="align-self-stretch text-[#16161A99] font-inter text-sm font-normal leading-5 relative">
                  Avaliado em:
                </span>
              </div>
              <span className="text-[#040405] font-inter text-sm font-medium leading-[22px] relative w-auto flex-grow-0">
                {evaluation}
              </span>
            </div>
            <div className="flex h-[22px] justify-between align-items-flex-start flex-shrink-0 align-self-stretch relative w-full mt-1">
              <div className="flex max-w-[278.66px] flex-col align-items-flex-start align-self-stretch relative">
                <div className="flex pb-[2px] flex-col align-items-flex-start align-self-stretch relative">
                  <div className="flex flex-col align-items-flex-start relative">
                    <span className="text-[#16161A99] font-inter text-sm font-medium leading-5 relative w-auto self-center">
                      2ª Praça:
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center gap-1 relative">
                <div className="flex flex-col align-items-flex-start relative w-[86px]">
                  <span className="text-[#28B833] font-inter text-lg font-bold leading-[22px] relative w-auto self-center">
                    {currentBid}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex px-3 py-2 flex-col justify-center align-items-flex-start align-self-stretch bg-[#16161A0A] relative rounded overflow-hidden">
            <div className="flex justify-between align-items-flex-start align-self-stretch relative">
              <div className="flex h-[15px] max-w-[208.8px] flex-col align-items-flex-start relative">
                <div className="flex align-items-center relative justify-start w-auto self-center">
                  <div className="flex pr-[6px] flex-col align-items-flex-start relative">
                    <span className="text-[#16161A99] font-inter text-[11px] font-medium leading-[15px] relative">
                      {auctioneer}
                    </span>
                  </div>
                  {isVerified && (
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.78117 1.2431C5.29164 0.252299 6.70826 0.252299 7.21872 1.2431C7.52545 1.83846 8.21742 2.12509 8.8553 1.92099C9.91685 1.58134 10.9186 2.58304 10.5789 3.6446C10.3748 4.28247 10.6614 4.97445 11.2568 5.28117C12.2476 5.79164 12.2476 7.20826 11.2568 7.71872C10.6614 8.02545 10.3748 8.71742 10.5789 9.3553C10.9186 10.4168 9.91685 11.4186 8.8553 11.0789C8.21742 10.8748 7.52545 11.1614 7.21872 11.7568C6.70826 12.7476 5.29164 12.7476 4.78117 11.7568C4.47445 11.1614 3.78247 10.8748 3.1446 11.0789C2.08304 11.4186 1.08134 10.4168 1.42099 9.3553C1.62509 8.71742 1.33846 8.02545 0.743103 7.71872C-0.247701 7.20826 -0.247701 5.79164 0.743103 5.28117C1.33846 4.97445 1.62509 4.28247 1.42099 3.6446C1.08134 2.58304 2.08304 1.58134 3.1446 1.92099C3.78247 2.12509 4.47445 1.83846 4.78117 1.2431Z" fill="#FEDA03"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.44053 4.74033C8.64715 4.93957 8.65313 5.26858 8.45389 5.47519L5.40696 8.63497L3.54795 6.70711C3.34871 6.50049 3.35469 6.17148 3.56131 5.97224C3.76793 5.77301 4.09694 5.77899 4.29618 5.9856L5.40696 7.13753L7.70567 4.75369C7.9049 4.54707 8.23391 4.54109 8.44053 4.74033Z" fill="#040405"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex h-4 align-items-center gap-1 relative w-auto flex-grow-0">
                <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.66536 1.33301V3.99967M10.9987 1.33301V3.99967M2.33203 6.66634H14.332M3.66536 2.66634H12.9987C13.7351 2.66634 14.332 3.26329 14.332 3.99967V13.333C14.332 14.0694 13.7351 14.6663 12.9987 14.6663H3.66536C2.92898 14.6663 2.33203 14.0694 2.33203 13.333V3.99967C2.33203 3.26329 2.92898 2.66634 3.66536 2.66634Z" stroke="#16161A" strokeOpacity="0.8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#16161A99] font-inter text-[11px] font-medium leading-[15px] relative">
                  {date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

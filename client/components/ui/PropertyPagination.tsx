import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./pagination";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems: number;
}

export default function PropertyPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 33,
  totalItems,
}: PropertyPaginationProps) {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex pagination logic for many pages
      if (currentPage <= 3) {
        // Show first few pages: 1,2,3,4 ... last
        for (let i = 1; i <= Math.min(4, totalPages - 1); i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 4) {
          pageNumbers.push("ellipsis");
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages: 1 ... (last-3),last-2,last-1,last
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show current page and neighbors: 1 ... prev,current,next ... last
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-4 py-4 md:py-8 px-4 md:px-0">
      {/* Pagination */}
      <Pagination>
        <PaginationContent className="gap-1 flex-wrap justify-center">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={cn(
                "font-montserrat cursor-pointer",
                "w-8 h-8 md:w-auto md:h-auto",
                "flex items-center justify-center",
                "md:gap-1 md:pl-2.5 md:pr-3 md:px-4",
                "text-xs md:text-sm",
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-[#0404050A]"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden md:inline">Anterior</span>
            </PaginationLink>
          </PaginationItem>

          {/* Page Numbers */}
          {generatePageNumbers().map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(pageNum as number)}
                  isActive={currentPage === pageNum}
                  className={cn(
                    "font-montserrat cursor-pointer text-xs md:text-sm w-8 h-8 md:w-10 md:h-10",
                    currentPage === pageNum
                      ? "bg-[#FEDA03] text-[#040405] border-[#FEDA03] hover:bg-[#E6C603]"
                      : "hover:bg-[#0404050A]"
                  )}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationLink
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={cn(
                "font-montserrat cursor-pointer",
                "w-8 h-8 md:w-auto md:h-auto",
                "flex items-center justify-center",
                "md:gap-1 md:pr-2.5 md:pl-3 md:px-4",
                "text-xs md:text-sm",
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-[#0404050A]"
              )}
            >
              <span className="hidden md:inline">Próxima</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// Import necessário para cn
import { cn } from "@/lib/utils";

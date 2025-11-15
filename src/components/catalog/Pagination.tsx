import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductStore } from "@/stores/productStore";
import { useMemo, useCallback } from "react";

const PaginationFooter: React.FC = () => {
  const page = useProductStore((state) => state.page);
  const total = useProductStore((state) => state.total);
  const limit = useProductStore((state) => state.limit);
  const setPage = useProductStore((state) => state.setPage);
  const totalPages = Math.ceil(total / limit);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const goToPage = useCallback(
    (n: number) => {
      setPage(n);
    },
    [setPage]
  );

  const goPrev = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);

  const goNext = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages, setPage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={goPrev} />
        </PaginationItem>
        {pages.map((n) => (
          <PaginationItem key={n}>
            <PaginationLink
              href="#"
              isActive={page === n}
              onClick={() => goToPage(n)}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && <PaginationEllipsis />}

        <PaginationItem>
          <PaginationNext href="#" onClick={goNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationFooter;

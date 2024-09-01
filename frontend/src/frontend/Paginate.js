// @ts-nocheck
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

function Paginate({ pageNumber, setPageNumber, products }) {
  return (
    <>
      <Pagination className="">
        <PaginationContent className="  hover:cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              className="text-purple-800 hover:text-purple-500"
              onClick={() => {
                if (pageNumber > 0) setPageNumber((prevPage) => +prevPage - 1);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="text-purple-800 hover:text-purple-500"
              onClick={() => {
                if (products.length < 9) return;
                setPageNumber((prevPage) => +prevPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
export default Paginate;

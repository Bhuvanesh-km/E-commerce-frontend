import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const PaginationContext = createContext();

export default function PaginationProvider({ children }) {
  const filterObj = useSelector((store) => store.filter);
  const pageProps = {
    pageSize: filterObj.pageSize,
    pageNumber: filterObj.pageNumber,
  };
  return (
    <PaginationContext.Provider value={pageProps}>
      {children}
    </PaginationContext.Provider>
  );
}

//custom hook
export const usePagination = () => {
  return useContext(PaginationContext);
};

import React, { useEffect, useState, useCallback } from "react";
import SearchBox from "./SearchBox";

import { allForms } from "./Data";
import { OpenLinkIcon } from "../UI/Icons";

const Table = () => {
  const [query, setQuery] = useState("");

  // const [dataExist, setDataExist] = useState(true);

  const [filteredData, setFilteredData] = useState(allForms);

  const handleSearch = useCallback(() => {
    setFilteredData(
      allForms.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      )
    );
  }, [query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, query]);

  //get the screen size and set isMobile
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="flex flex-col justify-between space-y-6 items-center
    w-full max-w-5xl py-10 md:px-2"
    >
      <SearchBox setQuery={setQuery} />
      <table className="table-auto w-full text-left mx-auto min-h-[20rem]">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2 md:w-[25%]">Form</th>
            <th className={`px-4 py-2 md:w-[45%]  ${isMobile ? "hidden" : ""}`}>
              Aciklama
            </th>
            <th className="px-4 py-2 md:w-[10%]">Link</th>
            <th className="px-4 py-2 md:w-[20%]">Kategori</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredData.map((row, index) => (
            <tr key={index} className="bg-slate-50 border-2">
              <td className="border px-2 py-1 md:px-4 md:py-2">{row.name}</td>
              <td
                className={`border px-2 py-1 md:px-4 md:py-2 ${
                  isMobile ? "hidden" : ""
                }`}
              >
                {row.description}
              </td>
              <td className="border px-2 py-1 md:px-4 md:py-2">
                <a href={row.url} className="text-blue-600 flex items-center">
                  Link
                  <OpenLinkIcon />
                </a>
              </td>
              <td className="border px-2 py-1 md:px-4 md:py-2">
                {row.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Table;

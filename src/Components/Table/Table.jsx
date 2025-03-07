import React, { useEffect, useState, useCallback } from "react";
import SearchBox from "./SearchBox";

import { allForms } from "../Constants/Data";
import { OpenLinkIcon } from "../UI/Icons";
import { Categories } from "../Constants/Categories";

const Table = () => {
  const [query, setQuery] = useState("");

  // const [dataExist, setDataExist] = useState(true);

  const [filteredData, setFilteredData] = useState(allForms);

  const [categoryFilter, setCategoryFilter] = useState(Categories[0]);

  const handleCategoryFilter = (str) => {
    if (str == null) str = "Kategori";
    setCategoryFilter(str);

    if (str === "Kategori") setFilteredData(allForms);
    else setFilteredData(allForms.filter((row) => row.category.includes(str)));
  };

  const handleSearch = useCallback(() => {
    setCategoryFilter(Categories[0]);
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

  return (
    <main
      className="flex flex-col justify-between space-y-6 items-center
    w-full max-w-5xl py-10 md:px-2"
    >
      <SearchBox setQuery={setQuery} />
      <table className="table-auto w-full text-left mx-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className={"px-4 py-2 md:w-[70%]"}>
              Açıklama
            </th>
            <th className="px-4 py-2 md:w-[10%]">Link</th>
            <th className="px-4 py-2 md:w-[20%]">
              <div className="flex">
                <select
                  className="text-black w-full bg-gray-100 rounded-lg px-1 font-semibold"
                  id="category-dropdown"
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  value={categoryFilter}
                >
                  {Categories.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {filteredData.map((row, index) => (
            <tr key={index} className="bg-slate-50 border-2">
              <td
                className={"border px-2 py-1 md:px-4 md:py-2"}
              >
                {row.description}
              </td>
              <td className="border px-2 py-1 md:px-4 md:py-2">
                <a href={row.url} target="_blank" className="text-blue-600 flex items-center">
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

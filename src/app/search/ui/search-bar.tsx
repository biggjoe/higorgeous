"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = React.useState<string | any>(null);
  const doSearch = () => {
    if (!query) {
      alert("Type in your query");
      return;
    }

    router.push(`/search/q/${encodeURIComponent(query)}`);
  };
  return (
    <React.Fragment>
      <div className="flex flex-col align-items-center justify-content-center">
        <div className="search-input-cover">
          <input
            type="search"
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Products..."
          />
          {query && query.length > 0 && (
            <button onClick={doSearch}>
              <FaSearch />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/company";
import BasicCompanyCard from "../components/BasicCompanyCard";
import Pagination from "../components/Pagination";

interface SearchResponse {
  page_number: number;
  total_results: number;
  items_per_page: number;
  items: Company[];
}

export default function SearchResults() {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/search?q=${query}&page=${page}`
        );
        const data: SearchResponse = await res.json();
        setResults(data.items || []);
        setTotalResults(data.total_results);
        setItemsPerPage(data.items_per_page);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        setResults([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!results.length)
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
        <p>No results found.</p>
      </div>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>

      <div className="space-y-4 mb-4">
        {results.map((company) => (
          <BasicCompanyCard key={company.company_number} company={company} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalItems={totalResults}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
}

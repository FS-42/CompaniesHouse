import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/company";
import BasicCompanyCard from "../components/BasicCompanyCard";

export default function SearchResults() {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
        const data = await res.json();
        console.log("Fetched data:", data);
        setResults(data.items || []);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((company) => (
            <BasicCompanyCard key={company.company_number} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}

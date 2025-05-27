import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Company } from "../types/company";

export default function SearchResults() {
  const { query } = useParams();
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
        <ul className="space-y-4">
          {results.map((company) => (
            <li key={company.company_number} className="bg-white p-4 rounded shadow">
              <Link to={`/company/${company.company_number}`}>
                <h3 className="text-xl font-semibold text-blue-700 hover:underline">
                  {company.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">{company.description}</p>
              <p className="text-sm">{company.address_snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

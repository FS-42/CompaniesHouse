import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header title="Search UK Companies" />
      <div className="container mt-5 text-center">
        <div className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: "400px", width: "100%",}}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              placeholder="Enter company name..."
              aria-label="Company name"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
              style={{ minWidth: "100px" }}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

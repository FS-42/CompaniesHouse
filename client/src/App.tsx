import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import CompanyDetails from "./pages/CompanyDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/company/:companyNumber" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/company";

export default function CompanyDetails() {
  const { companyNumber } = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/company/${companyNumber}`);
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };

    fetchCompany();
  }, [companyNumber]);

  if (!company) return <div className="text-center mt-10">Loading company data...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{company.title}</h1>
      <p className="mb-2 text-sm text-gray-500">Company Number: {company.company_number}</p>
      <p>Status: {company.company_status}</p>
      <p>Type: {company.company_type}</p>
      <p>Created on: {company.date_of_creation}</p>
      <p className="mt-4 font-semibold">Address:</p>
      <p>
        {company.address?.premises}, {company.address?.address_line_1},{" "}
        {company.address?.address_line_2}, {company.address?.locality},{" "}
        {company.address?.postal_code}, {company.address?.country}
      </p>
    </div>
  );
}

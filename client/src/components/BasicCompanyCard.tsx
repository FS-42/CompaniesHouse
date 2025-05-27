import { Link } from "react-router-dom";
import { Company } from "../types/company";

interface Props {
  company: Company;
}

export default function BasicCompanyCard({ company }: Props) {
  const { title, company_number, company_status, company_type, description, address } = company;

  const formatAddress = () => {
    return [
      address.premises,
      address.address_line_1,
      address.address_line_2,
      address.locality,
      address.region,
      address.postal_code,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <Link to={`/company/${company_number}`} className="text-decoration-none">
          <h5 className="card-title text-primary">{title}</h5>
        </Link>
        <p className="card-text mb-1">{description}</p>
        <p className="card-text">
          <small className="text-muted">Status: {company_status}</small> |{" "}
          <small className="text-muted">Type: {company_type}</small>
        </p>
        <p className="card-text">
          <small>{formatAddress()}</small>
        </p>
      </div>
    </div>
  );
}

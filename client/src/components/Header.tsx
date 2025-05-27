import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 mb-6">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Title */}
        {title === "CompaniesSearch" ? (
          <Link to="/" className="text-primary fw-semibold fs-4 text-decoration-none">
            {title}
          </Link>
        ) : (
          <h1 className="fs-4 fw-semibold m-0">{title}</h1>
        )}

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-primary"
          style={{ whiteSpace: "nowrap" }}
        >
          Home
        </button>
      </div>
    </header>
  );
}

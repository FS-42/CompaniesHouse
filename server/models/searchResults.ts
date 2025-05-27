export interface SearchResults {
    items_per_page: number;
    start_index: number;
    total_results: number;
    kind: string;
    page_number: number;
    items: SearchResultItem[];
  }
  
  export interface SearchResultItem {
    company_number: string;
    company_status: string;
    company_type: string;
    title: string;
    date_of_creation: string;
    description: string;
    description_identifier: string[];
    address_snippet: string;
    snippet: string;
    kind: string;
    links: {
      self: string;
    };
    matches: {
      snippet: string[];
    };
    address: {
      premises?: string;
      address_line_1: string;
      address_line_2?: string;
      locality: string;
      region?: string;
      postal_code: string;
      country: string;
    };
    date_of_cessation?: string;
  }
  
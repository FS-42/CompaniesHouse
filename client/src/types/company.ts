export interface Address {
    premises?: string;
    locality?: string;
    address_line_1?: string;
    address_line_2?: string;
    postal_code?: string;
    country?: string;
    region?: string;
  }
  
  export interface Company {
    company_number: string;
    company_status: string;
    company_type: string;
    date_of_creation: string;
    description: string;
    title: string;
    address_snippet: string;
    address: Address;
    links: {
      self: string;
    };
  }
  
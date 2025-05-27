import { Router, Request, Response } from "express";
import axios from "axios";
import { SearchResults } from "../models/searchResults";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query.q;
  const pageParam = req.query.page;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Missing or invalid 'q' parameter" });
    return;
  }

  // Default page number to 1
  let page = 1;
  if (pageParam) {
    if (typeof pageParam === "string") {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        page = parsedPage;
      }
    }
  }

  const apiBase = process.env.API;
  const apiKey = process.env.API_KEY;

  if (!apiBase || !apiKey) {
    res.status(500).json({ error: "API base or API key is not configured" });
    return;
  }

  // Assuming 20 items per page, calculate start index
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;

  const url = `${apiBase}/search/companies?q=${encodeURIComponent(query)}&start_index=${startIndex}`;

  try {
    const response = await axios.get<SearchResults>(url, {
      auth: {
        username: apiKey,
        password: "",
      },
    });

    const searchResults: SearchResults = response.data;
    res.json(searchResults);
  } catch (error: any) {
    console.error("Error calling Companies House API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

export default router;

import { Router, Request, Response } from "express";
import axios from "axios";
import { SearchResults } from "../models/searchResults";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query.q;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Missing or invalid 'q' parameter" });
    return;
  }

  const apiBase = process.env.API;
  const apiKey = process.env.API_KEY;

  console.log("API", apiBase);
  console.log("KEY", !!apiKey);

  if (!apiBase || !apiKey) {
    res.status(500).json({ error: "API base or API key is not configured" });
    return;
  }

  const url = `${apiBase}/search/companies?q=${encodeURIComponent(query)}`;

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

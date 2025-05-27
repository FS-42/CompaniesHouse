import { Router, Request, Response } from "express";
import axios from "axios";
import { CompanyDetails } from "../models/companyDetails";

const router = Router();

router.get("/:companyNumber", async (req: Request, res: Response) => {
  const { companyNumber } = req.params;

  if (!companyNumber) {
    res.status(400).json({ error: "Missing company number" });
  return
  }

  const apiBase = process.env.API;
  const apiKey = process.env.API_KEY;

  if (!apiBase || !apiKey) {
    res.status(500).json({ error: "API base or API key is not configured" });
    return
  }

  const url = `${apiBase}/company/${companyNumber}`;

  try {
    const response = await axios.get<CompanyDetails>(url, {
      auth: {
        username: apiKey,
        password: "",
      },
    });

    const companyData: CompanyDetails = response.data;
    res.json(companyData);
  } catch (error: any) {
    console.error("Error fetching company details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch company details" });
  }
});

export default router;

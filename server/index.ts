import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import searchRouter from './routes/search';
import companyDetailsRouter from './routes/companyDetails'



console.log("API base:", process.env.API);
console.log("API key:", process.env.API_KEY ? "✔️ Loaded" : "❌ Missing");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/search', searchRouter);

app.use('/api/company', companyDetailsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

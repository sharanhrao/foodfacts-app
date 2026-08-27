import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let threads = [
  {
    id: 3,
    title: "Welcome to Threadbase",
    body: "This is the first thread in the demo.",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "TanStack Query",
    body: "Queries read data; mutations write data.",
    createdAt: new Date(Date.now() - 60000).toISOString()
  },
  {
    id: 1,
    title: "Getting started",
    body: "Try creating your first thread.",
    createdAt: new Date(Date.now() - 120000).toISOString()
  }
];

app.get("/api/threads", (_req, res) => {
  res.json(threads);
});

app.post("/api/threads", (req, res) => {
  const { title, body } = req.body ?? {};

  if (!title?.trim()) {
    return res.status(400).json({ message: "Title is required." });
  }

  if (!body?.trim()) {
    return res.status(400).json({ message: "Body is required." });
  }

  const thread = {
    id: Date.now(),
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString()
  };

  threads = [thread, ...threads];
  return res.status(201).json(thread);
});

app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
});
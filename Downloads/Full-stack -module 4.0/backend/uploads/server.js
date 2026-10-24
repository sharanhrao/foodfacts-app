
import express from "express";
import cors from "cors";
import multer from "multer";

import upload from "./config/upload.js";
import { verifyToken } from "./middleware/auth.js";
import notificationRoutes from "./routes/notification.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded images from the uploads folder
app.use("/uploads", express.static("uploads"));

// Notification routes
app.use("/api/notification", notificationRoutes);

// Home route to check if the server is running
app.get("/", (req, res) => {
  res.send("Threadbase server is running!");
});

// Upload a single avatar image
app.post(
  "/api/upload",
  verifyToken,
  upload.single("avatar"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const url = `/uploads/${req.file.filename}`;

    return res.status(201).json({
      message: "Image uploaded successfully",
      url,
      filename: req.file.filename,
    });
  }
);

// Handle Multer and file-filter errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File too large. Maximum size is 5 MB.",
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      error: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "Internal server error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
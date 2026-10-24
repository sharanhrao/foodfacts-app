import express from "express";

const router = express.Router();
const clients = new Map();

router.get("/stream", (req, res) => {
    // 1. Set up the SSE connection
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    // 2. Save the connected user's response
    const userId = req.user.userId;
    clients.set(userId, res);

    // 3. Remove the connection when it closes
    req.on("close", () => {
        clients.delete(userId);
    });
});

// 4. Send a notification to one user
export function notifyUser(userId, message) {
    const res = clients.get(userId);

    if (res) {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    }
}

export default router;
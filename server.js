// server.ts
import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(express.json());
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Clinique M\xE9dicale Le Grand Centre - API Backend Node.js",
      uptime: process.uptime(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/info", (_req, res) => {
    res.json({
      name: "Clinique M\xE9dicale Le Grand Centre",
      phone: "+225 27 22 55 00 00",
      emergencyPhone: "+225 07 07 11 22 33",
      address: "Boulevard Hassan II, Carrefour du Grand Centre, Cocody, Abidjan",
      hours: {
        weekdays: "07h30 - 20h00",
        saturday: "08h00 - 18h00",
        emergencies: "24h/24 & 7j/7"
      }
    });
  });
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs requis manquants (nom, email, message)." });
    }
    console.log("[API Contact re\xE7u]", { name, email, phone, subject, message, date: (/* @__PURE__ */ new Date()).toISOString() });
    return res.status(200).json({
      success: true,
      message: "Votre message a bien \xE9t\xE9 transmis au secr\xE9tariat de la clinique."
    });
  });
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F3E5} Serveur Full-Stack d\xE9marr\xE9 sur http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Erreur d\xE9marrage serveur:", err);
});

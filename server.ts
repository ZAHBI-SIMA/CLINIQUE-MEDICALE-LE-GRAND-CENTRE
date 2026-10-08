import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Backend API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Clinique Médicale Le Grand Centre - API Backend Node.js',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // API Route: Clinic Info
  app.get('/api/info', (_req: Request, res: Response) => {
    res.json({
      name: 'Clinique Médicale Le Grand Centre',
      phone: '+225 27 22 55 00 00',
      emergencyPhone: '+225 07 07 11 22 33',
      address: 'Boulevard Hassan II, Carrefour du Grand Centre, Cocody, Abidjan',
      hours: {
        weekdays: '07h30 - 20h00',
        saturday: '08h00 - 18h00',
        emergencies: '24h/24 & 7j/7',
      },
    });
  });

  // API Route: Contact message
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, phone, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Champs requis manquants (nom, email, message).' });
    }
    console.log('[API Contact reçu]', { name, email, phone, subject, message, date: new Date().toISOString() });
    return res.status(200).json({
      success: true,
      message: 'Votre message a bien été transmis au secrétariat de la clinique.',
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏥 Serveur Full-Stack démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Erreur démarrage serveur:', err);
});

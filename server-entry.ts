import { createApp } from './server';

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  const app = await createApp();

  app.listen(PORT, HOST, () => {
    console.log(`AP Visual House server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start AP Visual House server:', error);
  process.exit(1);
});

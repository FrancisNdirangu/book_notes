import app from "./app.js";
import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
const port = 3000;

let server;

async function startServer() {
  try {
    await connectDatabase();

    server = app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Could not start appllication:");
    console.error(error);

    process.exit(1);
  }
}

async function shutdownServer(signal) {
  console.log(` Received ${signal}. Shutting down server`);

  if (!server) {
    await disconnectDatabase();
    process.exit(0);
  }

  server.close(async () => {
    try {
      await disconnectDatabase();
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:");
      console.error(error);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => {
  shutdownServer("SIGINT");
});

process.on("SIGTERM", () => {
  shutdownServer("SIGTERM");
});

startServer();

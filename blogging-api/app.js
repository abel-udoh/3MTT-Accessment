const { connectToDatabase } = require('./db');

async function startServer() {
  try {
    await connectToDatabase();
    // Start your Express server or perform other actions
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

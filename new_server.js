import app from "./app.js";
import "dotenv/config";

app.listen(process.env.DB_PORT, () => {
  console.log(`Server running on port: ${process.env.DB_PORT}`);
});

import './bootstrap.js';
import config from './config/config.js';
import connectDB from './db/index.js';
import { app } from './app.js';

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Server error:", err);
    });
    app.listen(config.get("PORT"), () => {
        console.log(`Server is running on port ${config.get("PORT")}`);
    });
  })

  .catch((error) => {
    console.warn("MONGODB db connection failed !!!", error.message);
    console.log("MONGODB db connection failed !!!", error);
  });

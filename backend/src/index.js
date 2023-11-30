import app from "./app.js";
import { config } from './config/config.js';
import { startConnection } from "./database.js";

app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log('Server is running on port: http://localhost:' + config.port);
});

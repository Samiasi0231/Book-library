import { app } from "./app";
import { env } from "./utils/config";

app.listen(env.PORT, () => {
  console.log(`\n Adé Atelier API listening on http://localhost:${env.PORT}`);
  console.log(` Swagger docs available at http://localhost:${env.PORT}/api-docs\n`);
});

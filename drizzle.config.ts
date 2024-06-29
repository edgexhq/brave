import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://brave_owner:b2ESJDROP3UK@ep-twilight-meadow-a16ubgib-pooler.ap-southeast-1.aws.neon.tech/brave_db?sslmode=require",
  },
});

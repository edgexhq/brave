/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:2ekGRyms8AML@ep-dark-forest-a5qvmdfx.us-east-2.aws.neon.tech/neondb?sslmode=require',

    }
  };
  

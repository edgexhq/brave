import { boolean, integer, pgTable, serial, text, varchar,} from "drizzle-orm/pg-core";

// ai mock interview tables
export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

// ai form generator tables
export const JsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  enabledSignIn: boolean("enabledSignIn").default(false),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("anonymus"),
  createdAt: varchar("createdAt").notNull(),
  formRef: integer("formRef").references(() => JsonForms.id),
});


export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData"),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug"),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});

export const UserSubscription = pgTable("userSubscription", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  userName: varchar("userName"),
  active: boolean("active"),
  paymentId: varchar("paymentId"),
  joinDate: varchar("joinData"),
});

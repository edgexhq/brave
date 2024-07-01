import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { desc, eq } from "drizzle-orm";
import FormListItem from "./FormListItem";
import { currentUser } from "@clerk/nextjs/server";
import CreateForm from "./CreateForm";

async function FormList() {
  const user = await currentUser();

  const formList = await db
    .select()
    .from(JsonForms)
    .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(JsonForms.id));
  return (
    <div className="py-10 px-4">
      <h2 className="font-bold text-3xl">Your Forms</h2>
      <div className="mt-5 flex flex-row flex-wrap gap-5">
        {formList.length > 0 ? (
          formList.map((form) => (
            <FormListItem
              key={form.id}
              formRecord={form}
              jsonForm={form.jsonform}
            />
          ))
        ) : (
          <div className=" text-muted-foreground space-y-2">
            <p>You have not created any forms yet.</p>
            <CreateForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormList;

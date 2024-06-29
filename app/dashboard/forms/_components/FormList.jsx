"use client";
import { db } from "@/app/configs";
import { JsonForms } from "@/app/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  useEffect(() => {
    user && GetFormList();
  }, [user]);
  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
    console.log(result);
  };

  return (
    <div className="py-10 px-4">
      <h2 className="font-bold text-3xl">Your Forms</h2>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {formList.map((form, index) => (
          <div key={index}>
            <FormListItem
              jsonForm={JSON.parse(form.jsonform)}
              formRecord={form}
              refreshData={GetFormList}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormList;

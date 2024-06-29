"use client";

import FormUi from "@/components/forms/edit-form/FormUi";
import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LiveAiForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);

  useEffect(() => {
    params && GetFormData();
  }, [params]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(params?.formid)));

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    console.log(result);
  };
  return (
    <div
      className="p-10 flex h-full w-full justify-center items-center"
      style={{
        backgroundImage: record?.background,
      }}
    >
      {record && (
        <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log}
          deleteField={() => console.log}
          selectedStyle={JSON.parse(record?.style)}
          selectedTheme={record?.theme}
          editable={false}
          formId={record.id}
          enabledSignIn={record?.enabledSignIn}
        />
      )}
      <Link
        className="flex gap-2 items-center bg-zinc-800/30 backdrop-blur-md text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer text-xs"
        href={"/"}
      >
        Made using Brave{" "}
        <Image src={"/logo-base-256x256.png"} width={26} height={26} />
      </Link>
    </div>
  );
}

export default LiveAiForm;

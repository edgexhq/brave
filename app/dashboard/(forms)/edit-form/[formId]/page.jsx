"use client";

import { Button } from "@/components/ui/button";
import Controller from "@/components/forms/edit-form/Controller";
import FormUi from "@/components/forms/edit-form/FormUi";
import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user]);
  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    console.log(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedBackground(result[0].background);
    setSelectedTheme(result[0].theme);
    setSelectedStyle(JSON.parse(result[0].style));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast.success("Updated");
    console.log(result);
  };

  const deleteField = (indexToRemove) => {
    const result = jsonForm.fields.filter(
      (item, index) => index != indexToRemove
    );

    jsonForm.fields = result;
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    console.log(value, columnName);
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: value,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });
    if (result) toast.success("Updated!!!");
  };

  return (
    <>
      <div className="w-full h-full mb-8 flex flex-col gap-8 md:p-5">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              onClick={() => router.push("/dashboard/forms")}
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </Button>
            <div className="flex gap-2">
              <Link href={"/aiform/" + record?.id} target="_blank">
                <Button className="flex gap-2">
                  <SquareArrowOutUpRight className="h-5 w-5" /> Live Preview
                </Button>
              </Link>
              <RWebShare
                data={{
                  text:
                    jsonForm?.formHeading +
                    " , Build your form in seconds with AI form Builder ",
                  url:
                    process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
                  title: jsonForm?.formTitle,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
                  <Share2 /> Share
                </Button>
              </RWebShare>
            </div>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
            <div className="p-5 border rounded-lg shadow-md">
              <Controller
                selectedTheme={(value) => {
                  updateControllerFields(value, "theme");
                  setSelectedTheme(value);
                }}
                selectedBackground={(value) => {
                  updateControllerFields(value, "background");

                  setSelectedBackground(value);
                }}
                selectedStyle={(value) => {
                  setSelectedStyle(value);
                  updateControllerFields(value, "style");
                }}
                setSignInEnable={(value) => {
                  updateControllerFields(value, "enabledSignIn");
                }}
              />
            </div>
            <div
              className="md:col-span-2 border rounded-lg p-5
             flex items-center justify-center"
              style={{
                backgroundImage: selectedBackground,
              }}
            >
              <FormUi
                jsonForm={jsonForm}
                selectedTheme={selectedTheme}
                selectedStyle={selectedStyle}
                onFieldUpdate={onFieldUpdate}
                deleteField={(index) => deleteField(index)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditForm;

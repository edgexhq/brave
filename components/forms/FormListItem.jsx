"use client";
import { Button } from "@/app/components/ui/button";
import { Edit, Share, Trash } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { db } from "@/lib/utils/db";
import { JsonForms } from "@/lib/utils/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";
import { useUser } from "@clerk/nextjs";

function FormListItem({ formRecord, jsonForm }) {
  const { user } = useUser();
  const onDeleteForm = async () => {
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    if (result) {
      toast.success("Form Deleted!!!");
      if (typeof window !== "undefined") window.location.reload();
    }
  };
  jsonForm = JSON.parse(jsonForm);
  return (
    <div className="border hover:scale-105 transition-all hover:border-primary duration-300 hover:shadow-md shadow-sm rounded-lg p-4 pr-6">
      <div className="flex justify-between">
        <h2></h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-400 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="text-lg text-black font-semibold line-clamp-1">
        {jsonForm?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-500 line-clamp-1 pb-4">
        {jsonForm?.formHeading || "A Form"}
      </h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between">
        <RWebShare
          data={{
            text:
              jsonForm?.formHeading +
              " , Build your form in seconds with AI form Builder ",
            url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord?.id,
            title: jsonForm?.formTitle,
          }}
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            <Share size={17} /> Share
          </Button>
        </RWebShare>
        <a href={"/dashboard/edit-form/" + formRecord?.id}>
          <Button className="flex gap-2" size="sm">
            <Edit size={17} /> Edit
          </Button>
        </a>
      </div>
    </div>
  );
}

export default FormListItem;

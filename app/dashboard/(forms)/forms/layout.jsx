"use client";

import FormList from "@/components/forms/FormList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignedIn } from "@clerk/clerk-react";
import React, { Suspense } from "react";
import Responses from "./responses/page";
import CreateForm from "@/components/forms/CreateForm";

function DashboardLayout() {
  return (
    <SignedIn>
      <div className="w-full flex justify-between">
        <Tabs defaultValue="Forms" className="w-full">
          <TabsList>
            <TabsTrigger value="Forms">Forms</TabsTrigger>
            <TabsTrigger value="Responses">Responses</TabsTrigger>
          </TabsList>
          <TabsContent value="Forms">
            <Suspense fallback={"Loading"}>
              <FormList />
            </Suspense>
          </TabsContent>
          <TabsContent value="Responses">
            <Suspense fallback={"Loading"}>
              <Responses />
            </Suspense>
          </TabsContent>
        </Tabs>
        <CreateForm />
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;

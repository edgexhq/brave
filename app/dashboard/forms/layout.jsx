"use client";
import { SignedIn } from "@clerk/clerk-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Responses from "./responses/page";
import FormList from "./_components/FormList";

function DashboardLayout() {
  return (
    <SignedIn>
      <div className="w-full">
        <Tabs defaultValue="Forms" className="w-full">
          <TabsList>
            <TabsTrigger value="Forms">Forms</TabsTrigger>
            <TabsTrigger value="Responses">Responses</TabsTrigger>
          </TabsList>
          <TabsContent value="Forms">
            <FormList />
          </TabsContent>
          <TabsContent value="Responses">
            <Responses />
          </TabsContent>
        </Tabs>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;

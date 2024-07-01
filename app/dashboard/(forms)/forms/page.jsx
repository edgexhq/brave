import FormList from "@/components/forms/FormList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import Responses from "./responses/page";
import CreateForm from "@/components/forms/CreateForm";
import PulsatingDots from "@/components/ui/LoadingAnimation";

function DashboardLayout() {
  return (
      <div className="w-full flex justify-between">
        <Tabs defaultValue="Forms" className="w-full">
          <TabsList>
            <TabsTrigger value="Forms">Forms</TabsTrigger>
            <TabsTrigger value="Responses">Responses</TabsTrigger>
          </TabsList>
          <TabsContent value="Forms">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-60 w-full">
                  <PulsatingDots />
                </div>
              }
            >
              <FormList />
            </Suspense>
          </TabsContent>
          <TabsContent value="Responses">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-60 w-full">
                  <PulsatingDots />
                </div>
              }
            >
              <Responses />
            </Suspense>
          </TabsContent>
        </Tabs>
        <CreateForm />
      </div>
  );
}

export default DashboardLayout;

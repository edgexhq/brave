import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowRight, Speech, TableProperties } from "lucide-react";
import Welcome from "@/components/Welcome";
import Link from "next/link";
import TemplateCard from "@/components/content/TemplateCard";
import Templates from "@/app/(data)/Templates";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <>
      <div className="w-full flex flex-col gap-8 md:p-5">
        <Suspense
          fallback={
            <div className="min-h-20 bg-secondary w-full p-10">Loading...</div>
          }
        >
          <Welcome />
        </Suspense>
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:-translate-y-1 duration-500 transition-all border border-purple-500">
            <CardHeader className="flex gap-4">
              <Speech size={50} />
              <div>
                <CardTitle>AI Mock Interview ✨</CardTitle>
                <CardDescription>
                  Practice your interview skills with AI feedback.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button size={"sm"} asChild>
                <Link href="/dashboard/interview">
                  Prepare <ArrowRight size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-1 duration-500 transition-all border border-cyan-500">
            <CardHeader className="flex gap-4">
              <TableProperties size={50} />
              <div>
                <CardTitle>AI Forms ✨</CardTitle>
                <CardDescription>
                  Create full fledged forms within seconds with AI.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild size={"sm"}>
                <Link href="/dashboard/forms">
                  Create
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-semibold py-2 text-zinc-700">
            Trending Tools :
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10 mb-12">
            {/* @ts-ignore */}
            {Templates.slice(0, 8).map((item: TEMPLATE) => (
              <TemplateCard {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

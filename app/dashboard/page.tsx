import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChartIcon,
  BriefcaseIcon,
  FileTextIcon,
  Speech,
  TableProperties,
  UsersIcon,
} from "lucide-react";
import Welcome from "@/components/Welcome";
import Link from "next/link";
type Props = {};

export default function Dashboard({}: Props) {
  return (
    <>
      <div className="w-full bg-muted/40 flex flex-col gap-8 md:p-8">
        <Suspense
          fallback={
            <div className="min-h-20 bg-secondary w-full p-10">Loading...</div>
          }
        >
          <Welcome />
        </Suspense>
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex items-center gap-4">
                <BriefcaseIcon className="w-8 h-8" />
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Manage your ongoing projects and initiatives.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button size={"sm"} variant={"secondary"}>
                  View Projects
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-4">
                <UsersIcon className="w-8 h-8" />
                <div>
                  <CardTitle>Team</CardTitle>
                  <CardDescription>
                    Stay connected with your team members.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button size={"sm"} variant={"secondary"}>
                  View Team
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-4">
                <FileTextIcon className="w-8 h-8" />
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Access and manage your important documents.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button size={"sm"} variant={"secondary"}>
                  View Documents
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-4">
                <BarChartIcon className="w-8 h-8" />
                <div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Gain insights into your data and performance.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button size={"sm"} variant={"secondary"}>
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

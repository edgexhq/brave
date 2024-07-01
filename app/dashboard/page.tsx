import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowRight,
  BotMessageSquare,
  Loader2,
  MailPlus,
  Speech,
  TableProperties,
} from "lucide-react";
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
            <div className="bg-gradient-to-l from-cyan-300 via-blue-500 to-purple-500 text-white relative group overflow-hidden rounded-lg transition-all hover:shadow min-h-36 sm:min-h-52">
              <Loader2 size={50} className="mx-auto animate-spin mt-20" />
            </div>
          }
        >
          <Welcome />
        </Suspense>
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="hover:-translate-y-1 shadow hover:shadow-blue-500/40 hover:shadow-md duration-500 transition-all border border-purple-500">
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
          <Card className="hover:-translate-y-1 shadow hover:shadow-blue-500/40 hover:shadow-md duration-500 transition-all border border-cyan-500">
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
          <Card className="hover:-translate-y-1 shadow hover:shadow-blue-500/40 hover:shadow-md duration-500 transition-all border border-blue-500">
            <CardHeader className="flex gap-4">
              <BotMessageSquare size={50} />
              <div>
                <CardTitle>AI Chatbot ✨</CardTitle>
                <CardDescription>
                  Talk , discuss and get help from AI Chatbot.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button size={"sm"} asChild>
                <Link href="/dashboard/interview">
                  Chat <ArrowRight size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-1 shadow hover:shadow-blue-500/40 hover:shadow-md duration-500 transition-all border border-violet-500">
            <CardHeader className="flex gap-4">
              <MailPlus size={50} />
              <div>
                <CardTitle>AI Emailer ✨</CardTitle>
                <CardDescription>
                  Send Emails to multiple persons with AI generated content.
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

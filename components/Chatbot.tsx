"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Copy, Loader2, Plane, Send, Sparkle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const inter = Space_Grotesk({ subsets: ["latin"] });

const Chatbox = () => {
  const { user } = useUser();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex pb-0.5 w-full flex-col max-w-5xl mx-auto h-[85vh]">
      <div className="flex-1 overflow-y-auto rounded-lg bg-secondary/80 p-4 text-sm leading-6 text-zinc-900 dark:bg-zinc-800/60 dark:text-zinc-300 sm:text-base sm:leading-7 border border-blue-600/20 h-full">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? (
                <div className="flex flex-row px-2 py-4 sm:px-4">
                  <Image
                    alt="user"
                    className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                    src={user?.imageUrl || "https://via.placeholder.com/150"}
                    width={30}
                    height={30}
                  />

                  <div
                    className={cn(
                      inter.className,
                      "flex max-w-3xl items-center"
                    )}
                  >
                    <p>{m.content}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex rounded-xl bg-zinc-50 px-2 py-6 dark:bg-zinc-900 sm:px-4 relative">
                  <Image
                    alt="groq"
                    className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                    src="/logo-base-32x32.png"
                    width={30}
                    height={30}
                  />

                  <div
                    className={cn(
                      inter.className,
                      "max-w-3xl rounded-xl markdown-body w-full overflow-x-auto"
                    )}
                  >
                    <Markdown>{m.content}</Markdown>
                  </div>
                  <Button
                    type="button"
                    title="copy"
                    variant={"secondary"}
                    size={"icon"}
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(m.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xl md:text-2xl py-10 px-2 font-semibold text-center m-auto text-gray-500 dark:text-gray-400 tracking-wide">
              Start Chatting with
              <br />
              <span
                className={cn(
                  "text-blue-500 text-2xl md:text-4xl",
                  inter.className
                )}
              >
                Brave
              </span>
              .AI Now!
            </p>
            <Image
              src="/Interview-cuate.svg"
              id="pic"
              alt="ROBO"
              width={300}
              height={300}
              className="hover:scale-110 transition-all duration-500 active:scale-95"
            />
          </div>
        )}
        {isLoading && (
          <div className="flex items-center gap-2 px-10">
            <span>Generating...</span>
            <Sparkles size={18} className="animate-pulse" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="mt-2" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          enter your prompt
        </label>
        <div className="relative">
          <Textarea
            id="chat-input"
            className={inter.className}
            placeholder="enter your prompt"
            rows={1}
            value={input}
            required
            onChange={handleInputChange}
          ></Textarea>
          <Button
            title="submit"
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2"
          >
            {isLoading ? (
              <div>
                Loading
                <Loader2 className="animate-spin ml-2" size={18} />
              </div>
            ) : (
              <div>
                Send <Send className="ml-2 inline-flex" size={18} />
              </div>
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;

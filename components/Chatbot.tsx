"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
      <div className="flex-1 overflow-y-auto rounded-xl bg-neutral-200 p-4 text-sm leading-6 text-neutral-900 dark:bg-neutral-800/60 dark:text-neutral-300 sm:text-base sm:leading-7 border border-blue-600/20 h-full">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? (
                <div className="flex flex-row px-2 py-4 sm:px-4">
                  <Image
                    alt="user"
                    className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                    src={user?.imageUrl || "https://via.placeholder.com/150"}
                    width={32}
                    height={32}
                  />

                  <div className="flex max-w-3xl items-center">
                    <p>{m.content}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex rounded-xl bg-neutral-50 px-2 py-6 dark:bg-neutral-900 sm:px-4 relative">
                  <Image
                    alt="groq"
                    className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                    src="/logo-base-32x32.png"
                    width={32}
                    height={32}
                  />

                  <div className="max-w-3xl rounded-xl markdown-body w-full overflow-x-auto">
                    <Markdown>{m.content}</Markdown>
                  </div>
                  <button
                    type="button"
                    title="copy"
                    className="absolute top-2 right-2 p-2 rounded-full bg-blue-500 dark:bg-neutral-800 transition-all active:scale-95 opacity-50 hover:opacity-75"
                    onClick={() => {
                      navigator.clipboard.writeText(m.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    {/* <Image src={copy} alt="copy" width={19} className="" /> */}
                    <Copy size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xl md:text-2xl py-10 px-2 font-semibold text-center m-auto text-stone-500 dark:text-stone-400 tracking-wide">
              Start Chatting with
              <br />
              <span className="text-blue-500 text-2xl md:text-4xl">Brave</span>
              .AI Now!
            </p>
             <Image
              src='/Job hunt-rafiki.svg'
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
            {/* <Image
              src={sparkles}
              alt="Loading"
              width={22}
              className="animate-pulse"
            /> */}
            <span>Generating...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="mt-2" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Enter your prompt
        </label>
        <div className="relative">
          <textarea
            id="chat-input"
            className="block caret-blue-600 w-full resize-none rounded-xl border-none bg-neutral-200 p-4 pl-12 pr-20 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-500 sm:text-base"
            placeholder="Enter your prompt"
            rows={1}
            value={input}
            required
            onChange={handleInputChange}
          ></textarea>
          <button
            title="submit"
            type="submit"
            disabled={isLoading}
            className="absolute bottom-2 right-2.5 rounded-lg  px-4 py-2 text-sm font-medium text-neutral-200 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base flex items-center gap-2 active:scale-95 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>Send </>
            )}
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;

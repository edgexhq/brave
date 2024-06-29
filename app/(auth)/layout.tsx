import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-zinc-800">
      {children}
    </div>
  );
}

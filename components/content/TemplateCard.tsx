import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div
        className={cn(
          "p-5 shadow rounded-lg border flex flex-col gap-3 cursor-pointer h-full hover:scale-105 duration-500 transition-all",
          Math.random() > 0.5
            ? "border-cyan-400"
            : "border-purple-400"
        )}
      >
        <Image src={item.icon} alt="icon" width={50} height={50} />
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-sm text-gray-500 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;

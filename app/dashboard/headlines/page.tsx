"use client";

import Image from "next/image";
import Link from "next/link";
import { headlines } from "./headlines";

const page = () => {

  return (
    <div className="w-full flex flex-col gap-8 md:p-5">
      <div className="bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 p-10 rounded-lg mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-x-10 gap-y-4">
          <div>
            <h2 className="font-bold text-3xl text-white mb-2">
              all the latest news about jobs.
            </h2>
            <h2 className="text-gray-200">
              Stay informed with the latest news about jobs and employment.
            </h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {headlines.map((news: any, index: number) => {
          return (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={news.urlToImage || "https://picsum.photos/600/400"}
                alt="News Article"
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs text-muted-foreground">
                    Published on{" "}
                    {
                      //2024-05-31T03:47:39Z to ISO date format
                      new Date(news.publishedAt).toISOString().split("T")[0]
                    }
                  </span>
                </div>
                <Link href={news.url}>
                  <h3 className="text-xl font-semibold line-clamp-2 mb-2">
                    {news.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {news.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

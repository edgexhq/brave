"use client";

import Image from "next/image";
import Link from "next/link";
import { headlines } from "./headlines";


const page = () => {
    
    return (
        <div className="container mx-auto px-4 pb-12 md:px-6 lg:pb-16">
            <h2 className="text-blue-500 font-medium text-xl pt-3 pb-5">Updated Job News {new Date().toLocaleDateString()}</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {headlines.map((news: any, index: number) => {
                    return (
                        <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={news.urlToImage ||"https://picsum.photos/600/400"}
                                alt="News Article"
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center mb-2">
                                    <span className="text-sm text-muted-foreground">
                                        Published on{" "}
                                        {
                                            //2024-05-31T03:47:39Z to ISO date format
                                            new Date(news.publishedAt).toISOString().split("T")[0]
                                        }
                                    </span>
                                </div>
                                <Link href={news.url}>
                                    <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                </Link>
                                <p className="text-muted-foreground line-clamp-4">{news.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default page

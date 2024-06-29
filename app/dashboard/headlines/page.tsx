"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NewsProps {
    urlToImage: string;
    title: string;
    description: string;
    publishedAt: string;
    url: string;
}



const page = () => {
    const [newsData, setNewsData] = useState([]);
    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/everything?q=jobs&apiKey=04bfb74e23534465b7e4be3ca86f130e"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.articles);
                setNewsData(data.articles);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {newsData.map((news: NewsProps, index: number) => {
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

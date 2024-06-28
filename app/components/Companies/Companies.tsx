"use client";
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";

// IMAGES DATA FOR CAROUSEL
interface Data {
  imgSrc: string;
}

const data: Data[] = [
  {
    imgSrc: "/assets/carousel/google.svg",
  },
  {
    imgSrc: "/assets/carousel/garnier.png",
  },
  {
    imgSrc: "/assets/carousel/slack.png",
  },
  {
    imgSrc: "/assets/carousel/udemy.png",
  },
  {
    imgSrc: "/assets/carousel/google.svg",
  },
  {
    imgSrc: "/assets/carousel/garnier.png",
  },
  {
    imgSrc: "/assets/carousel/slack.png",
  },
  {
    imgSrc: "/assets/carousel/udemy.png",
  },
];

// CAROUSEL SETTINGS
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
      ],
    };

    return (
      <div className="text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-14">
            {/* @ts-expect-error */}
            <Slider {...settings}>
              {data.map((item, i) => (
                <div key={i}>
                  <Image
                    src={item.imgSrc}
                    alt={item.imgSrc}
                    width={150}
                    height={150}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

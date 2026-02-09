"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide, Pagination } from "@/components/ui/swiper";
import SectionTitle from "./SectionTitle";

export default function UsefulInfo() {
  const articles = [
    {
      title: "Как перевезти в другую страну родителей и других родственников ",
      tag: "Forbes",
      brand_logo: "/logos/forbes.png",
      cover_image: "",
    },
    {
      title: "Как получить немецкий паспорт за три года",
      tag: "DW",
      text_color: "text-white",
      is_title_centered: true,
      brand_logo: "/logos/dw.png",
      cover_image:
        "https://www.germancitizenshipbydescent.com/wp-content/uploads/2024/10/apply-to-renew-German-passport.jpg",
    },
    {
      title: "Стартапы в Германии: инвестиции, поддержка государства и другие возможности",
      tag: "VC.ru",
      brand_logo: "/logos/vc.ru.png",
      cover_image: "",
    },
    {
      title: "Как переехать в Германию и привыкнуть к новым правилам",
      tag: "Meduza",
      brand_logo: "/logos/meduza.png",
      cover_image: "",
    },
    {
      title: "Как переехать в Германию: способы релокации",
      color: "bg-brand",
      is_title_centered: true,
      brand_logo: "/logos/forbes.png",
      tag: "Forbes",
      cover_image: "",
      text_color: "text-white",
    },
    {
      title:
        "Свой бизнес в Германии: как зарегистрировать компанию и выбрать правильную форму огранизации",
      tag: "RB.ru",
      brand_logo: "/logos/rb.ru.png",
      cover_image: "",
    },
    {
      title: "Что такое немецкая Blue Card и как ее получают?",
      tag: "Kovcheg",
      brand_logo: "/logos/kovcheg.png",
      cover_image: "",
    },
    {
      title: "Секреты немецкого паспорта: как получить гражданство Германии и что вам это даст",
      tag: "GetInvestor",
      brand_logo: "/logos/getinvestor.png",
      cover_image: "",
    },
  ];

  const ArticleCard = ({
    article,
  }: {
    article: {
      title: string;
      tag?: string | null;
      brand_logo: string;
      cover_image: string;
      color?: string;
      text_color?: string;
      is_title_centered?: boolean;
    };
  }) => (
    <div
      className={cn(
        "group relative flex min-h-100 cursor-pointer overflow-hidden rounded-[2.5rem]",
        !article.cover_image && (article.color || "bg-gray-light"),
        article.text_color || "text-black",
        article.is_title_centered && "items-center",
      )}
    >
      {article.cover_image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${article.cover_image})`,
          }}
        />
      )}
      <p
        className={cn(
          "relative z-10 px-6 py-10 text-xl font-bold",
          article.text_color,
          article.is_title_centered && "w-full text-center",
        )}
      >
        {article.title}
      </p>
      {article.tag && (
        <div className="absolute bottom-4 left-4 z-10 rounded-full bg-white px-4 py-2">
          <Image
            src={article.brand_logo}
            alt={article.tag}
            width={75}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </div>
      )}
    </div>
  );

  return (
    <section className="px-5 py-10 md:px-20 md:py-16">
      <SectionTitle className="mb-11">Полезная информация</SectionTitle>

      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            400: {
              slidesPerView: 1.6,
            },
            500: {
              slidesPerView: 1.8,
            },
          }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <ArticleCard article={article} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="bg-brand flex min-h-100 cursor-pointer items-center justify-center rounded-[2.5rem]">
              <p className="text-xl font-bold text-white">Загрузить еще</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden grid-cols-2 gap-5 md:grid md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      <Button className="bg-brand hover:bg-brand/90 mt-19 hidden w-full cursor-pointer rounded-2xl py-5 text-base font-semibold text-white md:flex">
        Загрузить еще
      </Button>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide, Pagination } from "@/components/ui/swiper";
import SectionTitle from "./SectionTitle";

const ARTICLES_PER_PAGE = 8;

export default function UsefulInfo() {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const articles = [
    {
      title: "Как перевезти в другую страну родителей и других родственников ",
      tag: "Forbes",
      brand_logo: "/logos/forbes.png",
      cover_image: "",
      link: "https://www.forbes.ru/society/503322-kak-perevezti-v-novuu-stranu-roditelej-i-drugih-rodstvennikov-gid-po-15-gosudarstvam?image=477113",
    },
    {
      title: "Как получить немецкий паспорт за три года",
      tag: "DW",
      text_color: "text-white",
      is_title_centered: true,
      brand_logo: "/logos/dw.png",
      cover_image: "/articles/passport.png",
      link: "https://www.youtube.com/watch?v=cWaOZif3yEE",
    },
    {
      title: "Стартапы в Германии: инвестиции, поддержка государства и другие возможности",
      tag: "get-investor.ru",
      brand_logo: "/logos/getinvestor.png",
      cover_image: "",
      link: "https://get-investor.ru/startapy-v-germanii",
    },
    {
      title: "Как переехать в Германию и привыкнуть к новым правилам",
      tag: "forbes.ru",
      brand_logo: "/logos/forbes.png",
      cover_image: "/articles/how_to_move_to_germany.png",
      text_color: "text-white",
      link: "https://www.forbes.ru/svoi-biznes/470161-kak-pereehat-v-germaniu-i-privyknut-k-novym-pravilam",
    },
    {
      title: "Как переехать в Германию: способы релокации",
      color: "bg-brand",
      is_title_centered: true,
      brand_logo: "/logos/vc.ru.png",
      tag: "vc.ru",
      cover_image: "",
      text_color: "text-white",
      link: "https://vc.ru/migrate/790351-kak-pereehat-v-germaniyu-sposoby-relokacii-po-rabote-dlya-frilanserov-i-biznesa",
    },
    {
      title:
        "Свой бизнес в Германии: как зарегистрировать компанию и выбрать правильную форму огранизации",
      tag: "kovcheg.live",
      brand_logo: "/logos/kovcheg.png",
      cover_image: "",
      link: "https://youtu.be/pDHQ6SryQ-4",
    },
    {
      title: "Что такое немецкая Blue Card и как ее получают?",
      tag: "meduza.io",
      brand_logo: "/logos/meduza.png",
      cover_image: "/articles/bluecard.png",
      text_color: "text-white",
      link: "https://meduza.io/amp/cards/chto-takoe-nemetskaya-blue-card-i-kak-ee-poluchayut",
    },
    {
      title: "Секреты немецкого паспорта: как получить гражданство Германии и что вам это даст",
      tag: "rb.ru",
      brand_logo: "/logos/rb.ru.png",
      cover_image: "",
      link: "https://rb.ru/opinion/poluchit-grazhdanstvo-germanii/",
    },
    {
      title: "«Мой заработок все еще находится в России»: как живут москвичи-эмигранты'2022",
      tag: "moskvichmag.ru",
      brand_logo: "/logos/moskvichmag.png",
      cover_image: "",
      link: "https://moskvichmag.ru/lyudi/moj-zarabotok-vse-eshhe-nahoditsya-v-rossii-kak-zhivut-moskvichi-emigranty2022/",
    },
    {
      title: "Продавать нужно в Лондоне, а жить — в Берлине. Как и на что живут русские художники",
      tag: "zimamagazine.com",
      brand_logo: "/logos/zima.png",
      cover_image: "/articles/london.png",
      text_color: "text-white",
      link: "https://zimamagazine.com/2017/07/prodavat-nuzhno-v-londone-a-zhit-v-berline/",
    },
    {
      title: "Как получить «сильный» паспорт?",
      tag: "meduza.io",
      brand_logo: "/logos/meduza.png",
      cover_image: "",
      link: "https://meduza.io/feature/2022/12/19/samyy-radikalnyy-variant-emigratsii-pomenyat-grazhdanstvo-kak-poluchit-silnyy-pasport",
    },
    {
      title: "9 вещей, которые стоит сделать перед отъездом в Германию и другие страны",
      tag: "paperpaper.io",
      brand_logo: "/logos/kartuli.png",
      is_title_centered: true,
      color: "bg-brand",
      text_color: "text-white",
      cover_image: "",
      link: "https://paperpaper.io/seshte-za-menya-luchshie-v-mire-pomidor/",
    },
    {
      title: "Как решиться на переезд и на какие вопросы стоит ответить себе перед эмиграцией",
      tag: "paperpaper.io",
      brand_logo: "/logos/kartuli.png",
      cover_image: "",
      link: "https://exhorts-lydias-776399.appspot.com/kak-reshitsya-na-pereezd-i-na-kakie-vopr/",
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
      link: string;
      brand_bg?: string;
    };
  }) => (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${article.cover_image})`,
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
        <div
          className={cn(
            "absolute bottom-4 left-4 z-10 rounded-full px-4 py-2",
            article.brand_bg || "bg-white",
          )}
        >
          <Image
            src={article.brand_logo}
            alt={article.tag}
            width={75}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </div>
      )}
    </a>
  );

  return (
    <section className="py-10 md:py-16">
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
        {articles.slice(0, visibleCount).map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>

      {visibleCount < articles.length && (
        <Button
          onClick={() =>
            setVisibleCount((prev) => Math.min(prev + ARTICLES_PER_PAGE, articles.length))
          }
          className="bg-brand hover:bg-brand/90 mt-19 hidden w-full cursor-pointer rounded-2xl py-5 text-base font-semibold text-white md:flex"
        >
          Загрузить еще
        </Button>
      )}
    </section>
  );
}

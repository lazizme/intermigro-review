"use client";

import { Swiper, SwiperSlide, Navigation, Pagination } from "@/components/ui/swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import VideoPlayer from "./VideoPlayer";
import SectionTitle from "./SectionTitle";

export default function ClientReviews() {
  const reviews = [
    {
      full_name: "Анастасия Писклакова",
      profession: "Психолог",
      video: "/reviews/anastasiya_pisklakova_psixolog.mp4",
      cover: "/reviews/anastasiya_pisklakova_psixolog.png",
    },
    {
      full_name: "Елена Гуляева",
      profession: "Менеджер по закупкам с инженерной специализацией",
      video: "/reviews/elena-gulyayeva.mp4",
      cover: "/reviews/elena-gulyayeva.png",
    },
    {
      full_name: "Катерина Комарова",
      profession: "Виза по воссоединению",
      video: "/reviews/katerina-komarova.mp4",
      cover: "/reviews/katerina-komarova.png",
    },
    {
      full_name: "Мария Игнатенко",
      profession: "Режиссёр",
      video: "/reviews/maria-ignatenko.mp4",
      cover: "/reviews/maria-ignatenko.png",
    },
    {
      full_name: "Полина Коробкова",
      profession: "Композитор",
      video: "/reviews/polina-korobkova-kompozitorka.mp4",
      cover: "/reviews/polina-korobkova-kompozitorka.png",
    },
    {
      full_name: "Илья Шагалов",
      profession: "Режиссер-видеохудожник",
      video: "/reviews/ilya-shagalov-rezhisser.mp4",
      cover: "/reviews/ilya-shagalov-rezhisser.png",
    },
    {
      full_name: "Александр Гордеев",
      profession: "Художник",
      video: "/reviews/aleksand-gordeev-artist.mp4",
      cover: "/reviews/aleksand-gordeev-artist.png",
    },
    {
      full_name: "Бхима Юнусов",
      profession: "Композитор",
      video: "/reviews/bhima-yunusov-kompozitor.mp4",
      cover: "/reviews/bhima-yunusov-kompozitor.png",
    },
    {
      full_name: "Павел Фёдоров",
      profession: "Художник",
      video: "/reviews/pavel-fedorov-hudozhnik.mp4",
      cover: "/reviews/pavel-fedorov-hudoznik.png",
    },
    // {
    //   full_name: "Прохор Колосов",
    //   profession: "Керамист, переводчик с японского языка",
    //   video: "https://intermigro.com/wp-content/uploads/2023/07/111-1.mp4",
    //   cover: "https://intermigro.com/wp-content/uploads/2023/07/user-trust-4.webp",
    // },
    {
      full_name: "Анастасия Вебер",
      profession: "Режиссер",
      video: "/reviews/anastasiya-veber-rezhisser.mp4",
      cover: "/reviews/anastasiya-veber-rezhisser.png",
    },
    {
      full_name: "Вадим Черников",
      profession: "Head of Growth, Endel",
      video: "/reviews/vadim-chernikov-head-of-growth-endel.mp4",
      cover: "/reviews/vadim-chernikov-head-of-growth-endel.png",
    },
    {
      full_name: "Зоя Скобельцына",
      profession: "CEO Lineup",
      video: "/reviews/zoya-skobelczyna-ceo-lineup.mp4",
      cover: "/reviews/zoya-skobelczyna-ceo-lineup.png",
    },
    // {
    //   full_name: "Вова Шебаршев",
    //   profession: "Маркетолог",
    //   video: "https://drive.google.com/drive/folders/1U7pgd9iUNk2zXhAX-Td3YDJ33CIu0pZf",
    //   cover: "https://intermigro.com/wp-content/uploads/2023/07/user-trust-4.webp",
    // },
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <SectionTitle>Отзывы наших клиентов</SectionTitle>
        <div className="hidden gap-2 md:flex">
          <button className="review-prev bg-gray-light flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200">
            <ChevronLeftIcon />
          </button>
          <button className="review-next bg-gray-light flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".review-prev",
          nextEl: ".review-next",
        }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.4}
        breakpoints={{
          640: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="cursor-pointer">
              <div className="relative mb-4 aspect-9/16 overflow-hidden rounded-2xl bg-gray-200 sm:aspect-2/3">
                <VideoPlayer src={review.video} poster={review.cover} />
              </div>
              <p className="font-semibold">{review.full_name}</p>
              <p className="text-gray-dark text-sm">{review.profession}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

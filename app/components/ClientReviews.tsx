"use client";

import { Swiper, SwiperSlide, Navigation, Pagination } from "@/components/ui/swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import VideoPlayer from "./VideoPlayer";
import SectionTitle from "./SectionTitle";

export default function ClientReviews() {
  const reviews = [
    {
      full_name: "Анастасия Вебер",
      profession: "Режиссер",
      video: "https://intermigro.com/wp-content/uploads/2023/07/anastasiya-veber-rezhisser.mp4",
      cover: "https://intermigro.com/wp-content/uploads/2023/07/anastasiya-veber-rezhisser.webp",
    },
    {
      full_name: "Вадим Черников",
      profession: "Head of Growth, Endel",
      video:
        "https://intermigro.com/wp-content/uploads/2023/07/vadim-chernikov-head-of-growth-endel.mp4",
      cover:
        "https://intermigro.com/wp-content/uploads/2023/07/vadim-chernikov-head-of-growth-endel.webp",
    },
    {
      full_name: "Александр Гордеев",
      profession: "Художник",
      video: "https://intermigro.com/wp-content/uploads/2023/07/aleksand-gordeev-artist.mp4",
      cover: "https://intermigro.com/wp-content/uploads/2023/07/user-trust-3.webp",
    },
    {
      full_name: "Павел Федоров",
      profession: "Художник",
      video: "https://intermigro.com/wp-content/uploads/2023/07/pavel-fedorov-hudozhnik.mp4",
      cover: "https://intermigro.com/wp-content/uploads/2023/07/pavel-fedorov-hudozhnik.webp",
    },
    {
      full_name: "Зоя Скобельцына",
      profession: "CEO Lineup",
      video: "https://intermigro.com/wp-content/uploads/2023/07/zoya-skobelczyna-ceo-lineup.mp4",
      cover: "https://intermigro.com/wp-content/uploads/2023/07/zoya-skobelczyna-ceo-lineup.webp",
    },
    {
      full_name: "Клиент",
      profession: "",
      video: "https://intermigro.com/wp-content/uploads/2023/07/111-1.mp4",
      cover: "https://intermigro.com/wp-content/uploads/2023/07/user-trust-4.webp",
    },
  ];

  return (
    <section className="px-5 py-10 md:px-20 md:py-16">
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
        slidesPerView={1.8}
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
              <div className="relative mb-4 aspect-3/4 overflow-hidden rounded-2xl bg-gray-200">
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

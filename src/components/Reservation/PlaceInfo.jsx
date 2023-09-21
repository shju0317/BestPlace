import { useLocation } from 'react-router-dom';
// import useReview from '@h/useReview';
import { useEffect } from 'react';
import useReservationStore from '@/store/reservation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getPbImageURL } from "@/utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PlaceInfo() {
  const { userId, item } = useLocation().state || {};
  const { setReservationData } = useReservationStore();
  
  console.log('아이템', item)
  useEffect(() => {
    setReservationData({ 
      booker: userId,
      place: item.expand.place.id
      // title: item.expand.place.title
    });
  }, []);

  return (
    <div className="pb-2 w-full">
      <h1 className="text-lg font-semibold">{item.expand.place.title}</h1>
      <p className="border-b pb-2 mb-10">{item.expand.place.category}<span className="mx-1">|</span>{item.expand.place.address}</p>
        <Swiper
          className="photo-swiper"
          spaceBetween={30}
          navigation={true}
          loop={true}
          pagination={{
            type: "fraction",
          }}
          modules={[Navigation, Pagination]}
        >
          {/* {
          item.collectionName === "reviews" ? 
          item.photos.map((fileName) => (
            <SwiperSlide key={crypto.randomUUID()} className="bg-cover bg-center">
              <img
                src={getPbImageURL(item, fileName)}
                alt="리뷰 사진"
                className="h-full w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))
          :
          item.expand.place.photos.map((fileName) => (
            <SwiperSlide key={crypto.randomUUID()} className="bg-cover bg-center">
              <img
                src={getPbImageURL(item.expand.place, fileName)}
                alt="리뷰 사진"
                className="h-full w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))
          } */}
          {
          item.expand.place.photos.map((fileName) => (
            <SwiperSlide key={crypto.randomUUID()} className="bg-cover bg-center">
              <img
                src={getPbImageURL(item.expand.place, fileName)}
                alt="리뷰 사진"
                className="h-full w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))
          }
        </Swiper>
    </div>
  )
}

export default PlaceInfo
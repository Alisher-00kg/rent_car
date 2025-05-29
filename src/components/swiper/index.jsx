import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";

export const FeedBackSlider = ({
  data,
  renderSlide,
  renderPagination,
  spaceBetween,
  slidesPerView,
  className,
  ...props
}) => {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  return (
    <div className={className ? `${className}` : ""}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        navigation={true}
        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
        x
        loop={true}
        modules={[Autoplay, Navigation]}
        {...props}
      >
        {data.map((item, i) => (
          <SwiperSlide key={item.id}>{renderSlide(item, i, index)}</SwiperSlide>
        ))}
      </Swiper>

      {renderPagination({
        handlePrev,
        handleNext,
        index,
        data,
      })}
    </div>
  );
};

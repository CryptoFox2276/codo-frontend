import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";

const Sponsorship = () => {
    return (
        <section id="sponsorship">
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                type: 'fraction',
                }}
                navigation={true}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="sponsorshipSwiper"
            >
                <SwiperSlide>
                    <img src="/assets/images/sponsors/cryptonews.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/cryptonews.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/cryptonews.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/cryptonews.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/cryptonews.jpg" />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Sponsorship;
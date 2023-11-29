import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from "swiper";

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
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="sponsorshipSwiper"
            >
                <SwiperSlide>
                    <img src="/assets/images/sponsors/Cryptonews.png" width={200}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/Bitcoin_Magazine_Logo.png" width={200} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/Cointelegraph.png" width={200} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/Logo_mini_mod.png" width={200} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/marketwatch-logo.png" width={200} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/images/sponsors/Yahoo_Finance.png" width={200} />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Sponsorship;
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/actions/postAction";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/dist/client/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <main
      id="home"
      className="bg-gray-900 text-white w-full overflow-y-auto py-10"
    >
      <section className="p-5 pt-20">
        <div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-10">
            <div className="text-center px-10 m-auto">
              <h1 className="title title-50 pb-5">
                Unlocking the Future of Finance and Entertainment
              </h1>
              <p className="content">
                Codo Finance takes its users on a journey to the borders of the
                Metaverse universe with its multi-chain ecosystem. GamePad, NFT
                Market, Special NFT Collections and $CODO Token will accompany
                you on this journey.
              </p>
            </div>
            <div className="w-full px-5">
              <div className="container">
                <div className="panel md:w-3/4 sm:w-screen">
                  <div className="row bg-gray-700 panel-header">
                    <h2>Presale 1 Live</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-10 py-3 px-10">
                    <div className="text-left">
                      <h2 className=" text-sky-500 font-bold">STAGE 1</h2>
                      <p className="text-right text-gray-500 font-semibold">
                        CURRENT STAGE
                      </p>
                    </div>
                    <div className="text-left">
                      <h2 className=" text-yellow-500 font-bold">$100,000</h2>
                      <p className="text-right text-gray-500 font-semibold">
                        $300,000 RAISED
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <div className="sub-panel mx-10">
                    <div>
                      <h2 className="text-yellow-500 font-bold">
                        79.35% <span className="text-sky-500">SOLD</span>
                      </h2>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">20.65 %</p>
                      <p className="text-white-50">REMAINING</p>
                    </div>
                  </div>
                  <div className="mx-10 grid md:grid-cols-2 gap-x-10 pt-1 mb-10">
                    <p className="text-left">
                      <span className=" text-gray-500 font-semibold">
                        $0.02 USDT
                      </span>{" "}
                      <span className="text-yellow-500 font-bold">
                        = 1 $CODO
                      </span>
                    </p>
                    <p className="text-right">
                      <span className=" text-gray-500 font-semibold">
                        NEXT STAGE:
                      </span>{" "}
                      <span className="text-sky-500 font-bold">0.025$</span>
                    </p>
                  </div>
                  <div className="bg-gray-700 mx-10 px-10 py-3 rounded-full">
                    <h2>
                      <span className="text-sky-500 font-bold">5,000,000</span>{" "}
                      Tokens Sold
                    </h2>
                    <p>
                      Only{" "}
                      <span className="text-yellow-500 font-bold">
                        15,000,000
                      </span>{" "}
                      tokens remain
                    </p>
                  </div>
                  <div className="mx-10 my-10">
                    <button className="w-full rounded-lg bg-sky-500 px-10 py-5 ">
                      <h2 className="text-bold">BUY $CODO</h2>
                    </button>
                    <h4 className="pt-3 text-gray-400 font-bold">
                      How to buy?
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="watch-video">
        <div className="container mx-auto text-center px-5">
          <div>
            <h1 className="title title-50 pb-10">Watch our Video</h1>
          </div>
          <div>
            {/* <img src="/assets/images/layer 4.png" alt="video" /> */}
            <img
              src="/assets/images/play-video.png"
              alt="play"
              className="m-auto"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="grid md:grid-cols-2 sm:grid-cols-1">
            <div className="pt-10 m-auto px-5">
              <h1 className="title title-50 pb-20">Multichain and Interoperability</h1>
              <p className="sm:w-full md:w-2/3 md:text-2xl">
                Codo Finance is dedicated to providing our users with the best
                possible experience, which is why we support multiple chains and
                offer cross-chain connectivity with Codo Bridge. By using the
                CODO token, you'll be able to access a wide range of DeFi
                products and take advantage of the benefits of our platform on
                your preferred chain.
              </p>
            </div>
            <div className="m-auto">
              <img src="/assets/images/Layer5.png" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="grid md:grid-cols-2 sm:grid-cols-1">
            <div className="m-auto">
              <img src="/assets/images/Layer6.png" />
            </div>
            <div className="pt-10 m-auto  px-5">
              <h1 className="title title-50 pb-20">Multichain and Interoperability</h1>
              <p className="sm:w-full md:w-2/3 md:text-2xl">
                Codo Finance is dedicated to providing our users with the best
                possible experience, which is why we support multiple chains and
                offer cross-chain connectivity with Codo Bridge. By using the
                CODO token, you'll be able to access a wide range of DeFi
                products and take advantage of the benefits of our platform on
                your preferred chain.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="grid md:grid-cols-2 sm:grid-cols-1">
            <div className="pt-10 m-auto px-5">
              <h1 className="title title-50 pb-20">Multichain and Interoperability</h1>
              <p className="sm:w-full md:w-2/3 md:text-2xl">
                Codo Finance is dedicated to providing our users with the best
                possible experience, which is why we support multiple chains and
                offer cross-chain connectivity with Codo Bridge. By using the
                CODO token, you'll be able to access a wide range of DeFi
                products and take advantage of the benefits of our platform on
                your preferred chain.
              </p>
            </div>
            <div className="m-auto">
              <img src="/assets/images/Layer5.png" />
            </div>
          </div>
        </div>
      </section>
      <section id="vip-net">
        <div className="container m-auto">
          <div className=" px-5">
            <h1 className="title title-50 pb-20 text-center">CODO VIP CLUB NFT</h1>
            <div>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 150,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src="/assets/images/demo/1.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/2.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/3.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/4.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/5.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/6.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/7.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/8.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/demo/9.png" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section id="roadmap">
        <div className="container m-auto px-5">
                <div className="text-center">
                  <h1 className="title title-50 pb-10">ROADMAP</h1>
                </div>
                <div className="grid md:grid-cols-3 sm:grid-colos-1 gap-3">
                  <div className="item mx-auto p-10">
                    <img src="/assets/images/testimonials-user-2.png" width={250} height={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-2xl pb-5">2022 Q3-Q4</h3>
                      <p className=" text-lg h-7">CodoHub Publish (Beta)</p>
                      <p className=" text-lg h-7">CodoHub Vip Club INO</p>
                      <p className=" text-lg h-7">New Partnerships</p>
                      <p className=" text-lg h-7">First IGO Start</p>
                      <p className=" text-lg h-7">Marketplace launch (Beta)</p>
                      <p className=" text-lg h-7">New Exchanges</p>
                    </div>        
                  </div>
                  <div className="item active mx-auto p-10">
                    <img src="/assets/images/testimonials-user-3.png"  width={250} height={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-2xl pb-5">2022 Q1-Q2</h3>
                      <p className=" text-lg h-7">Marketing Activities</p>
                      <p className=" text-lg h-7">Smart Contracts Audit</p>
                      <p className=" text-lg h-7">Presale Start</p>
                      <p className=" text-lg h-7">Token Claim</p>
                      <p className=" text-lg h-7">Token Listing</p>
                      <p className=" text-lg h-7">Burn Presale 2 Unsold tokens</p>
                      <p className=" text-lg h-7">CodoHub Testnet</p>
                      <p className=" text-lg h-7">Codo Vip Club Publish</p>
                      <p className=" text-lg h-7">Community Expansion</p>
                    </div>        
                  </div>
                  <div className="item mx-auto p-10">
                    <img src="/assets/images/testimonials-user-4.png"  width={250} height={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-2xl pb-5">2022 Q2-Q3</h3>
                      <p className=" text-lg h-7">CodoHub Publish (Beta)</p>
                      <p className=" text-lg h-7">CodoHub Vip Club INO</p>
                      <p className=" text-lg h-7">New Partnerships</p>
                      <p className=" text-lg h-7">First IGO Start</p>
                      <p className=" text-lg h-7">Marketplace launch (Beta)</p>
                      <p className=" text-lg h-7">New Exchanges</p>
                    </div>        
                  </div>
                  <div></div>
                  <div></div>
                </div>
        </div>
      </section>
    </main>
  );
}

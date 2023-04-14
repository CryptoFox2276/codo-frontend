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
      id="dashboard"
      className="bg-gray-900 text-white w-full overflow-y-auto"
    >
      <section id="home" className="px-5">
        <div className="container m-auto">
          <div className="flex lg:flex-row sm:flex-col flex-col">
            <div className="text-center lg:px-10 m-auto lg:w-3/4 w-full">
              <h1 className="title pb-5">
                Unlocking the Future of Finance and Entertainment
              </h1>
              <p className="content lg:pl-16 lg:pr-8">
                Codo Finance takes its users on a journey to the borders of the
                Metaverse universe with its multi-chain ecosystem. GamePad, NFT
                Market, Special NFT Collections and $CODO Token will accompany
                you on this journey.
              </p>
            </div>
            <div className="lg:w-2/3 w-full lg:px-5 lg:mt-5 mt-10 ">
              <div className="">
                <div className="panel lg:w-3/4 w-full">
                  <div className="row bg-gray-700 panel-header">
                    <h2 className="md:text-3xl text-2xl font-bold">Presale 1 Live</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-10 py-5 md:px-10 px-5">
                    <div className="text-left">
                      <h2 className=" text-sky-500 md:text-2xl text-lg font-bold">STAGE 1</h2>
                      <p className="text-right text-gray-500 font-semibold lg:text-lg text-md">
                        CURRENT STAGE
                      </p>
                    </div>
                    <div className="text-left">
                      <h2 className=" text-yellow-500 md:text-2xl text-lg font-bold">$100,000</h2>
                      <p className="text-right text-gray-500 font-semibold lg:text-lg text-md">
                        $300,000 RAISED
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <div className="sub-panel md:mx-10 mx-3">
                    <div className="my-auto">
                      <h2 className="text-yellow-500 font-bold lg:text-xl text-lg ">
                        79.35% <span className="text-sky-500">SOLD</span>
                      </h2>
                    </div>
                    <div className="text-left">
                      <p className="font-bold lg:text-lg text-md">20.65 %</p>
                      <p className=" text-slate-500 font-bold lg:text-md text-sm">REMAINING</p>
                    </div>
                  </div>
                  <div className="lg:mx-10 mx-5 grid grid-cols-2 lg:gap-10 gap-1  pt-1 mb-10">
                    <p className="text-left lg:text-md text-sm">
                      <span className=" text-slate-500 font-bold">
                        $0.02 USDT
                      </span> &nbsp;
                      <span className="text-yellow-500 font-bold">
                        = 1 $CODO
                      </span>
                    </p>
                    <p className="text-right lg:text-md text-sm">
                      <span className=" text-slate-500 font-bold">
                        NEXT STAGE:
                      </span> &nbsp;
                      <span className="text-sky-500 font-bold">0.025$</span>
                    </p>
                  </div>
                  <div className="bg-gray-700 lg:mx-10 lg:px-10 mx-3 px-3 py-3 rounded-full">
                    <h2 className="font-bold lg:text-xl text-lg">
                      <span className="text-sky-500 font-bold">5,000,000</span> &nbsp;
                      Tokens Sold
                    </h2>
                    <p>
                      only &nbsp;
                      <span className="text-yellow-500 font-bold">
                        15,000,000
                      </span> &nbsp;
                      tokens remain
                    </p>
                  </div>
                  <div className="mx-10 my-10">
                    <button className="w-full rounded-lg bg-sky-500 px-10 py-5 ">
                      <h2 className="font-bold md:text-3xl text-2xl ">BUY $CODO</h2>
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
            <h1 className="title pb-10">Watch our Video</h1>
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
          <div className="flex lg:flex-row sm:flex-col flex-col lg:gap-10 gap-20">
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">Multichain and Interoperability</h1>
              <p className="content">
                Codo Finance is dedicated to providing our users with the best
                possible experience, which is why we support multiple chains and
                offer cross-chain connectivity with Codo Bridge. By using the
                CODO token, you'll be able to access a wide range of DeFi
                products and take advantage of the benefits of our platform on
                your preferred chain.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <img src="/assets/images/Layer5.png" width={250} className=" m-auto"/>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="flex lg:flex-row flex-col-reverse lg:gap-10 gap-20">
            <div className="lg:w-2/3 w-full m-auto">
              <img src="/assets/images/Layer6.png" width={250}  className="section-image m-auto"/>
            </div>
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">Multichain and Interoperability</h1>
              <p className="content">
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
          <div className="flex lg:flex-row sm:flex-col flex-col lg:gap-10 gap-20">
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">Multichain and Interoperability</h1>
              <p className="content">
                Codo Finance is dedicated to providing our users with the best
                possible experience, which is why we support multiple chains and
                offer cross-chain connectivity with Codo Bridge. By using the
                CODO token, you'll be able to access a wide range of DeFi
                products and take advantage of the benefits of our platform on
                your preferred chain.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <img src="/assets/images/Layer5.png" width={250} className="section-image m-auto"/>
            </div>
          </div>
        </div>
      </section>
      <section id="vip-net">
        <div className="container m-auto">
          <div className="px-5">
            <h1 className="title pb-20 text-center">CODO VIP CLUB NFT</h1>
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
                  <h1 className="title pb-10">ROADMAP</h1>
                </div>
                <div className="grid md:grid-cols-3 sm:grid-colos-1 gap-3">
                  <div className="item flex flex-col mx-auto px-10 py-10 w-full rounded-lg">
                    <img src="/assets/images/testimonials-user-2.png" width={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q3-Q4</h3>
                      <p className=" text-xl h-9">CodoHub Publish (Beta)</p>
                      <p className=" text-xl h-9">CodoHub Vip Club INO</p>
                      <p className=" text-xl h-9">New Partnerships</p>
                      <p className=" text-xl h-9">First IGO Start</p>
                      <p className=" text-xl h-9">Marketplace launch (Beta)</p>
                      <p className=" text-xl h-9">New Exchanges</p>
                    </div>        
                  </div>
                  <div className="item active flex flex-col mx-auto px-10 py-10 w-full rounded-lg">
                    <img src="/assets/images/testimonials-user-3.png"  width={250} height={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q1-Q2</h3>
                      <p className=" text-xl h-9">Marketing Activities</p>
                      <p className=" text-xl h-9">Smart Contracts Audit</p>
                      <p className=" text-xl h-9">Presale Start</p>
                      <p className=" text-xl h-9">Token Claim</p>
                      <p className=" text-xl h-9">Token Listing</p>
                      <p className=" text-xl h-9">Burn Presale 2 Unsold tokens</p>
                      <p className=" text-xl h-9">CodoHub Testnet</p>
                      <p className=" text-xl h-9">Codo Vip Club Publish</p>
                      <p className=" text-xl h-9">Community Expansion</p>
                    </div>        
                  </div>
                  <div className="item flex flex-col  mx-auto px-10 py-10 w-full rounded-lg">
                    <img src="/assets/images/testimonials-user-4.png"  width={250} height={250}/>
                    <div className="mt-10">
                      <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q2-Q3</h3>
                      <p className=" text-xl h-9">CodoHub Publish (Beta)</p>
                      <p className=" text-xl h-9">CodoHub Vip Club INO</p>
                      <p className=" text-xl h-9">New Partnerships</p>
                      <p className=" text-xl h-9">First IGO Start</p>
                      <p className=" text-xl h-9">Marketplace launch (Beta)</p>
                      <p className=" text-xl h-9">New Exchanges</p>
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

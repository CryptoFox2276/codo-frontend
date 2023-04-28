import { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ProgressBar from "../components/progress-bar";
import Countdown from "react-countdown";

import { ethers } from "ethers";

import { eth } from "../state/eth";

const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID)
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL, NETWORK_ID)

const expireDate = new Date(2023, 5, 9, 0, 0, 0);
const nowCountDown = new Date();

export default function Home() {

  const {
    walletConnected,
    address,
    stage,
    price,
    totalSupply,
    totalPresaleAmount,
    totalSoldAmount,
    totalSoldCost,
    totalSoldPercent,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    connectWallet,
    disConnectWallet,
    addCommas
  } = eth.useContainer();

  const [loading, setLoading] = useState(false);  

  const Completionist = () => (
    <div className="center mt-5">
        <h4>Presale Phase Ended</h4>
    </div>
  );

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if(completed) {
        return <Completionist />
    } else {
        return <>
            {
                    <div className="">
                        <div className="center p-3">
                            <p className="font-bold text-slate-500">SALES END IN</p>
                        </div>
                        <div className="hidden lg:flex xl:flex lg:justify-around lg:items-center lg:p-auto ">
                            <div className="countdown-item px-4 w-25">
                                <div className="countdown-time justify-between">
                                    <p>{('0'+days).substr(-2)}</p>
                                </div>
                                <div>
                                    <p>Days</p>
                                </div>
                            </div>
                            <div className=" text-2xl font-bold">:</div>
                            <div className="countdown-item px-4 w-25">
                                <div className="countdown-time justify-between">
                                    <p>{('0'+hours).substr(-2)}</p>
                                </div>
                                <div><p>Hours</p></div>
                            </div>
                            <div className=" text-2xl font-bold">:</div>
                            <div className="countdown-item px-4 w-25">
                                <div className="countdown-time justify-between">
                                    <p>{('0'+minutes).substr(-2)}</p>
                                </div>
                                <div><p>Mins</p></div>
                            </div>
                            <div className=" text-2xl font-bold">:</div>
                            <div className="countdown-item px-4">
                                <div className="countdown-time justify-content-between">
                                    <p>{('0'+seconds).substr(-2)}</p>
                                </div>
                                <div><p>Secs</p></div>
                            </div>
                        </div>
                        <div className="block lg:hidden xl:hidden">
                          <h3 className="tf-text">
                              {('0'+days).substr(-2)} : {('0'+hours).substr(-2)} : {('0'+minutes).substr(-2)} : {('0'+seconds).substr(-2)}
                          </h3>
                        </div>
                    </div>
            }
        </>
    }
  }

  return (
    <main
      id="dashboard"
      className="text-white w-full overflow-y-auto"
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
                <div className="panel lg:w-3/4 w-full relative">
                  <img src="/assets/images/badge.png" className="badge absolute -right-8 -top-8"/>
                  <div className="flex justify-center gap-10 bg-gray-700 panel-header">
                    <h2 className="md:text-3xl text-2xl font-bold">Presale {stage} Live </h2>
                    <img src="/assets/images/startup.png" width={35} className="my-auto"/>
                  </div>
                  <div className="grid lg:grid-cols-2 lg:gap-10 gap-3 py-5 lg:px-10 px-5">
                    <div className="text-left">
                      <h2 className=" text-sky-500 lg:text-2xl text-lg font-bold">STAGE {stage}</h2>
                      <p className="lg:text-right text-left text-gray-500 font-semibold lg:text-lg text-md">
                        CURRENT STAGE
                      </p>
                    </div>
                    <div className="text-left">
                      <h2 className=" text-yellow-500 lg:text-2xl text-lg font-bold text-ellipsis overflow-hidden">${soldCost}</h2>
                      <p className="lg:text-right text-left text-gray-500 font-semibold lg:text-lg text-md">
                        ${totalSoldCost} RAISED
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <div className="lg:mx-10 mx-3" style={{position:"relative"}}>
                    <div className="sub-panel" style={{position: "relative", zIndex:1}}>
                      <div className="my-auto">
                        <h2 className="text-yellow-500 font-bold lg:text-xl text-lg ">
                          {totalSoldPercent} % <span className="text-sky-500">SOLD</span>
                        </h2>
                      </div>
                      <div className="text-left">
                        <p className="font-bold lg:text-lg text-md">{totalPresaleAmount > 0 ? 100 - totalSoldPercent : 0} %</p>
                        <p className=" text-slate-500 font-bold lg:text-md text-sm">REMAINING</p>
                      </div>                    
                    </div>
                    <div className="" style={{position:"absolute", bottom:"-10px", width:"100%"}}>
                      <ProgressBar bgcolor="#0764a6" completed={soldPercent} label={false}/>
                    </div>
                  </div>
                  <div className="lg:mx-10 mx-5 grid grid-cols-2 lg:gap-10 gap-1 pt-3 lg:mb-10 mb-6">
                    <p className="text-left lg:text-md text-sm">
                      <span className=" text-slate-500 font-bold">
                        {addCommas(price)} USDT
                      </span> &nbsp;
                      <span className="text-yellow-500 font-bold">
                        = 1 CODO
                      </span>
                    </p>
                    <p className="text-right lg:text-md text-sm flex lg:flex-row flex-col">
                      <span className=" text-slate-500 font-bold">
                        NEXT STAGE:
                      </span>
                      <span className="text-sky-500 font-bold">{nextStagePrice} USDT</span>
                    </p>
                  </div>
                  <div className="bg-gray-700 lg:mx-10 lg:px-10 px-3 py-3 mx-3 mb-10 rounded-full">
                    <h2 className="font-bold lg:text-xl text-lg">
                      <span className="text-sky-500 font-bold">{totalSoldAmount}</span> &nbsp;
                      Tokens Sold
                    </h2>
                    <p>
                      only &nbsp;
                      <span className="text-yellow-500 font-bold">
                        {addCommas(totalSupply - totalSoldAmount)}
                      </span> &nbsp;
                      tokens remain
                    </p>
                  </div>
                  <div className="lg:mx-10 mx-5 lg:mb-10 pb-6">
                    <Link  href="/presale" className="">
                      <p className="rounded-lg bg-sky-500 font-bold lg:text-3xl text-2xl px-10 py-5 cursor-pointer">BUY $CODO</p>
                    </Link>
                    <div className="countdown m-auto">
                      <Countdown date={Date.now() + 60 * 60 * 1000} renderer={renderer} />
                    </div>
                    <h4 className="pt-3 text-gray-400 font-bold">
                      <Link href="/presale/#howtobuy">How to buy?</Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="document" className="px-5">
        <div className="container m-auto">
          <div className="grid sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-20 md:px-20 sm:px-10 xs:px-10">
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">Whitepaper</p>
              <a className="flex gap-10 m-auto border rounded-lg border-gray-700 max-w-max  px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="whitepaper" width="30"/> PDF</a>
            </div>
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">KYC</p>
              <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="kyc" width="30"/> PDF</a>
            </div>
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">AUDIT</p>
              <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="audit" width="30"/> PDF</a>
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
                <div className="grid lg:grid-cols-3 sm:grid-colos-1 gap-3">
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

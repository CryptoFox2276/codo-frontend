import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Countdown from "react-countdown";
import Switch from 'react-switch';
import YouTube from 'react-youtube';

import ProgressBar from "../components/progress-bar";
import Sponsorship from "../components/Sponsorship";

import { ethers } from "ethers";

import { eth } from "../state/eth";
import AboutUs from "../components/AboutUs";
import CuratedProject from "../components/CuratedProject";
import DigitalAssets from "../components/DigitalAssets";
import DefiIntegration from "../components/DefiIntegration";
import AIInsights from "../components/AIInsights";
import CDEcosystem from "../components/CDEcosystem";
import CoDoTokenomics from "../components/CoDoTokenomics";

const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const NETWORK_ID = Number(process.env.NEXT_PUBLIC_CHAINID)
const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPCURL, NETWORK_ID)

const nowCountDown = new Date();

export default function Home() {

  const {
    walletConnected,
    address,
    stage,
    price,
    stageSupply,
    totalSupply,
    totalPresaleAmount,
    totalSoldAmount,
    totalSoldCost,
    totalRaised,
    totalSoldPercent,
    soldAmount,
    soldCost,
    soldPercent,
    nextStagePrice,
    saleActive,
    // startTime,
    connectWallet,
    disConnectWallet,
    addCommas
  } = eth.useContainer();

  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [checked, setChecked] = useState(false);
  const vidRef = useRef(null);
  const [startTime, setStartTime] = useState(new Date());

  const Completionist = () => (
    <Link  href="/presale" className="">
      <p className="rounded-lg bg-sky-500 font-bold lg:text-3xl text-2xl px-10 py-5 cursor-pointer">BUY $CODO</p>
    </Link>
  );

  const SplitedItem = ({data}) => (
    <div className="countdown-time">
      <span className="countdown-time-item">{data.split("").length > 1 ? data.split("")[0] : 0}</span>
      <span className="countdown-time-item">{data.split("").length > 1 ? data.split("")[1] : 0}</span>
    </div>
  )

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if(completed) {
        return (<Completionist />)
    } else {
        return <>
            {
              <div>
                  <div className="center pb-3">
                    <p className="font-bold text-black text-uppercase">buy in before price increases</p>
                  </div>
                  <div className="countdown">
                    <div className="countdown-item">
                      <SplitedItem data={('0'+days).substr(-2)} />
                    </div>
                    <div className=" text-2xl font-bold">:</div>
                    <div className="countdown-item">
                      <SplitedItem data={('0'+hours).substr(-2)} />
                    </div>
                    <div className=" text-2xl font-bold">:</div>
                    <div className="countdown-item">
                      <SplitedItem data={('0'+minutes).substr(-2)} />
                    </div>
                    <div className=" text-2xl font-bold">:</div>
                    <div className="countdown-item">
                      <SplitedItem data={('0'+seconds).substr(-2)} />
                    </div>
                  </div>
              </div>
            }
        </>
    }
  }

  const PresaleCountDown = () => {
    return <Countdown date={startTime > 0 ? (new Date(startTime)).getTime() : 0} renderer={renderer} />
  }

  const playVideo = () => {
    vidRef.current.play();
    setIsPlaying(true);
  }

  const stopVideo = () => {
    vidRef.current.pause();
    setIsPlaying(false)
  }

  const onSwitched = () => {
    setChecked(!checked);
  }

  const onConnectWallet = () => {
    connectWallet();
  };

  useEffect(()=>{
    setStartTime(new Date("2023-12-01"))
  },[])

  return (
    <main
      id="dashboard"
      className="text-white w-full overflow-y-auto"
    >
      <section id="home">
        <div className="background"></div>
        <div className="container m-auto">
          <div className="flex lg:flex-row sm:flex-col flex-col">
            <div className="flex flex-col gap-4 lg:gap-10 lg:pl-10 m-auto lg:w-3/4 w-full z-10">
              <h1 className="title">
                Invest Smarter with Codo Finance
              </h1>
              <p className="content">
                Your portal to premier crypto projects, powered by DeFi tools and AI insights. But before the price increase and stake to earn more
              </p>
              <div className="button-group flex flex-row justify-start gap-10">
                <Link href="#">
                  <p className="btn text-uppercase text-center text-sm font-semibold leading-6 text-white bg-gray-700 px-3 py-2">
                    Audit
                  </p>
                </Link>
                <Link href="#">
                  <p className="btn btn-bg-colored text-uppercase text-center text-sm font-semibold leading-6 text-white bg-gray-700 px-3 py-2">
                    Whitepaper
                  </p>
                </Link>
              </div>
              <div className="social-link-group flex flex-row gap-4 justify-start">
                <div>
                  <img src="/assets/images/004-twitter.png" />
                </div>
                <div>
                  <img src="/assets/images/003-telegram.png" />
                </div>
                <div>
                  <img src="/assets/images/discord.png" width={64} />
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 w-full lg:px-5 lg:mt-5 mt-10 ">
              <div className="">
                <div className="panel lg:w-3/4 w-full relative">
                  <div className="flex justify-center gap-10 panel-header">
                    <h2 className="md:text-3xl text-2xl font-bold">$126,000</h2>
                  </div>
                  <div className="m-auto">
                    <PresaleCountDown />
                  </div>
                  <div className="current-stage">
                    <div className="text-left text-sm">
                      <p>CURRENT STAGE</p>
                      <h2 className="font-bold">STAGE {stage}</h2>
                    </div>
                    <div className="text-left text-sm">
                      <p className="text-left">
                        $300,000 RAISED
                      </p>
                      <h2 className="font-bold text-ellipsis overflow-hidden">$126,000</h2>
                    </div>
                  </div>
                  <div className="sub-panel">
                    <div className="my-auto">
                      <h2 className="font-bold lg:text-xl text-lg text-white">
                        {totalSoldPercent} % <span className=" text-orange-700">Sold</span>
                      </h2>
                    </div>
                    {/* <div className="text-left">
                      <p className="font-bold lg:text-lg text-md">{totalPresaleAmount > 0 ? parseFloat(100 - totalSoldPercent).toFixed(2) : 0} %</p>
                      <p className=" text-slate-500 font-bold lg:text-md text-sm">REMAINING</p>
                    </div> */}
                    <div className="progressbar">
                      <ProgressBar bgcolor="#dcb423" completed={totalSoldPercent} label={false}/>
                    </div>
                  </div>
                  <div className="next-stage">
                    <p className="text-left text-sm">
                      <span>
                        {addCommas(price)} USDT
                      </span> &nbsp;
                      <span>
                        = 1 SCODO
                      </span>
                    </p>
                    <p className="text-right text-sm">
                      <span>
                        NEXT STAGE: &nbsp;
                      </span>
                      <span>{nextStagePrice}</span>
                    </p>
                  </div>
                  <div className="sub-panel">
                    <h2 className="font-bold text-lg text-orange-700">
                      <span className="font-bold text-white">{addCommas(totalSoldAmount)} Tokens</span> Sold
                    </h2>
                    <p className="text-white">
                      only<span className="text-yellow-500 font-bold">&nbsp;{addCommas(stageSupply - soldAmount)}&nbsp;</span>tokens remain
                    </p>
                  </div>
                  <div className="lg:mx-10 mx-5 lg:mb-10 pb-6 pt-3">
                    <a onClick={onConnectWallet} className="btn btn-bg-colored">
                      CONNECT WALLET
                    </a>
                  </div>
                  <img src="/assets/images/img-1.png" className="badge absolute"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sponsorship />
      <AboutUs />
      <DigitalAssets />
      <CuratedProject />
      <DefiIntegration />
      <AIInsights />
      <CDEcosystem />
      <CoDoTokenomics />
      <section>
        <div className="container m-auto">
          <div className="flex lg:flex-row sm:flex-col flex-col lg:gap-10 gap-20">
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">A Comprehensive Platform for DeFi, NFTs, and GameFi</h1>
              <p className="content">
              Discover Codo Finance, a pioneering platform that seamlessly integrates DeFi,
              NFTs, and GameFi. Our innovative ecosystem empowers investors, creators, and
              gamers to unlock new opportunities and shape the future of decentralized finance.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <img src="/assets/images/c1.png" width={680} className=" m-auto"/>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="flex lg:flex-row flex-col-reverse lg:gap-10 gap-20">
            <div className="lg:w-2/3 w-full m-auto">
              <img src="/assets/images/c2.png" width={680} className="section-image m-auto"/>
            </div>
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">Driving Innovation in GameFi and NFT Markets</h1>
              <p className="content">
              Codo Finance harnesses the power of GameFi and NFTs, offering a platform for unparalleled digital asset investments.
              Through our INO and IGO offerings, we connect creators with investors, fostering the growth of next-gen projects and assets.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto">
          <div className="flex lg:flex-row sm:flex-col flex-col lg:gap-10 gap-20">
            <div className="lg:w-3/4 w-full m-auto px-5">
              <h1 className="title pb-20">Streamlining DeFi with Innovative Solutions</h1>
              <p className="content">
              Experience the next level of DeFi with Codo Finance. Our platform delivers cutting-edge products like CodoSwap and Stakin,
              designed to provide seamless, secure, and rewarding financial experiences.
              Embrace the future of decentralized finance with Codo Finance's advanced and professional solutions.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <img src="/assets/images/c3.png" width={680} className="section-image m-auto"/>
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
                  <img src="/assets/images/nft-0.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/images/nft-8.jpg" />
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
                <div className="flex justify-center pb-10">
                  <Switch
                    onChange={onSwitched}
                    checked={checked}
                    onColor="#86d3ff"
                    offColor="#2693e6"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={32}
                    width={58}
                  />
                </div>
                {checked ? (
                  <div className="grid lg:grid-cols-3 sm:grid-colos-1 gap-3">
                    <div className="item flex flex-col mx-auto px-10 py-10 w-full rounded-lg">
                      <img src="/assets/images/testimonials-user-2.png" width={250}/>
                      <div className="mt-10">
                        <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q3-Q4</h3>
                        <p className=" text-xl h-9">Project Start</p>
                        <p className=" text-xl h-9">Website Launch</p>
                        <p className=" text-xl h-9">CODO Smart Contracts</p>
                        <p className=" text-xl h-9">Whitepaper Launch</p>
                        <p className=" text-xl h-9">Social Media Launch</p>
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
                ) : (
                  <div className="grid lg:grid-cols-3 sm:grid-colos-1 gap-3">
                    <div className="item flex flex-col mx-auto px-10 py-10 w-full rounded-lg">
                      <img src="/assets/images/testimonials-user-2.png" width={250}/>
                      <div className="mt-10">
                        <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q3-Q4</h3>
                        <p className=" text-xl h-9">CodoHub Alpha Launch</p>
                        <p className=" text-xl h-9">Marketplace Alpha Launch</p>
                        <p className=" text-xl h-9">New Partnerships</p>
                        <p className=" text-xl h-9">New Features for CodoHub</p>
                        <p className=" text-xl h-9">Community Expansion</p>
                        <p className=" text-xl h-9">Continue Platform Development</p>
                      </div>
                    </div>
                    <div className="item active flex flex-col mx-auto px-10 py-10 w-full rounded-lg">
                      <img src="/assets/images/testimonials-user-3.png"  width={250} height={250}/>
                      <div className="mt-10">
                        <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q4-Q1</h3>
                        <p className=" text-xl h-9">CodoVerse ANN</p>
                        <p className=" text-xl h-9">New Features for CodoHub</p>
                        <p className=" text-xl h-9">Continue Platform Development</p>
                        <p className=" text-xl h-9">Mobile App Release</p>
                        <p className=" text-xl h-9">CodoHub V2 Release</p>
                      </div>
                    </div>
                    <div className="item flex flex-col  mx-auto px-10 py-10 w-full rounded-lg">
                      <img src="/assets/images/testimonials-user-4.png"  width={250} height={250}/>
                      <div className="mt-10">
                        <h3 className="text-yellow-500 font-bold text-3xl pb-5">2022 Q1-Q2</h3>
                        <p className=" text-xl h-9">CodoVerse Launch</p>
                        <p className=" text-xl h-9">New Partnerships</p>
                        <p className=" text-xl h-9">CODO DAO Launch</p>
                        <p className=" text-xl h-9">Loading New Steps</p>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                )}
        </div>
      </section>
    </main>
  );
}

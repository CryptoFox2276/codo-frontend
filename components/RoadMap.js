import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from "swiper";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';

const RoadMapData = [
    {
        title: "2022 Q3-Q4",
        content: "Project Start Website Launch CODO Smart Contracts Whitepaper Launch Social Media Launch"
    },
    {
        title: "2022 Q1-Q2",
        content: "Marketing Activities Smart Contracts Audit Presale Start Token Claim Token Listing Burn Presale 2 Unsold tokens CodoHub Testnet Codo Vip Club Publish Community Expansion"
    },
    {
        title: "2022 Q2-Q3",
        content: "CodoHub Publish (Beta) CodoHub Vip Club INO New Partnerships First IGO Start Marketplace launch (Beta) New Exchanges"
    },
]

const RoadMap = () => {
    return (
        <section id="roadmap">
            <div className="container m-auto">
                <div className="container-header">
                    <div className="title">RoadMap</div>
                </div>
                <div className="container-body">
                    <div className="swap-container">
                        <Swiper
                            slidesPerView={3}
                            centeredSlides={true}
                            spaceBetween={30}
                            pagination={{
                                type: 'fraction',
                            }}
                            navigation={true}
                            autoplay={{
                                delay: 500,
                            }}
                            modules={[Navigation, Autoplay]}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className="roadmapSwiper"
                        >
                            {RoadMapData.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <RoadMapItem title={item.title} content={item.content}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="timeline-container">
                        <VerticalTimeline 
                            layout="2-columns"
                            lineColor={'#F7931A'}
                        >
                            {RoadMapData.map((item, index) => (
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{background: 'none', color: '#fff', border: 'none', boxShadow: 'none', paddingTop: '0'}}
                                    contentArrowStyle={{border: 'none'}}
                                    iconClassName={index % 2 ? 'element-icon-right':'element-icon-left'}
                                    iconStyle={{padding: '10px', background: '#F7931A', color: '#000', fontWeight: 'bold', border: 'none', boxShadow: 'unset', textAlign: 'center'}}
                                    icon={("0" + (index + 1)).substring(-2)}
                                >
                                    <div className="content-title">{item.title}</div>
                                    <div className="content-text">{item.content}</div>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                </div>
            </div>
        </section>
    )
}

const RoadMapItem = ({title, content}) => {
    return (
        <div className="box">
            <div className="box-header">{title}</div>
            <div className="box-content">{content}</div>
        </div>
    )
}

export default RoadMap;
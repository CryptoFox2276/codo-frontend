import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import Link from "next/link";

const DefiIntegration = () => {
    return (
        <section id="defi-integration">
            <div className="container m-auto">
                <div className="container-header">
                    <h1 className="title">DeFi Integration</h1>
                    <Link href="#">
                        <p className="btn text-uppercase text-center text-sm font-semibold leading-6 text-white bg-gray-700 px-3 py-2 hidden lg:block my-auto">
                            TELEGRAM
                        </p>
                    </Link>
                </div>
                <div>
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{background: 'rgb(0,0,0)', color: '#fff'}}
                            contentArrowStyle={{border: 'none'}}
                            iconClassName="element-icon-left"
                            iconStyle={{background: 'rgb(0,0,0)', borderColor: 'rgb(136,211,232)', borderWidth: '3px', borderStyle: 'solid', boxShadow: 'unset'}}
                            icon={<NumberTextIcon data="01"/>}
                        >
                            <div className="content-title">Empower Your Investments</div>
                            <div className="content-text">With Codo Finance, utilize sophisticated DeFi tools to enhance project participation</div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{background: 'rgb(0,0,0)', color: '#fff'}}
                            contentArrowStyle={{border: 'none'}}
                            iconClassName="element-icon-right"
                            iconStyle={{background: 'rgb(0,0,0)', borderColor: 'rgb(245,160,30)', borderWidth: '3px', borderStyle: 'solid', boxShadow: 'unset'}}
                            icon={<NumberTextIcon data="02" customizedStyle={{background: 'rgb(245,160,30)'}}/>}
                        >
                            <div className="content-title text-left lg:text-right">Customizable Portfolios</div>
                            <div className="content-text text-left lg:text-right">
                                <span>Refine portfolios with advanced, </span>
                                <br/>
                                <span>customizable strategies</span>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{background: 'rgb(0,0,0)', color: '#fff'}}
                            contentArrowStyle={{border: 'none'}}
                            iconClassName="element-icon-left"
                            iconStyle={{background: 'rgb(0,0,0)', borderColor: 'rgb(59,81,101)', borderWidth: '3px', borderStyle: 'solid', boxShadow: 'unset'}}
                            icon={<NumberTextIcon data="03" customizedStyle={{background: 'rgb(59,81,101)'}}/>}
                        >
                            <div className="content-title">Empower Your Investments</div>
                            <div className="content-text">Optimize involvement in projects with advanced Codo tools.</div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{background: 'rgb(0,0,0)', color: '#fff'}}
                            contentArrowStyle={{border: 'none'}}
                            iconClassName="element-icon-right"
                            iconStyle={{background: 'rgb(0,0,0)', borderColor: 'rgb(0,151,166)', borderWidth: '3px', borderStyle: 'solid', boxShadow: 'unset'}}
                            icon={<NumberTextIcon data="04" customizedStyle={{background: 'rgb(0,151,166)'}}/>}
                        >
                            <div className="content-title text-left lg:text-right">Dynamic Crypto Alignment.</div>
                            <div className="content-text text-left lg:text-right">
                            Align investments with the dynamic <br/> crypto ecosystem using Codo Finance</div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{background: 'rgb(0,0,0)', color: '#fff'}}
                            contentArrowStyle={{border: 'none'}}
                            iconClassName="element-icon-left"
                            iconStyle={{background: 'rgb(0,0,0)', borderColor: 'rgb(255,255,255)', borderWidth: '3px', borderStyle: 'solid', boxShadow: 'unset'}}
                            icon={<NumberTextIcon data="05" customizedStyle={{background: 'rgb(255, 255, 255)'}}/>}
                        >
                            <div className="content-title">Empower Your Investments</div>
                            <div className="content-text">Effectively manage investment risks on our platform.</div>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
            </div>
        </section>
    )
}

const NumberTextIcon = ({data, customizedStyle}) => {
    return (
        <span className="icon-label" style={customizedStyle}>{data}</span>
    )
}

export default DefiIntegration;
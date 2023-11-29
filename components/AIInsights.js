import Link from "next/link";

const AIInsights = () => {
    return (
        <section id="ai-insights">
            <div className="container m-auto">
                <div className="container-header">
                    <span className="title">AI-Driven Insights</span>
                    <Link href="#">
                        <p className="btn hidden">
                            WHITEPAPER <img src="/assets/images/icons/ArrowRight.png" />
                        </p>
                    </Link>
                </div>
                <div className="codo-coin-img">
                    <img src="/assets/images/codo-coin-2.png" />
                </div>
                <div className="container-body">
                    <div className="flex flex-col gap-10 z-10 m-auto">
                        <div className="text-box">
                            <div className="text-box-header">
                                Invest Intelligently.
                            </div>
                            <div className="text-box-content">
                                Our platform leverages integrated AI to cut through the market clutter.
                            </div>
                        </div>
                        <div className="text-box">
                            <div className="text-box-header">
                                Actionable Insights.
                            </div>
                            <div className="text-box-content">
                                Receive actionable insights that streamline complex investment decisions.
                            </div>
                        </div>
                    </div>
                    <div className="z-10 my-auto">
                        <img src="/assets/images/codo-coin-1.png" width={230} />
                    </div>
                    <div className="flex flex-col gap-10 z-10 m-auto">
                        <div className="text-box">
                            <div className="text-box-header">
                            Clearer, Informed Choices.
                            </div>
                            <div className="text-box-content">
                            Ensure your choices are clearer, more informed, and robustly data-driven.
                            </div>
                        </div>
                        <div className="text-box">
                            <div className="text-box-header">
                            Data-Driven Confidence.
                            </div>
                            <div className="text-box-content">
                            Confidently navigate the market with our platform's data-driven approach.
                            </div>
                        </div>
                    </div>
                    <div className="line line-one"></div>
                    <div className="line line-two"></div>
                </div>
                    <div className="btn-whitepaper pt-10 m-auto max-w-max">
                        <Link href="#">
                            <p className="btn text-center px-3 py-2 flex justify-center gap-3">
                                WhitePaper <img src="/assets/images/icons/ArrowRight.png" />
                            </p>
                        </Link>
                    </div>
            </div>
        </section>
    )
}

export default AIInsights;
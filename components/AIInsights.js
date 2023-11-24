import Link from "next/link";

const AIInsights = () => {
    return (
        <section id="ai-insights">
            <div className="container m-auto">
                <div className="container-header">
                    <h1 className="title">AI-Driven Insights</h1>
                    <Link href="#">
                        <p className="btn text-uppercase text-center text-sm font-semibold leading-6 text-white bg-gray-700 px-3 py-2 hidden lg:block my-auto">
                            whitepaper
                        </p>
                    </Link>
                </div>
                <div className="container-body">
                    <div className="flex flex-col gap-10 z-10">
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
                    <div className="flex flex-col gap-10 z-10">
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
            </div>
        </section>
    )
}

export default AIInsights;
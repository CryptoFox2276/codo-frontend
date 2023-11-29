import Link from "next/link";

const CuratedProject = () => {
    return (
        <section id="curated-project">
            <div className="container m-auto">
                <div className="container-body">
                    <div className="container-body-text">
                        <div className="container-header">
                            <h1 className="title pb-20">Curated Project Selection</h1>
                            <Link href="#">
                                <p className="btn">
                                    Buy Now <img src="/assets/images/icons/ArrowRight.png" />
                                </p>
                            </Link>
                        </div>
                        <div className="content">
                            <div className="content-icon">
                                <div className="content-icon-board">
                                    <img src="/assets/images/icons/icon-2.png" width={100} height={100}/>
                                </div>
                            </div>
                            <div>
                                <div className="content-title">
                                    <h3>Explore with Confidence.</h3>
                                </div>
                                <div className="content-text">
                                    Codo Finance meticulously selects the most promising crypto projects across a diverse spectrum, from memes and gaming to AI and beyond.
                            </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="content-icon">
                                <div className="content-icon-board">
                                    <img src="/assets/images/icons/icon-1.png" width={100} height={100}/>
                                </div>
                            </div>
                            <div>
                                <div className="content-title">
                                    <h3>Premium Opportunity Landscape.</h3>
                                </div>
                                <div className="content-text">
                                    Providing our investors with access to a premium, multifaceted opportunity landscape.
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-body-img">
                        <img src="/assets/images/layer5.png" className=" m-auto" style={{height: '498px'}}/>
                    </div>
                    <div className="btn-buy-now pt-10 m-auto">
                        <Link href="#">
                            <p className="btn text-uppercase text-center px-3 py-2 flex gap-3">
                                Buy Now <img src="/assets/images/icons/ArrowRight.png" />
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CuratedProject;
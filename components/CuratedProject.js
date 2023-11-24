const CuratedProject = () => {
    return (
        <section id="curated-project">
            <div className="container m-auto">
                <div className="container-body">
                    <div className="container-body-text">
                        <h1 className="title pb-20">Curated Project</h1>
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
                        <img src="/assets/images/layer5.png" className=" m-auto"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CuratedProject;
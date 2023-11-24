import Link from "next/link";

const CDEcosystem = () => {
    return (
        <section id="codo-ecosystem">
            <div className="container m-auto">
                <div className="container-header">
                    <h1 className="title">All you need about Codo Ecosystem</h1>
                </div>
                <div className="container-body">
                    <EcosystemBox index="01" header="Explore Opportunities:" content={"Join Codo Ecosystem to connect with high-potential projects in memes, gaming, and AI."} iconStyle={{backgroundColor: '#86D5E5'}}/>
                    <EcosystemBox index="02" header="Innovative Launchpad:" content={"Experience an innovative launchpad connecting you with diverse industries."} iconStyle={{backgroundColor: '#79919C'}}/>
                    <EcosystemBox index="03" header="Earn While Learning:" content={"Participate in DeFi and AI tools for a seamless earning and learning experience."} iconStyle={{backgroundColor: '#F5A11E'}}/>
                    <EcosystemBox index="04" header="Token Purchase:" content={"Secure your spot by purchasing Codo tokens now."} iconStyle={{backgroundColor: '#FFF'}}/>
                    <EcosystemBox index="05" header="Stake and Grow:" content={"Maximize earnings by staking your purchased tokens."} iconStyle={{backgroundColor: '#F7931A'}}/>
                    <EcosystemBox index="06" header="Dive into the Future:" content={"Hurry to be part of a dynamic ecosystem, where growth and learning converge."} iconStyle={{backgroundColor: '#89CDEC'}}/>
                </div>
                <div className="container-body">
                </div>
            </div>
        </section>
    )
}

const EcosystemBox = ({index, header, content, iconStyle}) => {
    return (
        <div className="ecosystem-box">
            <div className="box-icon" style={iconStyle}>
                <span>{index}</span>
            </div>
            <div className="box-body">
                <div className="box-body-header">
                    {header}
                </div>
                <div className="box-body-content">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default CDEcosystem;
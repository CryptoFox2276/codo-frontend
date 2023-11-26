import Link from "next/link";

const how_to_buy_data = [
    {
        text: "01",
        icon: "/assets/images/icons/solar_wallet-linear.png",
        header: "Get an ERC-20 Wallet",
        content: "To join the Codo Finance token sale, first, acquire an ERC-20 supported wallet. We recommend MetaMask or Trust Wallet for both desktop and mobile. Download from their official sites if you don't have one."
    },
    {
        text: "02",
        icon: "/assets/images/icons/carbon_connect.png",
        header: "Connect Your ERC-20 Wallet",
        content: "Get an ERC-20 wallet and connect it to our website by clicking 'Connect Wallet.' Check your Ethereum balance to ensure you have enough for the token sale."
    },
    {
        text: "03",
        icon: "/assets/images/icons/icon-park-outline_buy.png",
        header: "Buy Codo Tokens",
        content: "With your connected wallet, buy Codo tokens on our site using Ethereum (ETH). Specify the ETH amount, and the website will automatically calculate the equivalent in CODO tokens. Double-check transaction details before confirming."
    },
    {
        text: "04",
        icon: "/assets/images/icons/carbon_money.png",
        header: "Await Sale Conclusion",
        content: "After purchase, view your token balance in the sales panel. Note that tokens won't be transferable until the sale concludes. Stay tuned to our social channels for updates and instructions on claiming your tokens post-sale. Track progress on the website."
    },
]

const HowToBuy = () => {
    return (
        <section id="how-to-buy">
            <div className="container m-auto">
                <div className="container-header">
                    <h1 className="title">How To Buy and Stake</h1>
                    <Link href="#">
                        <p className="btn flex gap-3 justify-center text-uppercase text-center m-auto mr-0 px-3 py-2">
                            Buy Now <img src="/assets/images/icons/ArrowRight.png" />
                        </p>
                    </Link>
                </div>
                <div className="container-body">
                    {
                        how_to_buy_data.map((item, index) => (
                            <HowToBuyBox key={index} text={item.text} icon={item.icon} header={item.header} content={item.content} />
                        ))
                    }
                </div>
                <div className="btn-buy-now pt-10 m-auto">
                    <Link href="#">
                        <p className="btn flex gap-3 justify-center text-uppercase text-center m-auto px-3 py-2">
                            Buy Now <img src="/assets/images/icons/ArrowRight.png" />
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

const HowToBuyBox = ({text, icon, header, content}) => {
    return (
        <div className="content-box">
            <div className="box-icon">
                <div className="text">{text}</div>
                <div className="icon"><img src={icon} /></div>
            </div>
            <div className="box-header">
            {header}
            </div>
            <hr />
            <div className="box-content">
            {content}
            </div>
        </div>
    )
}

export default HowToBuy;
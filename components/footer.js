import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="container m-auto">
        {/* <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-x-52 px-10"> */}
        <div className="container-body flex lg:flex-row sm:flex-col flex-wrap justify-between gap-10">
          <div className="mark-content">
            <img src="/assets/images/logo.png" width={240}/>
            <div>Take your crypto to the next level</div>
          </div>
          <div className="flex flex-row gap-10 text-center menu-list">
            <div className="social-content-mobile">
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/twitter.png" className="pr-2" />
              </div>
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/telegram.png" className="pr-2" />
              </div>
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/discord.png" className="pr-2" />
              </div>
            </div>
            <div className="menu-content">
              <div className="subtitle">Menu</div>
              <div><Link href="#">Home</Link></div>
              <div><Link href="#">Token Sales</Link></div>
              <div><Link href="#">Staking & Rewards</Link></div>
              <div><Link href="#">About Us</Link></div>
              <div><Link href="#">Contact</Link></div>
              <div><Link href="#">FAQs</Link></div>
            </div>
            <div className="support-content">
              <div className="subtitle">Support</div>
              <div><Link href="#">FAQs</Link></div>
              <div><Link href="#">Contact</Link></div>
              <div><Link href="#">Terms</Link></div>
            </div>
            <div className="social-content">
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/twitter.png" className="pr-2" /> <span>Twitter</span>
              </div>
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/telegram.png" className="pr-2" /> <span>Telegram</span>
              </div>
              <div className="flex items-center pb-2">
                <img src="/assets/images/icons/discord.png" className="pr-2" /> <span>Discord</span>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right">
            © copyright 2023 by codo.finance
        </div>
      </div>
    </footer>
  );
}

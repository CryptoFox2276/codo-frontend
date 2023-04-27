export default function Footer() {
  return (
    <footer className="text-white py-10">
      <div className="container m-auto">
        {/* <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-x-52 px-10"> */}
        <div className="flex flex-row flex-wrap gap-20 justify-between px-10">
          <div>
            <div className="text-left">
              <div className="mb-5 text-uppercase text-2xl font-bold">Docs</div>
              <ul>
                <li>Whitepape</li>
                <li>Litepaper</li>
                <li>Pitchdeck</li>
                <li>Gitbook</li>
              </ul>
              <hr className="mt-5 w-1/2"/>
            </div>
            <div className="md:mt-20 sm:mt-10">
              <div className="mb-5 text-uppercase text-2xl font-bold">
                codomail:
              </div>
              <ul>
                <li>
                  Buying assistance: &nbsp; <span className="text-email">sale@codo.finance</span>
                </li>
                <li>
                  General enquiries: &nbsp; <span className="text-email">admin@codo.finance</span>
                </li>
                <li>
                  Marketing: &nbsp; <span className="text-email">marketing@codo.finance</span>
                </li>
                <li>
                  Press: <span className="text-email">pr@codo.finance</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div className="mb-5 text-uppercase text-2xl text-bold text-center">
                our socials
              </div>
              <div className="grid grid-cols-4 gap-4 sm:gap-6 xs:gap-6 justify-center">
                
                <div className="m-auto">
                  <img src="/assets/images/002-instagram.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/003-telegram.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/004-twitter.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/001-facebook.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/medium.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/006-youtube.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/005-reddit.png" />
                </div>
                <div className="m-auto">
                  <img src="/assets/images/discord.png" width={64}/>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="mb-5 text-uppercase text-2xl font-bold text-left">
                Navigation
              </div>
              <ul>
                <li>Home</li>
                <li>Pesale</li>
                <li>F.A.Q</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center py-20">
            <img src="/assets/images/codo-footer.png" width={300}/>
          </div>
        </div>
        <div className="flex justify-center pb-20">
          <p className="text-white text-xl font-bold text-center">
            © copyright 2023 by codo.finance
          </p>
        </div>
      </div>
    </footer>
  );
}

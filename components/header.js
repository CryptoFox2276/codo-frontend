import React from "react";
import Link from "next/link";
import { useState } from "react";
import { eth } from "../state/eth";

export default function Header() {
  const {
    walletConnected,
    address,
    saleActive,
    startTime,
    connectWallet,
    disConnectWallet,
  } = eth.useContainer();
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const onConnectWallet = () => {
    connectWallet();
  };

  const onDisconnect = () => {
    disConnectWallet();
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-gray-900">
      <nav
        className="flex items-center p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:pr-8">
          <Link href="/" className="-m-1.5 p-1.5">
            <span>
              <span className="sr-only">CODO</span>
              <img
                className="h-8 w-auto h-auto cursor-pointer"
                src="/assets/images/CODO.png"
                alt=""
              />
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={handleClick}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex border-l-3 lg:pl-5 header-menu">
          <a
            href="#"
            className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white"
          >
            Home
          </a>
          <a href="#" className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white">
            Token Sales
          </a>
          <a href="#" className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white">
            Staking & Rewards
          </a>
          <a
            href="#"
            className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white"
          >
            RoadMap
          </a>

          <a
            href="#"
            className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white"
          >
            About Us
          </a>

          <a
            href="#"
            className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white"
          >
            Contact
          </a>
          <a
            href="#"
            className="menu-item text-sm font-semibold leading-6 px-3 py-2 rounded text-white"
          >
            FAQs
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-end lg:gap-x-6 lg:m-auto lg:mr-0">
          {saleActive && Date.now() - new Date(startTime) >= 0 && (
            <Link href="/presale">
              <p className="btn text-uppercase text-center text-sm font-semibold leading-6 text-white bg-gray-700 px-3 py-2">
                Buy Now
              </p>
            </Link>
          )}
          {address ? (
            <a onClick={onDisconnect} className="btn btn-bg-colored">
              {address}
            </a>
          ) : (
            <a onClick={onConnectWallet} className="btn btn-bg-colored">
              CONNECT WALLET
            </a>
          )}
        </div>
      </nav>
      {active && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span>
                  <span className="sr-only">CODO</span>
                  <img
                    className="h-8 w-auto h-auto"
                    src="/assets/images/CODO.png"
                    alt=""
                  />
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleClick}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 mb-5 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    HOME
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Token Sale
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Staking & Rewards
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    About Us
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    FAQs
                  </a>
                </div>
              </div>
            </div>
            {saleActive && (
              <>
                <Link href="/presale">
                  <p className="w-2/3 text-uppercase text-lg font-semibold leading-6 text-white bg-sky-600 btn rounded-lg text-center px-3 py-2 mb-5">
                    Buy Now
                  </p>
                </Link>
                <Link href="/">
                  <p className="w-2/3 text-uppercase text-lg font-semibold leading-6 text-white bg-sky-600 btn rounded-lg text-center px-3 py-2 mb-5">
                    Staking
                  </p>
                </Link>
              </>
            )}
            {address ? (
              <p
                className="w-2/3 text-uppercase text-lgt font-semibold leading-6 text-white bg-sky-600 btn rounded-lg text-center px-3 py-2 mb-5"
                onClick={onDisconnect}
              >
                {address}
              </p>
            ) : (
              <p
                className="w-2/3 text-uppercase text-lgt font-semibold leading-6 text-white bg-sky-600 btn rounded-lg text-center px-3 py-2 mb-5"
                onClick={onConnectWallet}
              >
                CONNECT WALLET
              </p>
            )}

            <div className="grid grid-cols-4 gap-4 sm:gap-6 xs:gap-6 justify-center">
              <div className="m-auto">
                <img src="/assets/images/004-twitter.png" />
              </div>
              <div className="m-auto">
                <img src="/assets/images/003-telegram.png" />
              </div>
              <div className="m-auto">
                <img src="/assets/images/discord.png" width={64} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

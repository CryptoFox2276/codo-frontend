const DocumentSection = () => {
    return (
        <section id="document" className="px-5">
        <div className="container m-auto">
          <div className="grid sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-20 md:px-20 sm:px-10 xs:px-10">
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">Whitepaper</p>
              <a className="flex gap-10 m-auto border rounded-lg border-gray-700 max-w-max  px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="whitepaper" width="30"/> PDF</a>
            </div>
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">KYC</p>
              <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="kyc" width="30"/> PDF</a>
            </div>
            <div className="border border-slate-700 rounded-lg p-5">
              <p className="sub-title title-30 text-uppercase text-center">AUDIT</p>
              <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="audit" width="30"/> PDF</a>
            </div>
          </div>
        </div>
			  <div className="container m-auto">
            <div className="grid sm:grid-cols-1 xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-20 md:px-20 sm:px-10 xs:px-10">
              <div className="border border-slate-700 rounded-lg p-5">
                <p className="sub-title title-30 text-uppercase text-center">Litepaper</p>
                <a className="flex gap-10 m-auto border rounded-lg border-gray-700 max-w-max  px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="whitepaper" width="30"/> PDF</a>
              </div>
              <div className="border border-slate-700 rounded-lg p-5">
                <p className="sub-title title-30 text-uppercase text-center">Pitchdeck</p>
                <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/download.png" alt="kyc" width="30"/> PDF</a>
              </div>
              <div className="border border-slate-700 rounded-lg p-5">
                <p className="sub-title title-30 text-uppercase text-center">Gitbook</p>
                <a className="flex gap-10 m-auto border-gray-700 max-w-max border rounded-lg px-5 py-1 cursor-pointer"><img src="/assets/images/link.png" alt="audit" width="30"/> Click</a>
              </div>
          </div>
        </div>
      </section>
    )
}

export default DocumentSection;
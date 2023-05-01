const Modal = (props) => {
  const {
    handleClose,
    show,
    title,
    isEth,
    price,
    priceETH,
    amount,
    setAmount,
    codo,
    setCodo,
    isExchange,
    isApproved,
    isLoading,
    setIsExchange,
    onConfirm,
    onApprove,
    onSetMaxAmount,
    children,
  } = props;
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main lg:w-1/3 md:w-1/2 w-4/5">
        <div className="modal-header">
          <p className="title lg:text-3xl text-lg text-uppercase">{title}</p>
          <button type="button " onClick={handleClose} className="close-btn">
            <svg
              viewport="0 0 12 12"
              version="1.1"
              width={25}
              height={25}
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="13"
                x2="13"
                y2="1"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="1"
                x2="13"
                y2="13"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <div className="modal-content lg:px-10 px-3 lg:pt-10 lg:pb-6 pt-6 pb-3">
          <div className="flex flex-col justify-center mb-5">
            {isEth ? (
              <span className=" float-right text-center text-lg">
                1 CODO = {parseFloat(priceETH).toFixed(8)} ETH
              </span>
            ) : (
              <span className=" float-right text-center text-lg">
                1 CODO = {price} USDT
              </span>
            )}
          </div>
          {isExchange ? (
            <>
              <div className="flex flex-col justify-center mb-5">
                <div className="mb-1 text-xl font-bold">CODO</div>
                <input
                  type="number"
                  className="px-5 py-2 rounded-lg"
                  value={codo}
                  min={0}
                  step={1}
                  pattern="[1-9][0-9]*"
                  placeholder="0.0"
                  onChange={(e) => setCodo(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="flex justify-end">
                <img
                  src="/assets/images/exchange.svg"
                  alt="exchange"
                  width={25}
                  onClick={() => setIsExchange(!isExchange)}
                />
              </div>
              <div className="flex flex-col justify-center mb-5">
                <div className="mb-1 text-xl font-bold">
                  {isEth ? "ETH" : "USDT"}
                </div>
                <input
                  type="number"
                  min={0}
                  className="px-5 py-2 rounded-lg"
                  value={amount}
                  placeholder="0.0"
                  // onChange={(e) => setAmount(e.target.value)}
                  readOnly
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center mb-5">
                <div className="mb-1 text-xl font-bold">
                  {isEth ? "ETH" : "USDT"}
                  <span className="btn-max" onClick={onSetMaxAmount}>Max</span>
                </div>
                <input
                  type="number"
                  min={0}
                  className="px-5 py-2 rounded-lg"
                  value={amount}
                  placeholder="0.0"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <img
                  src="/assets/images/exchange.svg"
                  alt="exchange"
                  width={25}
                  onClick={() => setIsExchange(!isExchange)}
                />
              </div>
              <div className="flex flex-col justify-center mb-5">
                <div className="mb-1 text-xl font-bold">CODO</div>
                <input
                  type="number"
                  min={0}
                  step={1}
                  className="px-5 py-2 rounded-lg"
                  pattern="[1-9][0-9]*"
                  value={codo}
                  placeholder="0.0"
                  // onChange={(e) => setCodo(parseInt(e.target.value, 10))}
                  readOnly
                />
              </div>
            </>
          )}
          <div className="flex justify-center mt-20">
          {!isEth && !isApproved ? (
            isLoading ? (
              <button className="btn rounded-full text-2xl text-uppercase" onClick={onApprove} disabled={true}>
                Loading...
              </button>
              ) : (
              <button className="btn rounded-full text-2xl text-uppercase" onClick={onApprove}>
                Approve
              </button>
             )
          ) : (
            isLoading ? (
              <button className="btn rounded-full text-2xl text-uppercase" onClick={onApprove} disabled={true}>
                Loading...
              </button>
            ) : (
              <button className="btn rounded-full text-2xl text-uppercase" onClick={onConfirm}>
                BUY
              </button>
            )
          )}
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modal;

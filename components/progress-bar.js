const ProgressBar = (props) => {
  const { bgcolor, completed, label } = props;

  const containerStyles = {
    height: 4,
    width: "100%",
    backgroundColor: "rgba(255, 170, 0, 24%)",
    borderRadius: 50,
    fontSize: 12,
    // margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <div style={containerStyles} className="progressbar-container">
      <div style={fillerStyles} className="progressbar-filler">
      {
        label ? (
          <span className="progressbar-label pr-1">{`${completed}%`}</span>
        ) : (<span></span>)
      }        
      </div>
    </div>
  );
};

export default ProgressBar;

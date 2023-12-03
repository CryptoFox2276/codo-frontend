const ClaimModal = ({onClose, children, title}) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };
    return (
        <div className="claim-modal modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-body">
                        <div className="content-title">
                            <img src="/assets/images/icons/warning-icon.png" style={{width: '64px', margin:'auto'}}/>
                        </div>
                        <div className="content-body">
                            <p>Claiim is not live yet</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group">
                            <button className="btn" onClick={handleCloseClick} >{'OK'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClaimModal;
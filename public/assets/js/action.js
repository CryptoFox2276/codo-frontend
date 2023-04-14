(function($) {
    
    "use strict";    

    var isCopiedTokenAddress = false;
    var isCopiedPresaleAddress = false;
    $("#token_address_copy_icon").on('click', function () {
        var copyText = $("#token_address").text();
        isCopiedTokenAddress = !isCopiedTokenAddress;
        if (isCopiedTokenAddress) {
            navigator.clipboard.writeText(copyText);
            $('#tokenAddressToolTip').text('Copied');
        } else {
            navigator.clipboard.writeText('');
            $('#tokenAddressToolTip').text('Copy');
        }
    });

    $("#presale_address_copy_icon").on('click', function () {
        var copyText = $("#presale_address").text();
        isCopiedPresaleAddress = !isCopiedPresaleAddress;
        if (isCopiedPresaleAddress) {
            navigator.clipboard.writeText(copyText);
            $('#presaleAddressToolTip').text('Copied');
        } else {
            navigator.clipboard.writeText('');
            $('#presaleAddressToolTip').text('Copy');
        }
    });

    $("#connect-wallet").on('click', function() {
        $("#nonconnect").removeClass('d-block');
        $("#connected").addClass('d-block');
    })

})(jQuery);
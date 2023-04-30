(function($) {
    
    "use strict";
    






    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });


    //===== Prealoder
    
    if ($('.preloader').length) {
        $('.preloader').fadeOut();
    }





    if ($('.accrodion-grp').length) {
        var accrodionGrp = $('.accrodion-grp');
        accrodionGrp.each(function () {
            var accrodionName = $(this).data('grp-name');
            var Self = $(this);
            var accordion = Self.find('.accrodion');
            Self.addClass(accrodionName);
            Self.find('.accrodion .accrodion-content').hide();
            Self.find('.accrodion.active').find('.accrodion-content').show();
            accordion.each(function () {
                $(this).find('.accrodion-title').on('click', function () {
                    if ($(this).parent().parent().hasClass('active') === false) {
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').removeClass('active');
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
                        $(this).parent().parent().addClass('active');
                        $(this).parent().parent().find('.accrodion-content').slideDown();
                    };


                });
            });
        });

    };








    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 110) {
            $(".header-nav").removeClass("sticky");
        } else{
            $(".header-nav").addClass("sticky");
        }
    });
    

    var walletText = function(){
        $(".connect-wallet").text("Coming Soon");
    },
        walletText2s = function(){
        $(".connect-wallet").text("Connect Wallet");
    };
    
    $( ".connect-wallet" ).mouseenter( walletText ).mouseleave( walletText2s );

    var walletText2 = function(){
        $(".connect-wallet2").text("Coming Soon");
    },
        walletText2s2 = function(){
        $(".connect-wallet2").text("Market Place");
    };
    
    $( ".connect-wallet2" ).mouseenter( walletText2 ).mouseleave( walletText2s2 );


    var walletText3 = function(){
        $(".connect-wallet3").text("Coming Soon");
    },
        walletText2s3 = function(){
        $(".connect-wallet3").text("Claim Sale");
    };
    
    $( ".connect-wallet3" ).mouseenter( walletText3 ).mouseleave( walletText2s3 );





    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 90;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });





    

    //===== brand slide slick slider
    $('.brand-active').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                }
        },{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 4,
                }
        },
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    slidesToShow: 4,
                }
        },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                }
        },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                }
        }
      ]
    });
    //===== screenshot slide slick slider
    $('.screenshot-active').slick({
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
        speed: 1000,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                }
        },{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                }
        },
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                }
        },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                }
        },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                }
        }
      ]
    });




    //===== testimonials slide slick slider
    
    $('.testimonials-content-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,  
        prevArrow: '<span class="prev"><i class="flaticon-left"></i></span>',
        nextArrow: '<span class="next"><i class="flaticon-right"></i></span>',  
        fade: false,
        asNavFor: '.testimonials-thumb'
    });
    $('.testimonials-thumb').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.testimonials-content-slide',
        dots: false,
        arrows: false,  
        centerMode: true,
        fade: true,
        focusOnSelect: true
    });
    
    
    //====== Magnific Popup
    
    $('.video-popup').magnificPopup({
        type: 'iframe'
        // other options
    });
    
    

    //===== Odometer js

    $('.odometer').appear(function(e) {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });




    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 250, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    
    
    //===== Back to top
    
    // Scroll Event
    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });

    // Click Event
    $('.go-top').on('click', function () {
        $("html, body").animate({
            scrollTop: "0"
        }, 1200);
    });


   //===== pricing plan js active

    if ($('#switch-toggle-tab').length) {
        var toggleSwitch = $('#switch-toggle-tab label.switch');
        var TabTitle = $('#switch-toggle-tab li');
        var monthTabTitle = $('#switch-toggle-tab li.month');
        var yearTabTitle = $('#switch-toggle-tab li.year');
        var monthTabContent = $('#month');
        var yearTabContent = $('#year');
        // hidden show deafult;
        monthTabContent.fadeIn();
        yearTabContent.fadeOut();

        function toggleHandle() {
            if (toggleSwitch.hasClass('on')) {
                yearTabContent.fadeOut();
                monthTabContent.fadeIn();
                monthTabTitle.addClass('active');
                yearTabTitle.removeClass('active');
            } else {
                monthTabContent.fadeOut();
                yearTabContent.fadeIn();
                yearTabTitle.addClass('active');
                monthTabTitle.removeClass('active');
            }
        };
        monthTabTitle.on('click', function () {
            toggleSwitch.addClass('on').removeClass('off');
            toggleHandle();
            return false;
        });
        yearTabTitle.on('click', function () {
            toggleSwitch.addClass('off').removeClass('on');
            toggleHandle();
            return false;
        });
        toggleSwitch.on('click', function () {
            toggleSwitch.toggleClass('on off');
            toggleHandle();
        });
    }

    // mobile menu

    if ($('.main-nav__main-navigation').length) {
        let mobileNavContainer = $('.mobile-nav__container');
        let mainNavContent = $('.main-nav__main-navigation').html();



        mobileNavContainer.append(function () {
            return mainNavContent;
        });



        //Dropdown Button
        mobileNavContainer.find('li.dropdown .dropdown-btn').on('click', function (e) {
            $(this).toggleClass('open');
            $(this).parent().parent().children('ul').slideToggle(500);
            e.preventDefault();
        });

        // dynamic current class
        let mainNavUL = $('.main-nav__main-navigation').find('.main-nav__navigation-box');
        let mobileNavUL = mobileNavContainer.find('.main-nav__navigation-box');

        // dynamicCurrentMenuClass(mainNavUL);
        // dynamicCurrentMenuClass(mobileNavUL);


    }

    if ($('.side-menu__toggler').length) {
        $('.side-menu__toggler').on('click', function (e) {
            $('.side-menu__block').toggleClass('active');
            e.preventDefault();
        });
    }
    
    

    var current_progress = 0;
    var stop_progress = 71;
    var interval = setInterval(function() {
        current_progress += stop_progress % 2;
        $("#progressbar")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Sold");
        if (current_progress >= stop_progress)
            clearInterval(interval);
    }, 20);


    
})(jQuery);
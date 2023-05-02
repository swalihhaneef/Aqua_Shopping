/*-----------------------------------------------------------------------------------

    Theme Name: Smartshop - Responsive eCommerce Admin Dashboard
    Description: Responsive Admin Dashboard Template
    Author: Chitrakoot Web
    Version: 1.1
        
    ---------------------------------- */

    $(document).ready(function() {
        "use strict";
        $("#preloader").fadeOut("normall", function() {
            $(this).remove()
        }),
        $(window).on("scroll", function() {
            500 < $(this).scrollTop() ? $(".scroll-to-top").fadeIn(400) : $(".scroll-to-top").fadeOut(400)
        }),
        $(".scroll-to-top").on("click", function(e) {
            e.preventDefault(),
            $("html, body").animate({
                scrollTop: 0
            }, 600)
        });
        var e = !1
          , t = !1
          , l = $("body");
        $(".page-header"),
        $(".page-sidebar"),
        $(".page-content");
        $(function() {
            $('[data-toggle="popover"]').popover()
        }),
        $(function() {
            $('[data-bs-toggle="tooltip"]').tooltip()
        });
        0 !== $(".copy-clipboard").length && (new ClipboardJS(".copy-clipboard"),
        $(".copy-clipboard").on("click", function() {
            var e = $(this);
            e.text();
            e.text("Copied"),
            setTimeout(function() {
                e.text("Copy")
            }, 2e3)
        }));
        $(".accordion-menu .has-sub.active-page > a").addClass("active"),
        $(".page-sidebar-inner").slimScroll({
            height: "100%"
        }).mouseover(),
        l.hasClass("page-sidebar-fixed") && !1 === e && (e = !0),
        !0 === e && (l.addClass("page-sidebar-fixed"),
        $("#fixed-sidebar-toggle-button").removeClass("icon-radio_button_unchecked"),
        $("#fixed-sidebar-toggle-button").addClass("icon-radio_button_checked")),
        $("#fixed-sidebar-toggle-button").on("click", function() {
            return l.toggleClass("page-sidebar-fixed"),
            e = !!l.hasClass("page-sidebar-fixed"),
            $(this).toggleClass("icon-radio_button_unchecked"),
            $(this).toggleClass("icon-radio_button_checked"),
            !1
        }),
        !0 === t && l.addClass("page-sidebar-collapsed"),
        $(".page-sidebar-collapsed .page-sidebar .accordion-menu").on({
            mouseenter: function() {
                $(".page-sidebar").addClass("fixed-sidebar-scroll")
            },
            mouseleave: function() {
                $(".page-sidebar").removeClass("fixed-sidebar-scroll")
            }
        }, "li"),
        $("#collapsed-sidebar-toggle-button").on("click", function() {
            return l.toggleClass("page-sidebar-collapsed"),
            t = !!l.hasClass("page-sidebar-collapsed"),
            $(".page-sidebar-collapsed .page-sidebar .accordion-menu").on({
                mouseenter: function() {
                    $(".page-sidebar").addClass("fixed-sidebar-scroll")
                },
                mouseleave: function() {
                    $(".page-sidebar").removeClass("fixed-sidebar-scroll")
                }
            }, "li"),
            !1
        }),
        $(window).width() < 768 && $("#fixed-sidebar-toggle-button").hasClass("icon-radio_button_unchecked") && $("#fixed-sidebar-toggle-button").click(),
        $(window).on("resize", function() {
            $(window).width() < 768 && $("#fixed-sidebar-toggle-button").hasClass("icon-radio_button_unchecked") && $("#fixed-sidebar-toggle-button").click()
        }),
        $("#sidebar-toggle-button").on("click", function() {
            return l.toggleClass("page-sidebar-visible"),
            !1
        }),
        $("#sidebar-toggle-button-close").on("click", function() {
            return l.toggleClass("page-sidebar-visible"),
            !1
        }),
        function() {
            $(".page-sidebar li:not(.open) .sub-menu"),
            $(".page-sidebar li.active-page > a"),
            $(".accordion-menu li ul li").parent().addClass("sub-menu"),
            $(".accordion-menu li ul").parent().addClass("has-sub");
            var e = window.location.pathname.split("/")
              , t = window.location.pathname
              , t = 0 < e[e.length - 1].length ? e[e.length - 1] : e[e.length - 2];
            $(".accordion-menu li").find('a[href="' + t + '"]').closest("li").addClass("active").parents().eq(1).addClass("active-page"),
            $(".accordion-menu .active-page > a").addClass("active"),
            $(".has-sub > a").on("click", function(e) {
                return e.preventDefault(),
                $(this).toggleClass("active"),
                $(this).next(".sub-menu").slideToggle(),
                $(this).parents().siblings(".has-sub").children(".sub-menu").slideUp().prev(".active").removeClass("active")
            })
        }(),
        $("#toggle-fullscreen").on("click", function() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT),
            !1
        }),
        $("#search-button").on("click", function() {
            l.toggleClass("search-open"),
            l.hasClass("search-open") && $(".search-form input").focus()
        }),
        $("#close-search").on("click", function() {
            l.toggleClass("search-open")
        }),
        $(".right-sidebar-toggle").on("click", function() {
            var e = $(this).data("sidebar-id");
            $("#" + e).toggleClass("visible")
        }),
        $(".chat-write form input").on("keypress", function(e) {
            if (13 === e.which && 0 === !$(this).val().length)
                $(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child").hasClass("me") ? $('<span class="chat-bubble-text">' + $(this).val() + "</span>").insertAfter(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child span:last-child") : $('<div class="chat-bubble me"><div class="chat-bubble-text-container"><span class="chat-bubble-text">' + $(this).val() + "</span></div></div>").insertAfter(".right-sidebar-chat .chat-bubbles .chat-bubble:last-child"),
                $(this).val("");
            else if (13 === e.which)
                return;
            e = $(".right-sidebar-chat").prop("scrollHeight") + "px";
            $(".right-sidebar-chat").slimscroll({
                allowPageScroll: !0,
                scrollTo: e
            })
        }),
        function() {
            $(".slimscroll").slimScroll();
            var e = $("input[type=checkbox]:not(.js-switch), input[type=radio]:not(.no-uniform)");
            0 < e.length && e.each(function() {
                $(this).uniform()
            }),
            Array.prototype.slice.call(document.querySelectorAll(".js-switch")).forEach(function(e) {
                new Switchery(e,{
                    size: "small",
                    color: "#526069"
                })
            })
        }(),
        0 !== $(".price-range").length && $(".price-range").ionRangeSlider({
            type: "double",
            grid: !0,
            min: 0,
            max: 1e3,
            from: 200,
            to: 800,
            prefix: "$"
        }),
        0 !== $(".gallery").length && $(".gallery").magnificPopup({
            delegate: ".popimg",
            type: "image",
            gallery: {
                enabled: !0
            }
        }),
        0 !== $(".gallery").length && $(".gallery").isotope({}),
        $(".current-year").text((new Date).getFullYear())
    });
    
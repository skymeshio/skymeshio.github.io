'use strict';

$(function () {

    setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);

    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    var skymesh = 'skymesh'.split('');

    var loader = $('#brand');
    var skymesh_logo = $('.opl');
    skymesh_logo.hide();

    var randomTimeout;
    var loaderText = '';
    var tries = 0;

    (function random() {

        var randomText = '';

        for (var i = 0; i < skymesh.length - loaderText.length; i++)
            randomText += characters[Math.floor(Math.random() * characters.length)];

        loader.text(loaderText + randomText);

        if (++tries == 5) {
            tries = 0;
            loaderText += skymesh[loaderText.length];
        }

        if (loaderText == 'skymesh') {
            clearTimeout(randomTimeout);
            loader.text(loaderText);
            afterGenerated();
            return;
        }

        randomTimeout = setTimeout(random, 1000 / 25.5);
    })();

    function afterGenerated() {
        console.log('generated');
        loader.addClass('shrink');
        skymesh_logo.show();

        setTimeout(afterBrand, 750);
    }

    function afterBrand() {
        $('.not-visible').removeClass('not-visible').addClass('visible');

        var navToggler = $('#nav-toggle');
        var navMask = $('#nav-mask');
        var navMenu = $('#nav-menu');
        var navMenuLinks = navMenu.find('a');
        var navOpenClass = 'open';

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var numberOfParticles = .00005 * (windowWidth * windowHeight);

        var leavedPage;

        var togglerFunction = function () {
            if (navToggler.hasClass(navOpenClass)) {
                navToggler.removeClass(navOpenClass);
                navMask.removeClass(navOpenClass);
                navMenu.removeClass(navOpenClass);

            } else {
                navToggler.addClass(navOpenClass);
                navMask.addClass(navOpenClass);
                navMenu.addClass(navOpenClass);
            }
        };
        navToggler.click(togglerFunction);
        navMask.click(togglerFunction);
        navMenuLinks.click(togglerFunction);
        
        // Set contact form dimentions
        $('#contact-form').css('height', $(window).height() * 0.7 | 500);
        $('#contact-form').css('width', $(window).width() * 0.5 | 760);

        $('#fullpage').fullpage({
            anchors: ['welcome', 'consumer', 'enterprise', 'demo', 'contact'],
            menu: '#nav-menu',
            sectionSelector: '.page',
            scrollOverflow: true,
            easing: 'easeInExpo',
            css3: false,
            scrollingSpeed: 555,
            navigation: true,
            afterLoad: function (anchorLink) {
                if (leavedPage != undefined) {
                    leavedPage.find('.animated').removeClass('viewable');
                }
                leavedPage = $('#' + anchorLink + '-page');
                leavedPage.find('.animated').addClass('viewable');
            },
            afterRender: function () {
                scrollToAnchor();
            }
        });

        function scrollToAnchor() {
            //getting the anchor link in the URL and deleting the `#`
            var value = window.location.hash.replace('#', '').split('/');
            var section = value[0];

            if (section) {  //if theres any #
                $.fn.fullpage.silentMoveTo(section);
            }
        }

        //-------------------------particles
        $(window).click(function (e) {
            window.pJS_GUI.particles.array.push(new window.pJS_GUI.fn.particle(
                {value: '#6eb2bc'},
                100,
                {x: e.pageX, y: e.pageY}
            ));
        });

        var timeOut;

        function addParticle() {
            if (window.pJS_GUI.particles.array.length > numberOfParticles) {
                clearTimeout(timeOut);
                return;
            }

            window.pJS_GUI.particles.array.push(new window.pJS_GUI.fn.particle(
                {value: '#6eb2bc'},
                100
            ));

            timeOut = setTimeout(addParticle, 60);
        }

        function afterParticlesLoaded() {
            console.log('callback - particles.js config loaded');
            window.pJS_GUI = window.pJSDom[0].pJS;

            addParticle();
        }

        particlesJS.load('particles', 'assets/particles.json', afterParticlesLoaded);
    }
});

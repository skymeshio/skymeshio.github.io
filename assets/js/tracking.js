// Define hash extract function
function getPageLocation() {
    var currHash = window.location.hash;
    currHash = currHash.split('?')[0];
    currHash = currHash.replace('#', '');
    if (currHash.length == 0) {
        return 'home';
    } else {
        return currHash;
    }
}

// Define page track function
function trackPage(pageName) {
    var pg = "";
    if (pageName == undefined) {
        pg = getPageLocation();
    } else {
        pg = pageName;
    }
    // Ga track
    ga('set', 'page', pg);
    ga('send', 'pageview');
}

// Initiate google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-76231331-1', 'auto');
trackPage(); // Initial page view

// Track pageview
(function($) {
    
    // Log tracking event on page change
    $(window).bind('hashchange', function() {
        trackPage(); // Track page view
    });
    
    // Log tracking event on esc click when article is visible
    $(window).on('keyup', function(event) {
        switch (event.keyCode) {
            case 27:
                if ($('body').hasClass('is-article-visible')) {
                    trackPage('home');
                }
                break;
            default:
                break;
        }
    });
    
    // Log tracking event on mouse click when article is visible
    $('body').on('click', function(event) {
        if ($('body').hasClass('is-article-visible')) {
            trackPage('home');
        }
    });
    
})(jQuery);
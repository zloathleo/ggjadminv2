/*
 *  Document   : common.js
 *  Author     : leo  
 */

var App = function () {
    // Helper variables - set in uiInit()
    var $lHtml, $lBody, $lPage, $lSidebar, $lSidebarScroll, $lSideOverlay, $lSideOverlayScroll, $lHeader, $lMain, $lFooter;

    // User Interface init
    var uiInit = function () {
        // Set variables
        $lHtml = jQuery('html');
        $lBody = jQuery('body');
        $lPage = jQuery('#page-container');
        $lSidebar = jQuery('#sidebar');
        $lSidebarScroll = jQuery('#sidebar-scroll');
        $lSideOverlay = jQuery('#side-overlay');
        $lSideOverlayScroll = jQuery('#side-overlay-scroll');
        $lHeader = jQuery('#header-navbar');
        $lMain = jQuery('#main-container');
        $lFooter = jQuery('#page-footer');

        // Initialize Tooltips
        jQuery('[data-toggle="tooltip"], .js-tooltip').tooltip({
            container: 'body',
            animation: false
        });

        // Initialize Popovers
        jQuery('[data-toggle="popover"], .js-popover').popover({
            container: 'body',
            animation: true,
            trigger: 'hover'
        });

        // Initialize Tabs
        // jQuery('[data-toggle="tabs"] a, .js-tabs a').click(function (e) {  
        //     e.preventDefault();
        //     jQuery(this).tab('show'); 
        // }); 

        // Init form placeholder (for IE9)
        jQuery('.form-control').placeholder();
    };


    // Resizes #main-container to fill empty space if exists
    var uiHandleMain = function () {
        var $hWindow = jQuery(window).height();
        var $hHeader = $lHeader.outerHeight();
        var $hFooter = $lFooter.outerHeight();

        if ($lPage.hasClass('header-navbar-fixed')) {
            $lMain.css('min-height', $hWindow - $hFooter);
        } else {
            $lMain.css('min-height', $hWindow - ($hHeader + $hFooter));
        }
    };

    // Layout functionality
    var uiLayout = function () {
        // Resizes #main-container min height (push footer to the bottom)
        var $resizeTimeout;

        if ($lMain.length) {
            uiHandleMain();

            jQuery(window).on('resize orientationchange', function () {
                clearTimeout($resizeTimeout);

                $resizeTimeout = setTimeout(function () {
                    uiHandleMain();
                }, 150);
            });
        }

        // Init sidebar and side overlay custom scrolling
        // uiHandleScroll('init');

        // Init transparent header functionality (solid on scroll - used in frontend)
        if ($lPage.hasClass('header-navbar-fixed') && $lPage.hasClass('header-navbar-transparent')) {
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > 20) {
                    $lPage.addClass('header-navbar-scroll');
                } else {
                    $lPage.removeClass('header-navbar-scroll');
                }
            });
        }

        // Call layout API on button click
        jQuery('[data-toggle="layout"]').on('click', function () {
            var $btn = jQuery(this);

            uiLayoutApi($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });
    };

    // Layout API
    var uiLayoutApi = function ($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        // Mode selection
        switch ($mode) {

            case 'sidebar_mini_toggle':
                if ($windowW > 360) {
                    $lPage.toggleClass('sidebar-mini');
                }
                break;
            case 'sidebar_toggle':
                if ($windowW > 360) {
                    $lPage.toggleClass('sidebar-o');
                } else {
                    $lPage.toggleClass('sidebar-o-xs');
                }
                break;
            default:
                return false;
        }
    };

    // Main navigation functionality
    var uiNav = function () {
        // When a submenu link is clicked
        jQuery('[data-toggle="nav-submenu"]').on('click', function (e) {
            // Get link
            var $link = jQuery(this);

            // Get link's parent
            var $parentLi = $link.parent('li');

            if ($parentLi.hasClass('open')) { // If submenu is open, close it..
                $parentLi.removeClass('open');
            } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
                $link
                    .closest('ul')
                    .find('> li')
                    .removeClass('open');

                $parentLi
                    .addClass('open');
            }

            // Remove focus from submenu link
            if ($lHtml.hasClass('no-focus')) {
                $link.blur();
            }

            return false;
        });
    };

    return {
        init: function ($func) {
            uiInit();
            uiLayout();
            uiNav();
        },
    };
}();

// Create an alias for App (you can use OneUI in your pages instead of App if you like)
var OneUI = App;

// Initialize app when page loads
jQuery(function () {
    App.init();
});


 
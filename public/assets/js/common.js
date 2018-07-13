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

    var uiHelperDatetimepicker = function () {
        // Init Bootstrap Datetimepicker (with .js-datetimepicker class)
        jQuery('.js-datetimepicker').each(function () {
            var $input = jQuery(this);

            $input.datetimepicker({
                // language: 'zh-CN',
                // autoclose: true,
                format: 'YYYY-MM-DD HH:mm:ss',
                // useCurrent: $input.data('use-current') ? $input.data('use-current') : false,
                locale: moment.locale('zh-cn'),
                showTodayButton: true,
                showClear: true,
                showClose: true,
                sideBySide: true,
                inline: false,
                icons: {
                    time: 'si si-clock',
                    date: 'si si-calendar',
                    up: 'si si-arrow-up',
                    down: 'si si-arrow-down',
                    previous: 'si si-arrow-left',
                    next: 'si si-arrow-right',
                    today: 'si si-size-actual',
                    clear: 'si si-trash',
                    close: 'si si-close'
                }
            });
        });
    };

    var uiHelperImagepicker = function () {
        code_content = function (element) {
            var code, html, pre;
            html = element.clone().wrap('<div>').parent().html();
            pre = jQuery("<pre  class='prettyprint lang-html'>");
            code = jQuery("<code class='prettyprint lang-html'>");
            html = ("      " + html).replace(/\ \ \ \ \ \ /g, "");
            code.text(html);
            pre.append(code);
            return pre;
        };

        jQuery(function () {
            return jQuery(".show-html").each(function () {
                var code_cont, element, hide_link, show_link;
                element = jQuery(this);
                show_link = jQuery("<a href='#' style='margin-left: 12px;'>Show HTML</a>");
                hide_link = jQuery("<a href='#' style='margin-left: 12px;'>Hide HTML</a>");
                code_cont = code_content(element);
                show_link.click(function (event) {
                    show_link.hide();
                    hide_link.show();
                    code_cont.show();
                    return event.preventDefault();
                });
                hide_link.click(function (event) {
                    show_link.show();
                    hide_link.hide();
                    code_cont.hide();
                    return event.preventDefault();
                });
                element.after(code_cont);
                element.after(hide_link);
                element.after(show_link);
                hide_link.hide();
                return code_cont.hide();
            });
        });
    };

    return {
        init: function ($func) {
            uiInit();
            uiLayout();
            uiNav();
        },

        initDatetimepicker: function ($func) {
            uiHelperDatetimepicker();
        },

        initImagepicker: function(){
            uiHelperImagepicker();
        },
    };
}();

// Create an alias for App (you can use OneUI in your pages instead of App if you like)
var OneUI = App;

// Initialize app when page loads
jQuery(function () {
    App.init();
});




// ON PAGE READY
$(function () {
    OpenMenu.init();
});




// Permet d'ouvrir le menu de droite sur mobile
var OpenMenu = (function () {
    //Cache DOM
    var $mobileButton = $('.mobile-button-white');
    var $contentSite = $('#siteWrap');
    var $mobileSideBar = $('.mobile-side-menu');
    var $mobileMenu = $mobileSideBar.find('ul.menu');
    var $menuItems = $mobileMenu.find('li.menu-item');
    var $menuLinks = $mobileSideBar.find('ul.menu-links');
    var $backButtons = $menuLinks.find('.back');
    var $currentSubMenu;
    var $document = $('html');

    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $mobileButton.on('click', _toggleSideMenu.bind(this));
        $menuItems.on('click', function (event) {
            _showSubMenu(this, event);
        });
        $backButtons.on('click', _hideSubMenu.bind(this));
        //$document.on('click', _closeSideMenuOnAway.bind(this));
        //$document.on('resize', _closeSideMenu.bind(this));
    };

    var _toggleSideMenu = function (event) {
        $contentSite.toggleClass('open');
    };
    var _closeSideMenuOnAway = function (event) {
        if (!$(event.target).closest($mobileButton, $mobileSideBar, $backButtons).length) {
            _closeSideMenu();
        }
    };
    var _closeSideMenu = function () {
        if ($contentSite.hasClass('open')) {
            _hideSubMenu();
            $contentSite.removeClass('open');
        }
    };
    var _hideSubMenu = function () {
        if (typeof $currentSubMenu != 'undefined') {
            $currentSubMenu.closest('.menu-links-wrapper').removeClass('is-open');
            $currentSubMenu = undefined;
        }
    };
    var _showSubMenu = function (element) {
        if ($(element).attr('data-id')) {
            $currentSubMenu = _getSubMenu($(element).attr('data-id'));
            $currentSubMenu.closest('.menu-links-wrapper').addClass('is-open');
        }
    };
    var _getSubMenu = function (id) {
        var temp;
        $menuLinks.each(function () {
            if ($(this).attr('id') === id) {
                temp = $(this);
                return false;
            }
        });
        return temp;
    };
    return{
        init: init
    };
})();
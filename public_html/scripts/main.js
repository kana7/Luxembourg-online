
// ON PAGE READY
$(function () {
    OpenMenu.init();
});




// Permet d'ouvrir le menu de droite sur mobile
var OpenMenu = (function () {
    //Cache DOM
    var $mobileButton = $('.mobile-button-white');
    var $contentSite = $('#siteWrap');
    var $mobileMenu = $('.mobile-side-menu>.menu');
    var $document = $('html');

    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $mobileButton.on('click', _toggleSideMenu.bind(this));
        $document.on('click', _closeSideMenuOnAway.bind(this));
        $document.on('resize', _closeSideMenu.bind(this));
    };
    
    var _toggleSideMenu = function(event){
        event.stopPropagation();
        $contentSite.toggleClass('open');
    };
    var _closeSideMenuOnAway = function (event) {
        if (!$(event.target).closest($mobileMenu, $mobileButton).length) {
            _closeSideMenu();
        }
    };
    var _closeSideMenu = function () {
        if ($contentSite.hasClass('open')) {
            $contentSite.removeClass('open');
        }
    };
    return{
        init: init
    };
})();
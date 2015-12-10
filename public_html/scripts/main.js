var encartDispoTemplate = '<div class="phone-12 tab-6 desk-3">' +
        '<div id="dispo" class="service">' +
        '<div class="infos" style="text-align: center;">' +
        '<h3 class="white">Toutes nos offres disponibles ' +
        '<strong>chez vous</strong> : </h3>' +
        '<input value name="zipcode" class="input-white" type="text" placeholder="Code postal"/>' +
        '<select name="ville" class="input-white select"></select>' +
        '<select name="rue" class="input-white select"></select>' +
        '<select name="numero" class="input-white select numero"></select>' +
        '<button type="button" class="btn-orange btnVerify verifyCp">Vérifiez les disponibilités</button>' +
        '<button type="button" class="btn-orange btnVerify btnVerif">Vérifiez les disponibilités</button>' +
        '<ul class="icons hidden-phone">' +
        '<li>' +
        '<div class="dispo-icon">' +
        '<span class="icon-internet-ico"></span>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<div class="dispo-icon">' +
        '<span class="icon-telephonie-ico"></span>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<div class="dispo-icon">' +
        '<span class="icon-tv-ico"></span>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<div class="dispo-icon">' +
        '<span class="icon-mobile-ico"></span>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

        var slider_noel1 = $('<div class="gallery-cell"><div class="infos image-5"><div class="container-wrapper"><div class="row"><div class="phone-12 align-center"><h2 class="title white bold"><span style="font-size: 0.9em;">Luxembourg Online <span class="light">vous souhaite de</span> </span><br /><span style="font-size: 1.2em;">joyeuses fêtes !</span></h2></div></div></div></div></div>');

        var slider_noel2 = $('<div class="gallery-cell"><div class="infos image-6"><div class="container-wrapper"><div class="row"><div class="phone-12 desk-10"><h1 class= "title white bold"> Luxembourg Online <br/><span class="light"> vous souhaite de </span><br/> joyeuses fêtes ! </h1></div></div></div></div></div>');

var randomizeSlider = [slider_noel1, slider_noel2];

        var temp;
// ON PAGE READY
        $(function () {
        MenuMobile.init();
                PopupModule.init();
                if ($('.searchMenu:not(.mobile)')) {
        EquipementFilter.init();
        }
        if ($('.dropdown')) {
        $('.dropdown').each(function () {
        temp = new DropDown($(this));
                temp.init();
        });
        }
        });
//test si l'adresse email est eligible
        function testEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
                }

//deplace la fenêtre jusqu'à un élément précis dans la page
function scrollToElement(element) {
$(window).scrollTop(element.offset().top).scrollLeft(element.offset().left);
        }

//size of viewport
function viewport() {
var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
a = 'client';
        e = document.documentElement || document.body;
}
return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
        }

//Déplace l'encart pour tester la disponibilité sur la page accueil
function printDispo() {
if (viewport().width > 1056) {
$('#services .row').append(encartDispoTemplate);
} else {
$('#services .row').prepend(encartDispoTemplate);
}
}

//Affiche un container au clique sur un élément dans un container .dropdown
var DropDown = function (element) {
var $dropdown = element;
        var $dropButton = $dropdown.children('[data-trigger]');
        var $hiddenContainer = $dropdown.children(':not([data-trigger])');
        this.init = function () {
        _bindEvents();
        };
        var _bindEvents = function () {
        $dropButton.on('click', _triggerDrop);
        };
        var _triggerDrop = function () {
        $dropButton.toggleClass('is-active');
                $hiddenContainer.toggleClass('is-visible');
        };
        };
// Permet de gérer l'affichage dans les pages équipements
        var EquipementFilter = (function () {
        var $document = $('html');
                var $search = $('.searchMenu:not(.mobile)');
                var $searchMenuButton = $search.children('button');
                var $searchMenu = $search.find('.dropdown');
                var $searchDeskMenuItem = $search.find('.DesktopMenu>li');
                var $searchMenuItem = $searchMenu.children('li');
                var $categories = $('.equipementCat');
                var flag = 1;
                var init = function () {
                _bindEvents();
                };
                var _bindEvents = function () {
                $searchMenuButton.on('click', _toggleMenu);
                        $searchMenuItem.on('click', function (event) {
                        _selectPhilter($(this), event);
                        });
                        $searchDeskMenuItem.on('click', function (event) {
                        _selectPhilter($(this), event);
                        });
                        $document.on('click', function () {
                        if (flag != "0") {
                        _closeMenu();
                        }
                        else {
                        flag = "1";
                        }
                        });
                };
                var _toggleMenu = function () {
                flag = "0";
                        $searchMenu.toggleClass('is-visible');
                };
                var _closeMenu = function () {
                $searchMenu.removeClass('is-visible');
                };
                var _selectPhilter = function (element, event) {
                flag = "0";
                        _deletePhilter();
                        if ($(event.target).closest('ul').hasClass('dropdown')) {
                renderPhilter(element.attr('data-cat'), element.text());
                } else {
                $searchDeskMenuItem.removeClass('is-active');
                        element.addClass('is-active');
                }
                if (element.attr('data-cat') === 'tous') {
                $categories.removeClass('is-hidden');
                } else {
                $('#' + element.attr('data-cat') + '').removeClass('is-hidden');
                        $('#' + element.attr('data-cat') + '').show().flickity('resize');
                }
                _closeMenu();
                };
                var _deletePhilter = function () {
                $categories.addClass('is-hidden');
                        if ($('.philter')) {
                $('.philter').remove();
                }
                };
                var renderPhilter = function (cat, name) {
                var html = '';
                        html += '<div data-cat="' + cat + '" class="philter">';
                        html += '<button>';
                        html += '<span class="selectedPhilter">' + name + '</span>';
                        html += '</button>';
                        html += '</div>';
                        $(html).insertAfter($search);
                };
                return{
                init: init
                };
                })();
// Permet d'ouvrir le menu de droite sur mobile
        var MenuMobile = (function () {
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
                var flag = "1";
                var init = function () {
                _bindEvents();
                };
                var _bindEvents = function () {
                $mobileButton.on('click', _toggleSideMenu);
                        $menuItems.on('click', function (event) {
                        _showSubMenu(this, event);
                        });
                        $backButtons.on('click', _hideSubMenu);
                        $document.on('click', function () {
                        if (flag != "0") {
                        _closeSideMenu();
                        }
                        else {
                        flag = "1";
                        }
                        });
                };
                var _toggleSideMenu = function () {
                flag = "0";
                        if ($contentSite.hasClass('open')) {
                _closeSideMenu();
                } else {
                $contentSite.addClass('open');
                }
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
                flag = "0";
                        if (typeof $currentSubMenu != 'undefined') {
                $currentSubMenu.closest('.menu-links-wrapper').removeClass('is-open');
                        $currentSubMenu = undefined;
                }
                };
                var _showSubMenu = function (element) {
                flag = "0";
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
//Gère les popups dans le site
        var PopupModule = (function () {
        var $clientSpace = $('.popup');
                var $clientMenuItem = $clientSpace.find('.client-menu>li[data-id]');
                var $formGroup = $clientSpace.find('.pannel-forms');
                var $forms = $clientSpace.find('.pannel-forms>form');
                var $openButton = $('.openPopup');
                var $popupIndex = ['clientSpace', 'testDispo']; //index des ids des popups dans les pages


                var init = function () {
                _bindEvents();
                };
                var _bindEvents = function () {
                $openButton.on('click', function () {
                _openPopup($(this));
                });
                        $('body').on('click', '.pannel-close', function (event) {
                closePopup(event);
                });
                        $('body').on('click', '.background-client', function (event) {
                closePopup(event);
                });
                        $clientMenuItem.on('click', function () {
                        _showForm($(this));
                        });
                };
                var _openPopup = function ($element) {
                $('#' + $popupIndex[$element.attr('data-popup')]).addClass('is-visible');
                };
                var closePopup = function (event) {
                $(event.target).closest('.popup').removeClass('is-visible');
                };
                var _showForm = function (element) {
                $clientMenuItem.removeClass('active');
                        $forms.removeClass('is-visible');
                        $formGroup.find('#' + element.attr('data-id') + '').addClass('is-visible');
                        element.addClass('active');
                };
                return{
                init: init,
                        closePopup: closePopup
                };
                })();

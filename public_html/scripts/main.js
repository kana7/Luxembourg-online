var temp;
// ON PAGE READY
$(function () {
    MenuMobile.init();
    ClientSpace.init();
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


var DropDown = function (element) {
    var $dropdown = element;
    var $dropButton = $dropdown.children('[data-trigger]');
    var $hiddenContainer = $dropdown.children(':not([data-trigger])');

    this.init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $dropButton.on('click', _triggerDrop.bind(this));
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
        $('#' + element.attr('data-cat') + '').removeClass('is-hidden');
        $('#' + element.attr('data-cat') + '').show().flickity('resize');
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
        $mobileButton.on('click', _toggleSideMenu.bind(this));
        $menuItems.on('click', function (event) {
            _showSubMenu(this, event);
        });
        $backButtons.on('click', _hideSubMenu.bind(this));
        $document.on('click', function () {
            if (flag != "0") {
                _closeSideMenu();
            }
            else {
                flag = "1";
            }
        });
    };

    var _toggleSideMenu = function (event) {
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

var ClientSpace = (function () {
    var $clientSpace = $('#clientSpace');
    var $clientSpacePannel = $clientSpace.find('.white-pannel');
    var $backgroundClient = $clientSpace.find('.background-client');
    var $clientMenuItem = $clientSpace.find('.client-menu>li');
    var $formGroup = $clientSpace.find('.pannel-forms');
    var $forms = $clientSpace.find('.pannel-forms>form');
    var $openButton = $('#openClientSpace, #openClientSpaceMobile');
    var $closeButton = $clientSpace.find('.pannel-close');


    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $openButton.on('click', _openClientSpace.bind(this));
        $closeButton.on('click', _closeClientSpace.bind(this));
        $backgroundClient.on('click', _closeClientSpace.bind(this));
        $clientMenuItem.on('click', function () {
            _showForm($(this));
        });
    };
    var _openClientSpace = function () {
        $clientSpace.addClass('is-visible');
    };
    var _closeClientSpace = function () {
        $clientSpace.removeClass('is-visible');
    };
    var _showForm = function (element) {
        $clientMenuItem.removeClass('active');
        $forms.removeClass('is-visible');
        $formGroup.find('#' + element.attr('data-id') + '').addClass('is-visible');
        element.addClass('active');
    };

    return{
        init: init
    };
})();
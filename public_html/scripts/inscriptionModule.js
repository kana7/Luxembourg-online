// MODULE
//------------------------------------------------------------------------------
var StepTransition = (function () {
    var html;
    var tplbtn = '<div class="clearfix phone-mt-30 phone-mb-30 buttons-next-previous">' +
            '<button type="button" class="btn-blue previous pull-left">' +
            '<span class="icon-left-arrow"></span> Retour' +
            '</button>' +
            '<button type="button" class="btn-orange next pull-right">' +
            'Suivant <span class="icon-right-arrow"></span>' +
            '</button>' +
            '</div>';
    var tplInput = '<input type="hidden" name="{{type}}" value="{{id}}"/>' +
            '{{#remise}}' +
            '<input type="hidden" name="{{remise.type}}" value="{{remise.id}}"/>' +
            '{{/remise}}';
    //template pour un article
    var tplItem =
            '<div class="clearfix phone-mt-30 shop-item-list">' +
            '{{#items}}' +
            '<div class="phone-mb-15 phone-12 tab-6">' +
            '<div class="shop-item {{#isFixed}}fixed{{/isFixed}}">' +
            '<input type="{{input}}" {{#group}}name="{{group}}"{{/group}}{{^group}}name="{{type}}{{index}}"{{/group}}  data-cat="{{type}}" value="{{id}}" hidden {{#required}}required{{/required}} {{#isDefaut}}selected{{/isDefaut}}>' +
            '<div class="phone-12 lgdesk-5 pull-right phone-mb-15 lgdesk-mb-0 shop-item-container-img">' +
            '<img class="shop-item-img" src="{{link}}" alt="{{name}} shop LOL"/>' +
            '</div>' +
            '<div class="phone-12 lgdesk-7">' +
            '<h3 class="shop-item-name">{{name}}</h3>' +
            '<ul class="shop-item-description">' +
            '{{#commentaire}}' +
            '<li>{{.}}</li>' +
            '{{/commentaire}}' +
            '</ul>' +
            '</div>' +
            '<div style="height: 50px;" class="phone-12 phone-mt-30">' +
            '{{#isSellProduct}}' +
            '{{^isRemise}}' +
            '<ul class="shop-item-price orange vertical-align-middle phone-6">' +
            '<li class="extra-bold price">{{#formatPrice}}{{fullPrice}}{{/formatPrice}} €{{#isMonthlyCost}}/mois{{/isMonthlyCost}}</li>' +
            '</ul>' +
            '{{/isRemise}}' +
            '{{#isRemise}}' +
            '<ul class="shop-item-price promo orange vertical-align-middle phone-6">' +
            '<li class="extra-bold price">{{#formatPrice}}{{fullPrice}}{{/formatPrice}} €{{#isMonthlyCost}}/mois{{/isMonthlyCost}}</li>' +
            '<li>PROMO : {{remise.name}}</li>' +
            '</ul>' +
            '<input type="hidden" name="{{remise.type}}" value="{{remise.id}}"/>' +
            '{{/isRemise}}' +
            '{{/isSellProduct}}' +
            '{{^isSellProduct}}' +
            '<ul class="shop-item-price orange vertical-align-middle phone-6">' +
            '<li class="extra-bold price">{{#formatPrice}}{{price}}{{/formatPrice}} €{{#isMonthlyCost}}/mois{{/isMonthlyCost}}</li>' +
            '</ul>' +
            '{{/isSellProduct}}' +
            '<div>' +
            '<div class="pull-right btn-blue"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '{{/items}}' +
            '{{#resetIndex}}{{resetIndex}}{{/resetIndex}}' +
            '</div>';
    //template formulaire fibre
    var tplFormFiber = '<div class="clearfix">' +
            '<div class="phone-mb-20 phone-mt-30">' +
            '<h3 class="step-subtitle">Installation fibre</h3>' +
            '<p class="step-subdescription">Information supplémentaire sur le câblage interne de la fibre dans votre habitation (obligatoire)</p>' +
            '</div>' +
            '<div data-form="fibre" class="step-form clearfix">' +
            '<div class="phone-12">' +
            '<div class="input-group radio">' +
            '<input id="Cablage" type="radio" name="p_client" value="true" required><label for="Cablage">Mon cablâge interne est conforme pour le raccordement internet via la Fibre Optique.</label>' +
            '</div>' +
            '<div class="input-group">' +
            '<input id="NotCablage" type="radio" name="p_client" value="false" required><label for="NotCablage">Mon cablâge interne n\'est pas conforme et je demande à Luxembourg Online d\'entreprendre les travaux nécessaires. </label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    var StepsContainer = $('#steps');
    var headerStepList = $('#step-list ul');
    var currentItems_list;
    var currentStep = 0;
    var stepList = StepsContainer.find('.step');
    //Prend l'ensemble des articles sélectionnables pour cette offre
    events.on('getCurrent', init);
    function init(current) {
        //recupération du panier
        var itemsCookie = Cookies.getJSON('shop_panierItems');
        currentItems_list = current;
        _render();
        _bindEvents();
        //Ajoute les articles pré-selectionnés dans le panier au lancement
        $('.step .shop-item').find('input[selected]').each(function () {
            _selectItem($(this).parents('.shop-item'));
        });
        //RECOVERY
        if (typeof itemsCookie !== 'undefined') {
            _recoverCart(itemsCookie);
        }
        //prend un slider spécifié dans l'url ou affiche le slider initial
        if (getURLParameter('step') !== null) {
            currentStep = getURLParameter('step');
        }
        _showSlider(currentStep);
        //supprime le hash de l'url une fois terminé
        if (window.history && window.history.pushState) {
            window.history.pushState('', '', window.location.pathname);
        } else {
            window.location.href = window.location.href.replace(/#.*$/, '#');
        }
    }

    //génére le html de tous les sliders
    function _render() {
        $('#steps').before(Mustache.render(tplInput, currentItems_list['a_abo']));
        $('#steps').before(Mustache.render(tplInput, currentItems_list['p_activation']));
        stepList.each(function () {
            if ($(this).attr('id') == 'installation') {
                html = Mustache.render(tplItem, {input: "radio", required: true, isSellProduct: true, group: 'p_install', items: currentItems_list['p_installation']});
                if (currentItems_list['a_abo']['tech'] == "FIBRE") {
                    html += tplFormFiber;
                }
                html += tplbtn;
                $(this).find('.step-description').after(html);
            }
            if ($(this).attr('id') == 'materiel') {
                html = Mustache.render(tplItem, {input: "radio", required: true, isSellProduct: false, group: 'm_modem', items: currentItems_list['m_modem']});
                html += '<div class="clearfix dropdown">' +
                        '<div class="phone-mb-30 phone-mt-30" data-trigger>' +
                        '<h3 class="step-subtitle">Ajoutez du Matériel Optionnel<span class="icon-right-arrow"></span></h3>' +
                        '<p class="step-subdescription">Si besoin vous trouverez ci-dessous de l\'équipement auxiliaire pour améliorer ou élargir votre réseau interne.</p>' +
                        '</div>' +
                        '<div>';
                html += Mustache.render(tplItem, {input: "checkbox", required: false, isSellProduct: false, group: false, items: currentItems_list['m_materiels'], index: function () {
                        return ++window['INDEX'] || (window['INDEX'] = 0);
                    }, resetIndex: function () {
                        window['INDEX'] = null;
                        return;
                    }});
                html += '</div>';
                html += '</div>';
                html += tplbtn;
                html += '</div>';
                $(this).find('.step-description').after(html);
            }
            if ($(this).attr('id') == 'telephonie') {
                html = Mustache.render(tplItem, {input: "checkbox", required: false, isFixed: true, isSellProduct: false, group: 'a_tel', items: currentItems_list['a_telephone']});
                $(this).find('.step-description').after(html);
                $(this).append(tplbtn);
            }
            if ($(this).attr('id') == 'tv') {
                html = Mustache.render(tplItem, {input: "checkbox", required: false, isSellProduct: true, group: 'a_tv', items: currentItems_list['a_tv']});
                html += '<div class="phone-mb-30 phone-mt-30">' +
                        '<h3 class="step-subtitle">Location décodeur</h3>' +
                        '</div>';
                html += Mustache.render(tplItem, {input: "checkbox", required: false, isSellProduct: false, group: false, items: currentItems_list['m_tv_materiel'], index: function () {
                        return ++window['INDEX'] || (window['INDEX'] = 0);
                    }});
                html += tplbtn;
                html += '</div>';
                html += '</div>';
                $(this).find('.step-description').after(html);
                $('input[value="5137"], input[value="5304"]').parents('.shop-item').addClass('fixed');

            }
        });
    }

    //bind les évènements pour tous le script
    function _bindEvents() {
        StepsContainer.on('click', 'button.previous', function () {
            _previous();
        });
        headerStepList.on('click', 'li:not(.step-separator)', function () {
            var position = headerStepList.find('li:not(.step-separator)').index(this) - 1;
            _goToSlider(position);
        });
        StepsContainer.on('click', 'button.next', function () {
            _next();
            _collectDataForm($(this).parents('.step').find('.step-form'));
        });
        StepsContainer.find('input[required]').on('blur click', function () {
            _checkInput();
        });
        StepsContainer.on('click', '.shop-item:not(.disabled):not(.fixed)', function () {

            _selectItem($(this));

            if ($(this).find('input').val() == 2848) {
                if ($(this).find('input').is(':checked')) {
                    $('input[value="5304"]').parents('.shop-item').removeClass('fixed');
                    if (!$('input[value="5137"]').is(':checked')) {
                        _selectItem($('input[value="5137"]').parents('.shop-item:not(.disabled)'));
                    }
                } else {
                    $('input[value="5137"], input[value="5304"]').parents('.shop-item').addClass('fixed');
                    if ($('input[value="5137"]').is(':checked')) {
                        _selectItem($('input[value="5137"]').parents('.shop-item:not(.disabled)'));
                    }
                    if ($('input[value="5304"]').is(':checked')) {
                        _selectItem($('input[value="5304"]').parents('.shop-item:not(.disabled)'));
                    }
                }
            }
        });
        StepsContainer.on('change', '.shop-item:not(.disabled):not(.fixed) input:not([type="text"])', function () {
            _deselectItem($(this));
        });
        $(window).on("beforeunload", function () {
            _saveCart();
        });
    }
    //Amène à un slide en fonction d'un paramètre dans le lien
    function _goToSlider(position) {
        if (!(currentStep - position <= 0)) {
            if (position >= 0) {
                currentStep = position;
                _showSlider(currentStep);
            } else {
                if (confirm('Si vous retournez maintenant en arrière, les données de votre commande seront perdues. êtes-vous sûr?')) {
                    $(window).off("beforeunload");
                    window.location.href = "../shop/offres.html";
                }
            }
        }
    }

    //afficher un slide
    function _showSlider(index) {
        var position = Number(index);
        $('#step-list ul').find('li:not(.step-separator)').removeClass('active');
        $('#step-list ul').find('li:not(.step-separator)').eq(position+1).addClass('active');
        stepList.not(stepList[position]).hide().removeClass('is-visible');
        $(stepList[position]).fadeIn('800').addClass('is-visible');
        $('html,body').animate({
            scrollTop: $('#step-list').offset().top
        }, 0);
    }

    //slide suivant
    function _next() {
        if (_checkInput()) {
            if (currentStep != stepList.length - 1) {
                _showSlider(++currentStep);
            } else {
                //on enregistre les infos du panier dans un cookie dans le cas où l'utilisateur revient en arrière.
                _saveCart();
                $('#shoppingCart').submit();
            }
        }
    }

    //slide précédent
    function _previous() {
        if (currentStep != 0) {
            _showSlider(--currentStep);
        } else {
            if (confirm('Si vous retournez maintenant en arrière, les données de votre commande seront perdues. êtes-vous sûr?')) {
                $(window).off("beforeunload");
                window.location.href = "../shop/offres.html";
            }
        }
    }
    //Activé pour simplement ajouter dans le panier 
    function _addItem(shopItem) {
        var input = shopItem.find('input');
        shopItem.addClass('selected');
        if (input.is(':radio')) {
            _deselectItem(input);
        }
        events.emit('useCart', {
            id: input.val(),
            cat: input.attr('data-cat'),
            isAdding: true
        });
    }

    //Activé quand on clique sur un article (toggle mode) pour ajouté dans le panier.
    function _selectItem(shopItem) {
        if (shopItem !== 'undefined') {
            var input = shopItem.find('input:not([type="text"])');
            shopItem.toggleClass('selected');
            if (input.is(':checked')) {
                events.emit('useCart', {
                    id: input.val(),
                    cat: input.attr('data-cat'),
                    isAdding: false
                });
                input.prop("checked", false);
            } else {
                events.emit('useCart', {
                    id: input.val(),
                    cat: input.attr('data-cat'),
                    isAdding: true
                });
                input.prop("checked", true);
            }
            input.change();
        }
    }

    //Déselectionne élément issu du même groupe et supprime du panier
    function _deselectItem(input) {
        if (typeof input != 'undefined') {
            var radioName = input.attr('name');
            //enlève toute les items selected du même groupe pour les radio
            $('input[type="radio"][name="' + radioName + '"]').parent('.shop-item').not(input.closest('.shop-item')).removeClass('selected');
            //Enlève du panier les produits du même groupe
            $('input[name="' + radioName + '"]:not(:checked):not([type="text"])').each(function () {
                events.emit('useCart', {
                    id: $(this).val(),
                    cat: $(this).attr('data-cat'),
                    isAdding: false
                });
            });
            _verifyStep(input.parents('.step'));
        }
    }

    //Récupère les données des formulaires et les ajoute dans le panier
    function _collectDataForm($form) {
        if ($form.length > 0) {
            var id = $form.attr('data-form');
            var object = {};
            $form.find('input').each(function () {
                console.log($(this).attr('name'));
                if ($(this).is(':radio')) {
                    if ($(this).is(':checked')) {
                        object[$(this).attr('name')] = $(this).val();
                    }
                } else {
                    object[$(this).attr('name')] = $(this).val();
                }
            });
            console.log(object);
            events.emit('addForm', {id: id, object: object});
        } else {
            console.log('pas de formulaire à collecter');
        }
    }

    //Vérifie si tous les éléments requis ont été remplis
    var _verifyStep = function ($element) {
        var flag = true;
        var currentStep = $element;
        var name;
        //vérifie si required est select
        currentStep.find('input[required]').each(function () {
            name = $(this).attr('name');
            if ($(this).attr('type') == 'radio') {
                if (!currentStep.find("input[name='" + name + "']").is(':checked')) {
                    flag = false;
                }
            } else {
                if (!$(this).val()) {
                    flag = false;
                }
            }
        });
        return flag;
    };

    //Désactive bouton si verifyStep est faux
    var _checkInput = function () {
        var flag = _verifyStep($(stepList[currentStep]));
        if (!flag) {
            $(stepList[currentStep]).find('button.next').addClass('disabled');
        } else {
            $(stepList[currentStep]).find('button.next').removeClass('disabled');
        }
        return flag;
    };

    //Enregistre les informations du panier dans des cookies quand on quitte la page
    var _saveCart = function () {
        var itemsTab = [];
        $(Cart.panier.items).each(function () {
            itemsTab.push(this.id);
        });
        Cookies.set('shop_panierItems', itemsTab, {expires: 1});
        for (var key in Cart.panier.info) {
            Cookies.set('shop_' + key, Cart.panier.info[key], {expires: 1});
        }
    };
    //Permet de récupérer les infos du panier dans les cookies
    var _recoverCart = function (cookie) {
        var recoveredForm = [];
        $('.step .shop-item').each(function () {
            if (cookie.indexOf($(this).find('input:not([type="text"])').val()) !== -1) {
                $(this).not('.selected').click();
            }
        });
        for (var index in formNameIndex) {
            recoveredForm.push(Cookies.getJSON(formNameIndex[index]));
        }
        console.log('-----------------FORM RECOVER------------------------');
        console.log(recoveredForm);
        for (var index in recoveredForm) {
            if (typeof recoveredForm[index] !== 'undefined') {
                for (var key in recoveredForm[index]) {
                    console.log(key);
                    if ($('input[name=' + key + ']').is(':radio')) {
                        $('input[name=' + key + '][value="' + recoveredForm[index][key] + '"]').prop('checked', true).trigger('change');
                    } else {
                        $('input[name=' + key + ']').val(recoveredForm[index][key]);
                    }
                }
            }
        }
    };
    return{
        init: init,
        step: currentStep
    };
})();


var Cart = (function () {

    //Contient la liste de tous les choix possibles lors de l'inscription
    var currentItems_list = {};
    //Le panier contient le prix ainsi que les objets avec leur ID respectifs
    var Panier = {
        items: [],
        info: {},
        price: {
            unique: 0,
            month: 0
        },
        formatPrice: function (price, c, d, t) {
            //format euros
            if ($.isNumeric(price)) {
                var n = price,
                        c = isNaN(c = Math.abs(c)) ? 2 : c,
                        d = d == undefined ? "," : d,
                        t = t == undefined ? "." : t,
                        s = n < 0 ? "-" : "",
                        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                        j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            } else {
                return price;
            }
        }
    };

    var tplItem = '<li class="items">' +
            '<div class="month">' +
            '<h4>Coûts mensuels</h4>' +
            '<ul>' +
            '{{#items}}' +
            '{{#isMonthlyCost}}' +
            '{{#isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price price-delete">{{#formatPrice}}{{fullPrice}}{{/formatPrice}} €/mois</span>' +
            '<div class="remise-name">' +
            '<span class="label"><span class="bold">PROMO</span> : {{remise.name}}</span>' +
            '<span class="price">{{#formatPrice}}{{price}}{{/formatPrice}} €/mois</span>' +
            '</div>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{^isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price">{{#formatPrice}}{{price}}{{/formatPrice}} €/mois</span>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{/isMonthlyCost}}' +
            '{{/items}}' +
            '</ul>' +
            '</div>' +
            '<div class="unique">' +
            '<h4>Coûts uniques</h4>' +
            '<ul>' +
            '{{#items}}' +
            '{{^isMonthlyCost}}' +
            '{{#isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price price-delete">{{#formatPrice}}{{fullPrice}}{{/formatPrice}} €</span>' +
            '<div class="remise-name">' +
            '<span class="label"><span class="bold">PROMO</span> : {{remise.name}}</span>' +
            '<span class="price">{{#formatPrice}}{{price}}{{/formatPrice}} €</span>' +
            '</div>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{^isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price">{{#formatPrice}}{{price}}{{/formatPrice}} €</span>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{/isMonthlyCost}}' +
            '{{/items}}' +
            '</ul>' +
            '</div>' +
            '</li>';
    var tplPrice = '<li class="prices">' +
            '<ul>' +
            '<li id="monthlyPrice">' +
            '<span class="prices-label">Coûts mensuels :</span>' +
            '<span class="prices-price">{{price.month}} €<span class="normal lowercase"> /mois</span></span>' +
            '</li>' +
            '<li id="uniquePrice">' +
            '<span class="prices-label">Coûts Unique :</span>' +
            '<span class="prices-price">{{price.unique}} €</span>' +
            '</li>' +
            '</ul>' +
            '</li>';

    events.on('useCart', _useCard);
    events.on('addForm', _addForm);

    function init() {
        _initCurrentItem();
    }

    function _initCurrentItem() {
        var vhash;
        var cookie = Cookies.getJSON('shop_serviceMap');
        if (window.location.hash !== "" || typeof cookie !== 'undefined') {
            vhash = window.location.hash || cookie;
            if (window.location.hash) {
                vhash = (vhash.split('#')[1]).split(";");
                Cookies.remove('shop_panierItems');
            }
            //on enregistre le hash dans un cookie pour un recover éventuel.
            Cookies.set('shop_serviceMap', vhash, {expires: 1});

            currentItems_list['a_abo'] = abonnements_list.getAbo(vhash[0], vhash[1]);
            currentItems_list['p_installation'] = currentItems_list['a_abo']['installation'];
            currentItems_list['p_activation'] = currentItems_list['a_abo']['activation'];
            currentItems_list['m_modem'] = currentItems_list['a_abo']['materiels'];
            currentItems_list['a_telephone'] = aboTel;
            currentItems_list['a_tv'] = lolTv;
            currentItems_list['m_tv_materiel'] = lolTv_materielList;
            currentItems_list['m_materiels'] = materiel_list;
            //ajout de l'abo et de l'activation dans le panier à l'ouverture de la page
            _useCard({
                id: 5257,
                cat: 'a_abo',
                isAdding: true
            });
            _useCard({
                id: 5610,
                cat: 'p_activation',
                isAdding: true
            });
            events.emit('getCurrent', currentItems_list);
            console.log(currentItems_list);
            console.log(Panier);
        } else {
            $(window).off("beforeunload");
            window.location.replace("offres.html");
        }
    }

    function _render() {
        //Reconstruire le shopping card quand les données sont mises à jour - TODO Mettre en place un template
        var html = '<ul><li class="header"><h3>Récapitulatif</h3></li>';
        html += Mustache.render(tplItem, Panier);
        html += Mustache.render(tplPrice, Panier);
        '</ul>';
        $('#panier').html(html);
    }

    function _useCard(data) {
        if (data['isAdding']) {
            _addItem(data['cat'], data['id']);
        } else {
            _removeItem(data['id']);
        }
        console.log(Panier);
        console.log('-----------------------------------------');
        Panier.price.unique = 0;
        Panier.price.month = 0;
        _computePrice(Panier['items']);
        Panier.price.month = Panier.formatPrice(Panier.price.month);
        Panier.price.unique = Panier.formatPrice(Panier.price.unique);
        _render();
    }

    function _addForm(data) {
        Panier['info'][data['id']] = data['object'];
    }

    function _addItem(cat, id) {
        //adding unique element
        if (_findInArray(Panier['items'], id) == null) {
            console.log("j'ajoute ! : " + cat + ' ' + id);
            if (Object.prototype.toString.call(currentItems_list[cat]) === '[object Array]') {
                var objToAdd = _findInArray(currentItems_list[cat], id);
                Panier['items'].push(objToAdd);
            } else {
                Panier['items'].push(currentItems_list[cat]);
            }
        }
    }

    function _removeItem(id) {
        var objToDelete = _findInArray(Panier['items'], id);
        console.log(id);
        console.log("je supprime! : " + objToDelete);
        if (objToDelete != null) {
            Panier['items'].splice(Panier['items'].indexOf(objToDelete), 1);
        } else {
            console.log("Le produit n'a pas été trouvé dans le panier : suppression annulée");
        }
    }

    // loop a travers un tableau pour sélectionner un objet selon un id dans les properties
    function _findInArray(array, id) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].id == id)
                return array[i];
        }
        return null; // l'objet n'a pas été trouvé
    }

    //Fonction recursive qui détecte si il y a une propriété prix dans un objet sinon le fonction regarde si il y a un autre object dans la liste des propriétés 
    function _computePrice(object) {
        if ("price" in object) {
            if (object["isMonthlyCost"]) {
                Panier.price.month += object["price"];
            } else {
                Panier.price.unique += object["price"];
            }
        } else {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    if (typeof object[property] == 'object' && object[property] != null) {
                        _computePrice(object[property]);
                    }
                }
            }
        }
    }

    return{
        init: init,
        panier: Panier
    };
})();

// DATA
//------------------------------------------------------------------------------
//
//Permet l'héritage
var inherits = function (ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};
var Item = function (id, type, name, price, isMonthlyCost, commentaire, isDefaut, link) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
    this.isMonthlyCost = isMonthlyCost;
    this.commentaire = commentaire;
    this.isDefaut = isDefaut;
    this.link = link;
};
Item.prototype.formatPrice = function () {
    //format euros
    return function (val, render) {
        var n = render(val);
        if ($.isNumeric(n)) {
            var c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d == undefined ? "," : d,
                    t = t == undefined ? "." : t,
                    s = n < 0 ? "-" : "",
                    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                    j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        } else {
            return n;
        }
    };
};
//objet abonnement internet
var Abonnement = function (id, type, name, price, isMonthlyCost, commentaire, isDefaut, link, ipt, tech, service, installation, activation, materiels) {
    Abonnement.super_.call(this, id, type, name, price, isMonthlyCost, commentaire, isDefaut, link);
    this.ipt = ipt;
    this.tech = tech;
    this.service = service;
    this.installation = installation;
    this.activation = activation;
    this.materiels = materiels;
};
inherits(Abonnement, Item);
var SellProduct = function (id, type, name, price, isMonthlyCost, commentaire, isDefaut, link, isRemise, remise) {
    SellProduct.super_.call(this, id, type, name, price, isMonthlyCost, commentaire, isDefaut, link);
    this.setPrice = function (productPrice, remise) {
        if (remise == null) {
            return productPrice;
        } else {
            return productPrice + remise.price;
        }
    };
    this.isRemise = isRemise;
    this.remise = remise;
    this.fullPrice = price;
    this.price = this.setPrice(price, remise);
};
inherits(SellProduct, Item);
var modem7490 = new Item("5294", "m_modem", "Location FRITZ!Box 7490", 6.00, true, ["LAN : 4 x Gigabit", "WLAN : jusqu'à 1300Mbits/s", "Téléphone : 2 x analogique, 1 x ISDN", " "], false, "../images/equipment/modem/7390/7360.png");
var modem_List1 = [
    new Item("5291", "m_modem", "Location FRITZ!Box 3272", 4.00, true, ["LAN :  2 x Gigabit, 2 x fast Ethernet", "WLAN :  jusqu'à 300Mbit/s", " ", " "], true, "../images/equipment/modem/3272/3272.png"),
    modem7490
];
var modem_List2 = [
    new Item("5292", "m_modem", "Location FRITZ!Box 7360", 4.00, true, ["LAN :  2 x Gigabit, 2 x fast Ethernet", "WLAN : jusqu'à 300Mbit/s", "Téléphone :  1 x analogique, DECT", " "], true, "../images/equipment/modem/7360/7360.png"),
    modem7490
];
var aboTel = new Item("5138", "a_telephone", "Abo téléphonique", 0, true, "Inclus dans votre abonnement", true, "../images/Shop/Telephonie.jpg");
var lolTVRemise = new Item("5611", "a_tvRemise", "6 mois gratuits", -17.00, true, "après 17€/mois", true, null);
var lolTv = new SellProduct("2848", "a_tv", "LOLTV", 17.00, true, ["+110 Chaînes TV", "20 chaînes HD", "40 chaînes radio", " ", " "], false, "../images/Shop/LOLTV.jpg", true, lolTVRemise);
var lolTv_materielList = [
    new Item("5137", "m_tv_materiel", "Décodeur LOLTV (requis)", 4.50, true, ["Processeur quad-core", "Mémoire 2 GB RAM", "Full HD", " "], false, "../images/Shop/Minix1.jpg"),
    new Item("5304", "m_tv_materiel", "Décodeur pour 2ème TV", 5.50, true, ["Processeur quad-core", "Mémoire 2 GB RAM", "Full HD", " "], false, "../images/Shop/Minix2.jpg")
];
var remiseInstall = new Item("5623", "p_installationRemise", "Installation offerte", -89.00, false, "", true, null);
var installNoRemise = new SellProduct("5313", "p_installation", "Installation par équipe", 89.00, false, "Je souhaite qu'une équipe spécialisée s'occupe de l'installation.", true, "../images/Shop/install-equip.png", false, null);
var installRemise = new SellProduct("5313", "p_installation", "Installation par équipe", 89.00, false, "Je souhaite qu'une équipe spécialisée s'occupe de l'installation.", true, "../images/Shop/install-equip.png", true, remiseInstall);
var selfInstall = new SellProduct("5612", "p_installation", "Installation par Self-Install-Kit", 25.00, false, "Je fais l'installation moi-même à l'aide du kit d'installation", false, "../images/Shop/self-install.png", false, null);
var remiseActivation = new Item("5611", "p_activationRemise", "Activation offerte", -85.00, false, "", true, null);
var activation = new SellProduct("5610", "p_activation", "Activation", 85.00, false, "", true, null, true, remiseActivation);
var typeInstall = [installNoRemise, selfInstall];
var abonnements_list = {
    "2": {
        "5272": new Abonnement("5272", "a_abo", "LOL FIBER 30", 44.90, true, "", true, null, "LOL", "FIBRE", 2, installNoRemise, activation, modem_List2),
        "5275": new Abonnement("5275", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "LOL", "FIBRE", 2, installRemise, activation, modem_List2),
        "5276": new Abonnement("5276", "a_abo", "LOL FIBER 200", 71.90, true, "", true, null, "LOL", "FIBRE", 2, installRemise, activation, modem_List2)
    },
    "3": {
        "?": new Abonnement("5619", "a_abo", "LOL DSL 20", null, true, "", true, null, "EPT", "ADSL", 3, installNoRemise, activation, modem_List1)
    },
    "4": {
        "5262": new Abonnement("5262", "a_abo", "LOL FIBER 30", 44.90, true, "", true, null, "EPT", "VDSL", 4, installNoRemise, activation, modem_List2)
    },
    "5": {
        "5262": new Abonnement("5262", "a_abo", "LOL FIBER 30", 44.90, true, "", true, null, "EPT", "FIBRE", 5, installNoRemise, activation, modem_List2),
        "5263": new Abonnement("5263", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "EPT", "FIBRE", 5, installRemise, activation, modem_List2),
        "5264": new Abonnement("5264", "a_abo", "LOL FIBER 200", 71.90, true, "", true, null, "EPT", "FIBRE", 5, installRemise, activation, modem_List2)
    },
    "6": {
        "5257": new Abonnement("5257", "a_abo", "LOL DSL 24", 34.90, true, "", true, null, "LOL", "ADSL", 6, typeInstall, activation, modem_List1)
    },
    "8": {
        "5273": new Abonnement("5273", "a_abo", "LOL FIBER 30", 44.90, true, "", true, null, "LOL", "VDSL", 8, typeInstall, activation, modem_List2),
        "5274": new Abonnement("5274", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "LOL", "VDSL", 8, installRemise, activation, modem_List2),
        "5336": new Abonnement("5336", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "LOL", "VDSL", 8, installRemise, activation, modem_List2)
    },
    "41": {
        "5263": new Abonnement("5263", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "EPT", "VDSL1", 41, installRemise, activation, modem_List2)
    },
    "42": {
        "5263": new Abonnement("5263", "a_abo", "LOL FIBER 100", 54.90, true, "", true, null, "EPT", "VDSL2", 42, installRemise, activation, modem_List2)
    },
    getAbo: function (service, id) {
        return abonnements_list[service][id];
    }
};
var materiel_list = [
    new Item("5436", "m_materiels", "FRITZ!WLAN Repeater 450E", 52.00, false, ["Répétiteur pour étendre le réseau wifi", "WLAN :  2,4 - jusqu'à 450Mbit/s"], false, "../images/equipment/modem/r450e/r450e_small1.png"),
    new Item("5437", "m_materiels", "FRITZ!WLAN Repeater 1750E", 84.00, false, ["Répétiteur pour étendre le réseau wifi", "WLAN : 2,4 et 5 Ghz - jusqu'à 1750Mbit/s"], false, "../images/equipment/modem/r1750e/r1750e_small1.png"),
    new Item("4570", "m_materiels", "FRITZ!Powerline 520E Set", 89.00, false, ["Solution pour étendre le réseau via le circuit électrique (ethernet)"], false, "../images/equipment/modem/pl520eset/pl520eset_small1.png"),
    new Item("4450", "m_materiels", "FRITZ!Powerline 520E Single", 49.00, false, ["Solution pour étendre le réseau via le circuit électrique (ethernet)"], false, "../images/equipment/modem/pl520e/pl520e_small1.png"),
    new Item("3148", "m_materiels", "FRITZ!Powerline 546E", 95.00, false, ["Solution pour étendre le réseau via le circuit électrique (ethernet + wifi)"], false, "../images/equipment/modem/pl546e/pl546e.png"),
    new Item("5439", "m_materiels", "FRITZ!WLAN Stick AC", 28.00, false, ["Adaptateur wifi", "WLAN : 2,4 et 5 Ghz - jusqu'à 430Mbit/s"], false, "../images/equipment/modem/wlansac/wlansac_small.png"),
    new Item("5395", "m_materiels", "Motorola T201", 31.00, false, ["Pack Mono : 1 x Téléphone numérique sans fil DECT"], false, "../images/equipment/telephone/motorola/t201/motorola_t201_small1.png"),
    new Item("5396", "m_materiels", "Motorola T202", 48.00, false, ["Pack Duo : 2 x Téléphone numérique sans fil DECT"], false, "../images/equipment/telephone/motorola/t202/motorola_t202_small1.png"),
    new Item("5397", "m_materiels", "Motorola T203", 65.00, false, ["Pack Trio : 3 x Téléphone numérique sans fil DECT"], false, "../images/equipment/telephone/motorola/t203/motorola_t203_small1_1.png")
];

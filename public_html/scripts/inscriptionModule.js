
// MODULE
//------------------------------------------------------------------------------
var StepTransition = (function () {
    //stock la position du slide visible
    var html;
    var tpl;
    var StepsContainer = $('#steps');
    var currentItems_list;
    var currentStep = 0;
    var stepList = StepsContainer.find('.step');
    $(stepList).not(stepList[0]).css('display', 'none');

    var installTpl = $('#installation');

    events.on('getCurrent', init);

    function init(current) {
        currentItems_list = current;
        //TODO - Construire toutes les étapes
        //_render();
        _bindEvents();
    }

    function _render() {
        tpl = '<h2 class="step-title">Installation</h2>' +
                '<p class="step-description">Merci de choisir le type d\'installation souhaité</p>' +
                '<div class="clearfix phone-mt-40">' +
                '<div class="phone-12 tab-6 tab-pr-40">' +
                '<div class="shop-item">' +
                '<input type="radio" name="install" data-cat="installation1" value="5612" hidden required>' +
                '<h3 class="shop-item-name">Installation par Self-Instal Kit</h3>' +
                '<div class="phone-6">' +
                '<ul class="shop-item-description">' +
                '<li>je fais l\'intallation moi-même à l\'aide d\'un kit d\'installation.</li>' +
                '</ul>' +
                '<ul class="shop-item-price orange">' +
                '<li class="extra-bold price">25.00 €</li>' +
                '</ul>' +
                '</div>' +
                '<div class="phone-6 pull-right">' +
                '<img class="shop-item-img" src="../images/Shop/self-install.png" alt="luxembourg online self-installation" />' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="phone-12 tab-6 tab-pl-30">' +
                '<div class="shop-item">' +
                '<input type="radio" data-cat="installation2" name="install" value="5313" hidden>' +
                '<h3 class="shop-item-name">Installation par une équipe</h3>' +
                '<div class="phone-6">' +
                '<ul class="shop-item-description">' +
                '<li>Je souhaite qu\'une équipe spécialisée s\'occupe de l\'installation. </li>' +
                '</ul>' +
                '<ul class="shop-item-price promo orange">' +
                '<li class="extra-bold price">89.00 €</li>' +
                '<li>PROMO : installation offerte</li>' +
                '</ul>' +
                '</div>' +
                '<div class="phone-6">' +
                '<img class="shop-item-img" src="../images/Shop/install-equip.png" alt="luxembourg online installation equipe" />' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="clearfix phone-mt-40">' +
                '<button class="btn-blue previous pull-left">' +
                '<span class="icon-left-arrow"></span> Retour' +
                '</button>' +
                '<button class="btn-orange next pull-right" disabled>' +
                'Suivant <span class="icon-right-arrow"></span>' +
                '</button>' +
                '</div>';

        stepList.each(function () {
            var titre;
            if ($(this).attr('id') == 'installation') {
                titre = "installation";
                html = '<h2 class="step-title">' + titre + '</h2>' +
                        '<p class="step-description">Merci de choisir le type d\'' + titre + ' souhaité</p>' +
                        '<div class="clearfix phone-mt-40">';

                //on parse le html générer par le code dans la bonne step
                $(this).html(html);
            }
        });
    }

    function _bindEvents() {
        //bind next et previous sur les bouttons
        StepsContainer.on('click', 'button.previous', function () {
            _previous();
        });
        StepsContainer.on('click', 'button.next', function () {
            _next();
        });
        //bind liste sur le current step au clic sur bouton précédent ou suivant
    }

    function _showSlider(index) {
        stepList.fadeOut(function () {
            $(stepList[index]).fadeIn();
        });
    }

    function _next() {
        console.log('jambon');
        if (currentStep != stepList.length - 1) {
            _showSlider(++currentStep);
        }
    }

    function _previous() {
        if (currentStep != 0) {
            _showSlider(currentStep);
        }
    }

    return{
        init: init
    };
})();

var Cart = (function () {

    //Contient la liste de tous les choix possibles lors de l'inscription
    var currentItems_list = {};

    //Le panier contient le prix ainsi que les objets avec leur ID respectifs --> cet objet est envoyé au serveur à la fin du script
    var Panier = {
        items: [],
        price: {
            unique: 0,
            month: 0
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
            '<span class="price-delete">{{fullPrice}} €/mois</span>' +
            '<div class="remise-name">' +
            '<span class="label"><span class="bold">PROMO</span> : installation offerte</span>' +
            '<span class="price">{{price}} €</span>' +
            '</div>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{^isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price">{{price}} €/mois</span>' +
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
            '<span class="price price-delete">{{fullPrice}} €</span>' +
            '<div class="remise-name">' +
            '<span class="label"><span class="bold">PROMO</span> : installation offerte</span>' +
            '<span class="price">{{price}} €</span>' +
            '</div>' +
            '</li>' +
            '{{/isRemise}}' +
            '{{^isRemise}}' +
            '<li>' +
            '<span class="label">{{name}}</span>' +
            '<span class="price">{{price}} €</span>' +
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
            '<span class="prices-price">{{month}} €<span class="normal lowercase">/mois</span></span>' +
            '</li>' +
            '<li id="uniquePrice">' +
            '<span class="prices-label">Coûts Unique :</span>' +
            '<span class="prices-price">{{unique}} €</span>' +
            '</li>' +
            '</ul>' +
            '</li>';


    events.on('useCart', _useCard);

    function init() {
        _initCurrentItem();
    }

    function _initCurrentItem() {
        var vhash;
        if (window.location.hash) {
            vhash = (window.location.hash.split('#')[1]).split(";");
            if (window.location.hash.length > 2) {
                currentItems_list['abo'] = abonnements_list.getAbo(vhash[0], vhash[1]);
                if (currentItems_list['abo']['installation'] == null) {
                    currentItems_list['installation1'] = typeInstall[0];
                    currentItems_list['installation2'] = typeInstall[1];
                } else {
                    currentItems_list['installation2'] = currentItems_list['abo']['installation'];
                }
                currentItems_list['activation'] = currentItems_list['abo']['activation'];
                currentItems_list['modem'] = currentItems_list['abo']['materiels'];
                currentItems_list['tv'] = lolTv;
                currentItems_list['materiels'] = materiel_list;

                //ajout de l'abo et de l'activation dans le panier à l'ouverture de la page
                _useCard({
                    id: 5257,
                    cat: 'abo',
                    isAdding: true
                });
                _useCard({
                    id: 5610,
                    cat: 'activation',
                    isAdding: true
                });

                events.emit('getCurrent', currentItems_list);

                console.log(currentItems_list);
                console.log(Panier);
                console.log('-----------------------------------------');
            }
        } else {
            window.location.replace("offres.html");
        }
    }

    function _render() {
        //Reconstruire le shopping card quand les données sont mises à jour - TODO Mettre en place un template
        var html = '<ul><li class="header"><h3>Récapitulatif</h3></li>';
        html += Mustache.render(tplItem, Panier);
        html += Mustache.render(tplPrice, Panier.price);
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
        _render();
    }

    function _addItem(cat, id) {
        console.log("j'ajoute ! : " + cat + ' ' + id);
        if (cat == 'materiels') {
            //many possible
            Panier['items'].push(currentItems_list[cat][id]);
        } else {
            //adding unique element
            Panier['items'].push(currentItems_list[cat]);
        }

    }

    function _removeItem(id) {
        var objectToDelete = _findInArray(Panier['items'], id);
        console.log(id);
        console.log("je supprime! : " + objectToDelete);
        if (objectToDelete != null) {
            Panier['items'].splice(Panier['items'].indexOf(objectToDelete), 1);
        } else {
            console.log("Le produit n'a pas été trouvé dans le panier : supression annulé");
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
        init: init
    };
})();
// DATA
//------------------------------------------------------------------------------
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

var Item = function (id, name, price, isMonthlyCost, commentaire, isDefaut) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.isMonthlyCost = isMonthlyCost;
    this.commentaire = commentaire;
    this.isDefaut = isDefaut;
};
var Materiel = function (id, name, price, isMonthlyCost, commentaire, isDefaut, link) {
    Materiel.super_.call(this, id, name, price, isMonthlyCost, commentaire, isDefaut);
    this.link = link;
};
//objet abonnement internet
var Abonnement = function (id, name, price, isMonthlyCost, commentaire, isDefaut, ipt, tech, service, installation, activation, materiels) {
    Abonnement.super_.call(this, id, name, price, isMonthlyCost, commentaire, isDefaut);
    this.ipt = ipt;
    this.tech = tech;
    this.service = service;
    this.installation = installation;
    this.activation = activation;
    this.materiels = materiels;
};
inherits(Abonnement, Item);
inherits(Materiel, Item);

var modem_List1 = {
    "5291": new Materiel("5291", "Location FRITZ!Box 3272", 4.00, true, "", true, "../images/equipment/modem/3272/3272.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/3272/3272.png")
};
var modem_List2 = {
    "5292": new Materiel("5292", "Location FRITZ!Box 7360", 4.00, true, "", true, "../images/equipment/modem/7360/7360.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/7390/7360.png")
};

var SellProduct = function (id, name, price, isMonthlyCost, commentaire, isDefaut, isRemise, remise) {
    SellProduct.super_.call(this, id, name, price, isMonthlyCost, commentaire, isDefaut);
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

var lolTVRemise = new Item("5611", "6 mois gratuits", -17.00, true, "après 17€/mois", true);
var lolTv = new Abonnement("2848", "LOLTV", 17.00, true, "", true, "LOL", "TV", null, null, {type: null, remise: lolTVRemise, isRemise: true}, {
    "5137": new Materiel("5137", "Location LOLTV MiniX Neo X7 (4,50€/mois)", 4.50, true, "", true, "../images/TV/320px/Minix_Equipement.jpg"),
    "5304": new Materiel("5304", "Location LOLTV MiniX Neo X7 (5,50€/mois)", 5.50, true, "", false, "../images/TV/320px/Minix_Equipement.jpg")
});

var remiseInstall = new Item("5313", "installation offerte", -89.00, false, "", true);

var installNoRemise = new SellProduct("5313", "Installation par équipe", 89.00, false, "Je souhaite qu'une équipe spécialisée s'occupe de l'installation.", true, false, null);
var installRemise = new SellProduct("5313", "Installation par équipe", 89.00, false, "Je souhaite qu'une équipe spécialisée s'occupe de l'installation.", true, true, remiseInstall);

var selfInstall = new SellProduct("5612", "Installation par Self-Install-Kit", 25.00, false, "Je fais l'installation moi-même à l'aide du kit d'installation", false, false, null);

var remiseActivation = new Item("5611", "Remise activation", -85.00, false, "", true);
var activation = new SellProduct("5610", "Activation", 85.00, false, "", true, true, remiseActivation);


var typeInstall = [selfInstall, installNoRemise];

var abonnements_list = {
    "2": {
        "5272": new Abonnement("5272", "LOL FIBER 30", 44.90, true, "", true, "LOL", "FIBRE", 2, installNoRemise, activation, modem_List2),
        "5275": new Abonnement("5275", "LOL FIBER 100", 54.90, true, "", true, "LOL", "FIBRE", 2, installRemise, activation, modem_List2),
        "5276": new Abonnement("5276", "LOL FIBER 200", 71.90, true, "", true, "LOL", "FIBRE", 2, installRemise, activation, modem_List2)
    },
    "3": {
        "?": new Abonnement("?", "LOL DSL 20", null, true, "", true, "EPT", "ADSL", 3, installNoRemise, activation, modem_List1)
    },
    "4": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "VDSL", 4, installNoRemise, activation, modem_List2)
    },
    "5": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "FIBRE", 5, installNoRemise, activation, modem_List2),
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "FIBRE", 5, installRemise, activation, modem_List2),
        "5264": new Abonnement("5264", "LOL FIBER 200", 71.90, true, "", true, "EPT", "FIBRE", 5, installRemise, activation, modem_List2)
    },
    "6": {
        "5257": new Abonnement("5257", "LOL DSL 24", 34.90, true, "", true, "LOL", "ADSL", 6, null, activation, modem_List1)
    },
    "8": {
        "5273": new Abonnement("5273", "LOL FIBER 30", 44.90, true, "", true, "LOL", "VDSL", 8, installNoRemise, activation, modem_List2),
        "5274": new Abonnement("5274", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, installRemise, activation, modem_List2),
        "5336": new Abonnement("5336", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, installRemise, activation, modem_List2)
    },
    "41": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL1", 41, installRemise, activation, modem_List2)
    },
    "42": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL2", 42, installRemise, activation, modem_List2)
    },
    getAbo: function (service, id) {
        return abonnements_list[service][id];
    },
    setComment: function (service, id, commentaire) {
        this.getAbo(service, id).commentaire = commentaire;
    }
};

var materiel_list = {
    "5436": new Materiel("5436", "FRITZ!WLAN Repeater 450E", 52.00, false, "", false, "../images/equipment/modem/r450e/r450e_small1.png"),
    "5437": new Materiel("5437", "FRITZ!WLAN Repeater 1750E", 84.00, false, "", false, "../images/equipment/modem/r1750e/r1750e_small1.png"),
    "4570": new Materiel("4570", "FRITZ!Powerline 520E Set", 89.00, false, "", false, "../images/equipment/modem/pl520eset/pl520eset_small1.png"),
    "4450": new Materiel("4450", "FRITZ!Powerline 520E Single", 49.00, false, "", false, "../images/equipment/modem/pl520e/pl520e_small1.png"),
    "3148": new Materiel("3148", "FRITZ!Powerline 546E", 95.00, false, "", false, "../images/equipment/modem/pl546e/pl546e.png"),
    "5439": new Materiel("5439", "FRITZ!WLAN Stick AC", 28.00, false, "", false, "../images/equipment/modem/wlansac/wlansac_small.png"),
    "5395": new Materiel("5395", "Motorola T201", 31.00, false, "", false, "../images/equipment/telephone/motorola/t201/motorola_t201_small1.png"),
    "5396": new Materiel("5396", "Motorola T202", 48.00, false, "", false, "../images/equipment/telephone/motorola/t202/motorola_t202_small1.png"),
    "5397": new Materiel("5397", "Motorola T203", 65.00, false, "", false, "../images/equipment/telephone/motorola/t203/motorola_t203_small1.png")
};


$(function () {
    Cart.init();
});

// MODULE
//------------------------------------------------------------------------------
var StepTransition = (function () {
    //stock la position du slide visible
    var currentStep = 0;

    var init = function () {
        //TODO - Construire toutes les étapes
        _bindEvents();
    };
    var _bindEvents = function () {
        //bind next et previous sur les bouttons
        //bind liste sur le current step au clic sur bouton précédent ou suivant
    };
    var _showSlider = function () {

    };

    var next = function () {
        //passer au slide suivant
    };
    var previous = function () {
        //retourner au slider précédent
    };
    return{
        init: init,
        next: next,
        previous: previous
    };
})();

var Cart = (function () {


    var templatePanier = '';

    //Contient la liste de tous les choix possibles lors de l'inscription
    var currentItems_list = {
        abo: null,
        installation: null,
        activation: null,
        modem: null,
        tv: null,
        materiels: null
    };

    //Le panier contient le prix ainsi que les objets avec leur ID respectifs --> cet objet est envoyé au serveur à la fin du script
    var Panier = {
        items: {
            materiels: []
        },
        price: {
            unique: 0,
            month: 0
        }
    };

    events.on('useCart', _useCard);

    var init = function () {
        _initCurrentItem();
        //abo est un objet venant de abonnements_list 
        //Panier.item.abo = abo;
    };

    var _initCurrentItem = function () {
        var vhash;
        if (window.location.hash) {
            vhash = (window.location.hash.split('#')[1]).split(";");
            if (window.location.hash.length > 2) {
                currentItems_list['abo'] = abonnements_list.getAbo(vhash[0], vhash[1]);
                Panier['items']['abo'] = currentItems_list['abo'];
                currentItems_list['installation'] = currentItems_list['abo']['installation'];
                currentItems_list['activation'] = currentItems_list['abo']['activation'];
                currentItems_list['modem'] = currentItems_list['abo']['materiels'];
                currentItems_list['tv'] = lolTv;
                currentItems_list['materiels'] = materiel_list;


                console.log(currentItems_list);
            }
        } else {
            window.location.replace("offres.html");
        }
    };

    var _render = function () {
        //Reconstruire le shopping card quand les données sont mises à jour - TODO Mettre en place un template
    };

    function _useCard(data) {
        console.log(data);
        if (data['isAdding']) {
            _addItem(data['cat'], data['id']);
        } else {
            _removeItem(data['cat'], data['id']);
        }
    }
    ;

    var _addItem = function (cat, id) {
        console.log("j'ajoute !");
        console.log(currentItems_list);
        console.log('categorie : ' + cat + '; id : ' + id + ';');
        if (cat == 'materiels') {
            //many possible
            Panier['items'][cat].push(currentItems_list[cat][id]);
        } else {
            //adding unique element
            Panier['items'][cat] = currentItems_list[cat];
        }
        _computePrice();
    };

    var _removeItem = function (cat, id) {
        console.log("je supprime!");
        console.log('categorie : ' + cat + '; id : ' + id + ';');
        if (cat == 'materiels') {
            // is a array with several choices possible
            var index = Panier['items'][cat].indexOf(_findInArray(Panier['item'][cat], id));
            Panier['items'][cat] = Panier['item'][cat].splice(index, 1);
        } else {
            //is unique
            delete Panier['items'][cat];
        }
        _computePrice();
    };

    // loop a travers un tableau pour sélectionner un objet selon un id dans les properties
    var _findInArray = function (array, id) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].id === id)
                return array[i];
        }
        return null; // The object was not found
    };

    var _computePrice = function () {
        console.log(Panier);
        //Boucle à travers l'objet panier.item et calcule le prix unique et le prix au mois
        //Re render le panier une fois que c'est fait
    };
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


var install = new Item("5313", "Installation par équipe", 89.00, false, "Je souhaite qu'une équipe spécialisée s'occupe de l'installation.", true);
var remiseInstall = new Item("5313", "PROMO : installation offerte", -89.00, false, "", true);

var selfInstall = new Item("5612", "Installation par Self-Install-Kit", 25.00, false, "Je fais l'installation moi-même à l'aide du kit d'installation", false);

var activation = new Item("5610", "Activation", 85.00, false, "", true);
var remiseActivation = new Item("5611", "Remise activation", -85.00, false, "", true);

var noRemise = new Item("", "", 0, false, "", false);


var modem_List1 = {
    "5291": new Materiel("5291", "Location FRITZ!Box 3272", 4.00, true, "", true, "../images/equipment/modem/3272/3272.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/3272/3272.png")
};
var modem_List2 = {
    "5292": new Materiel("5292", "Location FRITZ!Box 7360", 4.00, true, "", true, "../images/equipment/modem/7360/7360.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/7390/7360.png")
};

var SellProduct = function (item, remise, isRemise) {
    this.setPrice = function (item, remise) {
        if (!item) {
            return 0;
        } else {
            return item.price + remise.price;
        }
    };
    this.item = item;
    this.remise = remise;
    this.isRemise = isRemise;
    this.price = this.setPrice(item, remise);
};

var lolTVRemise = new Item("5611", "6 mois gratuits", -17.00, true, "après 17€/mois", true);
var lolTv = new Abonnement("2848", "LOLTV", 17.00, true, "", true, "LOL", "TV", null, null, {type: null, remise: lolTVRemise, isRemise: true}, {
    "5137": new Materiel("5137", "Location LOLTV MiniX Neo X7 (4,50€/mois)", 4.50, true, "", true, "../images/TV/320px/Minix_Equipement.jpg"),
    "5304": new Materiel("5304", "Location LOLTV MiniX Neo X7 (5,50€/mois)", 5.50, true, "", false, "../images/TV/320px/Minix_Equipement.jpg")
});

var typeInstall = [install, selfInstall];

var abonnements_list = {
    "2": {
        "5272": new Abonnement("5272", "LOL FIBER 30", 44.90, true, "", true, "LOL", "FIBRE", 2, new SellProduct(install, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5275": new Abonnement("5275", "LOL FIBER 100", 54.90, true, "", true, "LOL", "FIBRE", 2, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5276": new Abonnement("5276", "LOL FIBER 200", 71.90, true, "", true, "LOL", "FIBRE", 2, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2)
    },
    "3": {
        "?": new Abonnement("?", "LOL DSL 20", null, true, "", true, "EPT", "ADSL", 3, new SellProduct(install, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List1)
    },
    "4": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "VDSL", 4, new SellProduct(install, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List2)
    },
    "5": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "FIBRE", 5, new SellProduct(install, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "FIBRE", 5, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5264": new Abonnement("5264", "LOL FIBER 200", 71.90, true, "", true, "EPT", "FIBRE", 5, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2)
    },
    "6": {
        "5257": new Abonnement("5257", "LOL DSL 24", 34.90, true, "", true, "LOL", "ADSL", 6, new SellProduct(false, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List1)
    },
    "8": {
        "5273": new Abonnement("5273", "LOL FIBER 30", 44.90, true, "", true, "LOL", "VDSL", 8, new SellProduct(install, noRemise, false), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5274": new Abonnement("5274", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2),
        "5336": new Abonnement("5336", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2)
    },
    "41": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL1", 41, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2)
    },
    "42": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL2", 42, new SellProduct(install, remiseInstall, true), new SellProduct(activation, remiseActivation, true), modem_List2)
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
    StepTransition.init();
});
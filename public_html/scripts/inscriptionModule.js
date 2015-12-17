
// MODULE
//------------------------------------------------------------------------------
var StepTransition = (function () {
    var currentAbo = null;
    var currentStep = 0;
    //INIT doit construire les différente partie des slides
    var init = function () {
        
        _bindEvents();
    };
    var _bindEvents = function () {

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
var Card = (function () {


var templatePanier ='';
    //Le panier contient le prix ainsi que les objets avec leur ID respectifs
    var Panier = {
        item: {
            abo: null,
            modem: null,
            materiel: null,
            telephonie: null
            
        },
        price: {
            unique: 0,
            month: 0
        }
    };
    var init = function (abo) {
        //abo est un objet venant de abonnements_list 
        Panier.item.abo = abo;
    };
    var _render = function () {
        //Reconstruire le shopping card quand les données sont mises à jour - TODO Mettre en place un template
    };
    var _addItem = function (item) {
        //ajoute un item dans le panier
    };
    var _removeItem = function (item) {
        //enlève un item du panier
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


var modem_List1 = {
    "5291": new Materiel("5291", "Location FRITZ!Box 3272", 4.00, true, "", true, "../images/equipment/modem/3272/3272.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/3272/3272.png")
};
var modem_List2 = {
    "5292": new Materiel("5292", "Location FRITZ!Box 7360", 4.00, true, "", true, "../images/equipment/modem/7360/7360.png"),
    "5294": new Materiel("5294", "Location FRITZ!Box 7490", 6.00, true, "", false, "../images/equipment/modem/7390/7360.png")
};

var lolTv = {
    "2848" : new Abonnement("2848", "LOLTV", 17.00, true, "", true, "LOL", "TV", null, null, {type: null, remise: lolTVRemise, isRemise: true}, {
        "5137": new Materiel("5137", "Location LOLTV MiniX Neo X7 (4,50€/mois)", 4.50, true, "", true, "../images/TV/320px/Minix_Equipement.jpg"),
        "5304": new Materiel("5304", "Location LOLTV MiniX Neo X7 (5,50€/mois)", 5.50, true, "", false, "../images/TV/320px/Minix_Equipement.jpg")
    })
};
var lolTVRemise =  new Item("5611", "6 mois gratuits", -17.00, true, "après 17€/mois", true);

var typeInstall = [install, selfInstall];

var abonnements_list = {
    "2": {
        "5272": new Abonnement("5272", "LOL FIBER 30", 44.90, true, "", true, "LOL", "FIBRE", 2, {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5275": new Abonnement("5275", "LOL FIBER 100", 54.90, true, "", true, "LOL", "FIBRE", 2, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5276": new Abonnement("5276", "LOL FIBER 200", 71.90, true, "", true, "LOL", "FIBRE", 2, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    "3": {
        "?": new Abonnement("?", "LOL DSL 20", null, true, "", true, "EPT", "ADSL", 3, {type: null, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List1)
    },
    "4": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "VDSL", 4, {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    "5": {
        "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "", true, "EPT", "FIBRE", 5, {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "FIBRE", 5, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5264": new Abonnement("5264", "LOL FIBER 200", 71.90, true, "", true, "EPT", "FIBRE", 5, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    "6": {
        "5257": new Abonnement("5257", "LOL DSL 24", 34.90, true, "", true, "LOL", "ADSL", 6, {type: null, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List1)
    },
    "8": {
        "5273": new Abonnement("5273", "LOL FIBER 30", 44.90, true, "", true, "LOL", "VDSL", 8, {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5274": new Abonnement("5274", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
        "5336": new Abonnement("5336", "LOL FIBER 100", 54.90, true, "", true, "LOL", "VDSL", 8, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    "41": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL1", 41, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    "42": {
        "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "", true, "EPT", "VDSL2", 42, {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
    },
    getAbo : function(service, id){
        return abonnements_list[service][id];
    },
    setComment : function(service, id, commentaire){
        this.getAbo(service, id).commentaire = commentaire;
    }
};

var materiel_list = {
    "5436": new Materiel("5436", "FRITZ!WLAN Repeater 450E", 52.00, false, "", false,  "../images/equipment/modem/r450e/r450e_small1.png"),
    "5437": new Materiel("5437", "FRITZ!WLAN Repeater 1750E", 84.00, false, "", false, "../images/equipment/modem/r1750e/r1750e_small1.png"),
    "4570": new Materiel("4570", "FRITZ!Powerline 520E Set", 89.00, false, "", false, "../images/equipment/modem/pl520eset/pl520eset_small1.png"),
    "4450": new Materiel("4450", "FRITZ!Powerline 520E Single", 49.00, false, "", false, "../images/equipment/modem/pl520e/pl520e_small1.png"),
    "3148": new Materiel("3148", "FRITZ!Powerline 546E", 95.00, false, "", false, "../images/equipment/modem/pl546e/pl546e.png"),
    "5439": new Materiel("5439", "FRITZ!WLAN Stick AC", 28.00, false, "", false,  "../images/equipment/modem/wlansac/wlansac_small.png"),
    "5395": new Materiel("5395", "Motorola T201", 31.00, false, "", false, "../images/equipment/telephone/motorola/t201/motorola_t201_small1.png"),
    "5396": new Materiel("5396", "Motorola T202", 48.00, false, "", false, "../images/equipment/telephone/motorola/t202/motorola_t202_small1.png"),
    "5397": new Materiel("5397", "Motorola T203", 65.00, false, "", false, "../images/equipment/telephone/motorola/t203/motorola_t203_small1.png")
};

// MODULE
//------------------------------------------------------------------------------
var StepTransition = (function (){
    
    var currentStep = 0;
    
    //INIT doit construire les différente partie des slides
    var init = function(){
        _bindEvents();
    };
    var _bindEvents = function(){
        
    };
   
    var _showSlider = function(){
        
    };
    var next = function(){
        //passer au slide suivant
    };
    var previous = function(){
        //retourner au slider précédent
    };
    return{
      init : init,
      next : next,
      previous : previous
    };
})();

var Card = (function(){
    
    //Le panier contient le prix ainsi que les objets avec leur ID respectifs
    var Panier = {
        item : {
            abo : null,
            options : {
                
            }
        },
        price : {
            unique : 0,
            month : 0
        }
    };
    
    var init = function(abo){
        //abo est un objet venant de abonnements_list 
        Panier.item.abo = abo;
    };
    var _render = function(){
        //Reconstruire le shopping card quand les données sont mises à jour - TODO Mettre en place un template
    };
    var _addItem = function(item){
        //ajoute un item dans le panier
    };
    var _removeItem = function(item){
        //enlève un item du panier
    };
    
    return{
        init : init
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

var Item = function (id, name, price, isMonthlyCost) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.isMonthlyCost = isMonthlyCost;
};

var Materiel = function(id, name, price, isMonthlyCost, link){
    Materiel.super_.call(this, id, name, price, isMonthlyCost);
    this.link = link;
};


//objet abonnement internet
var Abonnement = function (id, name, price, isMonthlyCost, isp, tech, installation, activation, materiel) {
    Abonnement.super_.call(this, id, name, price, isMonthlyCost);
    this.isp = isp;
    this.tech = tech;
    this.installation = installation;
    this.activation = activation;
    this.materiel = materiel;
};

inherits(Abonnement, Item);
inherits(Materiel, Item);

var install = new Item("5313", "Installation", 89.00, false);
var remiseInstall = new Item("5313", "Installation", -89.00, false);
var selfInstall = new Item("5612", "Self-install Kit", 25.00, false);

var activation = new Item("5610", "Activation", 85.00, false);
var remiseActivation = new Item("5611", "Remise activation", -85.00, false);

var modem_List1 = {
    "5291": new Materiel("5291", "Location 3272", 4, true, "../images/equipment/modem/3272/3272.png"),
    "5294": new Materiel("5294", "Location 7490", 6, true, "../images/equipment/modem/3272/3272.png")
};
var modem_List2 = {
    "5292": new Materiel("5292", "Location 7360", 4, true, "../images/equipment/modem/7360/7360.png"),
    "5294": new Materiel("5294", "Location 7490", 6, true, "../images/equipment/modem/7390/7360.png")
};

var typeInstall = [install, selfInstall];

var abonnements_list = {
    "?": new Abonnement("?", "LOL DSL 20", null, true, "EPT", "ADSL", {type: null, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List1),
    "5257": new Abonnement("5257", "LOL DSL 24", 34.90, true, "LOL", "ADSL", {type: null, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List1),
    "5273": new Abonnement("5273", "LOL FIBER 30", 44.90, true, "LOL", "VDSL", {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5272": new Abonnement("5272", "LOL FIBER 30", 44.90, true, "LOL", "FIBRE", {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "EPT", "VDSL", {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5262": new Abonnement("5262", "LOL FIBER 30", 44.90, true, "EPT", "FIBRE", {type: install, remise: null, isRemise: false}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5274": new Abonnement("5274", "LOL FIBER 100", 54.90, true, "LOL", "VDSL1", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5336": new Abonnement("5336", "LOL FIBER 100", 54.90, true, "LOL", "VDSL2", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5275": new Abonnement("5275", "LOL FIBER 100", 54.90, true, "LOL", "FIBRE", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "EPT", "VDSL1", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "EPT", "VDSL2", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5263": new Abonnement("5263", "LOL FIBER 100", 54.90, true, "EPT", "FIBRE", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5264": new Abonnement("5264", "LOL FIBER 200", 71.90, true, "LOL", "FIBRE", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2),
    "5276": new Abonnement("5276", "LOL FIBER 200", 71.90, true, "EPT", "FIBRE", {type: install, remise: remiseInstall, isRemise: true}, {type: activation, remise: remiseActivation, isRemise: true}, modem_List2)
};

var materiel_list = {
    
};
function natSort(as, bs) {
    var a, b, a1, b1, i = 0, L, rx = /(\d+)|(\D+)/g, rd = /\d/;
    if (isFinite(as) && isFinite(bs))
        return as - bs;
    a = String(as["number"]).toLowerCase();
    b = String(bs["number"]).toLowerCase();
    if (a === b)
        return 0;
    if (!(rd.test(a) && rd.test(b)))
        return a > b ? 1 : -1;
    a = a.match(rx);
    b = b.match(rx);
    L = a.length > b.length ? b.length : a.length;
    while (i < L) {
        a1 = a[i];
        b1 = b[i++];
        if (a1 !== b1) {
            if (isFinite(a1) && isFinite(b1)) {
                if (a1.charAt(0) === "0")
                    a1 = "." + a1;
                if (b1.charAt(0) === "0")
                    b1 = "." + b1;
                return a1 - b1;
            }
            else
                return a1 > b1 ? 1 : -1;
        }
    }
    return a.length - b.length;
}
var nonDispoTemplate = '<span data-l10n-id="noDisponible">Indisponible <br />à votre adresse</span>';
var nonDispoAllTemplate = '<span data-l10n-id="notEligible">Nous ne pouvons malheureusement pas vérifier l’éligibilité de votre adresse. <br />Merci de nous contacter au 2799 0000 pour plus d\'informations.</span>';
var buttonDispoTempate = '<a data-l10n-id="menuLinkSub" class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_FR.pdf" target="_blank">Abonnez-vous</a>';
var buttonPromoFibre = '<a data-l10n-id="menuLinkSub" class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_OFFRE2_FR.pdf" target="_blank">Abonnez-vous</a>';
var buttonPromoTv = '<a data-l10n-id="menuLinkSub" class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_OFFRE1_FR.pdf" target="_blank">Abonnez-vous</a>';
var checkDispoTemplate = '<section id="test-offres" class="clearfix">' +
        '<div class="container-wrapper">' +
        '<div class="row">' +
        '<div class="text phone-12 desk-6"><span class="icon-internet-ico"></span><span class="whichOffer">Quelles offres sont disponibles chez vous ?</span></div>' +
        '<div class="testDispo clearfix">' +
        '<div>' +
        '<span data-l10n-id="cpInput"><input id="zipcode" value class="input-white" type="text" placeholder="Code postal" maxlength="4"/></span>' +
        '</div>' +
        '<div>' +
        '<select id="ville" class="input-white select"></select>' +
        '</div>' +
        '<div>' +
        '<select id="rue" class="input-white select"></select>' +
        '</div>' +
        '<div>' +
        '<select id="numero" class="input-white select"></select>' +
        '</div>' +
        '<div class="btn-verif">' +
        '<button data-l10n-id="dispoVerif" type="button" class="btn-orange verifyCp">Vérifiez les disponibilités</button>' +
        '<button data-l10n-id="dispoVerif" type="button" class="btn-orange btnVerif2">Vérifiez les disponibilités</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
var popuptemplate = '<div id="testDispo" class="popup">' +
        '<div class="background-client"></div>' +
        '<div class="white-pannel">' +
        '<button class="pannel-close"><span class="icon-x-icone"></span></button>' +
        '<h2 data-l10n-id="">Testez la disponibilité</h2>' +
        '<span data-l10n-id="cpInput"><input value name="zipcode" class="input-white" type="text" placeholder="Code postal"/></span>' +
        '<select name="ville" value class="input-white select"></select>' +
        '<select name="rue" value class="input-white select"></select>' +
        '<select name="numero" value class="input-white select numero"></select>' +
        '<div style="text-align: center;">' +
        '<button data-l10n-id="dispoVerif" type="button" class="btn-orange btnVerify verifyCp">Vérifiez les disponibilités</button>' +
        '<button data-l10n-id="dispoVerif" type="button" data-bool="true" class="btn-orange btnVerify btnVerif2">Vérifiez les disponibilités</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
var offers = {
    100: {
        name: "Fiber 100",
        description: "<span data-l10n-id='heartHit'>Offre coup de </span><span class='icon-heart-ico'></span>",
        download: "100 Mbit/s",
        upload: "50 Mbits/s",
        price: {
            unit: 54,
            exponent: ",90€"
        },
        color: 'orange'
    },
    200: {
        name: "Fiber 200",
        description: "<span data-l10n-data='getBest'>Exigez le meilleur</span>",
        download: "200 Mbit/s",
        upload: "100 Mbits/s",
        price: {
            unit: 71,
            exponent: ",90€"
        },
        color: 'blue'
    },
    double: {
        name: "Fiber </span><span style='text-decoration: line-through; font-size: 0.9em;'> 100 </span> 200",
        description: "PROMO : LA VITESSE x2",
        download: "</span><span style='text-decoration: line-through; font-size: 0.9em;'> 100 </span><span class='orange'>200 Mbit/s</span>",
        upload: "</span><span style='text-decoration: line-through; font-size: 0.9em;'> 50 </span>&nbsp;&nbsp;<span class='orange'>100 Mbit/s</span>",
        price: {
            unit: 54,
            exponent: ",90€"
        },
        color: 'orange'
    }

};
var offerFiber200 = {mobile: null, desktop: null};
var isLOLCable = false;
var obj = {},
        streetList = {},
        currRue = "",
        ab = [],
        nbrTimeout = "",
        vhash = "",
        _cp = "", _ville = "", _rue = "", _nbr = "", _isCable = false;
//détecte le bouton pour offrir le test de dispo et ajoute la popup dans la page
function createDispoPopup() {
    if ($('.openPopup[data-popup=1]').length) {
        $('body').prepend(popuptemplate);
    }
}

function printOffer(offer) {
    var printedOffer = '<div class="offer-item-' + offer.color + '">' +
            '<div class="item-header">' +
            '<strong>LOL</strong>' + offer.name +
            '</div>' +
            '<ul class="item-body">' +
            '<li class="description">' + offer.description + '</li>' +
            '<li class="info"><span class="icon-download-ico download"></span>' + offer.download + '<span class="exponent">(1)</span></li>' +
            '<li class="info"><span class="icon-download-ico upload"></span>' + offer.upload + '<span class="exponent">(1)</span></li>' +
            '<li class="check-list-container">' +
            '<div class="check-list-title"><span class="icon-pack-ico"></span> <span data-l10n-id="packInclude">Inclus dans ce pack :</span> </div>' +
            '<ul class="check-list">' +
            '<li><span class="icon-check-ico"></span><span data-l10n-id="volUnlimited">Volume illimité</span></li>' +
            '<li><span class="icon-check-ico"></span><span data-l10n-id="aboTel">Abonnement tél. fixe</span></li>' +
            '<li><span class="icon-check-ico"></span><span data-l10n-id="natCall">Appels nat. fixes</span><span class="exponent">(2)</span></li>' +
            '<li><span class="icon-check-ico"></span><span data-l10n-id="mobileCall">Appels vers mobiles LOL</span></li>' +
            '<li><span class="icon-check-ico"></span><span data-l10n-id="euFixe">120 min vers l\'Europe fixe</span><span class="exponent">(2) (3)</span></li>' +
            '<li><span class="icon-check-ico"></span>LOL CLOUD 5GB</li>' +
            '</ul>' +
            '</li>' +
            '</ul>' +
            '<div class="item-footer">' +
            '<div class="offer-price">' +
            '<div>' + offer.price.exponent + '</div>' +
            +offer.price.unit + '<span data-l10n-id="month">/mois</span>' +
            '</div>' +
            '</div>' +
            '</div>';
    return printedOffer;
}
;

function insertLink(id, service, indexLink) {
    var linkList = ['//shop.internet.lu/inscription/shop/inscription.html#', '//www.internet.lu/promos/fibre_1.html#'];
    return 'href="' + linkList[indexLink] + service + ';' + id + '"';
    /*internet shop link: "http://shop.internet.lu/inscription/shop/inscription.html#"
     *local shop link: "../shop/inscription.html#"*/
}
function insertButton(id, service) {
    return '<a class="btn-blue btn-subscription" ' + insertLink(id, service, 0) + '><span data-l10n-id="menuLinkSub">Abonnez-vous</span></a>';
}
function insertPromoLink(id, service, string) {
    return '<a class="promos-link"' + insertLink(id, service, 1) + '>' + string + '</a>';
}
function printNonDispo(string) {
    return '<div class="not-dispo"><div class="not-dispo-info">' + string + '</div></div>';
}
function resetDisplay() {
    $('.k24, .k30, .k100, .k200').nextAll().not('.promos-link.persist').remove();
    $('.k24, .k30, .k100, .k200').removeClass('not');
    $('#lol').show();
    $('#cable').hide();
    $('#offers-section, #promoFiber-content').find('.not-dispo').remove();
}

function checkDispo(homeId, isLOLCable) {
    if (homeId !== undefined || homeId !== null || homeId !== '') {
        $.ajax({
            url: "http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=FOServiceMap:FOServiceListNewEx.phs&_HomeId=" + homeId,
            dataType: 'jsonp',
            success: function (data) {
                obj = data;
                console.log(obj);
                ab = ["", "", "", "", "", "", ""];
                if (obj.Service[6]) {  // Dégroupage DSL
                    articleObj = obj.Service[6].article;
                    if (obj.Service[6] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5257" && ab[0] == "") {// LOL DSL 24
                                    ab[0] = [articleObj[b].idObject, 6];
                                }
                            }

                        }

                    }
                }

                if (obj.Service[8]) { // Dégroupage VDSL
                    articleObj = obj.Service[8].article;
                    if (obj.Service[8] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5273" && ab[1] == "") {//Fiber 30
                                    ab[1] = [articleObj[b].idObject, 8];
                                }
                            }

                        }
                    }
                }

                if (obj.Service[2]) { // Dégroupage Fibre
                    articleObj = obj.Service[2].article;
                    if (obj.Service[2] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5272" && ab[1] == "") {//Fiber 30 dégroupé
                                    ab[1] = [articleObj[b].idObject, 2];
                                }
                                if (articleObj[b].idObject == "5275" && ab[2] == "") {//Fiber 100 dégroupé
                                    ab[2] = [5829, 2];
                                }
                                if (articleObj[b].idObject == "5276" && ab[3] == "") {//Fiber 200 dégroupé
                                    ab[3] = [articleObj[b].idObject, 2];
                                }
                            }

                        }
                    }
                }

                if (obj.Service[5]) { // Revente Fibre
                    articleObj = obj.Service[5].article;
                    if (obj.Service[5] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5626" && ab[2] == "") {//Fiber 100
                                    ab[2] = [5888, 5];
                                }
                                if (articleObj[b].idObject == "5627" && ab[3] == "") {//Fiber 200
                                    ab[3] = [articleObj[b].idObject, 5];
                                }
                            }

                        }

                    }
                }

                if (obj.Service[8]) { // Dégroupage VDSL
                    articleObj = obj.Service[8].article;
                    if (obj.Service[8] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5274" && ab[2] == "") {//Fiber 100 1 paire
                                    ab[2] = [articleObj[b].idObject, 8];
                                }
                                if (articleObj[b].idObject == "5336" && ab[2] == "") {//Fiber 100 2 paires
                                    ab[2] = [articleObj[b].idObject, 8];
                                }
                            }

                        }
                    }
                }

                if (obj.Service[4]) { // Revente VDSL 30
                    articleObj = obj.Service[4].article;
                    if (obj.Service[4] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5625" && ab[1] == "") {//Fiber 30
                                    ab[1] = [articleObj[b].idObject, 4];
                                }

                            }

                        }
                    }
                }

                if (obj.Service[5]) { // Revente Fibre
                    articleObj = obj.Service[5].article;
                    if (obj.Service[5] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5625" && ab[1] == "") {//Fiber 30
                                    ab[1] = [articleObj[b].idObject, 5];
                                }
                            }

                        }

                    }
                }

                if (obj.Service[41]) { // Revente VDSL 100 1 paire
                    articleObj = obj.Service[41].article;
                    if (obj.Service[41] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5626" && ab[2] == "") {//Fiber 100 1 paire
                                    ab[2] = [articleObj[b].idObject, 41];
                                }
                            }

                        }
                    }
                }

                if (obj.Service[42]) { // Revente VDSL 100 2 paires
                    articleObj = obj.Service[42].article;
                    if (obj.Service[42] && $(articleObj[0]).size() > 0) {//entry exists
                        for (i in articleObj) {
                            for (b in articleObj) {
                                if (articleObj[b].idObject == "5626" && ab[2] == "") {//Fiber 100 2 paires
                                    ab[2] = [articleObj[b].idObject, 42];
                                }
                            }
                        }
                    }
                }
                resetDisplay();
                var boolean = (isLOLCable == "true" || isLOLCable === true);

                if (ab[0] == "" && ab[1] == "" && ab[2] == "" && ab[3] == "" && $('#promoFiber-content').length == 0) {
                    if (!boolean) {
                        $(printNonDispo(nonDispoAllTemplate)).prependTo('#lol').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                    } else {
                        $('#lol').fadeOut(400);
                    }
                } else {
                    if ($(obj.Service[2]).length > 0 || $(obj.Service[5]).length > 0) { //DISPLAY PROMOS 100 --> 200 (supression old 200 + ajout double)
                        $('#lol .hidden-phone .k200').parent().remove();
                        $('#lol .main-gallery').flickity('remove', $('#lol .display-phone .k200').parent());
                        $('#lol .k100').empty().append(printOffer(offers['double']));
                        $('#lol').addClass('degroupage');
                    } else { // NO FIBRE DONC PAS PROMOS
                        if ($('.k200').length === 0) {  //SI OFFRE 200 PAS LÀ ALORS REPRINT SUR LA PAGE OFFRE
                            if ($('#promoFiber-content').length == 0) {
                                offerFiber200.mobile = $("<div class='gallery-cell'></div>").append('<div class="k200">' + printOffer(offers[200]) + '</div>');
                                offerFiber200.desktop = $("<div class='phone-6 desk-3 tab-pl-10 phone-pr-0 desk-pl-5 lgdesk-pl-10'></div>").append('<div class="k200">' + printOffer(offers[200]) + '</div>');
                                $('#lol .hidden-phone').append(offerFiber200.desktop);
                                $('#lol .display-phone .main-gallery').flickity('append', offerFiber200.mobile);
                                $('.k100').empty().append(printOffer(offers[100]));
                                $('#lol').removeClass('degroupage');
                            }
                        }
                    }
                    if (ab[0] == "") {
                        $(printNonDispo(nonDispoTemplate)).prependTo('.k24').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                        $('.k24').addClass('not');
                    } else {
                        $('.k24').find('.not-dispo').remove();
                        $(insertButton(ab[0][0], ab[0][1])).insertAfter($('.k24')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                    }
                    if (ab[1] == "") {
                        $(printNonDispo(nonDispoTemplate)).prependTo('.k30').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                        $('.k30').addClass('not');
                    } else {
                        $('.k30').find('.not-dispo').remove();
                        $(insertButton(ab[1][0], ab[1][1])).insertAfter($('.k30')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                    }
                    if ($('#promoFiber-content').length <= 0) { //NOT PAGE PROMO FIBRE
                        if (ab[2] == "") {
                            $(printNonDispo(nonDispoTemplate)).prependTo('.k100').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                            $('.k100').addClass('not');
                        } else {
                            $('.k100').find('.not-dispo').remove();
                            if ($(obj.Service[2]).length <= 0 && $(obj.Service[5]).length <= 0) { //SI PAS FIBRE
                                $('.k100+.promos-link.persist').hide();
                                $(insertPromoLink(ab[2][0], ab[2][1], "<span data-l10n-id='promoInstall'>promo : installation offerte</span>")).insertAfter($('.k100')).css('visibility', 'visible').animate({opacity: 1.0}, 500); //PRINT LIEN VERS PAGE VDSL
                            } else {
                                $('.k100+.promos-link.persist').attr('href', '//www.internet.lu/promos/fibre.html#' + homeId + ';' + isLOLCable);
                                $('.k100+.promos-link.persist').show();
                                $('.k100+.promos-link:not(.persist)').remove();
                            }
                            $(insertButton(ab[2][0], ab[2][1])).insertAfter($('.k100')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                        }
                    } else { //PAGE PROMO FIBRE
                        if ($(obj.Service[2]).length > 0 || $(obj.Service[5]).length > 0) { // FIBRE
                            $('.k100').find('.not-dispo').remove();
                            $(insertButton(ab[2][0], ab[2][1])).insertAfter($('.k100')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                        } else {
                            $(printNonDispo(nonDispoTemplate)).prependTo('.k100').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                            $('.k100').addClass('not');
                            if ($('#promoFiber-content').length > 0 && (ab[0] != "" || ab[1] != "")) {
                                $('<a data-l10n-id="otherOffers" class="btn-blue btn-subscription" href="//internet.lu/internet/offres.html">Voir nos autres offres</a>').insertAfter($('.k100')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                            }
                        }
                    }
                    if (ab[3] == "") {
                        $(printNonDispo(nonDispoTemplate)).prependTo('.k200').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                        $('.k200').addClass('not');
                    } else {
                        $('.k200').find('.not-dispo').remove();
                        $(insertButton(ab[3][0], ab[3][1])).insertAfter($('.k200')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                    }
                }
                if (boolean) {
                    $('#cable').fadeIn(400);
                }
                if ($('.main-gallery').length) {
                    $('.main-gallery').show().flickity('resize');
                }
                $('html, body').animate({
                    scrollTop: $('#offers-section, #promoFiber-content').offset().top
                }, 650);
                Cookies.set('shop_idhome', homeId, {expires: 1});
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown);
                
                resetDisplay();
                $(printNonDispo(nonDispoAllTemplate)).prependTo('#lol').css('visibility', 'visible').animate({opacity: 1.0}, 500);
            }
        });
    }
}

$(function () {
    createDispoPopup();
    try {
        var vhash = (window.location.hash.split('#')[1]).split(";");
        if (vhash.length > 2 && $('#promoVDSL-content').length <= 0) {
            _cp = vhash[0];
            _ville = vhash[1];
            _rue = vhash[2];
            _nbr = vhash[3];
            _isCable = vhash[4];
            checkDispo(_nbr, _isCable);
            setTimeout(function () {
                $("input[name=zipcode]").val(_cp);
                $(".verifyCp").click();
            }, 500);
        } else {
            $("input[name=zipcode]").val("");
        }
    } catch (e) {
        $("input[name=zipcode]").val("");
    }
    ;
    $("input[name=zipcode]").mask("L-9999");
    $("#zipcode").mask("L-9999");
    $("input[name=zipcode]").keypress(function (event) {
        if (event.which == 13) {//enter pressed
            $(".verifyCp").click();
        }

    });
    if ($("#dispo icons").length) {
        $("#dispo icons").show();
    }
    if ($('#test-offres .text').length) {
        $('#test-offres .text').show();
    }
    $(".verifyCp").show();
    $(".btnVerif2, .btnVerif").hide();
    $("select[name=ville]").hide();
    $("select[name=rue]").hide();
    $("select[name=numero]").hide();
    $("input[name='zipcode']").keyup(function () {
        $(".verifyCp").show();
        $(".btnVerif2, .btnVerif").hide();
        $("select[name='ville']").hide();
        $("select[name='rue']").hide();
        $("select[name='numero']").hide();
    });
    $("body").on('click', '.verifyCp', function () {
        $("select[name='ville']").hide();
        $("select[name='rue']").hide();
        $("select[name='numero']").hide();
        $.ajax({
            url: 'http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=cpList.phs&_iZip=' + $("input[name='zipcode']").val().substr(2, $("input[name='zipcode']").val().length - 1),
            dataType: 'jsonp',
            success: function (data) {
                streetList = data;
                arrLocality = [];
                locality = "<option data-l10n-id='chooseLoc'>Choisissez votre localité</option>";
                var vhtml = "<option data-l10n-id='chooseAdr' data-idLocality='-1'>Choisissez votre adresse</option>";
                for (i in streetList.Streets) {

                    vhtml += "<option value='" + streetList.Streets[i].id + "' title='" + streetList.Streets[i].name + "' data-idLocality='" + streetList.Streets[i].idLocality + "'>" + streetList.Streets[i].name + "</option>";
                    streetList.Streets[i].streetNumbers.sort(natSort); //order streetNumbers numeric
                    arrLocality[streetList.Streets[i].idLocality] = streetList.Streets[i].azLocality;
                }
                for (var idLocality in arrLocality) {
                    locality += "<option value='" + idLocality + "' title='" + arrLocality[idLocality] + "'>" + arrLocality[idLocality] + "</option>";
                }
                if ($(locality).length < 2 || $("input[name=zipcode]").val().substr(2, $("input[name=zipcode]").val().length - 1) < 1000) {
                    locality = "<option data-l10n-id='unknownCp'>Code postal inconnu</option>";
                }
                $(".verifyCp").hide();
                $(".btnVerif2, .btnVerif").show();
                if ($('#test-offres .text').length) {
                    $('#test-offres .text').fadeOut(function () {
                        $("select[name=ville]").html(locality).fadeIn();
                        $("select[name=rue]").html(vhtml);
                        if ($(locality).length == 2) {
                            $("select[name=ville]").prop("selectedIndex", 1).change();
                            $("select[name=ville] option").first().remove();
                        }
                        if ($("select[name=rue] option").length == 2) {
                            $("select[name=rue]").prop("selectedIndex", 1).change();
                            $("select[name=rue] option").first().remove();
                        }
                        if ($(vhash).length != 0) {
                            $("select[name=ville] option").each(function () {
                                if ($(this).val() == _ville) {
                                    $(this).parent().prop("selectedIndex", $(this).index()).change();
                                }
                            });
                            $("select[name=rue] option").each(function () {
                                if ($(this).val() == _rue) {
                                    $(this).parent().prop("selectedIndex", $(this).index()).change();
                                }
                            });
                        }
                    });
                } else if ($('#dispo .icons').length) {
                    $("#dispo .icons").fadeOut(function () {
                        $("select[name=ville]").html(locality).fadeIn();
                        $("select[name=rue]").html(vhtml);
                        if ($(locality).length == 2) {
                            $("select[name=ville]").prop("selectedIndex", 1).change();
                            $("select[name=ville] option").first().remove();
                        }
                        if ($("select[name=rue] option").length == 2) {
                            $("select[name=rue]").prop("selectedIndex", 1).change();
                            $("select[name=rue] option").first().remove();
                        }
                        if ($(vhash).length != 0) {
                            $("select[name=ville] option").each(function () {
                                if ($(this).val() == _ville) {
                                    $(this).parent().prop("selectedIndex", $(this).index()).change();
                                }
                            });
                            $("select[name=rue] option").each(function () {
                                if ($(this).val() == _rue) {
                                    $(this).parent().prop("selectedIndex", $(this).index()).change();
                                }
                            });
                        }
                    });
                } else {
                    $("select[name=ville]").html(locality).fadeIn();
                    $("select[name=rue]").html(vhtml);
                    if ($(locality).length == 2) {
                        $("select[name=ville]").prop("selectedIndex", 1).change();
                        $("select[name=ville] option").first().remove();
                    }
                    if ($("select[name=rue] option").length == 2) {
                        $("select[name=rue]").prop("selectedIndex", 1).change();
                        $("select[name=rue] option").first().remove();
                    }
                    if ($(vhash).length != 0) {
                        $("select[name=ville] option").each(function () {
                            if ($(this).val() == _ville) {
                                $(this).parent().prop("selectedIndex", $(this).index()).change();
                            }
                        });
                        $("select[name=rue] option").each(function () {
                            if ($(this).val() == _rue) {
                                $(this).parent().prop("selectedIndex", $(this).index()).change();
                            }
                        });
                    }
                }

            }
        });
    });
    $("body").on('change', 'select[name=ville]', function () {
        thisId = $(this).find("option:selected").val();
        $("select[name=rue] option").each(function () {
            if ($(this).attr("data-idLocality") == thisId || $(this).attr("data-idLocality") == "-1") {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $("select[name=rue]").fadeIn();
    });
    $("body").on('change', 'select[name=rue]', function () {
        for (i in streetList.Streets) {
            if (streetList.Streets[i].id == $("select[name=rue]").val()) {
                streetNbr = streetList.Streets[i].streetNumbers;
                var vhtml = "<option data-l10n-id='chooseNum' value=''>Choisissez le numéro</option>";
                for (b in streetNbr) {
                    number = streetNbr[b].number.length > 0 ? "Numéro:" + streetNbr[b].number + "\n" : "";
                    building = streetNbr[b].building.length > 0 ? "Batiment:" + streetNbr[b].building + "\n" : "";
                    floor = streetNbr[b].floor.length > 0 ? "étage:" + streetNbr[b].floor + "\n" : "";
                    apartment = streetNbr[b].apartment.length > 0 ? "Appartement:" + streetNbr[b].apartment + "\n" : "";
                    vhtml += "<option value='" + streetNbr[b].id + "' title='" + number + building + floor + apartment + "'>" + (streetNbr[b].number.length > 0 ? streetNbr[b].number : "Aucun") + " " + streetNbr[b].building + " " + streetNbr[b].floor + " " + streetNbr[b].apartment + "</option>";
                }
                $("select[name=numero]").html(vhtml).fadeIn();
                if ($(vhash).length != 0) {
                    $("select[name=numero] option").each(function () {
                        if ($(this).val() == _nbr) {
                            $(this).parent().prop("selectedIndex", $(this).index()).change();
                            $(".btnVerif").fadeIn();
                            setTimeout(function () {
                                $(".btnVerif").click();
                            }, 200);
                        }
                    });
                }
            }
        }
    });
    $("body").on('click', '.btnVerif', function () {
        var homeId = $("select[name=numero]").val();
        if ($("select[name=ville]").val() == 98 || $("select[name=ville]").val() == 428 || $("select[name=ville]").val() == 571 || $("select[name=ville]").val() == 174 || $("select[name=ville]").val() == 220) {
            isLOLCable = true;
        } else {
            isLOLCable = false;
        }
        if (homeId != "") {
            window.location.href = "/internet/offres.html#" + $("input[name=zipcode]").val() + ";" + $("select[name=ville]").val() + ";" + $("select[name=rue]").val() + ";" + $("select[name=numero]").val() + ";" + isLOLCable;
        } else {
            alert('Entrez votre numéro de rue pour continuer...');
        }
    });
    $("body").on('click', '.btnVerif2', function (event) {
        var homeId = $("select[name=numero]").val();
        if ($("select[name=ville]").val() == 98 || $("select[name=ville]").val() == 428 || $("select[name=ville]").val() == 571 || $("select[name=ville]").val() == 174 || $("select[name=ville]").val() == 220) {
            isLOLCable = true;
        } else {
            isLOLCable = false;
        }
        if (homeId !== "") {
            if ($('#testDispo').hasClass('is-visible')) {
                PopupModule.closePopup(event); //main.js
            }
            checkDispo($("select[name=numero]").val(), isLOLCable);
        } else {
            alert('Entrez votre numéro de rue pour continuer...');
        }
    });
});



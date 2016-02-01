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

var nonDispoTemplate = '<div class="not-dispo"><div class="not-dispo-info">Offre <br />indisponible <br />à votre adresse</div></div>';
var buttonDispoTempate = '<a class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_FR.pdf" target="_blank">Abonnez-vous</a>';
var buttonPromoFibre = '<a class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_OFFRE2_FR.pdf" target="_blank">Abonnez-vous</a>';
var buttonPromoTv = '<a class="btn-blue btn-subscription" href="../documents/LOLFIBERDSL_OFFRE1_FR.pdf" target="_blank">Abonnez-vous</a>';

var checkDispoTemplate = '<section id="test-offres" class="clearfix">' +
        '<div class="container-wrapper">' +
        '<div class="row">' +
        '<div class="text phone-12 desk-6"><span class="icon-internet-ico"></span>Quelles offres sont disponibles chez vous ?</div>' +
        '<div class="testDispo clearfix">' +
        '<div>' +
        '<input id="zipcode" value class="input-white" type="text" placeholder="Code postal" maxlength="4"/>' +
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
        '<button type="button" class="btn-orange verifyCp">Vérifiez les disponibilités</button>' +
        '<button type="button" class="btn-orange btnVerif2">Vérifiez les disponibilités</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';

var popuptemplate = '<div id="testDispo" class="popup">' +
        '<div class="background-client"></div>' +
        '<div class="white-pannel">' +
        '<button class="pannel-close"><span class="icon-x-icone"></span></button>' +
        '<h2>Testez la disponibilité</h2>' +
        '<input value name="zipcode" class="input-white" type="text" placeholder="Code postal"/>' +
        '<select name="ville" value class="input-white select"></select>' +
        '<select name="rue" value class="input-white select"></select>' +
        '<select name="numero" value class="input-white select numero"></select>' +
        '<div style="text-align: center;">' +
        '<button type="button" class="btn-orange btnVerify verifyCp">Vérifiez les disponibilités</button>' +
        '<button type="button" data-bool="true" class="btn-orange btnVerify btnVerif2">Vérifiez les disponibilités</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

var obj = {},
        streetList = {},
        currRue = "",
        ab = [],
        nbrTimeout = "",
        vhash = "",
        _cp = "", _ville = "", _rue = "", _nbr = "";

//détecte le bouton pour offrir le test de dispo et ajoute la popup dans la page
function createDispoPopup() {
    if ($('.openPopup[data-popup=1]').length) {
        $('body').prepend(popuptemplate);
    }
}

function insertLink(id, service) {
    return '<a class="btn-blue btn-subscription" href="../shop/inscription.html#' + service + ';' + id + '">Abonnez-vous</a>';
}
;

function checkDispo(homeId, villeId, boolean) {
    if (homeId !== undefined || homeId !== null || homeId !== '') {
        $.ajax({
            url: "http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=FOServiceMap:FOServiceListNew.phs&_HomeId=" + homeId,
            dataType: 'jsonp',
            success: function (data) {
                obj = data;
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
                                    ab[2] = [articleObj[b].idObject, 2];
                                }
                                if (articleObj[b].idObject == "5276" && ab[2] == "") {//Fiber 200 dégroupé
                                    ab[3] = [articleObj[b].idObject, 2];
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
                                if (articleObj[b].idObject == "5262" && ab[1] == "") {//Fiber 30
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
                                if (articleObj[b].idObject == "5262" && ab[1] == "") {//Fiber 30
                                    ab[1] = [articleObj[b].idObject, 5];
                                }
                                if (articleObj[b].idObject == "5263" && ab[2] == "") {//Fiber 100
                                    ab[2] = [articleObj[b].idObject, 5];
                                }
                                if (articleObj[b].idObject == "5264" && ab[3] == "") {//Fiber 200
                                    ab[3] = [articleObj[b].idObject, 5];
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
                                if (articleObj[b].idObject == "5263" && ab[2] == "") {//Fiber 100 1 paire
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
                                if (articleObj[b].idObject == "5263" && ab[2] == "") {//Fiber 100 2 paires
                                    ab[2] = [articleObj[b].idObject, 42];
                                }
                            }
                        }
                    }
                }

                $('.k24, .k30, .k100, .k200').next().remove();
                $('.k24, .k30, .k100, .k200').find('.not-dispo').remove();

                if (ab[0] == "") {
                    $(nonDispoTemplate).prependTo('.k24').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                } else {
                    $('.k24').find('.not-dispo').remove();
                    $(buttonDispoTempate).insertAfter($('.k24')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                }
                if (ab[1] == "") {
                    $(nonDispoTemplate).prependTo('.k30').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                } else {
                    $('.k30').find('.not-dispo').remove();
                    $(buttonDispoTempate).insertAfter($('.k30')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                }
                if (ab[2] == "") {
                    $(nonDispoTemplate).prependTo('.k100').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                } else {
                    $('.k100').find('.not-dispo').remove();
                    $(buttonPromoFibre).insertAfter($('.k100')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                }
                if (ab[3] == "") {
                    $(nonDispoTemplate).prependTo('.k200').css('visibility', 'visible').animate({opacity: 1.0}, 500);
                } else {
                    $('.k200').find('.not-dispo').remove();
                    $(buttonPromoFibre).insertAfter($('.k200')).css('visibility', 'visible').animate({opacity: 1.0}, 500);
                }
                if (villeId == 98 || villeId == 428 || villeId == 174 || villeId == 159) {
                    $('#cable').show();
                }else{
                    if($('#cable').is(':visible')){
                        $('#cable').hide();
                    }
                }
                if ($('.main-gallery').length) {
                    $('.main-gallery').show().flickity('resize');
                }
                $('#offers-section').goTo();
            }
        });
    }
}

$(function () {
    createDispoPopup();
    try {
        var vhash = (window.location.hash.split('#')[1]).split(";");
        if (window.location.hash.length > 2) {
            _cp = vhash[0];
            _ville = vhash[1];
            _rue = vhash[2];
            _nbr = vhash[3];
            checkDispo(_nbr, _ville, false);
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

    $("input[name=zipcode]").keyup(function () {
        $(".verifyCp").show();
        $(".btnVerif2, .btnVerif").hide();
        $("select[name=ville]").hide();
        $("select[name=rue]").hide();
        $("select[name=numero]").hide();
    });

    $("body").on('click', '.verifyCp', function () {
        $("select[name=ville]").hide();
        $("select[name=rue]").hide();
        $("select[name=numero]").hide();
        $.ajax({
            url: 'http://shop.internet.lu/Scripts/sql.exe?SqlDB=LOLShop&Sql=cpList.phs&_iZip=' + $("input[name=zipcode]").val().substr(2, $("input[name=zipcode]").val().length - 1),
            dataType: 'jsonp',
            success: function (data) {
                streetList = data;
                arrLocality = [];
                locality = "<option>Choisissez votre localité</option>";
                var vhtml = "<option data-idLocality='-1'>Choisissez votre adresse</option>";
                for (i in streetList.Streets) {

                    vhtml += "<option value='" + streetList.Streets[i].id + "' title='" + streetList.Streets[i].name + "' data-idLocality='" + streetList.Streets[i].idLocality + "'>" + streetList.Streets[i].name + "</option>";
                    streetList.Streets[i].streetNumbers.sort(natSort);//order streetNumbers numeric
                    arrLocality[streetList.Streets[i].idLocality] = streetList.Streets[i].azLocality;
                }
                for (var idLocality in arrLocality) {
                    locality += "<option value='" + idLocality + "' title='" + arrLocality[idLocality] + "'>" + arrLocality[idLocality] + "</option>";
                }
                if ($(locality).length < 2 || $("input[name=zipcode]").val().substr(2, $("input[name=zipcode]").val().length - 1) < 1000) {
                    locality = "<option>Code postal inconnu</option>";
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
                        if (vhash) {
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
                        if (vhash) {
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
                    if (vhash) {
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
                var vhtml = "<option value=''>Choisissez le numéro</option>";
                for (b in streetNbr) {
                    number = streetNbr[b].number.length > 0 ? "Numéro:" + streetNbr[b].number + "\n" : "";
                    building = streetNbr[b].building.length > 0 ? "Batiment:" + streetNbr[b].building + "\n" : "";
                    floor = streetNbr[b].floor.length > 0 ? "étage:" + streetNbr[b].floor + "\n" : "";
                    apartment = streetNbr[b].apartment.length > 0 ? "Appartement:" + streetNbr[b].apartment + "\n" : "";
                    vhtml += "<option value='" + streetNbr[b].id + "' title='" + number + building + floor + apartment + "'>" + (streetNbr[b].number.length > 0 ? streetNbr[b].number : "Aucun") + " " + streetNbr[b].building + " " + streetNbr[b].floor + " " + streetNbr[b].apartment + "</option>";
                }
                $("select[name=numero]").html(vhtml).fadeIn();

                if (vhash) {
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
        if (homeId != "") {
            window.location.href = "/internet/offres.html#" + $("input[name=zipcode]").val() + ";" + $("select[name=ville]").val() + ";" + $("select[name=rue]").val() + ";" + $("select[name=numero]").val();
        } else {
            alert('Entrez votre numéro de rue pour continuer...');
        }
    });
    $("body").on('click', '.btnVerif2', function (event) {
        var homeId = $("select[name=numero]").val();

        if (homeId !== "") {
            if ($('#testDispo').hasClass('is-visible')) {
                PopupModule.closePopup(event); //main.js
            }
            checkDispo($("select[name=numero]").val(), $("select[name=ville]").val(), $(this).data('bool') || false);
        } else {
            alert('Entrez votre numéro de rue pour continuer...');
        }

    });
});



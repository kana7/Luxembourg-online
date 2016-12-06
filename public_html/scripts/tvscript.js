$(function () {
    locationSelect.init();
});

var locationSelect = (function () {
    var $channelLanguagesLinks = $('.channels-language-links>li');
    var $tvChannels = $('#tvChannels');
    var $radioChannels = $('#radioChannels');


    var init = function () {
        _renderSelection();
        _bindEvents();
    };
    var _bindEvents = function () {
        $channelLanguagesLinks.on('click', function (event) {
            _displaySelection($(this), event);
        });
    };

    var _displaySelection = function (element, event) {
        var $containerType;
        var $languageLinks = $(event.target).closest('ul');
        
        if ($languageLinks.attr('data-type')==="tv"){
            $containerType = $tvChannels;
        }else{
            $containerType = $radioChannels;
        }
        //remove all previous selection
        $languageLinks.children('li').removeAttr('class');
        $containerType.children('div[data-language]').removeAttr('class');

        $languageLinks.children('li[data-language=' + element.attr('data-language') + ']').addClass('active');
        $containerType.children('div[data-language=' + element.attr('data-language') + ']').addClass('is-visible');
    };

    var _renderSelection = function () {
        var htmlRadio_list = "";
        var htmlTv_list = "";
        var def;
        for (var i in tv_list) {
            htmlTv_list += '<div data-language=' + i + '>';
            for (var b in tv_list[i]) {
                definition = ["SD", "HD"];
                if (tv_list[i][b].definition.length > 1) {
                    def = "HD";
                } else {
                    def = "";
                }
                htmlTv_list += '<div class="item"><div class="channel-logo"><img src="../images/TV/Logos/' + tv_list[i][b].link + '" alt="' + tv_list[i][b].name + ' logo"/></div><p class="channel-brand">' + tv_list[i][b].name + ' ' + def + '</p></div>';
            }
            htmlTv_list += '</div>';
        }
        for (var i in radio_list) {
            htmlRadio_list += '<div data-language=' + i + '>';
            for (var b in radio_list[i]) {
                htmlRadio_list += '<div class="item"><div class="channel-logo"><img src="../images/TV/Logos/' + radio_list[i][b].link + '" alt="' + radio_list[i][b].name + ' logo"/></div><p class="channel-brand">' + radio_list[i][b].name + ' ' + '</p></div>';
            }
            htmlRadio_list += '</div>';
        }
        $tvChannels.append(htmlTv_list);
        $radioChannels.append(htmlRadio_list);
        $('#tvChannels>div[data-language]:first-child').addClass('is-visible');
        $('.channels-language-links>li[data-language="' + $('#tvChannels>div[data-language]:first-child').attr('data-language') + '"]').addClass('active');
        $('#radioChannels>div[data-language]:first-child').addClass('is-visible');
        $('.channels-language-links.radio>li[data-language]').removeClass('active');
        $('.channels-language-links.radio>li[data-language="' + $('#radioChannels>div[data-language]:first-child').attr('data-language') + '"]').addClass('active');

    };
    return{
        init: init
    };
})();

var radio_list = {
    "de": [
        {
            "link": "radio/1live.png",
            "name": "1Live",
            "lang": "DE"
        },
        {
            "link": "radio/Bayern1.png",
            "name": "Bayern1",
            "lang": "DE"
        },
        {
            "link": "radio/Bayern3.png",
            "name": "Bayern3",
            "lang": "DE"
        },
        {
            "link": "radio/SR1_EUROPAWELLE.png",
            "name": "Sr1 Europawelle",
            "lang": "DE"
        },
        {
            "link": "radio/SWR1_BW.png",
            "name": "SWR1 BW",
            "lang": "DE"
        },
        {
            "link": "radio/SWR1_RP.png",
            "name": "SWR1 RP",
            "lang": "DE"
        },
        {
            "link": "radio/SWR2.png",
            "name": "SWR2",
            "lang": "DE"
        },
        {
            "link": "radio/SWR3.png",
            "name": "SWR3",
            "lang": "DE"
        },
        {
            "link": "radio/SWR4_BW.png",
            "name": "SWR4 BW",
            "lang": "DE"
        },
        {
            "link": "radio/swr4_rp.png",
            "name": "SWR4 RP",
            "lang": "DE"
        },
        {
            "link": "radio/WDR2.png",
            "name": "WDR2",
            "lang": "DE"
        },
        {
            "link": "radio/wdr4.png",
            "name": "WDR4",
            "lang": "DE"
        }
    ],
    "lu": [
        {
            "link": "radio/Eldoradio.png",
            "name": "Eldoradio",
            "lang": "LU"
        }
    ],
    "fr": [
        {
            "link": "radio/BeurFm.png",
            "name": "BEUR FM",
            "lang": "FR"
        },
        {
            "link": "radio/BFM_Business.png",
            "name": "BFM BUSINESS",
            "lang": "FR"
        },
        {
            "link": "radio/cherie-fm.png",
            "name": "CHERIE FM",
            "lang": "FR"
        },
        {
            "link": "radio/Contact-FM.png",
            "name": "CONTACT FM",
            "lang": "FR"
        },
        {
            "link": "radio/europe1.png",
            "name": "EUROPE 1",
            "lang": "FR"
        },
        {
            "link": "radio/FIP_Radio.png",
            "name": "FIP",
            "lang": "FR"
        },
        {
            "link": "radio/France_bleu.png",
            "name": "FRANCE BLEU",
            "lang": "FR"
        },
        {
            "link": "radio/france-culture.png",
            "name": "FRANCE CULTURE",
            "lang": "FR"
        },
        {
            "link": "radio/France_inter.png",
            "name": "FRANCE INTER",
            "lang": "FR"
        },
        {
            "link": "radio/france-musique.png",
            "name": "FRANCE MUSIQUE",
            "lang": "FR"
        },
        {
            "link": "radio/Fun_Radio.png",
            "name": "FUN RADIO",
            "lang": "FR"
        },
        {
            "link": "radio/jazzradio.png",
            "name": "JAZZ RADIO",
            "lang": "FR"
        },
        {
            "link": "radio/Le-Mouv.png",
            "name": "LE MOUV'",
            "lang": "FR"
        },
        {
            "link": "radio/Nostalgie.png",
            "name": "NOSTALGIE",
            "lang": "FR"
        },
        {
            "link": "radio/Nova_radio.png",
            "name": "NOVA",
            "lang": "FR"
        },
        {
            "link": "radio/NRJ.png",
            "name": "NRJ",
            "lang": "FR"
        },
        {
            "link": "radio/OuiFM.png",
            "name": "OUI FM",
            "lang": "FR"
        },
        {
            "link": "radio/Radio_Alfa.png",
            "name": "RADIO ALFA",
            "lang": "FR"
        },
        {
            "link": "radio/Radio_Classique.png",
            "name": "RADIO CLASSIQUE",
            "lang": "FR"
        },
        {
            "link": "radio/radiocourtoisie.png",
            "name": "RADIO COURTOISIE",
            "lang": "FR"
        },
        {
            "link": "radio/radiocourtoisie.png",
            "name": "radioFG",
            "lang": "FR"
        },
        {
            "link": "radio/rire-et-chansons.png",
            "name": "RIRE & CHANSONS",
            "lang": "FR"
        },
        {
            "link": "radio/rfm.png",
            "name": "rfm",
            "lang": "FR"
        },
        {
            "link": "radio/rmc.png",
            "name": "RMC INFO",
            "lang": "FR"
        },
        {
            "link": "radio/RTL.png",
            "name": "RTL",
            "lang": "FR"
        },
        {
            "link": "radio/rtl2.png",
            "name": "RTL2",
            "lang": "FR"
        },
        {
            "link": "radio/Skyrock.png",
            "name": "SKYROCK",
            "lang": "FR"
        },
        {
            "link": "radio/SudRadio.png",
            "name": "SUD RADIO",
            "lang": "FR"
        },
        {
            "link": "radio/VirginRadio.png",
            "name": "VIRGIN RADIO",
            "lang": "FR"
        }
    ],
    "other": [
        {
            "link": "radio/BBCW_SERVICE.png",
            "name": "BBCW SERVICE",
            "lang": "EN"
        },
        {
            "link": "radio/BBCW_SERVICE.png",
            "name": "BBC Arabic",
            "lang": "AR"
        }
    ]
};

var tv_list = {
    "lu": [
        {
            "link": "tv/RTL.png",
            "name": "RTL",
            "lang": "LU",
            "definition": [1]
        },
		{
            "link": "tv/RTL.png",
            "name": "RTL",
            "lang": "LU",
            "definition": [1]
        },
        {
            "link": "tv/RTL_HD.png",
            "name": "RTL HD",
            "lang": "LU",
            "definition": [2]
        },
        {
            "link": "tv/2rtl.png",
            "name": "Den 2. RTL",
            "lang": "LU",
            "definition": [1]
        }
    ],
    "de": [
        {
            "link": "tv/3sat_50x50.png",
            "name": "3Sat HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/ardalpha.png",
            "name": "Ard Alpha",
            "lang": "DE",
            "definition": [1]
        },
        {
            "link": "tv/artehd.png",
            "name": "Arte HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/Bibel_TV_113x50.png",
            "name": "Bible.TV",
            "lang": "DE",
            "definition": [1]
        },
        {
            "link": "tv/bayerischesFernsehen_62x50.png",
            "name": "BR Süd HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/das-erste-hd.png",
            "name": "Das Erste HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/dmax_67x50.png",
            "name": "DMAX",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/Eurosport_50x50.png",
            "name": "Eurosport Germany",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/hr_40x50.png",
            "name": "hr Fernsehen",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/kabeleinshd.png",
            "name": "Kabel 1 HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/kika_69x50.png",
            "name": "KiKA HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/mdr_89x50.png",
            "name": "mdr HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/n24_67x50.png",
            "name": "N24 HD",
            "lang": "DE",
            "definition": [2]
        },
        {
            "link": "tv/ndr_60x50.png",
            "name": "NDR FSMV HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/ndr_60x50.png",
            "name": "NDR FSNS HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/ndr_60x50.png",
            "name": "NDR FSSH HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/nickhd.png",
            "name": "Nickelodeon HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/ntvhd.png",
            "name": "n-tv HD",
            "lang": "DE",
            "definition": [2]
        },        
        {
            "link": "tv/one.png",
            "name": "ONE HD",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/phoenix_50x50.png",
            "name": "Phoenix HD",
            "lang": "DE",
            "definition": [1]
        },
        ,
        {
            "link": "tv/prosiebenhd.png",
            "name": "Prosieben HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/radioBremen_76x50.png",
            "name": "Radio bremen TV",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/rbb_57x50.png",
            "name": "RBB Berlin HD",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/rtl2hd.png",
            "name": "RTL 2 HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/rtlhd.png",
            "name": "RTL HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/rtlnitro.png",
            "name": "RTL Nitro",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/Sat.1_2_50x50.png",
            "name": "Sat 1 HD",
            "lang": "DE",
            "definition": [1]
        },
        {
            "link": "tv/sixx.png",
            "name": "SIXX HD",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/sport1_83x50.png",
            "name": "Sport 1",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/srf.png",
            "name": "SR Fernsehen HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/super_rtl_113x50.png",
            "name": "Super RTL",
            "lang": "DE",
            "definition": [1]
        }
  
        ,
        {
            "link": "tv/swrbwhd.png",
            "name": "SWR BW HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/swrbwhd.png",
            "name": "SWR RP HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
		        {
            "link": "tv/tagesschau24hd.png",
            "name": "Tagesschau 24 HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/tele5_43x50.png",
            "name": "Tele 5",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/viva_83x50.png",
            "name": "VIVA",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/voxhd.png",
            "name": "VOX HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/wdr_50x50.png",
            "name": "WDR",
            "lang": "DE",
            "definition": [1]
        }
        ,

        {
            "link": "tv/zdfHD_58x50.png",
            "name": "ZDF HD",
            "lang": "DE",
            "definition": [2]
        }
        ,
        {
            "link": "tv/zdfinfohd.png",
            "name": "ZDF info HD",
            "lang": "DE",
            "definition": [1]
        }
        ,
        {
            "link": "tv/zdf_neo_67x50.png",
            "name": "ZDF neo HD",
            "lang": "DE",
            "definition": [1]
        }
    ],
    "fr": [
        
        {
            "link": "tv/artehd.png",
            "name": "Arte HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/bfm_hd_75x50.png",
            "name": "BFM HD",
            "lang": "FR",
            "definition": [2]
        },
		{
            "link": "tv/bfm_business.png",
            "name": "BFM Business",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/Club_RTL.jpg",
            "name": "CLUB RTL",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/cstar.png",
            "name": "Cstar HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/c8.png",
            "name": "C8 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/france2hd.jpg",
            "name": "France 2 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/france3_hd_31x50.png",
            "name": "France 3 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/france4_hd_31x50.png",
            "name": "France 4 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/france5_hd_29x50.png",
            "name": "France 5 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/france24_53x50.png",
            "name": "France 24",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/franceO_hd_29x50.png",
            "name": "France O HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/gulli_hd.png",
            "name": "Gulli HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/110px-I-tele_2008_logo.svg.png",
            "name": "i>Tele HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/logo-kto-tv.jpg",
            "name": "KTO",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/launehd.png",
            "name": "La Une HD",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/ladeux_37x50.png",
            "name": "La Deux",
            "lang": "FR", "definition": [1]
        },
        {
            "link": "tv/latrois_43x50.png",
            "name": "La Trois",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/LCP_Logo.png",
            "name": "LCP HD",
            "lang": "FR",
            "definition": [2]
        },

        {
            "link": "tv/M6hd.png",
            "name": "M6 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/nrj12_hd_39x50.png",
            "name": "NRJ 12 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/NT1_Logo.svg_hd.png",
            "name": "NT1 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/Plug_TV.png",
            "name": "Plug TV",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/RTl tvi.jpg",
            "name": "RTL TVI",
            "lang": "FR",
            "definition": [1]
        },

        {
            "link": "tv/tf1_hd.png",
            "name": "TF1 HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/tmc_hd_44x50.png",
            "name": "TMC HD",
            "lang": "FR",
            "definition": [2]
        },
        {
            "link": "tv/tv5_50x50.png",
            "name": "TV5 Monde",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/tv8mb.png",
            "name": "TV8 Mont Blanc",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/logo_vosges_television.png",
            "name": "Vosges TV",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/w9.png",
            "name": "W9 HD",
            "lang": "FR",
            "definition": [2]
        }

    ],
    "lu": [
        {
            "link": "tv/rtl_luxhd.png",
            "name": "RTL HD",
            "lang": "LU",
            "definition": [2]
        },
        {
            "link": "tv/2ten_RTL.jpg",
            "name": "2.RTL",
            "lang": "LU",
            "definition": [1]
        }
    ],
    "gb": [
        {
            "link": "tv/Aljazeera.png",
            "name": "Aljazeera",
            "lang": "QA",
            "definition": [1]
        },
        {
            "link": "tv/bbc_92x50.png",
            "name": "BBC World News",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/bloomberg_100x50.png",
            "name": "Bloomberg",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/cctv9.png",
            "name": "CCTV 9",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/cnbc_50x50.png",
            "name": "CNBC",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/cnn_50x50.png",
            "name": "CNN",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "FR",
            "definition": [1]
        },
        {
            "link": "tv/Fashion_TV_120x100.png",
            "name": "FASHION TV",
            "lang": "UK",
            "definition": [1]
        },
        {
            "link": "tv/france24_53x50.png",
            "name": "France 24",
            "lang": "EN",
            "definition": [1]
        }

    ],
    "pt": [
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "PT",
            "definition": [1]
        },
        {
            "link": "tv/record_internacional_60x50.png",
            "name": "RECORD",
            "lang": "BR",
            "definition": [1]
        },
        {
            "link": "tv/rtpi_45x50.png",
            "name": "RTP International",
            "lang": "PT",
            "definition": [1]
        }

    ],
    "it": [
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "IT",
            "definition": [1]
        },
        {
            "link": "tv/Rai_Uno_HD.jpg",
            "name": "Rai Uno HD",
            "lang": "IT",
            "definition": [2]
        }
        ,
        {
            "link": "tv/Rai_Due.jpg",
            "name": "Rai Due",
            "lang": "IT",
            "definition": [1]
        },
        {
            "link": "tv/Rai_Tre.png",
            "name": "Rai Tre",
            "lang": "IT",
            "definition": [1]
        },
        {
            "link": "tv/rainews.png",
            "name": "Rai News",
            "lang": "IT",
            "definition": [1]
        }


    ],
    "nl": [
        {
            "link": "tv/rtl4_50x50.png",
            "name": "rtl 4",
            "lang": "NL",
            "definition": [1]
        },
        {
            "link": "tv/rtl5_50x50.png",
            "name": "rtl 5",
            "lang": "NL",
            "definition": [1]
        },
        {
            "link": "tv/rtl7_50x50.png",
            "name": "rtl 7",
            "lang": "NL",
            "definition": [1]
        }
    ],
    "ru": [
        {
            "link": "tv/EuroNews_50x50.png",
            "name": "Euronews",
            "lang": "DE",
            "definition": [1]
        },
        {
            "link": "tv/1TVRUS_100x100.png",
            "name": "1TVRU",
            "lang": "RU",
            "definition": [1]
        },
        {
            "link": "tv/russiaToday_62x50.png",
            "name": "Russia Today",
            "lang": "RU",
            "definition": [1]
        },
        {
            "link": "tv/russiya24.png",
            "name": "Russiya 24",
            "lang": "RU",
            "definition": [1]
        },
        {
            "link": "tv/Rtr_283x100.png",
            "name": "RTR",
            "lang": "RU ",
            "definition": [1]
        }

    ],
    "es": [
        {
            "link": "tv/canal24horas.png",
            "name": "Canal 24 Horas",
            "lang": "ES",
            "definition": [1]
        },
        {
            "link": "tv/tve_inter_50x50.png",
            "name": "TVE",
            "lang": "ES",
            "definition": [1]
        }
    ]
};
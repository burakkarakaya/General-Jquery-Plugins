var SITE_CONFIG = {
    general: {
        responsive: '(max-width: 960px)', /* kaç px de responsive geçeceği */
        regex: {
            typ1: /[^a-zA-ZıiIğüşöçİĞÜŞÖÇ\s]+/, /* sadece harf */
            typ2: /[^0-9\s]+/, /* sadece rakam */
            typ3: /[^a-zA-ZıiI0-9ğüşöçİĞÜŞÖÇ\s]+/ /* harf rakam karışık */
        },
    },
    management: {

        /* 
            url selection 
        */
        urlSelected: [
            { uri: '/uyeIslem/favorilistem.aspx', elm: '[rel="ems-page-favorites"]', cls: 'selected' },
            { uri: '/uyeIslem/marketdedektif.aspx', elm: '[rel="ems-page-follow-list"]' },
            { uri: '/uyeIslem/siparistakip.aspx', elm: '[rel="ems-page-order"]' },
            { uri: '/uyeIslem/siparisdetay.aspx', elm: '[rel="ems-page-order"]' },
            { uri: '/uyeIslem/siparisIptal.aspx', elm: '[rel="ems-page-order"]' },
            { uri: '/uyeIslem/kuponlarim.aspx', elm: '[rel="ems-page-coupon"]' },
            { uri: '/uyeBilgi/uyeBilgi.aspx', elm: '[rel="ems-page-info"]' },
            { uri: '/uyebilgi/uyeSifre.aspx', elm: '[rel="ems-page-password"]' },
            { uri: '/uyebilgi/uyeAdres.aspx', elm: '[rel="ems-page-address"]' },
            { uri: '/mesaj/mesaj.aspx', elm: '[rel="ems-page-message"]' },
            { uri: '/mesaj/mesaj_oku.aspx', elm: '[rel="ems-page-message"]' },
            { uri: '/mesaj/mesaj_gonder.aspx', elm: '[rel="ems-page-message"]' },
        ],

        /* 
            form yönetimi 
        */
        form: [
            {
                'el': '[id$="txtUYA_CEPTELEFON"]',
                'mask': '999 9999999',
                'prop': { 'type': 'tel' },
                'attr': { 'required': 'true' }
            },
            {
                'el': '[id$="lbfUYA_CEPTELEFON"]',
                'addClass': 'zorunluFont'
            }
        ],

        /* 
            append yönetimi 
        */
        append: [

            { 'main': '.mini-lang', 'target': '.mini-lang-append', 'add': 'append', 'clone': true },
            { 'main': '.top-menu', 'target': '.top-menu-append', 'add': 'append', 'clone': true },
            { 'main': '.popular-search-words', 'target': '.popular-search-words-append', 'add': 'append' },
        ]
    },
    plugin: {

        /* 
           kategori filter
       */
        categoryFilter: {
            'ID': 'body',
            'prop': {
                'target': '.ems-page-product-list', // ajx ile htmlin dolacağı kapsayici div
                'btn': '.urunKiyaslamaOzellik_ozellik a, .menuKategori li > a, .urunPaging_pageNavigation a, .ozellikSecimGrup a', // ajx button olacak tüm nesneler buraya tanımlanır

                'mobiBtn': '.btn-filter-popup', // mobilde filtre popup açma
                'mobiCloseBtn': '.btn-filter-popup-close', // mobilde filtre popup açma
            }
        },

        /*  
            list sort
        */
       listSort: [
        {
            'ID': '.ems-sort-body .sorts',
            'prop': {
                'btn': '[rel]',
                'mobiBtn': '.btn-sort-popup',
                'mobiCloseBtn': '.ems-sort .btn-close',
            }
        }
    ],

        /* 
           liste görünüm
       */
        viewer: {
            'ID': '.ems-sort-body .views',
            'prop': {
                'btn': '[rel]'
            }
        },

        /* 
            kategori swiper
        */
        catSwiper: [
            {
                'ID': '.menuKategori',
                'prop': {
                    'target': '.categories-append',
                }
            }
        ],

        /* 
         popular worlds
        */
        popularWorlds: [
            {
                'ID': '.popular-search-words',
                'prop': {
                    'input': '[id="txtARM_KEYWORD"]',
                    'btn': '[data-keyword]'
                }
            }
        ],

        /* 
            custom search
        */
        customSearch: {
            'ID': '.mini-search',
            'prop': {
                btn: '.mini-search-info', // trigger button
                clearButton: '.mini-search-sub .sub-close', // input içerisini temizleme
                closeBtn: '.mini-search-overlay, .mini-search-sub .sub-close', // search close button
                input: '[id$="txtARM_KEYWORD"]', // search input

                // cls
                ajx: 'mini-search-ajx-loading',
                ready: 'mini-search-ready',
                focused: 'mini-search-focused',
                keyup: 'mini-search-keyup',
                result: 'mini-search-result-found',
                noResult: 'mini-search-no-result',
            }
        },

        /* 
            dropDown
        */
        dropDown: [
            {
                'ID': '.mini-lang-con .mini-lang',
                'prop': {
                    'clicked': '.mini-lang-info',
                    'closeElem': '.mod-mini-login, #validateLogin',
                    'type': isMobile ? 'click' : 'click',
                    'customClass': 'ems-lang-opened',
                    'bdyCls': 'mini-lang-ready',
                    'closedBtn': '.mini-lang-overlay',
                    'overlay': true,
                    'openedDelay': 222,
                }
            },
            {
                'ID': '.mini-cart',
                'prop': {
                    'clicked': '.mini-cart-info',
                    'closeElem': '.mod-mini-login, .mini-lang',
                    'type': isMobile ? 'click' : 'click',
                    'customClass': 'ems-cart-opened',
                    'bdyCls': 'mini-cart-ready',
                    'closedBtn': '.mini-cart .mini-cart-overlay, .mini-cart .sub-close',
                    'overlay': true,
                    'openedDelay': 222
                }
            },
            {
                'ID': '#validateLogin',
                'prop': {
                    'clicked': '.mini-user-info',
                    'closeElem': '.mod-mini-cart, .mini-lang',
                    'type': isMobile ? 'click' : 'click',
                    'customClass': 'ems-user-opened',
                    'bdyCls': 'mini-user-ready',
                    'closedBtn': '#validateLogin .sub-close, #validateLogin .mini-user-overlay',
                    'overlay': true,
                    'openedDelay': 222
                }
            },
        ],

        /* 
            main menu
        */
        menu: [

            {
                'ID': '.menu.main-menu',
                /*
                    NOT: cosmetica daki gibi bir menu istenirse
                    'custom': {
                        'elm': '.sub-nav > ul',
                        'unbind': '.sub-nav > ul > li',
                        'target': '> li:eq( 1 )',
                        'class': 'selected'
                    },
                */
                'prop': {
                    'closeElem': '.mod-mini-cart, .mod-mini-login',
                    'bdyClicked': true,
                    'eventType': isMobile ? 'click' : 'hover',
                    'overlay': true,
                    'bdyCls': 'main-menu-ready',
                    'items': 'ul > li'
                }
            }
        ],

        /* 
            swiper config
        */
        swiper: {
            main: {
                paginationClickable: true,
                preloadImages: false,
                lazyLoading: true,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },

            widgetFive: {
                paginationClickable: true,
                preloadImages: false,
                lazyLoading: true,
                slidesPerView: 5,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },

            widgetThree: {
                paginationClickable: true,
                preloadImages: false,
                lazyLoading: true,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },

            widgetAuto: {
                paginationClickable: true,
                preloadImages: false,
                lazyLoading: true,
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        },

        /* input, selectbox, radiobox stillendirme */
        styler: [
            //passiveIco: ikon
            //activeIco: tıklandıktan sonraki ikon
            //class: özel class
            {
                ID: 'select',
                prop: {
                    wrapper: true,
                    passiveIco: '<svg class="icon icon-select"><use xlink:href="#icon-select"></use></svg>',
                    activeIco: '<svg class="icon icon-select-active"><use xlink:href="#icon-select-active"></use></svg>',
                    customClass: ''
                }
            },
            {
                ID: 'input:checkbox',
                prop: {
                    wrapper: true,
                    passiveIco: '<svg class="icon icon-checkbox"><use xlink:href="#icon-checkbox"></use></svg>',
                    activeIco: '<svg class="icon icon-checkbox-active"><use xlink:href="#icon-checkbox-active"></use></svg>',
                    customClass: ''
                }
            },
            {
                ID: 'input:radio',
                prop: {
                    wrapper: true,
                    passiveIco: '<svg class="icon icon-radio"><use xlink:href="#icon-radio"></use></svg>',
                    activeIco: '<svg class="icon icon-radio-active"><use xlink:href="#icon-radio-active"></use></svg>',
                    customClass: 'ems-custom-radiobox'
                }
            }
        ]
    }
};
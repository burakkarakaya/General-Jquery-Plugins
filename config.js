var SITE_CONFIG = {
    management: {
        append: [
            /* 
                { 
                    'main': 'Taşınacak olan ana nesne', 
                    'target': 'Hedef nesne', 
                    'add': 'ekleme türü', // append, prepend, before, after, html 
                    'clone': 'nesne taşınırken kopyası alınsın alınmasın' // true, false 
                },

                example: 
                
                { 'main': '[id$="lblNavigation"] a:last', 'target': '.ems-prd-cat-name', 'add': 'append', 'clone': true },
                { 'main': '.featured-products-link', 'target': '.featured-products ', 'add': 'append' },
            */

            { 'main': '.mini-lang', 'target': '.mini-lang-append', 'add': 'append', 'clone': true },
            { 'main': '.top-menu', 'target': '.top-menu-append', 'add': 'append', 'clone': true }

        ]
    },
    plugin: {
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
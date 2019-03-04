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
           
        ]
    },
    plugin: {
        /* 
            swiper config dosyası 
            default değeri main dir. data-swiper="widgetFive" config dosyası içerisinde ilgili objeye bakacaktır.

            - hem desktop hem de mobilde swiper
            <div class="swiper-container" data-swiper="widgetFive">
                <div class="swiper-inner">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide"></li>
                    </ul>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>

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
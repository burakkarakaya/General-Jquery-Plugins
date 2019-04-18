/* 
    mini cart
*/
var miniCart = {
    el: {
        amoundEl: 'span#lblUrunAdet',
        amountTarget: '.mini-cart-sub .mcq i, .go-cart b',

        priceEl: 'span#lblUrunTutari',
        priceTarget: '',
    },
    cls: {
        empty: 'basket-empty',
        basket: 'basket-full'
    },
    add: function () {
        var _t = this;
        _t.amount();
    },
    amount: function () {
        var _t = this,
            amoundEl = $(_t.el.amoundEl),
            amountTarget = $(_t.el.amountTarget),
            priceEl = $(_t.el.priceEl),
            priceTarget = $(_t.el.priceTarget);

        if (uty.detectEl(amoundEl) && uty.detectEl(amountTarget)) {
            var val = parseFloat(uty.trimText(amoundEl.text()));
            if (isNaN(val)) val = 0;
            amountTarget.text(val);
        }

        if (uty.detectEl(priceEl) && uty.detectEl(priceTarget)) {
            var val = parseFloat(priceEl.text());
            priceTarget.text(uty.trimText(priceEl.text()));
        }

        amoundEl = parseFloat(amoundEl.text() || '0');
        if (amoundEl == 0)
            bdy.addClass(_t.cls['empty']).removeClass(_t.cls['basket']);
        else
            bdy.removeClass(_t.cls['empty']).addClass(_t.cls['basket']);


        _t.append();
    },
    append: function () {
        management.append.init([
            { 'main': '[data-target="[rel=\'lbfIndirim\']"]', 'target': '[rel="lbfIndirim"]', 'add': 'html' },
            { 'main': '[data-target="[rel=\'lbfBeden\']"]', 'target': '[rel="lbfBeden"]', 'add': 'html' },
            { 'main': '[data-target="[rel=\'lbfAdet\']"]', 'target': '[rel="lbfAdet"]', 'add': 'html' }
        ]);
    }
};

stage.addEventListener("CustomEvent", [{ type: "sepetDoldur", handler: "cartAmound" }]);
stage.addEventListener("CustomEvent", [{ type: "sepeteEkle", handler: "cartAdd" }]);
function cartAmound() {
    miniCart.amount();
}
function cartAdd() {
    miniCart.add();
}
cartAmound();

/* 
    mini login ve login.aspx 
*/
var login = {
    el: {
        tab: '.ems-tab.ems-tab-login',
        tabNavLogin: '.ems-tab-header [rel="tab-1"]',
        tabNavSignup: '.ems-tab-header [rel="tab-2"]',
        errLogin: '[id$="lbfUYE_HATALIGIRIS"]',
        errSignup: '.pageLogin_yeniUyelikHata'
    },
    cls: {
        selected: 'selected'
    },
    initPlugins: function () {
        var _t = this,
            tab = $(_t.el.tab);
        if (uty.detectEl(tab))
            plugin.tabMenu.set(tab);
    },
    check: function () {
        var _t = this;

        if (uty.detectEl($(_t.el.tab))) {
            /* 
                url de ?signup=true geçiyor veya signup hata mesajı varsa signup selected classı atar böylece ilk açılışta signup seçili gelir 
            */
            var k = minusLoc.get('?', 'signup') || '';
            if (k == 'true' || uty.detectEl($(_t.el.errSignup))) {
                $(_t.el.tabNavLogin).removeClass(_t.cls['selected']);
                $(_t.el.tabNavSignup).addClass(_t.cls['selected']);
            }

            /* 
                login hata mesajı varsa
            */
            if (uty.detectEl($(_t.el.errLogin))) {
                $(_t.el.tabNavLogin).addClass(_t.cls['selected']);
                $(_t.el.tabNavSignup).removeClass(_t.cls['selected']);
            }

        }

    },
    addEvent: function () {

    },
    init: function () {
        var _t = this;
        _t.check();
        _t.initPlugins();
    }
};

login.init();

function onUyeLogin() { }
onUyeLogin();
stage.addEventListener("CustomEvent", [{ type: "uyeLogin", handler: "onUyeLogin" }]);

/* 
    mobil menu
*/

var mobiMenu = {
    el: {
        btn: '.open-menu',
        closeBtn: '.menu-overlay',
        items: '.main-menu a'
    },
    cls: {
        ready: 'menu-ready', // menu açılırken alacağı 1. class
        animate: 'menu-animate', // menu açılırken alacağı 2. class
        subMenu: 'ems-sub-menu', // eğer alt kategorisi varsa li.ems-sub-menu
        selected: 'selected', // tıklamada alacağı class
        hidden: 'ems-none' // selected alan linin yanındaki diğer lilerin alacağı class
    },
    animate: function (k) {
        var _t = this;
        if (k == 'show')
            uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': [_t.cls['ready'], _t.cls['animate']] });
        else
            uty.cssClass({ 'ID': 'body', 'delay': 333, 'type': 'remove', 'cls': [_t.cls['animate'], _t.cls['ready']] });
    },
    addEvent: function () {
        var _t = this,
            btn = $(_t.el.btn),
            closeBtn = $(_t.el.closeBtn),
            items = $(_t.el.items);

        btn
            .unbind('click')
            .bind('click', function () {
                var ths = $(this);
                if (bdy.hasClass(_t.cls['ready']))
                    _t.animate('hide');
                else
                    _t.animate('show');
            });

        closeBtn
            .unbind('click')
            .bind('click', function () {
                _t.animate('hide');
            });

        items
            .each(function () {
                var ths = $(this),
                    sib = ths.siblings('div, ul').find('li'),
                    prt = ths.parents('li').eq(0);

                if (uty.detectEl(sib))
                    prt.addClass(_t.cls['subMenu'])
            })
            .bind('click', function (e) {
                var ths = $(this),
                    sib = ths.siblings('div, ul').find('li'),
                    prt = ths.parents('li').eq(0);

                if (uty.visibleControl() && uty.detectEl(sib)) {
                    e.preventDefault();

                    if (prt.hasClass(_t.cls['selected'])) {
                        prt.add(prt.siblings('li')).removeClass(_t.cls['selected']).removeClass(_t.cls['hidden']);
                    } else
                        prt.addClass(_t.cls['selected']).removeClass(_t.cls['hidden']).siblings('li').removeClass(_t.cls['selected']).addClass(_t.cls['hidden']);
                }
            });

    },
    init: function () {
        var _t = this;
        if (uty.detectEl($(_t.el.btn)))
            _t.addEvent();
    }
};

mobiMenu.init();

/* 
    mobilde doğum tarihi alanı kapat butonu
    css %100 yapılmalı, flormar ornek alınabilir
*/
doc.ready(function () {
    setTimeout(function () {
        var dateInput = $("[id$='txtUYE_DOGUMTARIHI']")
        if (dateInput.length > 0 && isMobile == true) {
            dateInput
                .attr('readonly', 'readonly')
                .datepicker("option", "showButtonPanel", true)
                .datepicker('option', 'onChangeMonthYear', function (year, month, inst) {
                    $(this).datepicker("setDate", month + '/1/' + year);
                })
                .datepicker('option', 'onClose', function (datetime) {
                    if (dateInput.datepicker("getDate") == null)
                        dateInput.datepicker('setDate', minDate());

                });
        }
    }, 333);
});

////////////////////////////////// <PAGE LIST>

/* 
    liste kayıt sayısı
*/
function numberOfRecords() {

    /* 
        apply buton append
    */
    management.append.set({ 'main': '.ems-multi-languages .filter-apply', 'target': '#pnlSecimiDarat .kutuFooterOzellikFiltre', 'add': 'append', 'clone': true });

    var num = $('[id$="lblKayit"]').text() || '',
        elm = $('.urunKiyaslamaOzellik.total-prd > span, .filter-apply b');
    if (uty.detectEl(elm))
        elm.text(num);
}
numberOfRecords();

/* 
    pagination control
*/
function paginationControl() {
    var elm = $('.urunPaging_pageNavigation');
    if (uty.detectEl(elm)) {
        if (uty.detectEl(elm.find('a')))
            bdy.removeClass('ems-pagination-hide');
        else
            bdy.addClass('ems-pagination-hide');
    }
}
paginationControl();

/* 
    ürün liste ve detay custom brand Crump
*/
var customBrandCrump = {
    el: {
        con: '.navigasyon',
        target: '.olNavigasyon li:last-child > a',
        append: '.navigasyon > [id$="lblNavigation"]',
        btn: '.btn-breadcrumb'
    },
    cls: {
        ready: 'breadcrumb-ready'
    },
    temp: '<div class="navigation-full-path btn-breadcrumb obj-mobile">{{navigation}}</div>',
    getTemp: function () {
        var _t = this;
        return _t.temp.replace(/{{navigation}}/g, $(_t.el.target).text() || '');
    },
    add: function () {
        var _t = this;
        $(_t.el.append).append(_t.getTemp());
    },
    addEvent: function () {
        var _t = this;
        $(_t.el.btn)
            .unbind('click')
            .bind('click', function () {
                bdy.toggleClass(_t.cls['ready']);
            });
    },
    init: function () {
        var _t = this;
        if (uty.detectEl($(_t.el.con))) {
            _t.add();
            _t.addEvent();
        }
    }
};

customBrandCrump.init();

////////////////////////////////// </PAGE LIST>

////////////////////////////////// <PAGE DETAIL>
(function () {
    var elm = $('.dropdown-trigger');
    if (uty.detectEl(elm))
        elm.get(0).click();
}());


////////////////////////////////// </PAGE DETAIL>

/* 
    footer animation
*/
var footerAnimation = {
    el: {
        target: '.site-footer'
    },
    adjust: function () {
        var _t = this,
            target = $(_t.el.target);
        if (uty.detectEl(target)) {
            var _max = 75, // max büyüyeceği miktar
                _shift = 100,
                s = wst + ht,
                targetHeight = target.height() - _shift,
                offset = target.offset().top + _shift,
                rate = 0;

            if (s >= offset)
                rate = Math.round(((s - offset) / targetHeight) * 100);

            if (rate < 0)
                rate = 0;

            if (rate >= 100)
                rate = 100;

            target.css({ 'background-size': (100 + Math.round((rate / 100) * _max)) + '%' })
        }
    }
};

/* 
    hediye paketi aç kapa
*/
(function () {
    var con = $('.ems-gift-tab'),
        cls = 'ems-gift-tab-opened';

    if (uty.detectEl(con))
        con
            .find('.sStylerWrp_checkbox')
            .bind('click', function () {
                setTimeout(function () {
                    if (con.find('[type="checkbox"]').is(':checked'))
                        con.addClass(cls);
                    else
                        con.removeClass(cls);
                }, 10);

            });

}());

/*  
    mobi dropdown
*/

(function () {
    var con = $('.mobi-dropdown'),
        slc = con.find('.selected'),
        hdr = con.find('> span'),
        cls = 'opened';

    if (uty.detectEl(slc))
        hdr
            .html(slc.find('a').html() || '')
            .bind('click', function () {
                $(this).parent().toggleClass(cls);
            });

}());

/* 
    e-bülten
*/

(function () {
    var con = $('.mini-bulletin'),
        cls = 'ems-bulletin-focused'

    if (uty.detectEl(con))
        con
            .find('[id$="txtUYE_EMAIL"]')
            .bind('focus', function () {
                con.addClass(cls);
            })
            .bind('blur', function () {
                var ths = $(this),
                    val = uty.trimText(ths.val() || '');
                if (val == '')
                    con.removeClass(cls);
            });
}());


// DISPATCHER

/* 
    Genel Scroll & Resize
*/
function onEventsResize() {
    footerAnimation.adjust();
}
function onEventsScroll() {
    footerAnimation.adjust();
}

stage.addEventListener("CustomEvent", [{ type: "EVENTS_ON_RESIZE", handler: "onEventsResize" }]);
stage.addEventListener("CustomEvent", [{ type: "EVENTS_ON_SCROLL", handler: "onEventsScroll" }]);

/* 
    Search
*/
function onSearchReady() {
    plugin.customSearch.searchReady();
}

function onSearchComplete() {
    plugin.customSearch.searchComplete();
}
stage.addEventListener("CustomEvent", [{ type: "aramaSonucReady", handler: "onSearchReady" }]);
stage.addEventListener("CustomEvent", [{ type: "aramaSonucDoldur", handler: "onSearchComplete" }]);

/* 
    System Widget yüklendikten sonra teiklenir
*/
function onSystemWidgetLoaded(o) {
    var ID = o['ID'] || '',
        type = o['type'] || '';
    if (type == 'success') {
        uty.addSwiperClass(ID)
        plugin.swiper.set(ID);
    }
}
stage.addEventListener("CustomEvent", [{ type: "SYSTEM_WIDGET_LOADED", handler: "onSystemWidgetLoaded" }]);

/* 
    ajx tab menu yüklendikten sonra tetiklenir
*/
function onAjxTabLoaded(o) {
    var ID = o['ID'] || '',
        target = o['target'] || '',
        type = o['type'] || '';
    if (type == 'success') {
        uty.addSwiperClass(target.parents('[data-swiper]').eq(0));
        plugin.swiper.set(target.parents('[data-swiper]').eq(0));
    }
}
stage.addEventListener("CustomEvent", [{ type: "AJX_TAB_LOADED", handler: "onAjxTabLoaded" }]);

/* 
    kategori filter yüklenirse
*/
function onListLoaded(o) {
    var ID = o['ID'] || '',
        target = o['target'] || '',
        type = o['type'] || '';

    if (type == 'success') {
        /* 
            filtre yüklendikten sonra tetiklenecek pluginler buraya tanımlanacak
        */
        numberOfRecords();
        paginationControl();
        customBrandCrump.init();
        uty.pageScroll({ scrollTop: 0 });
        plugin.listSort.init();
        plugin.viewer.init();
        plugin.catSwiper.init();
    }
}
stage.addEventListener("CustomEvent", [{ type: "LIST_LOADED", handler: "onListLoaded" }]);

/* 
    kategori list sorts
*/
function onSortListClicked(o) {
    var ID = o['ID'] || '',
        type = o['type'] || '';

    if (type == 'change_uri')
        plugin.categoryFilter.setURI({ uri: o['uri'] || '' });
}
stage.addEventListener("CustomEvent", [{ type: "SORT_LIST_CLICKED", handler: "onSortListClicked" }]);
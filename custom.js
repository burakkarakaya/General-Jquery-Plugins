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
        _t.custom();
    },
    custom: function () {
        /* 
            mini sepet ile alakalı özel durumları burada belirtiriz
        */
        var _t = this,
            elm = $('.kutuSepet_icerik .cart-prd-discount');
        if (uty.detectEl(elm))
            elm
                .each(function () {
                    var ths = $(this),
                        k = (ths.find('.amount').text() || '').replace(/\%/g, '');
                    if (k != '' && k != 0)
                        ths.parents('.ems-grid-row').addClass('ems-show-discount');
                });
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

    if (uty.detectEl($('.ems-page-order')))
        window.location.href = window.location.href;
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

        /* 
            mini login error
        */
        setTimeout(function () {
            if (uty.detectEl($(_t.el.errLogin)) && !uty.detectEl($(_t.el.tab)))
                uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': ['mini-user-ready', 'mini-user-animate'] });
        }, 1000);
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

function onUyeLogin() {
    var k = $('[id$="imgUYE_PROFILFOTO"]').attr('src') || '',
        target = $('.member-top-info-media > img');
    if (k != '' && uty.detectEl(target))
        target.attr('src', k);
}
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
    kredi kart
*/
var crediCart = {
    el: {
        wrp: '.ems-card-wrapper',
        container: '.card-wrapper',
        target: '.ems-pay-type',
        card: '.jp-card-container .jp-card',

        inputName: '[id$="txtKKARTISIM"]',
        inputCVC: '[id$="txtKKARTCVCNO"]',
        inputNumber: '[id$="txtKKARTNO"]',
        inputExpiry: '[id$="drpKSA_SPR_ID"], [id$="drpKSY_SPR_ID"]',

        targetInputName: '[id="card-name"]',
        targetInputCVC: '[id="card-cvc"]',
        targetInputNumber: '[id="card-number"]',
        targetInputExpiry: '[id="card-expiry"]'
    },
    cls: { flipped: 'jp-card-flipped' },
    template: '<div class="ems-card-wrapper"><div class="card-wrapper"></div><div class="ems-hidden"><input type="text" name="number" id="card-number"><input type="text" name="first-name" id="card-name"/><input type="text" name="expiry" id="card-expiry"/><input type="text" name="cvc" id="card-cvc"/></div></div>',
    set: function (o) {
        var _t = this,
            ID = o['ID'],
            target = o['target'],
            evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);

        setTimeout(function () {
            target
                .val(o['val'] || ID.val() || '')
                .get(0).dispatchEvent(evt);
        }, 1);
    },
    addEvent: function () {
        var _t = this;

        $(_t.el.inputName)
            .bind('keyup', function () {
                _t.set({ ID: $(this), target: $(_t.el.targetInputName) });
            });

        $(_t.el.inputCVC)
            .bind('keyup', function () {
                _t.set({ ID: $(this), target: $(_t.el.targetInputCVC) });
            })
            .bind('focus', function () { $(_t.el.card).addClass(_t.cls['flipped']); })
            .bind('blur', function () { $(_t.el.card).removeClass(_t.cls['flipped']); });

        $(_t.el.inputNumber)
            .bind('keyup', function () {
                _t.set({ ID: $(this), target: $(_t.el.targetInputNumber) });
            });

        $(_t.el.inputExpiry)
            .bind('change', function () {
                _t.set({ val: $(_t.el.inputExpiry).map(function () { return $(this).val() }).get().join(' / '), target: $(_t.el.targetInputExpiry) });
            })
            .change();
    },
    initPlugins: function () {
        var _t = this;
        $.getScript('/styles/js/card.js', function () {
            $(_t.el.wrp).card({
                container: _t.el.container,
                formSelectors: {
                    numberInput: _t.el.targetInputNumber,
                    expiryInput: _t.el.targetInputExpiry,
                    cvcInput: _t.el.targetInputCVC,
                    nameInput: _t.el.targetInputName
                },
                placeholders: {
                    name: translation['crediCartName'] || 'ADINIZ SOYADINIZ'
                }
            });
            _t.addEvent();
        });
    },
    add: function () {
        var _t = this;
        $('.tableOdemeBilgiKrediKarti').before(_t.template);
    },
    init: function () {
        var _t = this;
        if (uty.detectEl($(_t.el.target)) && uty.detectEl($(_t.el.inputName))) {
            _t.add();
            _t.initPlugins();
        }
    }
};

crediCart.init();


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
    var elm = $('.ems-page-product-detail .dropdown-trigger');
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
            var _max = 20, // max büyüyeceği miktar
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
    mobi dropdown üyelik
*/
(function () {
    var con = $('.mobi-dropdown'),
        slc = con.find('.selected'),
        hdr = con.find('> .mobi-dropdown-header'),
        cls = 'opened';

    if (uty.detectEl(slc))
        hdr
            .html(slc.find('a').html() || '')
            .bind('click', function () {
                $(this).parent().toggleClass(cls);
            });

}());

/*  
    mobi dropdown kurumsal
*/
(function () {
    var con = $('.kutuSolMenuTree .mobi-dropdown');

    if (uty.detectEl(con)) {
        con.prepend('<div class="mobi-dropdown-header ems-flex ems-flex-middle obj-mobile"></div>');

        var slc = con.find('.act'),
            hdr = con.find('> .mobi-dropdown-header'),
            cls = 'opened';

        if (uty.detectEl(slc))
            hdr
                .html(slc.find('a').html() || '')
                .bind('click', function () {
                    $(this).parent().toggleClass(cls);
                });
    }
}());

/*  
    kur modulu
*/
(function () {
    var con = $('.mini-exchange-sub');

    if (uty.detectEl(con)) {
        management.append.set({ 'main': '.mini-exchange-sub > ul', 'target': '.inner-mini-exchange-sub .ems-form-obj', 'add': 'append', 'clone': true });
        uty.convertHtmlDropdown({ ID: '.inner-mini-exchange-sub .ems-form-obj' });
        uty.convertHtmlDropdown({ ID: '.inner-mini-lang-sub .ems-form-obj' });
    }
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


/* 
    ön bilgilendirme formu
*/
(function () {
    var elm = $('.tableTitleSiparisOnBilgilendirmeForm'),
        cls = {
            form1Ready: 'ems-form1-ready',
            form1Animate: 'ems-form1-animate',

            form2Ready: 'ems-form2-ready',
            form2Animate: 'ems-form2-animate'
        };

    if (uty.detectEl(elm))
        elm
            .bind('click', function () {
                if (bdy.hasClass(cls['form1Ready']))
                    uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['form1Animate'], cls['form1Ready']] });
                else
                    uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': [cls['form1Ready'], cls['form1Animate']] });
            });

    elm = $('.tableTitleSiparisOnaySatisSozlesme');
    if (uty.detectEl(elm))
        elm
            .bind('click', function () {
                if (bdy.hasClass(cls['form2Ready']))
                    uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['form2Animate'], cls['form2Ready']] });
                else
                    uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': [cls['form2Ready'], cls['form2Animate']] });
            });

    elm = $('.onBilgilendirmeFormMetin .agreement-close');
    if (uty.detectEl(elm))
        elm
            .bind('click', function () {
                uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['form1Animate'], cls['form1Ready']] });
            });

    elm = $('.siparisOnaySozlesmeMetin .agreement-close');
    if (uty.detectEl(elm))
        elm
            .bind('click', function () {
                uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['form2Animate'], cls['form2Ready']] });
            });
}());

/* 

    beden rehberi

*/

(function () {
    var btn = $('.open-size-guide'),
        cls = {
            ready: 'mini-size-guide-ready',
            animate: 'mini-size-guide-animate'
        };
    if (uty.detectEl(btn)) {
        btn
            .unbind('click')
            .bind('click', function () {
                if (bdy.hasClass(cls['ready']))
                    uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['animate'], cls['ready']] });
                else
                    uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': [cls['ready'], cls['animate']] });
            });

        $('.mini-size-guide-overlay, .mini-size-guide-sub .sub-close')
            .bind('click', function () {
                uty.cssClass({ 'ID': 'body', 'delay': 300, 'type': 'remove', 'cls': [cls['animate'], cls['ready']] });
            });
    }
}());

/* 
    ürün detay ürün adeti dropdown
*/
function counterOption(o) {
    o = o || {};
    var ID = o['ID'],
        val = ID.val() || 1,
        total = o['total'] || 20,
        lbl = (translation['lblURN_ADET'] || 'ADET: {{val}}'),
        temp = {
            wrp: '<select onchange="var ths = $( this ), input = ths.parents(\'.sStylerWrp_select\').siblings(\'input\'); input.val( ths.val() );" class="counter-drp dropdown">{{option}}</select>',
            option: '<option value="{{val}}">{{text}}</option>'
        },
        htm = '';

    for (var i = 1; i <= total; ++i)
        htm += temp['option'].replace(/{{val}}/g, i).replace(/{{text}}/g, (lbl.replace(/{{val}}/g, i)));

    if (val > total)
        htm += temp['option'].replace(/{{val}}/g, val).replace(/{{text}}/g, (lbl.replace(/{{val}}/g, val)));

    htm = temp['wrp'].replace(/{{option}}/g, htm);

    ID.before(htm);

    ID = ID.siblings('.counter-drp');
    ID.val(val);
    ID.iStyler({
        wrapper: true,
        passiveIco: '<svg class="icon icon-select"><use xlink:href="#icon-select"></use></svg>',
        activeIco: '<svg class="icon icon-select-active"><use xlink:href="#icon-select-active"></use></svg>',
        customClass: ''
    });
}

(function () {
    var elm = $('.urunDetay [id$="txtURN_ADET"]');
    if (uty.detectEl(elm))
        elm
            .each(function () {
                counterOption({ ID: $(this) });
            });
}());

/* 
    sıkça sorulan sorular
*/
(function () {
    var elm = $('.icerikTemplateListeItem'),
        cls = 'selected';
    if (uty.detectEl(elm))
        elm
            .find('.ems-tab-inner-header')
            .bind('click', function () {
                var ths = $(this),
                    prts = ths.parents('.icerikTemplateListeItem').eq(0);
                if (prts.hasClass(cls))
                    elm.removeClass(cls);
                else {
                    elm.removeClass(cls);
                    prts.addClass(cls);
                }
            });
}());

/* 
    header kur/dil
*/
(function () {
    var elm = $('.mini-lang');
    if (uty.detectEl(elm))
        elm
            .each(function () {
                var ths = $(this),
                    lng = ths.find('.inner-mini-lang-sub a.selected').html() || '',
                    currency = ths.find('.inner-mini-exchange-sub .selected').text() || '';

                //ths.find('.sel-lang').html(lng);
                ths.find('.sel-currency').add($('.ems-sub-menu .sel-currency')).html(currency);
            });
}());

/*  
    favorilerim beden seçimi
*/
(function () {
    var elm = $('.ems-grid-table-favorite');
    if (uty.detectEl(elm))
        elm
            .find('.urunListe_secenek1')
            .addClass('dropdown')
            .find('.dropdown-trigger')
            .addClass('dropdown-header')
            .bind('click', function () {
                var ths = $(this);
                ths.parents('.dropdown').eq(0).toggleClass('opened');
            })
}());

/*
    video player
*/
(function () {
    var elm = $('.ems-video-player'),
        cls = { play: 'is-play' };
    if (uty.detectEl(elm))
        elm
            .find('.i-play')
            .unbind('click')
            .bind('click', function () {
                var ths = $(this),
                    prt = ths.parents('.ems-video-player');

                if (prt.hasClass(cls['play']))
                    prt.removeClass(cls['play']).find('video').get(0).pause();
                else
                    prt.addClass(cls['play']).find('video').get(0).play();
            });
}());

/* 
    hediye çeki
*/
(function () {
    var elm = $('.giftCardList li a');
    if (uty.detectEl(elm))
        elm
            .bind('click', function () {
                $('.ems-page-gift-card-grid .card-price').html(($(this).html() || '').trim());
            })
}());

/* 
    counter
*/
(function () {
    var elm = $('[data-countdown]'),
        control = function () {
            setTimeout(function () {
                var el = $('.countdown-container');
                if (uty.detectEl(el))
                    el
                        .each(function () {
                            var ths = $(this),
                                c = ths.find('[data-countdown]'),
                                k = ths.find('.end-countdown[data-countdown]');
                            if (c.length == k.length)
                                ths.addClass('ems-none');
                        });
            }, 1000);
        },
        counter = function (o) {
            o = o || {};
            var ID = o['ID'],
                time = o['time'],
                update = function () {
                    var k = ID.parents('[data-swiper]');
                    if (uty.detectEl(k)) {
                        k = k.get(0);
                        if (typeof k.update !== 'undefined')
                            k.update();
                    }

                };

            ID
                .countdown({
                    padZeroes: true,
                    until: time,
                    alwaysExpire: true,
                    onExpiry: function () {
                        ID.parents('[data-countdown]').addClass('end-countdown');
                        update();
                    },
                    onTick: function () {
                        ID.parents('[data-countdown]').addClass('start-countdown');
                    }
                });
        };
    if (elm.length > 0) {
        elm
            .each(function () {
                var ths = $(this),
                    c = (ths.attr('data-countdown') || '').trim(),
                    d = new Date(c),
                    cd = ths.find('.countdown');
                if (uty.detectEl(cd) && c != '')
                    counter({ ID: cd, time: d });
            });
        control();
    }
}());

/* 
    sepet ekstra poşet
*/
(function () {
    var elm = $('.ems-tab-checkbox');
    if (uty.detectEl(elm))
        elm
            .find('.ems-tab-checkbox-header input')
            .bind('change', function () {
                var ths = $(this),
                    prts = ths.parents('.ems-tab-checkbox');
                setTimeout(function () {
                    if (ths.is(':checked'))
                        prts.addClass('opened');
                    else
                        prts.removeClass('opened');
                }, 10);
            })
}());

/* 
    katalog tab
*/
(function () {
    var elm = $('.catalog-tab');
    if (uty.detectEl(elm))
        elm
            .find('.ems-tab-header a')
            .bind('click', function () {
                var ths = $(this),
                    rel = ths.attr('rel') || '',
                    frm = elm.find('.ems-tab-content [rel="' + rel + '"] iframe');

                if (uty.detectEl(frm) && !frm.hasClass('loaded'))
                    frm.attr('src', frm.attr('data-src') || '').addClass('loaded');
            })
            .eq(0)
            .click();
}());

/* 
    başa dön
*/
(function () {
    var elm = $('.btn-page-top');
    if (uty.detectEl(elm))
        elm
            .bind('click', function (evt) {
                evt.preventDefault();
                uty.pageScroll({ scrollTop: 0 });
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

        if (ID.hasClass('not-trigger')) {
            var elm = ID.find('.lazy, .lazy-load, .lazy-back-load, .lazyload, .lazy-swiper, .lazy-mobi-swiper, .lazy-desktop-swiper').removeClass('lazy-swiper lazy-mobi-swiper lazy-desktop-swiper');
            elm
                .each(function () {
                    uty.lazyLoad({ ID: $(this) });
                });
        } else {
            uty.addSwiperClass(ID)
            plugin.swiper.set(ID);
        }

        /*
            sepet sayfası dropdown
        */
        var elm = ID.find('[id$="txtURN_ADET"]');
        if (uty.detectEl(elm))
            elm
                .each(function () {
                    counterOption({ ID: $(this) });
                });
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

        $("img.lazyload").unveil();

        /* 
            lazy load
        */
        plugin.lazyLoad.init();

        /* 
            swiper
        */
        plugin.swiper.init();

        /* 
            liste sayfası özel durumlar buraya yazılır
        */

        var elm = $('.ems-page-product-list .category-top-banner');
        if (uty.detectEl(elm))
            bdy.addClass('nav-type2');
        else
            bdy.removeClass('nav-type2');

        /* 
            system widget
        */
        plugin.systemWidget.init();
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


/* 
    favoriye ekle ve favori group
*/
var addToFavorites = {
    el: {
        wrp: '.ems-page-product-detail', // favoriye ekleme özelliğinin olacağı 
        allow: '.ems-page-member-favorites',
        favBtn: '.btnFavoriEkle',
        pageDetail: '.ems-page-product-detail',

        pageDetailName: '.ems-prdd-name'
    },
    cls: {
        selected: 'selected',
        ajx: 'ajx-fav',
    },
    data: null,
    uri: {
        favGroup: '/popup/popup_favori.aspx?urn={{urn}}&uyrKod={{uyrKod}}&type=favoriGrup&lang={{lang}}',
        addFavorite: '/WebServices/dataService.aspx/addFavorite',
        member: '/member-fav-ajx.html'
    },
    getUri: function (o) {
        o = o || {};
        var _t = this,
            type = o['type'] || '',
            uyrCode = o['uyrKod'] || '',
            prdCode = o['prdCode'] || $('[id$="hdnURN_KOD"]').eq(0).val() || '';

        return _t.uri[type]
            .replace(/{{lang}}/g, lang)
            .replace(/{{urn}}/g, prdCode)
            .replace(/{{uyrKod}}/g, uyrCode);
    },
    setFavGroup: function (o) {
        var _t = this,
            uyrKod = o['d']['Data']['uyr'] || '';
        bdy.minusPopup({ type: 'iframe', content: _t.getUri({ type: 'favGroup', uyrKod: uyrKod }), openWith: 'auto', width: 425, height: 550, customClass: 'fav-group-popup' });
    },
    setMessage: function (o) {
        var name = o['name'] || '', typ = o['typ'] || 'add', msg = translation['addFav'] || '{{name}} favorinize eklenmiştir.';
        if (typ == 'remove')
            msg = translation['removeFav'] || '{{name}} favorinizden çıkartılmıştır.';

        msg = msg.replace(/{{name}}/g, name);

        if (typ == 'add')
            toastr.success(msg, '');
        else
            toastr.error(msg, '');
    },
    clicked: function (k) {

        if (!uty.isLogin()) {
            window.location.href = '/login.aspx?lang=' + lang;
            return false;
        }

        var _t = this,
            ths = $(k),
            prt = ths.parents('li').eq(0),
            obj = {},
            typ = '',
            id = ths.attr('data-prd-code') || '',
            name = uty.trimText(prt.find('.ems-prd-name').text() || '');

        /* 
            ürün detay özel
        */
        if (uty.detectEl($(_t.el.pageDetail)))
            name = uty.trimText($(_t.el.pageDetailName).text() || '');

        if (id == '') return false;

        if (ths.hasClass(_t.cls['selected'])) {
            typ = 'remove';
            ths.add($('[data-prd-code="' + id + '"]')).removeClass(_t.cls['selected']);
            _t.set({ typ: 'remove', id: id });
        } else {
            typ = 'add';
            ths.add($('[data-prd-code="' + id + '"]')).addClass(_t.cls['selected']);
            _t.set({ typ: 'add', id: id });
        }

        obj['cups'] = '';
        obj['urnKod'] = id;
        obj['type'] = typ;
        obj['name'] = name;

        prt.addClass(_t.cls['ajx']);
        pageMethod(_t.getUri({ type: 'addFavorite' }), decodeURIComponent(JSON.stringify(obj)), function success(o) {
            prt.removeClass(_t.cls['ajx']);
            _t.setMessage({ name: name, typ: typ });
            /*if (typ == 'add')
                _t.setFavGroup(o);*/
        });
    },
    set: function (o) {
        var _t = this, typ = o['typ'] || '';
        if (_t.data != null) {
            if (typ == 'add') _t.data[o['id']] = 1;
            else _t.data[o['id']] = 0;
            uty.Cookies({ typ: 'set', name: 'prdFav', value: JSON.stringify(_t.data) });
        }
    },
    check: function () {
        var _t = this;
        if (_t.data != null) {
            $.each(_t.data, function (i, k) {
                if (k != 0) {
                    var e = $('[data-prd-code="' + i + '"]');
                    if (uty.detectEl(e))
                        e.addClass(_t.cls['selected']);
                }
            });
        }
    },
    ajx: function () {
        var _t = this;
        uty.ajx({ uri: _t.getUri({ type: 'member' }) }, function (d) {
            if (d['type'] == 'success') {
                var val = d['val'];
                if (uty.cleanText(val).length > 0) {
                    _t.data = JSON.parse(val);
                    uty.Cookies({ typ: 'set', name: 'prdFav', value: val });
                    _t.check();
                }
            }
        });
    },
    addEvent: function () {
        var _t = this,
            favBtn = $(_t.el.favBtn);
        if (uty.detectEl(favBtn))
            favBtn
                .attr('href', 'javascript:void(0);')
                .attr('onclick', 'addToFavorites.clicked(this);')
                .attr('data-prd-code', $('[id$="hdnURN_KOD"]').val());
    },
    init: function () {
        var _t = this;
        _t.addEvent();
        if (uty.detectEl($(_t.el.wrp)) && uty.isLogin()) {
            if (uty.detectEl($(_t.el.allow))) {
                _t.ajx();
                return false;
            }
            var k = uty.Cookies({ typ: 'get', name: 'prdFav' }) || '';
            if (k != '') {
                _t.data = JSON.parse(k);
                _t.check();
            } else
                _t.ajx();
        }
    }
};
addToFavorites.init();

/* 
    stoktaki mağazalar
*/
var storeStock = {
    mapLoaded: false,
    el: {
        wrp: '.ems-find-store',
        btn: '.ems-page-product-detail [id$="lbfURN_URUNKODU"] > a',
        closeBtn: '#findStoreCloseBtn, .ems-find-store-overlay',
        listBtn: '#findStoreBtn',
        size: '#size',
        city: '#city',
        content: '#findStoreContent',
        resultCount: '.secSonuc',
        list: '.pServisListe'
    },
    cls: {
        ready: 'ems-find-store-ready',
        animate: 'ems-find-store-animate',
        noResult: 'ems-no-result',
        resultFound: 'ems-result-found',
        loading: 'find-store-ajx-loading'
    },
    uri: '/get-stores-exp.html?Plate={{plate}}&Barcode={{barcode}}',
    getURI: function () {
        var _t = this;
        return _t.uri.replace(/{{plate}}/g, $(_t.el.city).val() || 0).replace(/{{barcode}}/g, $(_t.el.size).val() || 0);
    },
    animate: function (k) {
        var _t = this;
        if (k == 'show')
            uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls': [_t.cls['ready'], _t.cls['animate']] });
        else
            uty.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls': [_t.cls['animate'], _t.cls['ready']] });
    },
    addEvent: function () {
        var _t = this,
            clicklable = true,
            wrp = $(_t.el.wrp);

        $(_t.el.btn)
            .unbind('click')
            .bind('click', function () {
                _t.mapPlugins();
                _t.animate('show');
            });

        $(_t.el.closeBtn)
            .unbind('click')
            .bind('click', function () {
                _t.animate('hide');
                setTimeout(function () {
                    wrp.removeClass(_t.cls['noResult']).removeClass(_t.cls['resultFound']);
                }, 444);

            });

        $(_t.el.listBtn)
            .unbind('click')
            .bind('click', function () {
                var size = $(_t.el.size).val() || 0,
                    city = $(_t.el.city).val() || 0,
                    msg = [];

                if (size == 0)
                    msg.push(translation['errorSizeAlert'] || 'Lütfen beden seçiniz');

                if (city == 0)
                    msg.push(translation['errorCityAlert'] || 'Lütfen şehir seçiniz');

                if (msg.length > 0)
                    alert(msg.join('\n'));
                else {
                    if (clicklable) {
                        clicklable = false;
                        wrp.addClass(_t.cls['loading']);
                        uty.ajx({ uri: _t.getURI() }, function (d) {
                            if (d['type'] == 'success') {
                                d = (d['val'] || '').trim();
                                $(_t.el.content).html(d);

                                if (d == '')
                                    wrp.addClass(_t.cls['noResult']).removeClass(_t.cls['resultFound']);
                                else
                                    wrp.removeClass(_t.cls['noResult']).addClass(_t.cls['resultFound']);
                            }
                            wrp.removeClass(_t.cls['loading']);
                            clicklable = true;

                            /* 
                            
                            */
                            if (_t.mapLoaded) {
                                customContent.changeHtml();
                                wrp.find(_t.el.resultCount).text(wrp.find(_t.el.list).length);
                            }
                        });
                    }
                }


            });
    },
    mapPlugins: function () {
        var _t = this;
        if ($('script[src*="//maps.google.com/"]').length == 0) {
            $.getScript('//maps.google.com/maps/api/js?sensor=true&key=AIzaSyDktunNtvwuVvGEA6LSVfQoiRsptLStTgc', function () {
                $.getScript('/styles/js/map-new.js', function () {
                    _t.mapLoaded = true;
                    console.log('map yüklendi');
                });
            });
        }
    },
    init: function () {
        var _t = this;
        if (uty.detectEl($(_t.el.btn)))
            _t.addEvent();
    }
};
storeStock.init();
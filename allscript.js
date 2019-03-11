var CONFIG = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {},
    GET_CONFIG = function (obj) {
        var group = obj['group'] || '',
            key = obj['key'] || '';
        return CONFIG[group][key] || [];
    };

var bdy = $('body'),
    win = $(window),
    doc = $(document),
    wt = parseFloat(win.width()),
    ht = parseFloat(win.height()),
    wst = parseFloat(win.scrollTop()),
    sRatio,
    isMobile = mobile.detect(),
    editableMode = $('.admin-wrapper').length > 0 || $('[editable]').length > 0 ? true : false,
    protocols = window.location.protocol,
    uty = {
        speed: 666,
        easing: 'easeInOutExpo',
        ani: function (o, callback) {
            var _t = this, ID = o['el'];
            if (_t.detectEl(ID)) {
                ID.stop().animate(o['prop'], o['speed'] || _t.speed, o['easing'] || _t.easing);
                setTimeout(function () {
                    if (typeof callback !== 'undefined')
                        callback();
                }, (o['speed'] || _t.speed) + 1);
            }
        },
        detectEl: function (ID) {
            return ID.length > 0 ? true : false;
        },
        ajx: function (o, callback) {
            $.ajax({
                type: o['type'] || 'GET',
                dataType: o['dataType'] || 'html',
                url: o['uri'] || '',
                data: o['param'] || {},
                contentType: o['contentType'] || '',
                error: function (e) {
                    if (typeof callback !== 'undefined')
                        callback({ type: 'error' });
                },
                timeout: 30000,
                success: function (d) {
                    if (typeof callback !== 'undefined')
                        callback({ type: 'success', val: d });
                }
            });
        },
        getScript: function (o, callback) {
            $.getScript(o['uri'], function () {
                if (typeof callback !== 'undefined')
                    callback();
            });
        },
        cssClass: function (o, callback) {
            var _t = this, ID = $(o['ID']), k = o['delay'], type = o['type'], cls;
            if (_t.detectEl(ID)) {
                if (type == 'add') {
                    cls = o['cls'] || ['ready', 'animate'];
                    ID.addClass(cls[0]).delay(k).queue('fx', function () { $(this).dequeue().addClass(cls[1]); if (typeof callback !== 'undefined') callback(); });
                } else {
                    cls = o['cls'] || ['animate', 'ready'];
                    ID.removeClass(cls[0]).delay(k).queue('fx', function () { $(this).dequeue().removeClass(cls[1]); if (typeof callback !== 'undefined') callback(); });
                }
            }
        },
        pageScroll: function (o, callback) {
            var _t = this;
            $('html, body').stop().animate({ scrollTop: o['scrollTop'] || 0 }, o['speed'] || _t.speed, o['easing'] || 'easeInOutExpo', function () {
                if (typeof callback !== 'undefined')
                    callback();
            });
        },
        lazyLoad: function (o, callback) {
            o = o || {};
            var _t = this,
                target = o['target'] || '.lazy',
                container = o['container'] || window,
                ID = $(o['ID']).find(target);

            if (_t.detectEl(ID))
                ID
                    .lazyload({
                        effect: 'fadeIn',
                        container: container,
                        load: function () {
                            $(this)
                                .removeClass('lazy')
                                .addClass('loaded');
                        }
                    });
        },
        unVeil: function (o) {
            o = o || {};
            var _t = this,
                target = o['target'] || '.lazyload',
                ID = $(o['ID']).find(target),
                trigger = o['trigger'] || false;
            if (_t.detectEl(ID)) {
                ID.unveil();
                if (trigger)
                    ID.trigger('unveil');
            }
        },
        clearScriptTag: function (k) {
            k = k || '';
            var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            while (SCRIPT_REGEX.test(k))
                k = k.replace(SCRIPT_REGEX, '');
            return k;
        },
        trimText: function (k) {
            k = k || '';
            return k.replace(/(^\s+|\s+$)/g, '');
        },
        cleanText: function (k) {
            k = k || '';
            return k.replace(/\s+/g, '');
        },
        diff: function (arr1, arr2) {
            var newArr = [];
            var arr = arr1.concat(arr2);

            for (var i in arr) {
                var f = arr[i];
                var t = 0;
                for (j = 0; j < arr.length; j++) {
                    if (arr[j] === f) {
                        t++;
                    }
                }
                if (t === 1)
                    newArr.push(f);

            }
            return newArr;
        },
        getCat: function () {
            return minusLoc.get('?', 'kat', urlString) || '';
        },
        visibleControl: function () {
            var _t = this, b = false;
            if (window.matchMedia("(max-width: 960px)").matches)
                b = true;

            return b;
        },
        Cookies: function (o) {
            var typ = o['typ'] || '', name = o['name'] || '';
            if (typ == 'set') {
                var date = new Date(), minutes = o['minutes'] || 5;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $.cookie(name, o['value'] || '', { expires: date, path: '/' });
            } else if (typ == 'get')
                return $.cookie(name);
        },
        convertHttps: function (k) {
            if (protocols == 'https:')
                k = k.replace(/http:/g, 'https:');
            return k;
        },
        priceFormat: function (ths, n, x) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return ths.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
        },
        getPrc: function (ID) {
            var _t = this, k = ID.eq(0).text();
            return parseFloat(k.replace(/\./, '').replace(/\,/, '.'))
        },
        setPrc: function (o) {
            var ID = o['ID'], target = o['target'], m = o['multiplier'] || 1;
            if (uty.detectEl(ID) && uty.detectEl(target)) {
                var k = (uty.getPrc(ID) * m).toFixed(2);
                k = k.toString().split('.');
                target.html((translation['price'] || '{{p}}<span class="d">,{{d}}</span><span class="pb1"> TL</span>').replace(/{{p}}/g, uty.priceFormat(Math.abs(parseFloat(k[0] || 0)))).replace(/{{d}}/g, k[1] || '00'))
            }
        },
        lowerCase: function (k) {

            var letters = { "İ": "i", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç", "I": "ı" },
                n = '';
            for (var i = 0; i < k.length; ++i) {
                var j = k[i];
                n += (letters[j] || j);
            }

            return n.toLowerCase() || '';
        },
        upperCase: function (k) {

            var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" },
                n = '';
            for (var i = 0; i < k.length; ++i) {
                var j = k[i];
                n += (letters[j] || j);
            }

            return n.toUpperCase() || '';
        },
        isLogin: function () {
            var _t = this;
            return _t.detectEl($('.ems-login'));
        },
        detectPosition: function (o) {
            o = o || {};
            var ID = o['ID'],
                rate = o['rate'] || 1,
                o1 = { x: 0, y: wst, width: wt, height: ht * rate },
                o2 = { x: 0, y: ID.offset().top, width: wt, height: ID.height() * rate },
                b = false;
            if (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y)
                b = true;
            return b;
        },
        Cookies: function (o) {
            var typ = o['typ'] || '', name = o['name'] || '';
            if (typ == 'set') {
                var date = new Date(), minutes = o['minutes'] || 5;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $.cookie(name, o['value'] || '', { expires: date, path: '/' });
            } else if (typ == 'get')
                return $.cookie(name);
        },
    },
    management = {
        form: {
            arr: GET_CONFIG({ group: 'management', key: 'form' }),
            set: function (o) {
                var _t = this,
                    el = $(o['el']);
                if (uty.detectEl(el)) {
                    var msk = o['mask'] || '',
                        rgx = o['regex'] || '',
                        prop = o['prop'] || '',
                        attr = o['attr'] || '',
                        removeAttr = o['removeAttr'] || '',
                        addClss = o['addClass'] || '',
                        removeClss = o['removeClass'] || '';

                    if (prop != '')
                        $.each(prop, function (i, k) {
                            el.prop(i, k);
                        });

                    if (attr != '')
                        $.each(attr, function (i, k) {
                            el.attr(i, k);
                        });

                    if (removeAttr != '')
                        $.each(attr, function (i, k) {
                            el.removeAttr(k);
                        });

                    if (msk != '')
                        el.mask(msk);

                    if (addClss != '')
                        el.addClass(addClss);

                    if (removeClss != '')
                        el.removeClass(removeClss);

                    if (rgx != '')
                        el
                            .attr('data-regex', rgx)
                            .unbind('keyup paste', _t.events.onKeyUp)
                            .bind('keyup paste', _t.events.onKeyUp);
                }

            },
            init: function (k) {
                var _t = this, arr = k || _t.arr;
                for (var i = 0; i < arr.length; ++i)
                    _t.set(arr[i]);
            }
        },
        multiLanguages: {
            el: {
                con: '.ems-multi-languages [data-target]'
            },
            set: function (ID) {
                var _t = this;
                var target = $(ID.attr('data-target') || ''),
                    type = ID.attr('data-type') || 'html';
                if (uty.detectEl(target)) {
                    var htm = ID.html() || '';
                    if (type == 'append')
                        target.append(htm);
                    else if (type == 'prepend')
                        target.prepend(htm);
                    else if (type == 'before')
                        target.before(htm);
                    else if (type == 'after')
                        target.after(htm);
                    else
                        target.html(htm);
                }
            },
            init: function () {
                var _t = this,
                    con = $(_t.el.con);
                if (uty.detectEl(con))
                    con
                        .each(function () {
                            _t.set($(this));
                        });
            }
        },
        append: {
            arr: GET_CONFIG({ group: 'management', key: 'append' }),
            set: function (o) {
                var main = $(o['main'] || ''), target = $(o['target'] || ''), clone = o['clone'] || '', type = o['add'] || '', htm = o['htm'] || '';
                if (uty.detectEl(main) && uty.detectEl(target)) {
                    main = main.eq(0);
                    var e = clone != '' ? main.clone() : main;
                    if (htm != '') e = htm;
                    if (type == 'prepend') target.prepend(e);
                    else if (type == 'before') target.before(e);
                    else if (type == 'after') target.after(e);
                    else if (type == 'html') target.html(e.html() || '');
                    else target.append(e);
                }
            },
            init: function (k) {
                var _t = this, arr = k || _t.arr;
                for (var i = 0; i < arr.length; ++i)
                    _t.set(arr[i]);
            }
        },
        init: function () {
            var _t = this;
            _t.append.init();
            _t.multiLanguages.init();
        }
    },
    plugin = {
        /* 
            dropDown
        */
       popularWorlds: {
        arr: GET_CONFIG({ group: 'plugin', key: 'popularWorlds' }),
        cls: { active: 'ems-popular-worlds-active' },
        set: function (o) {
            var _t = this, ID = $(o['ID']);
            if (uty.detectEl(ID)) {
                if (!ID.hasClass(_t['cls']['active'])) {
                    ID.addClass(_t['cls']['active']);
                    ID.minusSearchPopularWorlds(o['prop'] || {});
                }
            }
        },
        init: function () {
            var _t = this;
            for (var i = 0; i < _t.arr.length; ++i)
                _t.set(_t.arr[i]);
        }
    },

        /* 
            customSearch
        */
        customSearch: {
            arr: GET_CONFIG({ group: 'plugin', key: 'customSearch' }),
            cls: { active: 'ems-custom-search-active' },
            set: function (o) {
                var _t = this, ID = $(o['ID']);
                if (uty.detectEl(ID)) {
                    if (!ID.hasClass(_t['cls']['active'])) {
                        ID.addClass(_t['cls']['active']);
                        ID.minusCustomSearch(o['prop'] || {});
                    }
                }
            },
            searchReady: function () {
                var _t = this, el = $(_t.arr['ID'])
                if (uty.detectEl(el))
                    el.each(function () {
                        var ths = $(this);
                        if (ths.hasClass(_t.cls['active'])) {
                            ths = ths.get(0);
                            if (typeof ths.searchReady !== 'undefined')
                                ths.searchReady();
                        }
                    });
            },
            searchComplete: function () {
                var _t = this, el = $(_t.arr['ID'])
                if (uty.detectEl(el))
                    el.each(function () {
                        var ths = $(this);
                        if (ths.hasClass(_t.cls['active'])) {
                            ths = ths.get(0);
                            if (typeof ths.searchComplete !== 'undefined')
                                ths.searchComplete();
                        }
                    });
            },
            init: function () {
                var _t = this;
                _t.set(_t.arr);
            }
        },

        /* 
            dropDown
        */
        dropDown: {
            arr: GET_CONFIG({ group: 'plugin', key: 'dropDown' }),
            cls: { active: 'ems-dropdown-active' },
            set: function (o) {
                var _t = this, ID = $(o['ID']);
                if (uty.detectEl(ID)) {
                    if (!ID.hasClass(_t['cls']['active'])) {
                        ID.addClass(_t['cls']['active']);
                        ID.minusDropDown(o['prop'] || {});
                    }
                }
            },
            init: function () {
                var _t = this;
                for (var i = 0; i < _t.arr.length; ++i)
                    _t.set(_t.arr[i]);
            }
        },

        /* 
            main menu
        */
        menu: {
            arr: GET_CONFIG({ group: 'plugin', key: 'menu' }),
            cls: { active: 'ems-menu-active' },
            set: function (o) {
                var _t = this,
                    ID = $(o['ID'] || ''),
                    custom = o['custom'] || '';
                if (uty.detectEl(ID) && !ID.hasClass(_t['cls']['active'])) {
                    ID.addClass(_t['cls']['active']);
                    ID.minusMenu(o['prop'] || {});
                    if (custom != '')
                        setTimeout(function () {
                            if (!uty.visibleControl()) {
                                ID
                                    .find(custom['elm'] || '')
                                    .each(function () {
                                        $(this)
                                            .find(custom['target'] || '')
                                            .addClass(custom['class'] || '');
                                    });

                                ID
                                    .find(custom['unbind'] || '')
                                    .unbind('mouseleave')
                            }
                        }, 100);
                }
            },
            init: function () {
                var _t = this;
                for (var i = 0; i < _t.arr.length; ++i)
                    _t.set(_t.arr[i]);
            }
        },

        /* 
            System widget
        */
        systemWidget: {
            el: {
                con: '.system-widget[data-uri]',
            },
            cls: { active: 'ems-system-widget-active' },
            set: function (ID) {
                var _t = this;
                if (!ID.hasClass(_t['cls']['active'])) {
                    ID.addClass(_t['cls']['active']);
                    ID.minusSystemWidget();
                }
            },
            adjust: function () {
                var _t = this, el = $(_t.el.con)
                if (uty.detectEl(el))
                    el.each(function () {
                        var ths = $(this);
                        if (ths.hasClass(_t.cls['active'])) {
                            ths = ths.get(0);
                            if (typeof ths.adjust !== 'undefined')
                                ths.adjust();
                        }
                    });
            },
            init: function () {
                var _t = this,
                    con = $(_t.el.con);
                if (uty.detectEl(con))
                    con
                        .each(function () {
                            _t.set($(this));
                        });
            }
        },

        /* 
            tab menu
        */
        tabMenu: {
            el: {
                con: '.ems-tab:not(".not-trigger")',
            },
            cls: { active: 'ems-tabmenu-active' },
            set: function (ID) {
                var _t = this;
                if (!ID.hasClass(_t['cls']['active'])) {
                    ID.addClass(_t['cls']['active']);
                    ID.minusTab();
                }
            },
            adjust: function () {
                var _t = this, el = $(_t.el.con)
                if (uty.detectEl(el))
                    el.each(function () {
                        var ths = $(this);
                        if (ths.hasClass(_t.cls['active'])) {
                            ths = ths.get(0);
                            if (typeof ths.adjust !== 'undefined')
                                ths.adjust();
                        }
                    });
            },
            init: function () {
                var _t = this,
                    con = $(_t.el.con);
                if (uty.detectEl(con))
                    con
                        .each(function () {
                            _t.set($(this));
                        });
            }
        },
        /* 
            swiper
        */
        swiper: {
            el: {
                con: '[data-swiper]:not(".not-trigger")',
                target: '.swiper-wrapper > .swiper-slide'
            },
            cls: { active: 'ems-swiper-active' },
            set: function (ID) {
                var _t = this;
                if (!ID.hasClass(_t['cls']['active']) && uty.detectEl(ID.find(_t.el.target))) {
                    ID.addClass(_t['cls']['active']);
                    ID.minusSwiper();
                }
            },
            adjust: function () {
                var _t = this, el = $(_t.el.con)
                if (uty.detectEl(el) && uty.detectEl(el.find(_t.el.target)))
                    el.each(function () {
                        var ths = $(this);
                        if (ths.hasClass(_t.cls['active'])) {
                            ths = ths.get(0);
                            if (typeof ths.adjust !== 'undefined')
                                ths.adjust();
                        }
                    });
            },
            init: function () {
                var _t = this,
                    con = $(_t.el.con);
                if (uty.detectEl(con))
                    con
                        .each(function () {
                            _t.set($(this));
                        });
            }
        },
        /* 
            styler
        */
        styler: {
            arr: GET_CONFIG({ group: 'plugin', key: 'styler' }),
            cls: { active: 'ems-styler-active' },
            set: function (o) {
                var _t = this,
                    ID = $(o['ID']),
                    prop = o['prop'] || {};
                if (uty.detectEl(ID) && !ID.hasClass(_t.cls['active']))
                    ID
                        .addClass(_t.cls['active'])
                        .iStyler(prop);
            },
            init: function () {
                var _t = this, arr = _t.arr;
                for (var i = 0; i < arr.length; ++i)
                    _t.set(arr[i]);
            }
        },
        adjust: function () {
            var _t = this;
            _t.systemWidget.adjust();
            _t.tabMenu.adjust();
            _t.swiper.adjust();
        },
        init: function () {
            var _t = this;
            _t.popularWorlds.init();
            _t.customSearch.init();
            _t.dropDown.init();
            _t.menu.init();
            _t.systemWidget.init();
            _t.tabMenu.init();
            _t.swiper.init();
            _t.styler.init();
        }
    },
    modules = {
        adjust: function () {
            var _t = this;
        },
        init: function () {
            var _t = this;
        }
    },
    events = {
        loaded: function () {

        },

        ready: function () {

        },

        bdyClicked: function () {
            $('body, html').bind('click touchstart', function (e) {

            });
        },

        onResize: function () {
            wt = parseFloat(win.width());
            ht = parseFloat(win.height());

            plugin.adjust();
        },

        onResizeStop: function () {

        },

        onScroll: function () {
            wst = parseFloat(win.scrollTop());
            sRatio = wst / (doc.height() - ht);


            plugin.adjust();

        },

        onScrollStop: function () {

        },
        init: function () {
            var _t = this;
            _t.bdyClicked();
            win.load(_t.loaded);
            doc.ready(_t.ready);
            win.resize(_t.onResize).resize();
            win.bind('resizestop', _t.onResizeStop);
            win.bind('scrollstop', _t.onScrollStop);
            win.scroll(_t.onScroll).scroll();
        }
    },
    initialize = function () {
        management.init();
        plugin.init();
        events.init();
    };

initialize();


// DISPATCHER

/* Arama */
function onSearchReady() {
    plugin.customSearch.searchReady();  
}

function onSearchComplete() {
    plugin.customSearch.searchComplete();
}
stage.addEventListener("CustomEvent", [{ type: "aramaSonucReady", handler: "onSearchReady" }]);
stage.addEventListener("CustomEvent", [{ type: "aramaSonucDoldur", handler: "onSearchComplete" }]);
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
        lowerCase: {
            charMap: { Ç: 'c', Ö: 'o', Ş: 's', İ: 'i', I: 'i', Ü: 'u', Ğ: 'g', ç: 'c', ö: 'o', ş: 's', ı: 'i', ü: 'u', ğ: 'g' },
            change: function (k) { return k.replace(/\s+/g, '').toLowerCase(); },
            get: function (val) {
                var _t = this, str_array = val.split('');
                for (var i = 0, len = str_array.length; i < len; i++)
                    str_array[i] = _t.charMap[str_array[i]] || str_array[i];
                val = str_array.join('');
                return _t.change(val);
            }
        },
        isLogin: function () {
            var _t = this;
            return _t.detectEl($('.ems-login'));
        }
    },
    plugin = {
        styler: {
            arr: GET_CONFIG({ group: 'plugin', key: 'styler' }),
            cls: { active: 'ems-styler-active' },
            set: function (o) {
                var ID = $(o['ID']), prop = o['prop'] || {};
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
        init: function () {
            var _t = this;
            _t.styler.init();
        }
    },
    initialize = function () {
        plugin.init();
    };

initialize();
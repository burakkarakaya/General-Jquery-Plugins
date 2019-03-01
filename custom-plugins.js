/*
	Facebook redirect close popup
*/
if (window.location.search.indexOf('?redirect_uri=fcbk') != -1) window.close();

/*
	requestAnim shim layer by Paul Irish	
*/
window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) { window.setTimeout(callback, 1E3 / 30) } }();
window.cancelRequestAnimFrame = function () { return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout }();

/*
	SCROLL STOP
	ex: jQuery(window).bind('scrollstop', function(e){ onScroll(); });
*/
(function () {
    var special = jQuery.event.special, uid1 = "D" + +new Date, uid2 = "D" + (+new Date + 1); special.scrollstart = { setup: function () { var timer, handler = function (evt) { var _self = this, _args = arguments; if (timer) clearTimeout(timer); else { evt.type = "scrollstart"; jQuery.event.dispatch.apply(_self, _args) } timer = setTimeout(function () { timer = null }, special.scrollstop.latency) }; jQuery(this).bind("scroll", handler).data(uid1, handler) }, teardown: function () { jQuery(this).unbind("scroll", jQuery(this).data(uid1)) } }; special.scrollstop =
        { latency: 300, setup: function () { var timer, handler = function (evt) { var _self = this, _args = arguments; if (timer) clearTimeout(timer); timer = setTimeout(function () { timer = null; evt.type = "scrollstop"; jQuery.event.dispatch.apply(_self, _args) }, special.scrollstop.latency) }; jQuery(this).bind("scroll", handler).data(uid2, handler) }, teardown: function () { jQuery(this).unbind("scroll", jQuery(this).data(uid2)) } }
})();

/*
	RESIZE STOP
	ex: $(window).bind('resizestop', function (e) {  console.log(e.data.size); });
*/
(function ($, setTimeout) {
    var $window = $(window), cache = $([]), last = 0, timer = 0, size = {}; function onWindowResize() { last = $.now(); timer = timer || setTimeout(checkTime, 10) } function checkTime() { var now = $.now(); if (now - last < $.resizestop.threshold) timer = setTimeout(checkTime, 10); else { clearTimeout(timer); timer = last = 0; size.width = $window.width(); size.height = $window.height(); cache.trigger("resizestop") } } $.resizestop = { propagate: false, threshold: 500 }; $.event.special.resizestop = {
        setup: function (data, namespaces) {
            cache = cache.not(this);
            cache = cache.add(this); if (cache.length === 1) $window.bind("resize", onWindowResize)
        }, teardown: function (namespaces) { cache = cache.not(this); if (!cache.length) $window.unbind("resize", onWindowResize) }, add: function (handle) { var oldHandler = handle.handler; handle.handler = function (e) { if (!$.resizestop.propagate) e.stopPropagation(); e.data = e.data || {}; e.data.size = e.data.size || {}; $.extend(e.data.size, size); return oldHandler.apply(this, arguments) } }
    }
})(jQuery, setTimeout);

/*
	ENDSWITH
	ex: 'example,'.endsWith(',') son karekter , varsa true yoksa false
*/
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

/*
	IE8 TRIM FIX
*/
if (typeof String.prototype.trim !== "function") String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, "") };

/*
	IE8 FOREACH FIX
*/
if (typeof Array.prototype.forEach != "function") Array.prototype.forEach = function (callback) { for (var i = 0; i < this.length; i++)callback.apply(this, [this[i], i, this]) };

/*
	MOBILE DETECT
*/
var mobile = function () { return { detect: function () { var uagent = navigator.userAgent.toLowerCase(); var list = this.mobiles; var ismobile = false; for (var d = 0; d < list.length; d += 1)if (uagent.indexOf(list[d]) != -1) ismobile = true; return ismobile }, mobiles: ["midp", "240x320", "blackberry", "netfront", "nokia", "panasonic", "portalmmm", "sharp", "sie-", "sonyericsson", "symbian", "windows ce", "benq", "mda", "mot-", "opera mini", "philips", "pocket pc", "sagem", "samsung", "sda", "sgh-", "vodafone", "xda", "palm", "iphone", "ipod", "android", "ipad"] } }(),
    isMobile = mobile.detect();
if (isMobile) $('html').addClass('mobileVer');

/*
	URLREAD
*/
var minusLoc = {
    put: function (type, param, prop) {
        var hash = window.location.hash,
            path = window.location.pathname,
            query = window.location.search,
            host = window.location.host,
            url = window.location.href;
        if (type == "#") window.location.hash = this.encoder(param);
        else if (type == "?") {
            var a, b = false;
            a = query.substring(query.indexOf("?") + 1, query.length).split("&");
            for (var i = 0; i < a.length; i++)
                if (a[i].indexOf(prop + "=") != -1) b = a[i];
            if (b != false) url = url.replace(b, prop + "=" + param);
            else if (query != "") url = "http://" + host + path + query + "&" + prop +
                "=" + param + hash;
            else url = "http://" + host + path + "?" + prop + "=" + param + hash;
            // window.location.replace(url)

            return url;
        }
    },
    get: function (type, param, href) {
        var str, got = false;
        if (type == "#") str = window.location.hash.replace(/^#/, "");
        else if (type == "?") {
            str = href != undefined ? href : window.location.search;
            str = str.substring(str.indexOf("?") + 1, str.length).split("&");
            for (var i = 0; i < str.length; i++)
                if (str[i].indexOf(param + "=") != -1) {
                    str = str[i].replace(param + "=", "");
                    got = true
                }
            if (!got) str = ""
        }
        try {
            return $.browser.mozilla ? str : decodeURIComponent(str)
        } catch (error) {
            return str
        }
    },
    string: function (string, param) {
        var str;
        if (param == undefined) str = string.substring(string.indexOf("#") + 1, string.length);
        else {
            str = string.substring(string.indexOf("?") + 1, string.length).split("&");
            for (var i = 0; i < str.length; i++)
                if (str[i].indexOf(param + "=") != -1) str = str[i].replace(param + "=", "")
        }
        try {
            return $.browser.mozilla ? str : decodeURIComponent(str)
        } catch (error) {
            return str
        }
    },
    encoder: encodeURIComponent,
    remove: function (type, prop) {
        var query = window.location.search,
            url = window.location.href;
        if (type == "#") window.location.hash =
            "";
        else if (type == "?") {
            var a, b = false;
            a = query.substring(query.indexOf("?") + 1, query.length).split("&");
            for (var i = 0; i < a.length; i++)
                if (a[i].indexOf(prop + "=") != -1) b = a[i];
            if (b != false)
                if (url.substr(url.indexOf(prop) - 1, 1) == "&") url = url.replace("&" + b, "");
                else if (url.indexOf("&") != -1) url = url.replace(b + "&", "");
                else url = url.replace("?" + b, "");

            //window.location.replace(url)


            return url;
        }
    }
};

/*
	Jquery Easing Plugins
*/
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d) }, easeInQuad: function (x, t, b, c, d) { return c * (t /= d) * t + b }, easeOutQuad: function (x, t, b, c, d) { return -c * (t /= d) * (t - 2) + b }, easeInOutQuad: function (x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t + b; return -c / 2 * (--t * (t - 2) - 1) + b }, easeInCubic: function (x, t, b, c, d) { return c * (t /= d) * t * t + b }, easeOutCubic: function (x, t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b }, easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c /
            2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b
    }, easeInQuart: function (x, t, b, c, d) { return c * (t /= d) * t * t * t + b }, easeOutQuart: function (x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b }, easeInOutQuart: function (x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b; return -c / 2 * ((t -= 2) * t * t * t - 2) + b }, easeInQuint: function (x, t, b, c, d) { return c * (t /= d) * t * t * t * t + b }, easeOutQuint: function (x, t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b }, easeInOutQuint: function (x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b; return c / 2 * ((t -= 2) * t * t * t * t + 2) + b }, easeInSine: function (x,
        t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b }, easeOutSine: function (x, t, b, c, d) { return c * Math.sin(t / d * (Math.PI / 2)) + b }, easeInOutSine: function (x, t, b, c, d) { return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b }, easeInExpo: function (x, t, b, c, d) { return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b }, easeOutExpo: function (x, t, b, c, d) { return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b }, easeInOutExpo: function (x, t, b, c, d) { if (t == 0) return b; if (t == d) return b + c; if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b; return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b },
    easeInCirc: function (x, t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b }, easeOutCirc: function (x, t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b }, easeInOutCirc: function (x, t, b, c, d) { if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b }, easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * 0.3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 *
            Math.PI) / p)) + b
    }, easeOutElastic: function (x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * 0.3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b }, easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (0.3 * 1.5); if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); if (t < 1) return -0.5 * (a * Math.pow(2,
            10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
    }, easeInBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * (t /= d) * t * ((s + 1) * t - s) + b }, easeOutBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b }, easeInOutBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158; if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b; return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b }, easeInBounce: function (x, t,
        b, c, d) { return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b }, easeOutBounce: function (x, t, b, c, d) { if ((t /= d) < 1 / 2.75) return c * (7.5625 * t * t) + b; else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b; else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b; else return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b }, easeInOutBounce: function (x, t, b, c, d) { if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b; return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b }
});

/*
	UNVEIL
*/
(function ($) {
    $.fn.unveil = function (threshold, callback) {
        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-original-retina" : "data-original",
            images = this,
            loaded;
        this.one("unveil", function () {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-original");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
                animate($(this));
            }
        });


        function animate(_this) {
            if (!_this.hasClass('loadedImg')) {
                _this.css({ 'opacity': 0 }).load(function () {
                    setTimeout(function () {
                        _this.addClass('loadedImg').stop().animate({ "opacity": 1 }, 333);
                    }, 100);
                })
            }
        }

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden")) return;
                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();
                return eb >= wt - th && et <= wb + th;
            });
            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }
        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);
        unveil();
        return this
    }
})(window.jQuery || window.Zepto);

/*
	minusPopup
	ex:
		$('body').minusPopup({ 
				openWith: 'auto', 
				content: $('.content').html() || '', 
				customClass: 'ems-custom-class', 
				width: 920, 
				widthStyle: 'max-width', 
				height: 500 
			});	
*/
(function ($) {
    $.fn.extend({
        minusPopup: function (options, callback) {
            var defaults = {
                width: 0,						//Popupin genisligi (responsive için deger 0 verilmelidir)
                height: 0,						//Popupin yüksekligi (içerige göre yükseklik almasi gerekiyorsa deger 0 verilmelidir)
                timeout: 0,						//Popup otomatik kapanma süresi (0 ise otomatik kapanmaz)
                openWith: 'click',				//Popupin ne sekilde açilacagi (click | auto)
                closeWith: '.btnMinPpCl', 		//Kapat buttonu disinda baska herhangi bir yere tiklandiginda popupin kapanabilmesi
                customClass: '',				//Popupi Özellestirmek için özel bir class eklenebilir
                header: '',						//Popupin basligi
                content: '',					//Popupta yer alacak olan içerik (Not: Tek satirda olacak sekilde yazilmalidir.)
                type: 'content',				//Popup content tipi (content | iframe | image | object)
                href: '',						//"image" kullaniliyorsa ve linki varsa "href" i buraya yazilir. Url'de http var ise yeni pencerede a�ar
                target: 'self',					//"imageLink" targetini belirler
                callBack: '',					//Popupin açilmasi esnasinda herhangi baska bir kodun tetiklenmesi
                fire: '',					//Popupin kapanmasi sonrasinda herhangi baska bir kodun tetiklenmesi

                //
                cookie: null,                   //{ name: 'cookie-name', minutes: 5 }

                // plugin ekstra ozellik
                titleClass: '',
                columnClass: 'col-md-10 col-md-offset-1',
                closeIcon: true,
                closeIconClass: 'btnMinPpCl',
                containerFluid: false,
                theme: 'light',
                type: 'yellow',
                boxWidth: '50%'
            };
            var option = $.extend(defaults, options);
            return this.each(function (e) {
                var opt = option,
                    ID = $(this),
                    uty = {
                        detectEl: function (ID) { return ID.length > 0 ? true : false; },
                        cookie: function (o) {
                            var typ = o['typ'] || '', name = o['name'] || '';
                            if (typ == 'set') {
                                var date = new Date(), minutes = o['minutes'] || 5;
                                date.setTime(date.getTime() + (minutes * 60 * 1000));
                                $.cookie(name, o['value'] || '', { expires: date, path: '/' });
                            } else if (typ == 'get')
                                return $.cookie(name) || '';
                        }
                    },
                    main = {
                        el: { wrp: '.jconfirm', container: '.jconfirm-box-container', content: '.jconfirm-content' },
                        dialog: null,
                        getContent: function () {
                            var _t = this, htm = opt['content'] || '', typ = opt['type'] || '';
                            if (typ == 'image') {
                                htm = '<img class="minPpImg" border="0" src="' + htm + '" />';
                                if (opt['href'] != '')
                                    htm = '<a target="_' + opt['target'] + '" class="minPpImgLink" href="' + opt['href'] + '">' + htm + '</a>';
                            } else if (typ == 'iframe')
                                htm = '<iframe class="minPpIframe" frameborder="0" name="minPpIframe" style="margin:0; padding:0; width:100%; height:100%;" src="' + htm + '">';
                            else if (typ == 'object')
                                htm = $(htm).html() || '';

                            return htm;
                        },
                        cookies: function (o) {
                            var _t = this, typ = o['typ'] || 'get', c = opt['cookie'] || '', b = false;
                            if (c != '') {
                                if (typ == 'get') {
                                    if (uty.cookie({ name: c['name'] || '', typ: 'get' }) == 'true')
                                        b = true;
                                } else
                                    uty.cookie({ name: c['name'] || '', typ: 'set', minutes: c['minutes'] || 5, value: 'true' });
                            }

                            return b;
                        },
                        set: function () {
                            var _t = main;

                            if (_t.cookies({ typ: 'get' }))
                                return false;

                            _t.dialog = $.dialog({
                                title: opt['header'],
                                titleClass: opt['titleClass'],
                                content: _t.getContent(),
                                columnClass: opt['columnClass'] + ' ' + opt['customClass'],
                                closeIcon: opt['closeIcon'],
                                closeIconClass: opt['closeIconClass'],
                                containerFluid: opt['containerFluid'],
                                theme: opt['theme'],
                                boxWidth: opt['boxWidth'],
                                onContentReady: function () {
                                    _t.callBack({ typ: 'onContentReady' });
                                },
                                contentLoaded: function (data, status, xhr) {
                                    _t.callBack({ typ: 'contentLoaded' });
                                },
                                onOpenBefore: function () {
                                    $(_t.el.wrp)
                                        .addClass(opt['customClass'])
                                        .addClass('type-' + opt['type'])
                                        .find(_t.el.container)
                                        .css({ 'max-width': opt['width'] || '100%' })
                                        .end()
                                        .find(_t.el.content)
                                        .css({ 'min-height': opt['height'] || '100%' });
                                },
                                onOpen: function () {
                                    _t.cookies({ typ: 'set' });
                                    _t.runIt(opt['callBack'] || '');
                                    _t.callBack({ typ: 'onOpen' });
                                },
                                onClose: function () {
                                    _t.runIt(opt['fire'] || '');
                                    _t.callBack({ typ: 'onClose' });
                                    $(_t.el.wrp)
                                        .removeClass(opt['customClass'])
                                        .removeClass('type-' + opt['type']);
                                    if (uty.detectEl($(_t.el.wrp).find('iframe')))
                                        $(_t.el.wrp).find('iframe').removeAttr('src');
                                }
                            });
                        },
                        runIt: function (k) {
                            if (k != '')
                                $.globalEval(k);
                        },
                        callBack: function (o) {
                            if (typeof callback !== 'undefined')
                                callback(o);
                        },
                        addEvent: function () {
                            var _t = this;
                            if (opt.openWith == 'click')
                                ID
                                    .unbind('click', _t.set)
                                    .bind('click', _t.set);
                            else
                                _t.set();
                        },
                        init: function () {
                            var _t = this;
                            _t.addEvent();
                        }
                    };
                main.init();


            });
        }
    });
})(jQuery);

/*
	Input Styler v2.2.8 www.minus99.com - 2013	
*/
(function ($) {
    $.fn.extend({
        iStyler: function (options) {
            var defaults = {
                wrapper: false,
                customClass: '',
                passiveIco: '',
                activeIco: ''
            };

            var option = $.extend(defaults, options);

            return this.each(function (e) {
                var opt = option,
                    obj = $(this),
                    tag = obj.prop("tagName").toLowerCase(),
                    sClass = '',
                    name, check,
                    customIcon = opt.passiveIco + opt.activeIco;

                if (tag == "select") {
                    var selText = $("option:selected", obj).text();

                    if (!obj.hasClass("sSelect"))
                        if (!opt.wrapper)
                            obj.css({ opacity: 0, "-webkit-appearance": "none" }).addClass("sSelect").before('<div class="sStylerWrp"><span class="sStyleHolder"><span class="sStyler">' + selText + '</span>' + customIcon + '</span></div>');
                        else
                            obj.css({ opacity: 0, "-webkit-appearance": "none" }).addClass("sSelect").wrap('<span class="sStylerMainWrp ' + opt.customClass + ' sStylerWrp_select"></span>').before('<div class="sStylerWrp"><span class="sStyleHolder"><span class="sStyler">' + selText + '</span>' + customIcon + '</span></div>');

                    obj.change(function () {
                        selText = $('option:selected', obj).text();
                        obj.prev(".sStylerWrp").children(".sStyleHolder").children(".sStyler").text(selText);
                    });

                } else if (tag == "input" && obj.attr("type") == "checkbox") {

                    if (!obj.hasClass("sCheckbox")) {

                        sClass = (obj.is(":checked")) ? sClass + ' checked' : '';

                        if (!opt.wrapper)
                            obj.addClass("sCheckbox").before('<span class="cStyler' + sClass + '">' + customIcon + '</span>');
                        else
                            obj.addClass("sCheckbox").wrap('<span class="sStylerMainWrp ' + opt.customClass + ' sStylerWrp_checkbox"></span>').before('<span class="cStyler' + sClass + '">' + customIcon + '</span>');

                    }

                    obj.prev("span.cStyler").unbind('click').click(function () {

                        check = !obj.is(":checked");

                        if (obj.onclick != undefined) {
                            obj.attr("checked", check).click();
                            obj.attr("checked", check);
                        } else {
                            obj.click();
                        }

                        if (check) {
                            $(this).addClass("checked");
                        } else {
                            $(this).removeClass("checked");
                        }
                    });

                    obj.change(function () {
                        if (obj.is(":checked"))
                            obj.prev("span.cStyler").addClass("checked");
                        else
                            obj.prev("span.cStyler").removeClass("checked");
                    });

                } else if (tag == "input" && obj.attr("type") == "radio") {

                    if (!obj.hasClass("sRadio")) {
                        name = obj.attr("name");
                        var nameStr;

                        nameStr = (name == undefined) ? '' : ' name="' + name + '"';

                        if (obj.is(":checked")) sClass = sClass + ' checked'; else sClass = '';

                        if (!opt.wrapper)
                            obj.addClass("sRadio").before('<span' + nameStr + ' class="rStyler' + sClass + '">' + customIcon + '</span>');
                        else
                            obj.addClass("sRadio").wrap('<span class="sStylerMainWrp ' + opt.customClass + ' sStylerWrp_radio"></span>').before('<span' + nameStr + ' class="rStyler' + sClass + '">' + customIcon + '</span>');

                    }

                    obj.prev("span.rStyler").unbind('click').click(function () {
                        if (!obj.is(":checked")) {
                            check = !obj.is(":checked");

                            if (obj.onclick != undefined) {
                                obj.attr("checked", check).click();
                                obj.attr("checked", check);
                            } else {
                                obj.click();
                            }

                            if (name != undefined)
                                $('span.rStyler[name="' + name + '"]').removeClass("checked");

                            $(this).addClass("checked");
                        }
                    });

                    obj.change(function () {
                        if (obj.is(":checked")) {
                            if (name != undefined) $('span.rStyler[name="' + name + '"]').removeClass("checked");
                            obj.prev("span.rStyler").addClass("checked");
                        }
                    });

                }

            });
        }
    });
})(jQuery);

/*
    Minus Swiper
*/
(function ($) {
    $.fn.extend({
        minusSwiper: function (options, callback) {
            var defaults = {
                innerClass: '> .swiper-inner',
                wrapperClass: '.swiper-wrapper',
                slideClass: '> .swiper-slide',
                lazy: '.lazy, .lazy-load, .lazy-back-load, .lazyload'
            };

            var option = $.extend(defaults, options);

            return this.each(function (e) {
                var opt = option,
                    ID = $(this),
                    duration = ID.attr('data-swiper-autoplay') || '',
                    _dispatch = function (obj) {
                        stage.dispatchEvent("CustomEvent", "SWIPER_ACTIVE_ELEMENT", $.extend({ ID: ID }, obj));
                    },
                    _callback = function (obj) {
                        if (typeof callback !== 'undefined')
                            callback($.extend({ ID: ID }, obj));
                    },
                    _videos = {
                        el: {
                            con: '.slide-video',
                            button: '.slide-video-btn',
                            video: 'video',
                            activeVideo: '.swiper-slide-active .slide-video-btn'

                        },
                        cls: {
                            activeVideo: 'video-active',
                            isPause: 'isPause',
                            isPlay: 'isPlay'
                        },
                        arr: {},
                        activeted: function () {
                            var _t = this,
                                elm = ID.find(_t.el.activeVideo);

                            if (uty.detectEl(elm))
                                elm.get(0).click();
                        },
                        disabled: function () {
                            var _t = this;

                            ID
                                .find('.' + _t.cls['isPlay'])
                                .removeClass(_t.cls['isPlay'])
                                .removeClass(_t.cls['activeVideo']);

                            $.each(_t.arr, function (ind, item) {
                                item.pause();
                            });

                            _t.activeted();
                        },
                        playVideo: function (ths) {
                            var _t = this;
                            var order = ths.attr('data-order') || '',
                                prts = ths.parents('li').eq(0),
                                vid = _t.arr[order] || '';

                            if (vid != '') {
                                vid.play();
                                prts.addClass(_t.cls['isPlay']).addClass(_t.cls['activeVideo']);
                                _autoPlay({ type: 'stop' });
                            } else
                                console.error('swiper video html kontrol et');
                        },
                        addEvent: function () {
                            var _t = this;
                            ID
                                .find(_t.el.button)
                                .unbind('click')
                                .bind('click', function (evt) {
                                    evt.preventDefault();
                                    _t.playVideo($(this));
                                });
                        },
                        setVideo: function (o) {
                            o = o || {};
                            var _t = this,
                                k = o['ID'],
                                ind = o['order'],
                                vid = new MediaElementPlayer(k, {
                                    stretching: 'responsive',
                                    success: function (player, node) {
                                        player.addEventListener('ended', function (e) {
                                            main.current.slideNext();
                                        });
                                    }
                                });
                            _t.arr[ind] = vid;
                        },
                        initPlugin: function () {
                            var _t = this;
                            ID
                                .find(_t.el.con)
                                .each(function (ind) {
                                    var ths = $(this),
                                        button = ths.siblings(_t.el.button);

                                    button.attr('data-order', ind);

                                    if (uty.detectEl(ths.find(_t.el.video)))
                                        _t.setVideo({ ID: ths.find(_t.el.video).get(0), order: ind });
                                });
                        },
                        init: function () {
                            var _t = this;
                            if (ID.find(_t.el.con).length > 0) {
                                _t.initPlugin();
                                _t.addEvent();
                            }

                        }
                    },

                    _autoPlay = function (o) {
                        o = o || {};
                        var current = main['current'] || '',
                            type = o['type'] || 'start';

                        if (duration != '' && current != '') {
                            if (type == 'start')
                                current.autoplay.start();
                            else
                                current.autoplay.stop();
                        }
                    },

                    _lazy = function (o) {
                        o = o || {};
                        var target = (o['target'] || '').find(opt['lazy']);

                        if (uty.detectEl(target))
                            target
                                .each(function () {
                                    var lazyImage = $(this).get(0);
                                    lazyImage.src = lazyImage.dataset.src;
                                    //lazyImage.srcset = lazyImage.dataset.srcset;
                                    lazyImage.classList.remove(main['cls']['imageLazy']);
                                    lazyImage.classList.add(main['cls']['imageLoaded']);
                                });
                    },

                    _detectPosition = {
                        get: function (k) {
                            var b = false,
                                padding = 50,
                                con = ID.find(opt['innerClass']),
                                o1 = { x: con.offset().left, y: con.offset().top, width: con.width() - padding, height: con.height() },
                                o2 = { x: k.offset().left, y: k.offset().top, width: k.width(), height: k.height() };
                            if (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y)
                                b = true;

                            return b;
                        },
                        set: function () {
                            var _t = this,
                                wrp = ID.find(opt['wrapperClass']),
                                sld = wrp.find(opt['slideClass']);

                            if (uty.detectEl(sld))
                                setTimeout(function () {
                                    sld
                                        .removeClass(main.cls['active'])
                                        .each(function () {
                                            var ths = $(this);
                                            if (_t.get(ths))
                                                ths.addClass(main.cls['active']);
                                        });

                                    var active = wrp.find(opt['slideClass'] + '.' + main.cls['active']);
                                    _lazy({ target: active });
                                    _dispatch({ target: active });
                                    _callback({ type: 'lazyload', value: active });

                                }, 222);
                        }
                    },

                    main = {
                        cls: {
                            imageLoaded: 'image-loaded',
                            imageLazy: 'lazy-load',
                            active: 'slide-active',
                            noResult: 'no-result',
                            itemCount: 'item-'
                        },
                        current: null,
                        objAddEvent: function (obj) {
                            obj = obj || {};
                            var _t = this;

                            if (duration != '')
                                obj['autoplay'] = {
                                    delay: duration
                                };

                            obj['on'] = {
                                init: function () {
                                    _detectPosition.set();
                                    _callback({ type: 'init' });
                                },
                                touchStart: function () {
                                    _autoPlay({ type: 'stop' });
                                    _callback({ type: 'touchStart' });
                                },
                                touchEnd: function () {
                                    _autoPlay({ type: 'start' });
                                    _callback({ type: 'touchEnd' });
                                },
                                slideChangeTransitionStart: function (s) {
                                    _autoPlay({ type: 'stop' });
                                    _callback({ type: 'slideChangeTransitionStart', value: s });
                                },
                                slideChangeTransitionEnd: function (s) {
                                    _detectPosition.set();
                                    _autoPlay({ type: 'start' });
                                    _videos.disabled();
                                    _callback({ type: 'slideChangeTransitionEnd', value: s });
                                }
                            };
                            return obj;
                        },
                        addOrder: function () {
                            var _t = this,
                                wrp = ID.find(opt['wrapperClass']),
                                sld = wrp.find(opt['slideClass']),
                                n = sld.length;

                            ID
                                .addClass(_t.cls['itemCount'] + n)
                                .find(opt['wrapperClass'])
                                .find(opt['slideClass'])
                                .each(function (i, k) {
                                    $(this).attr('data-order', i);
                                });

                            if (n == 0)
                                ID.addClass(_t.cls['noResult']);

                            return n;
                        },
                        init: function () {
                            var _t = this,
                                n = _t.addOrder();

                            if (n > 1) {
                                var key = ID.attr('data-swiper') || 'main',
                                    prop = _t.objAddEvent((SITE_CONFIG['plugin']['swiper'] || {})[key] || SITE_CONFIG['plugin']['swiper']['main'] || {});
                                _t.current = new Swiper(ID, prop);
                            }
                        }
                    };
                main.init();
                _videos.init();

            });
        }
    });
})(jQuery);

/* 
    MINUS TAB MENU 
*/
(function ($) {
    $.fn.extend({
        minusTab: function (options, callback) {
            var defaults = {
                content: '> .ems-tab-content > div', // content
                tabNav: '> .ems-tab-header > a', // tab menu button
                accNav: '> .ems-tab-content > div > .ems-tab-inner-header', // accordion menu button
                begin: 0,
                ajx: {
                    target: '.emosInfinite',
                    typ: 'append'
                }
            };

            var option = $.extend(defaults, options);

            return this.each(function (e) {
                var opt = option,
                    ID = $(this),
                    content = ID.find(opt['content']),
                    tabNav = ID.find(opt['tabNav']),
                    accNav = ID.find(opt['accNav']),
                    main = {
                        cls: {
                            selected: 'selected',
                            ajx: 'ajx-loading',
                            loaded: 'ajx-loaded'
                        },
                        clicklable: true,
                        loading: function (k) {
                            var _t = this;
                            if (k == 'show')
                                ID.addClass(_t.cls['ajx']);
                            else
                                ID.removeClass(_t.cls['ajx']);
                        },
                        getUri: function (o) {
                            /* 
                               ex: /usercontrols/urunDetay/ajxIlgiliUrun.aspx?lang={{lang}}&urn={{prdCode}}&kat={{prdCat}}&ps=100&rp=1 
                            */
                            var _t = this,
                                elm = o['ID'],
                                uri = uty.cleanText(elm.attr('data-ajx') || ''),
                                code = uty.cleanText(elm.attr('data-code') || ''),
                                cat = uty.cleanText(elm.attr('data-cat') || '');
                            return uri.replace(/{{lang}}/g, lang).replace(/{{prdCode}}/g, code).replace(/{{prdCat}}/g, cat);
                        },
                        ajx: function (o) {
                            var _t = this,
                                target = o['ID'],
                                uri = o['uri'] || '';

                            if (uty.detectEl(target) && !target.hasClass(_t.cls['loaded'])) {
                                _t.clicklable = false;
                                _t.loading('show');
                                uty.ajx({ uri: uri }, function (d) {
                                    if (d['type'] == 'success') {
                                        ID.addClass(_t.cls['loaded']);
                                        d = uty.clearScriptTag(d['val'] || '');
                                        d = $('<div>' + d + '</div>').find(opt.ajx.target).html() || '';
                                        if (opt.ajx.target !== '')
                                            target = target.find(opt.ajx.target);

                                        if (uty.detectEl(target)) {
                                            var typ = opt.ajx['typ'] || '';
                                            if (typ == 'append') target.append(d);
                                            else if (typ == 'prepend') target.append(d);
                                            else if (typ == 'before') target.before(d);
                                            else if (typ == 'after') target.after(d);
                                            else target.html(d);

                                        }
                                    }
                                    _t.loading('hide');
                                    _t.clicklable = true;
                                });
                            }
                        },
                        addEvent: function () {
                            var _t = this;

                            tabNav
                                .unbind('click')
                                .bind('click', function () {
                                    var ths = $(this),
                                        rel = ths.attr('rel') || '';

                                    if (rel != '' && _t.clicklable) {
                                        var target = ID.find(opt['content'] + '[rel="' + rel + '"]'),
                                            uri = _t.getUri({ ID: ths });

                                        target.add(ths).addClass(_t.cls['selected']).siblings().removeClass(_t.cls['selected']);

                                        if (uri != '')
                                            _t.ajx({ ID: target, uri: uri });
                                    }
                                });
                        },
                        init: function () {
                            var _t = this;
                            if (uty.detectEl(content) && (uty.detectEl(tabNav) || uty.detectEl(accNav)))
                                _t.addEvent();
                        }
                    };
                main.init();
            });
        }
    });
})(jQuery);
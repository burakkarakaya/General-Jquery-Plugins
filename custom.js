/* mini login ve login.aspx */
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
# Sıkıştırma

JS ve Css sıkıştırmaya konulmalı Burada dikkat edilmesi gereken ilk anda yüklenmesi gerekli olan jsler senkron, kalan jsler asenkron seçilmeli. 

```HTML
/*
    SENKRON OLACAKLAR
*/

jquery-base.min.js
ascMustScripts.js
customEvents-99.1.0.min.js
unveil-lazyload.js
formValidation.js
jquery.cookie.js
emos.css
```

```HTML
/*
    ASENKRON OLACAKLAR
*/

cartScripts.js
popupDimensions.js
comboBox.js
minus.popup.js
jquery.maskedinput.js
ajaxtooltip.js
fb-connect.js (ÖNEMLİ: sitede facebook connect kullanılmıyorsa bu script eklenmemeli)
google-connect.js (ÖNEMLİ: sitede google connect kullanılmıyorsa bu script eklenmemeli)
jquery-ui.min.js
swiper.min.js
mediaElement.js
custom-plugins.js
config.js
allScripts.js
custom.js
genel.css
```

# Management

### Multi Languages
```HTML
/* 
    default değeri data-type="html" 
    isterseniz alabileceği değerler: append, prepend, before, after, html
    amacı ems-multi-languages içerisindeki data-target ile belirtilen nesnenin hedefine içeriğini eklemek.
*/

<div rel="lbfBeden" data-type="append"></div>
<div class="ems-multi-languages ems-none">
    <div data-target="[rel='lbfBeden']" data-type="append">Beden: </div>
    <div data-target="[rel='lbfAdet']">Adet: </div>
    <div data-target="[rel='lbfIndirim']">indirim</div>
    <div data-target="[rel='lbfSonuc0']">Sonuç bulunamadı.</div>
</div>
```

### Append
```Javascript
/*
    Özel durumlarda multi languages dışında başka bir taşıma metodu olarak append kullanabilirsiniz.
    { 
        'main': 'Taşınacak olan ana nesne', 
        'target': 'Hedef nesne', 
        'add': 'ekleme türü', // append, prepend, before, after, html 
        'clone': 'nesne taşınırken kopyası alınsın veya alınmasın' // true, false default değeri false
    },
*/
    append: [
        { 'main': '.mini-lang', 'target': '.mini-lang-append', 'add': 'append', 'clone': true },
        { 'main': '.top-menu', 'target': '.top-menu-append', 'add': 'append', 'clone': true },
        { 'main': '.popular-search-words', 'target': '.popular-search-words-append', 'add': 'append' },
    ]
```

### Url Selected
```Javascript
/* 
    amacı genel olarak üye işlem sayfalarındaki url değişikliklerinde belirtilen butonlara istediğiniz classın eklenmesi. 
    url içerisinde uride geçeni arar ve class atar ama cls verilmezzse default değeri selected
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
]        
```

### Form
```Javascript
/* 
    amacı sitedeki genel inputlara veya html elementte olabilir bunlara mask, attr, class ekleyip, silebilirsiniz.   
{
    'el': 'hedef nesne',
    'mask': 'hedef nesneye mask input',
    'prop': 'hedef nesneye dilediğin kadar prop verebilirsin', { 'type': 'tel', 'prop2': 'prop2' },
    'attr': 'hedef nesneye dilediğin kadar attr verebilirsin', { 'required': 'true', 'attr2': 'attr2' },
    'attr': 'hedef nesneye dilediğin kadar attr verebilirsin', { 'required': 'true', 'attr2': 'attr2' },
    'removeAttr': 'hedef nesneye attr kaldırmaya yarar', ['required', 'type', 'prop2']
    'addClass': 'hedef nesneye class vermek'
    'removeClass': 'hedef nesneden class silmek',
    'regex': 'hedef nesneye regex verilebilir. Örneğin sadece rakam girişine izin vermek gibi'
},

NOT:
regex tanımlama örneği, default olarak general altında 3 tip tanımlı, buraya daha fazla tipte ekleyebilirsiniz.
general: {   
    regex: {
        typ1: /[^a-zA-ZıiIğüşöçİĞÜŞÖÇ\s]+/, /* sadece harf */
        typ2: /[^0-9\s]+/, /* sadece rakam */
        typ3: /[^a-zA-ZıiI0-9ğüşöçİĞÜŞÖÇ\s]+/ /* harf rakam karışık */
    },
},

form: [
    {
        'el': '[id$="txtKUTU_UYEEMAIL"]',
        'regex': 'typ1'
    }
]

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
]
```

# Plugins

### Lazy Load

```HTML
<!-- 

    NOTLAR: 
    a. lazyload tetiklenmesi için elementler gizli olmamalı yani ekranda gözükenler üzerinde işe yarayacak. Display: none olanlarda işe yaramayacak. 

    b. picture tag kullanılmak isteniyorsa burada <source class="lazy-picture" media="(max-width:5000px)" srcset="/images/frontend/placeholder.gif"></source> çok önemli yani ilk anda browser burda tanımladığın src'i görecek.

-->
<picture>
    <source class="lazy-picture" media="(max-width:5000px)" srcset="/images/frontend/placeholder.gif"></source>
    <source srcset="/upload/banner/menu/koleksiyon-adidas.jpg 1x, /upload/banner/menu/koleksiyon-adidas.jpg 2x" media="(max-width: 960px)"></source>
    <source srcset="/upload/banner/menu/koleksiyon-adidas.jpg" media="(min-width: 961px)"></source>
    <img src="/upload/banner/menu/koleksiyon-adidas.jpg" /> 
</picture>

<!-- image tag kullanılmak isteniyorsa -->
<img data-image-src="/upload/banner/menu/kadin.png" />

<!-- background kullanılacaksa -->
<div data-background="/images/frontend/design-uniform-bg.png"></div>


<!--
    ÖNEMLİ: Yukarıda kullanılan yapılar sitede scroll yaptıkça tetikleniyor. Bazı durumlarda sitedeki swiper içerisinde swipe yaptıkça lazyload tetiklemek gerekebilir. Bu durumda lazy-swiper classını eklemek gerekiyor.
-->

<picture>
    <source class="lazy-picture lazy-swiper" media="(max-width:5000px)" srcset="/images/frontend/placeholder.gif"></source>
    <source srcset="/upload/banner/menu/koleksiyon-adidas.jpg 1x, /upload/banner/menu/koleksiyon-adidas.jpg 2x" media="(max-width: 960px)"></source>
    <source srcset="/upload/banner/menu/koleksiyon-adidas.jpg" media="(min-width: 961px)"></source>
    <img src="/upload/banner/menu/koleksiyon-adidas.jpg" /> 
</picture>

```

### Menu
```HTML
<div class="menu main-menu">
    <ul class="lvl-1">
        <li><a href="/">FUTBOL</a></li>
        <li><a href="/">ERKEK</a></li>
        <li><a href="/">KADIN</a>
            <div class="sub animated fadeIn faster">
                <ul class="lvl-2">
                    <li><a href="/">Yeni Gelenler</a></li>
                    <li><a href="/">Öne Çıkanlar</a>
                        <ul class="lvl-3">
                            <li><a href="/">Maç Ürünleri</a></li>
                            <li><a href="/">En Çok Satanlar</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</div>
```

### Swiper

``` HTML
<div class="swiper-container homepage-slider" data-swiper="main">
    <div class="swiper-inner">
        <ul class="swiper-wrapper">

            <!-- image kullanımı ayrıca lazyload olması isteniyorsa lazy-swiper classı eklenmeli -->
            <li class="swiper-slide type-img">
                <div class="slide-content">
                    <div class="slide-img">
                        <picture>
                            <source class="lazy-picture lazy-swiper" media="(max-width:5000px)"
                                srcset="/images/frontend/placeholder.gif">
                            </source>
                            <source
                                srcset="/upload/banner/menu/koleksiyon-adidas.jpg 1x, /upload/banner/menu/koleksiyon-adidas.jpg 2x"
                                media="(max-width: 960px)">
                            </source>
                            <source srcset="/upload/banner/menu/koleksiyon-adidas.jpg" media="(min-width: 961px)">
                            </source>
                            <img src="/upload/banner/menu/koleksiyon-adidas.jpg" />
                        </picture>
                    </div>
                </div>
            </li>

            <!-- Video kullanımı -->
            <li class="swiper-slide type-video">
                <div class="slide-video">
                    <video
                        src="https://player.vimeo.com/external/347762525.hd.mp4?s=c6e7f2ca6a1a1baa8bbda4fcf71124f32fa2520b&profile_id=175"
                        poster="/UPLOAD/BANNERS/homepage-slider/bt-design-dion-video-cover.png" 
                        autobuffer="autobuffer"
                        preload="none" 
                        muted="true" 
                        playsinline="true" 
                        loop="true" 
                        class="video-player">
                    </video>
                </div>
                <a href="javascript:void(0);" class="slide-video-btn"></a>
            </li>

        </ul>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
</div>
```
``` HTML
<!--
    özel durumlarda swiper sadece mobilde tetiklensin isteniyorsa "mobi-swiper" classı eklenmeli. Dekstopta tetiklenmiyor. Burada dikkat edilmesi gereken desktopda swiper-button-next, swiper-button-prev, swiper-pagination css ile gizlenmesi
-->
<div class="swiper-container mobi-swiper" data-swiper="widgetThree">
    <div class="swiper-title">Mobile Swiper</div>
    <div class="swiper-inner">
        <ul class="swiper-wrapper">
            <li class="swiper-slide">1. slide</li>
            <li class="swiper-slide">2. slide</li>
            <li class="swiper-slide">3. slide</li>
            <li class="swiper-slide">4. slide</li>
            <li class="swiper-slide">5. slide</li>
            <li class="swiper-slide">6. slide</li>
        </ul>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
</div>
```

``` HTML
<!--
    özel durumlarda swiper sadece desktopda tetiklensin isteniyorsa "desktop-swiper" classı eklenmeli. mobilde tetiklenmiyor. Burada dikkat edilmesi gereken mobilde swiper-button-next, swiper-button-prev, swiper-pagination css ile gizlenmesi
-->
<div class="swiper-container desktop-swiper" data-swiper="widgetThree">
    <div class="swiper-title">Desktop Swiper</div>
    <div class="swiper-inner">
        <ul class="swiper-wrapper">
            <li class="swiper-slide">1. slide</li>
            <li class="swiper-slide">2. slide</li>
            <li class="swiper-slide">3. slide</li>
            <li class="swiper-slide">4. slide</li>
            <li class="swiper-slide">5. slide</li>
            <li class="swiper-slide">6. slide</li>
        </ul>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
</div>
```

### System Widget

``` HTML
<div class="system-widget widget swiper-container" data-uri="/urun_liste.aspx?kat=22949&lang={{lang}}&ps=8">
    <div class="swiper-header"><span>ÖNE ÇIKAN ÜRÜNLER</span></div>
    <div class="swiper-inner">
        <ul class="emosInfinite swiper-wrapper">
        </ul>
    </div>
    <div class="swiper-button-prev"><i> </i></div>
    <div class="swiper-button-next"><i> </i></div>
    <div class="swiper-pagination"></div>
</div>
```

System widgetları ilk anda yüklenmemesi scroll ettikten sonra yüklenmeleri için system widget "scroller-trigger" classı eklenmeli

``` HTML
<div class="system-widget widget swiper-container scroller-trigger" data-uri="/urun_liste.aspx?kat=22949&lang={{lang}}&ps=8">
    <div class="swiper-header"><span>ÖNE ÇIKAN ÜRÜNLER</span></div>
    <div class="swiper-inner">
        <ul class="emosInfinite swiper-wrapper">
        </ul>
    </div>
    <div class="swiper-button-prev"><i> </i></div>
    <div class="swiper-button-next"><i> </i></div>
    <div class="swiper-pagination"></div>
</div>
```
```JS

data-uri paremetresinde kullanabileceğimiz user controller. Ayrıca bu değerleri ajax tab menudede kullanabilirsiniz.

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&tip=indirim&ps=10&rp=1&tur=sepetli 

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&tip=vitrin&ps=100&rp=1&tur=sepetli

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&tip=encoksatan&ps=100&rp=1&tur=sepetli

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&tip=yeniurun&ps=10&rp=1&tur=sepetli

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&kat={{prdCat}}&tip=onecikan&ps=100&rp=1&tur=sepetli

/usercontrols/urunDetay/ascSonGezilenUrun_ajx.aspx?lang={{lang}}&listeTuru=sepetli&urunSayisi=10&repeatColumns=1&resimTipi=thumb

/usercontrols/urunDetay/ajxIlgiliUrun.aspx?lang={{lang}}&urn={{prdCode}}&ps=100&rp=1

/usercontrols/kutu/ajxUrunTab.aspx?lang={{lang}}&tip=seciliurun&ps=100&rp=1&ukods={{urn}}

NOT: 

{{lang}}: kısmı aktif dilin değerini alıyor. 

{{prdCat}}: <div data-cat="24666" class="system-widget widget swiper-container scroller-trigger" data-uri="/urun_liste.aspx?kat={{prdCat}}&lang={{lang}}&ps=8"></div> burada div üzerinde data-cat attribute görürse onun değerini alır bulamazsa bu sefer urlString de kat geçiyorsa onun değerini alır. Yani ürün listede data-cat eklemeyerek sadece urlStringden okuyarak dinamik bir şekilde widgetı tetikletebilirsiniz. Ürün detay, ana sayfa gibi yerlerde data-cat ile belirlediğiniz kategorilerden ürün çekmesini sağlayabilirsiniz.

{{prdCode}}: <div data-code="889977" class="system-widget widget swiper-container scroller-trigger" data-uri="/usercontrols/urunDetay/ajxIlgiliUrun.aspx?lang={{lang}}&urn={{prdCode}}&ps=100&rp=1"></div> burada div üzerinde data-code attribute görürse onun değerini alır bulamazsa ve ürün detaydaysa hdnURN_KOD değerini alır.

```

### Tab Menu

``` HTML
 <div class="ems-tab">
        <div class="ems-tab-header">
            <a data-ajx="/urun_liste.aspx?kat=22949&lang=tr-TR&ps=8" href="javascript:void(0);"
                rel="tab-1">ERKEK</a>
            <a href="javascript:void(0);" rel="tab-2">KADIN</a>
            <a href="javascript:void(0);" rel="tab-3">ÇOCUK</a>
        </div>
        <div class="ems-tab-content">
            <div rel="tab-1">
                <div class="swiper-container">
                    <div class="swiper-inner">
                        <ul class="emosInfinite">
                        </ul>
                    </div>
                    <div class="swiper-button-prev"><i> </i></div>
                    <div class="swiper-button-next"><i> </i></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div rel="tab-2">tab2</div>
            <div rel="tab-3">tab3</div>
        </div>
    </div>
```

Eğer Ajax tab menu kullanacaksanız ilk anda istek atmaması için "scroller-trigger" classını eklemeniz gerekir. Böylece scroll edince viewport içerisinde tab gözüktüğü zaman tetikleme gerçekleşecektir.

``` HTML
 <div class="ems-tab scroller-trigger">
        <div class="ems-tab-header">
            <a data-ajx="/urun_liste.aspx?kat=22949&lang=tr-TR&ps=8" href="javascript:void(0);"
                rel="tab-1">ERKEK</a>
            <a href="javascript:void(0);" rel="tab-2">KADIN</a>
            <a href="javascript:void(0);" rel="tab-3">ÇOCUK</a>
        </div>
        <div class="ems-tab-content">
            <div rel="tab-1">
                <div class="swiper-container">
                    <div class="swiper-inner">
                        <ul class="emosInfinite">
                        </ul>
                    </div>
                    <div class="swiper-button-prev"><i> </i></div>
                    <div class="swiper-button-next"><i> </i></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div rel="tab-2">tab2</div>
            <div rel="tab-3">tab3</div>
        </div>
    </div>
```

### Accordion

```HTML
<div class="ems-tab ems-tab-vertical">
    <div class="ems-tab-content">
        <div data-ajx="/urun_liste.aspx?kat=22949&lang=tr-TR&ps=8" rel="tab-1">
            <div class="ems-tab-inner-header">Tab 1</div>
            <div class="ems-tab-inner-content">
                <div class="swiper-container">
                    <div class="swiper-inner">
                        <ul class="emosInfinite">
                        </ul>
                    </div>
                    <div class="swiper-button-prev"><i> </i></div>
                    <div class="swiper-button-next"><i> </i></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
        <div rel="tab-2">
            <div class="ems-tab-inner-header">Tab 2</div>
            <div class="ems-tab-inner-content">
                tab 2 content
            </div>
        </div>
        <div rel="tab-3">
            <div class="ems-tab-inner-header">Tab 3</div>
            <div class="ems-tab-inner-content">
                tab 3 content
            </div>
        </div>
    </div>
</div>

```

### Video

Siteye eklenen videoların ilk anda yüklenmemesi için video tagına class="is-scrolling" eklenmesi ve videonun ilk anda yüklenmemesi için preload="none", iosta videonun olduğu yerde gözükmesi için playsinline="true" parametrelerinin eklenmesi gerekir. Ayrıca autoplay özelliğini eklenmemesi lazım.

```HTML
<video 
class="is-scrolling" 
src="//player.vimeo.com/external/348070064.sd.mp4?s=fd02b2e7c50467ca51268998272bb0532592b543&profile_id=165"
preload="none" 
muted="true" 
playsinline="true" 
loop="true">
</video>
```

```HTML

<!--
    NOT: Video swiper içerisinde kullanılacaksa aşağıdaki gibi bir html yapısında olması gerekmektedir. İlgili slide aktif olduğu zaman video otomatikman oynamaya başlayacaktır.
-->

<li class="swiper-slide">
    <div class="slide-video">
     <video 
            src="https://player.vimeo.com/external/347762525.hd.mp4?s=c6e7f2ca6a1a1baa8bbda4fcf71124f32fa2520b&profile_id=175"
            poster="/UPLOAD/BANNERS/homepage-slider/bt-design-dion-video-cover.png" 
            preload="none" 
            autobuffer="autobuffer" 
            preload="none" 
            muted="true" 
            playsinline="true" 
            loop="true" 
            class="video-player">
        </video>
    </div>
    <a href="javascript:void(0);" class="slide-video-btn"></a>
</li>

```

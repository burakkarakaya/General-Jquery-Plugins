# General-Jquery-Plugins

## Swiper

``` HTML
<div class="swiper-container homepage-slider" data-swiper="main">
    <div class="swiper-inner">
        <ul class="swiper-wrapper">
            <li class="swiper-slide type-img">
                <div class="slide-content">
                    <div class="slide-img"><img class="lazy-load" data-src="//via.placeholder.com/1440x630.jpg"
                            data-srcset="//via.placeholder.com/1440x630 2x, //via.placeholder.com/1440x630 1x"
                            alt="slide name!" /></div>
                </div>
            </li>
            <li class="swiper-slide type-video">
                <div class="slide-content">
                    <div class="slide-video"><video
                            src="//player.vimeo.com/external/309629080.hd.mp4?s=c0c94fd088a550b1158dfb6a98f648f173aac3f7&amp;profile_id=174"
                            preload="none" autobuffer="autobuffer" class="video-player"> </video></div>
                    <a href="javascript:void(0);" class="slide-video-btn"></a>
                </div>
            </li>
        </ul>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
</div>
```

## Tab Menu

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
                </div>
            </div>
            <div rel="tab-2">tab2</div>
            <div rel="tab-3">tab3</div>
        </div>
    </div>
```

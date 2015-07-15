/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL VARIABLE
var win = $( window ), doc = $( document ), bdy = $('body'), pages = { main: '.pageHome', list: '.pageList', detail: '.pageDetail', blog: '.pageBlog' }, wt,  ht, wst, sRatio = 0, rstDom = false, siteLang = lang.replace(/lang=/g, '') == 'tr-TR' ? 'tr' : 'en';

/////////////////////////////////////////////////////////////////////////////////////////////////////// APPEND
/*
	main: taşınacak ana nesne
	target: ana nesnenin taşınacağı hedef nesne
	add: ekleme tipi append, prepend, before, after,
	clone: ana nesne klonlansın mı
*/
var appendManagament = {
	arr: [
		{ main: '.urunMarka_siralamaSecim', target: '.mbSort', add: 'append', clone: true },
		{ main: '.mbfilterHolder', target: '.compareHolder', add: 'before' }
	],	
	init: function(){
		var _t = this, arr = _t.arr;
		for( var i = 0; i < arr.length; ++i ){
			var o = arr[ i ], main = $( o['main'] ), target = $( o['target'] ), clone = o['clone'] || '', type = o['add'] || '';
			if( detectEl( main ) && detectEl( target ) ){
				var e = clone != '' ? main.clone() : main;
				if( type == 'prepend' ) target.prepend( e );
				else if( type == 'before' ) target.before( e );
				else if( type == 'after' ) target.after( e );
				else target.append( e );
			}
		}
	},
};

appendManagament.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// CLASS
var classManagament = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////// MENU
/*
	el: menu kapsayicisi
	mobile: 
	btn: mobil menüyü açma butonu
	overlay: mobil menüyü kapatma butonu
	mobiWrp: menu ana kolonu mobileCol; contentCol üst kısmı
	input: arama inputu
	clearBtn: arama inputunu temizleme
	clearClass: input veri girilince eklenenen class
	plugin: site bazlı değişecek pluginler
*/
var menu = {
	el: '.mainMenu',
	mobile: '.mainMenu .subMenuHldr',
	btn: '.mmenu',
	overlay: '.mobiMenu.vail, .mbHomePageBack > i',
	mobiWrp: '.mobileCol',
	input: 'input[id$="txtARM_KEYWORD"]',
	clearBtn: 'a.clearInputBtn',
	clearClass: 'searchSuggest',
	plugin: function( ID ){
		ID.minusDropDown({ customClass: 'opened', openedDelay: 222, isVisible: '.smartHeader' });
	},
	subMenu: function( ID ){
		$('.lvl2', ID).each(function( i, k ) { 
			var _this = $( this ), sib = _this.siblings('a');
			if( detectEl( $('> li', _this ) ) && detectEl( sib ) )
				_this.before('<span class="toggle"></span>'); 
		});	
		$('span.toggle', ID).bind('click', function(){
			var _this = $( this ), prt = _this.parent('li'), sib = prt.siblings('li');
			if( prt.hasClass('opened') ){
				ID.removeClass('subLvl1');
				$('.opened', ID).removeClass('opened');
			}else{
				sib.removeClass('opened');
				prt.addClass('opened');
				ID.addClass('subLvl1');
			}
		});
		$('.goBack', ID).bind('click', function(){
			ID.removeClass('subLvl1');
			$('.opened', ID).removeClass('opened');
		});	
	},
	resize: function(){
		var _t = this, e = $( _t.mobiWrp );
		if( e.length > 0 && bdy.hasClass('mobiMenuReady') )
			e.css({ 'min-height': ht });
	},
	destroy: function(){
		bdy.removeClass('mobiMenuReady mobileMenuOpened');
		var _t = this, e = $( _t.mobiWrp );
		if( e.length > 0 )
			e.css({ 'min-height': '' });
	},
	hideSuggestionsDiv: function(){
		var _t = this, input = $( _t.input );
		if( detectEl( input ) ) input.val('').blur();
		if( typeof HideSuggestionsDiv != 'undefined'  ) HideSuggestionsDiv();
	},
	initMobile: function(){
		var _t = this, el = $( _t.mobile );
		if( detectEl( el ) ){
			
			if( detectEl( $( _t.btn ) ) )
				$( _t.btn ).bind('click', function(){
					if( bdy.hasClass('mobiMenuReady') ){ 
						_t.hideSuggestionsDiv();
						cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['mobileMenuOpened', 'mobiMenuReady'] }); 
					}else
						cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['mobiMenuReady', 'mobileMenuOpened'] }); 
					
					_t.resize();	
				});
		
			if( detectEl( $( _t.overlay ) ) )
				$( _t.overlay ).bind('click', function(){ 
					_t.hideSuggestionsDiv();
					cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['mobileMenuOpened', 'mobiMenuReady'] }); 
				});
			
			_t.subMenu( el );	
		}
	},
	init: function(){
		var _t = this, el = $( _t.el ), clearBtn = $( _t.clearBtn ), input = $( _t.input );
		
		if( detectEl( el ) ){
			_t.plugin( el );
			_t.initMobile();
		}
		
		if( detectEl( clearBtn ) )
			clearBtn.bind('click', function(){
				_t.hideSuggestionsDiv();
				bdy.removeClass( _t.clearClass );
			});
			
		if( detectEl( input ) ) 
			input.bind('keyup change', function( e ){
				if( $( this ).val().length > 0 ){
					if( !bdy.hasClass( _t.clearClass ) )  
						bdy.addClass( _t.clearClass );
				}else
					bdy.removeClass( _t.clearClass );
			});	
	}
};

menu.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// CART
var cart = {
	amoundEl: 'span#lblUrunAdet',
	amountTarget: '.basketAmount',
	priceEl: 'span#lblUrunTutari',
	priceTarget: '.basketTotal',
	btn: '.userInfo .basket',
	overlay: '.usrSepetWrapper .overlay, .clsPp, .goShopbtn',
	add: function(){
		var _t = this;
			_t.amound();
		pageScroll(0, function(){ _t.opened(); });	
	},
	amound: function(){
		var _t = this, amoundEl = $( _t.amoundEl ), amountTarget = $( _t.amountTarget ), priceEl = $( _t.priceEl ), priceTarget = $( _t.priceTarget );
		if( detectEl( amoundEl ) && detectEl( amountTarget ) ){
			var val = parseFloat( amoundEl.text() );
			amountTarget.text( val );
		}
		if( detectEl( priceEl ) && detectEl( priceTarget ) ){
			var val = parseFloat( priceEl.text() );
			if( val > 0 ) priceTarget.text( priceEl.text() );
		}
	},
	destroy: function(){
		bdy.removeClass('miniCartReady miniCartAnimate');
	},
	opened: function(){
		cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['miniCartReady', 'miniCartAnimate'] });
	},
	closed: function(){
		cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['miniCartAnimate', 'miniCartReady'] });
	},
	init: function(){
		var _t = this;
		if( detectEl( $( _t.btn ) ) )
			$( _t.btn ).bind('click', function(){
				if( bdy.hasClass('miniCartReady') ) 
					_t.closed();
				else
					_t.opened();
			});
	
		if( detectEl( $( _t.overlay ) ) )
			$( _t.overlay ).bind('click', function(){ 
				_t.closed();
			});
	},
};

cart.init();

if( typeof sepetObjectID !== "undefined" )
	$.post(sepetObjectID, function( data ){ cart.amound(); });
stage.addEventListener("CustomEvent", [ { type: "sepetDoldur", handler: "cartAmound" } ]);
stage.addEventListener("CustomEvent", [ { type: "sepeteEkle", handler: "cartAdd" } ]);	
function cartAmound(){ cart.amound(); }
function cartAdd(){ cart.add(); }

/////////////////////////////////////////////////////////////////////////////////////////////////////// LOGIN
var login = {
	err: '.errorKutuLogin',
	btn: '.btnGirisPc, .uyeBtnPc',
	overlay: '#validateLogin .overlay, .closeUsrPp',
	input: 'input[id$="txtUYE_EMAIL"]',
	check: function(){
		var _t = this, input = $( _t.input );
		if( detectEl( $( _t.err ) ) ){
			var ekt = cleanText( $( _t.err ).text() );
			if( ekt != '' ) _t.opened();
			if( detectEl( input ) ) input.focus();
		}
	},
	destroy: function(){
		bdy.removeClass('userLoginReady userLoginAnimate');
	},
	opened: function(){
		cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['userLoginReady', 'userLoginAnimate'] });
	},
	closed: function(){
		cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['userLoginAnimate', 'userLoginReady'] });
	},
	init: function(){
		var _t = this;
			_t.check();
		
		if( detectEl( $( _t.btn ) ) )
			$( _t.btn ).bind('click', function(){
				if( bdy.hasClass('userLoginReady') ) 
					_t.closed();
				else
					_t.opened();
			});
	
		if( detectEl( $( _t.overlay ) ) )
			$( _t.overlay ).bind('click', function(){ 
				_t.closed();
			});
	}
};
login.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// YOUTUBE
var youtube = {
	el: 'a.vClick',
	closeBtn: '.ytPlayerWrp .closeVideoBtn',
	videoEl: '.ytPlayerWrp .inside',
	video: null,
	destroy: function(){
		var _t = this, iframe = $( 'iframe', _t.videoEl );
		if( _t.video != null ){
			if( _t.video != null ){
				_t.video[0].dispose();
				_t.video = null;
			}	
		}
		if( detectEl( iframe ) ) iframe.removeAttr('src');
	},
	template: '<div class="ytPlayerWrp"><div class="overlay"></div><div class="ytPlayer"><a class="closeVideoBtn" href="javascript:void(0);"><span>Close</span><i></i></a><div class="inside"></div></div></div>',
	addVideo: function( ytID ){
		var _t = this, videoEl = $( _t.videoEl );
		if( detectEl( videoEl ) ){
			cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['ytVideoReady', 'ytVideoAnimate'] }, function(){
				setTimeout(function(){
					_t.video = videoEl.minusPlayer({ videoId: ytID, controls: isMobile ? 1 : 0, autoplay: isMobile ? 0 : 1, sound: 70, orientation: 'vertical' });
				}, 222);
			});
		}
	},
	add: function(){
		var _t = this;
		if( !detectEl( $('.ytPlayerWrp') ) )
			bdy.append( _t.template );
		
		_t.addEvent();	
	},
	addEvent: function(){
		var _t = this, el = $( _t.el ), closeBtn = $( _t.closeBtn );
		
		if( detectEl( el ) )
			el.bind('click', function(){
				var _this = $( this ), rel = _this.attr('rel');
				if( rel != undefined && rel != null && rel != '' ) _t.addVideo( rel );
			});
			
		if( detectEl( closeBtn ) )
			closeBtn.bind('click', function(){
				cssClass({ 'ID': 'body', 'delay': 222, 'type': 'remove', 'cls':['ytVideoAnimate', 'ytVideoReady'] }, function(){
					_t.destroy();
				});
			});	
	},
	init: function(){
		var _t = this, el = $( _t.el );
		if( detectEl( el ) ){
			if( $('script[src*="//www.youtube.com/iframe_api"]').length == 0 ) 
				$.getScript('//www.youtube.com/iframe_api');
		}
	}
};

function onYouTubePlayerAPIReady(){
	youtube.add();
}

youtube.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// BODY CLICKED
var bodyClicked = {
	el: '',
	init: function(){
		$('body, html').bind('click touchstart', function( e ){
			/* example
			var m = $('.wrapper .header, .subMenuWrapper'); 
			if( !m.is( e.target ) && m.has( e.target ).length === 0 ){
				menuClicked( 'closed' );
			}
			*/
		});
	}
};
bodyClicked.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// FORM CONTROLLER
var formController = {
	el: [
		{ el: '[id$="txtUYE_CEPTELEFONALAN"]', mask: '599', required: true, placeHolder: null, fnt: '[id$="lbfUYE_CEPTELEFON"]' },
		{ el: '[id$="txtUYE_CEPTELEFON"]', mask: '9999999', required: true, placeHolder: null, fnt: '[id$="lbfUYE_CEPTELEFON"]' },
		{ el: '[id$="txtUYA_CEPTELEFON"]', mask: '599 9999999', required: true, placeHolder: null },
		{ el: '[id$="drpUYE_CINSIYET"]', mask: null, required: false, placeHolder: null, fnt: '[id$="lbfUYE_CINSIYET"]' },
		{ el: '[id$="txtUYE_DOGUMTARIHI"]', mask: null, required: null, placeHolder: null, fnt: '[id$="lbfUYE_DOGUMTARIHI"]' },
		{ el: '[id$="txtUYE_EMAIL"]', mask: null, required: null, placeHolder: { tr: 'Email adresinizi giriniz.', en: 'Email' } },
		{ el: '[id$="txtUYE_SIFRE"]', mask: null, required: null, placeHolder: { tr: 'Şifrenizi giriniz.', en: 'Password' } },
	],
	init: function(){
		var _t = this, e = _t.el;
		$.each(e, function( i, o ){
			var el = $( o['el'] );
			if( detectEl( el ) ){
				if( o['mask'] != null ) el.mask( o['mask'] );
				if( o['placeHolder'] != null ) el.attr('placeholder', o['placeHolder'][ siteLang ] );
				if( o['required'] != null ){
					el.attr('required', o['required'] );	
					if( o['required'] && o['fnt'] != undefined && o['fnt'] != null ){
						el.parents('li').find( o['fnt'] ).addClass('zorunluFont');
					}else if( !o['required'] && o['fnt'] != undefined && o['fnt'] != null ){
						el.parents('li').find( o['fnt'] ).removeClass('zorunluFont');
					}
				}
			}
		});
	}
};
formController.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// FILTER BTN
var filterBtn = {
	btn: '.mbFiterBtn',
	closeBtn: '.filterMenu.vail',
	destroy: function(){
		bdy.removeClass('filterMenuReady filterMenuOpened');
	},
	opened: function(){
		cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':['filterMenuReady', 'filterMenuOpened'] });
	},
	closed: function(){
		cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':['filterMenuOpened', 'filterMenuReady'] });
	},
	init: function(){
		var _t = this, btn = $( _t.btn ), closeBtn = $( _t.closeBtn );
		if( detectEl( btn ) ){
			btn.unbind('click').bind('click', function(){
				if( bdy.hasClass('filterMenuReady') )
					_t.closed();
				else
					_t.opened();	
			});
		}
		
		if( detectEl( closeBtn ) ){
			closeBtn.unbind('click').bind('click', function(){
				_t.closed();
			});
		}
	}
};

filterBtn.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// FILTER
var filter = {
	activeFilterID: null,
	begin: function(){
		var s = $('.pnlUrunKiyasSecim'), t = $('.urunKiyaslamaOzellik_tumunuTemizle'), l = $('.prdListHolder .propertyTop');
		if( t.length > 0 && s.length > 0 && l.length > 0 ){
			s.append( t );
			l.after( s.clone() );
			if( cleanText( t.html() ).length > 0 ) s.addClass('filterSelected');
		}

		var f = $('.kutuOzellikFiltre'), c = $('.right .urnList .prdListHolder')
		c.before( f.clone() );
	},
	clearBtn: function(){
		var _t = this, b = '.urunKiyaslamaOzellik_secimler > a, .urunKiyaslamaOzellik_tumunuTemizle > a', btn = $( b );
		if( detectEl( btn ) )
			btn.unbind('click').bind('click', function( e ){
				if( history.pushState ){
					e.preventDefault();
					var _this = $( this ), hrf = _this.attr('href');
					if( hrf != undefined && hrf != null && hrf != '' ){
						_t.loading('add');			
						getAjax(hrf, function( d ){ _t.ajxResult( d ); }, function(){ _t.ajxError(); });	
						history.pushState({}, document.title, hrf);
						_t.activeFilterID = null;	
					}
				}
			});
	}, 
	btn: function(){
		var _t = this, b = '.urunKiyaslamaOzellik_ozellik a', p = '.urunKiyaslamaOzellik_ozellikIcerik', btn = $( b );
		if( detectEl( btn ) )
			btn.unbind('click').bind('click', function( e ){
				if( history.pushState ){
					e.preventDefault();
					var _this = $( this ), hrf = _this.attr('href'), ids = _this.parents( p ).attr('id');
					if( hrf != undefined && hrf != null && hrf != '' ){
						_t.loading('add');			
						getAjax(hrf, function( d ){ _t.ajxResult( d ); }, function(){ _t.ajxError(); });	
						history.pushState({}, document.title, hrf);
						if( ids != undefined && ids != null && ids != '' ) _t.activeFilterID = ids;	
					}
				}
			});
	},
	loading: function( type ){
		if( type == 'add' ) bdy.addClass('pageListAjxLoading');
		else bdy.removeClass('pageListAjxLoading');
	},
	checkID: function( ID ){
		var _t = this;
		if( _t.activeFilterID != null )
				$('.urunKiyaslamaOzellik_ozellikIcerik[id="'+ _t.activeFilterID +'"]', ID).addClass('open');	
	},
	el: '.pageList',
	ajxResult: function( d ){
		var _t = this, el = $( _t.el ), target = $( d ).find( _t.el );
		if( detectEl( el ) && detectEl( target ) ){
			_t.checkID();
			_t.loading('remove');
			el.html( target.html() );
			_t.plugin();
		}		
	},
	ajxError: function(){
		var _t = this;
			_t.loading('remove');	
	},
	plugin: function(){
		var _t = this, el = $( _t.el );
		appendManagament.init();
		filter.init();
		filterBtn.init();
		compareList.active();
		lazyControl( el );
		iStylers();
	},
	init: function(){
		var _t = this;
			_t.begin();
			_t.btn();
			_t.clearBtn();		
	},
};

filter.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// COMPARE
var compareList = {
	wrp: '.compareHolder',
	btn: '.compareHolder .compareMenu ul li[rel="compareList"] span.tabBtn',
	cls: 'showCompare',
	list: '.compareContentList .ajxList ul > li',
	clear: function( val ){
		if( val == 'clear' ) $('span.cStyler').removeClass('checked');
		else{
		var e = $('input[id$="chkOZS_KOD"][value=' + val + ']');
			setTimeout(function(){
				$('.checked', e.parent('.sStylerMainWrp')).removeClass('checked');
				e.siblings('span.cStyler').removeClass('checked');
			}, 10);
		} 
	},
	detect: function(){
		var _t = this, wrp = $( _t.wrp ), list = $( _t.list )
		if( detectEl( wrp ) ){ 
			if( detectEl( list ) ) wrp.addClass( _t.cls );
			else wrp.removeClass( _t.cls );
		}
	},
	begin: function(){
		var _t = this, btn = $( _t.btn );

		if( detectEl( btn ) )
			btn.click();
		
		if( typeof ssUrnKod !== 'undefined' ){	
			if( ssUrnKod == '' ){
				$('[id$="chkOZS_KOD"]').attr('checked', false);
				_t.clear('clear');
			}
		}		
	},
	active: function(){
		var _t = this;
		setTimeout(function(){
			
			if( typeof initCompare != 'undefined' )
				initCompare();
			
			_t.chkChange();
      	
			_t.begin();
			
		}, 100);
	},
	chkChange: function(){
		/* Not: site bazlı değişebilir. */
		if( typeof ctl00_u15_ascUrunList_strTip != 'undefined' )
			$("#ajxUrunList." + ctl00_u15_ascUrunList_strTip +" input[id$='chkOZS_KOD']").change(function() {
				ctl00_u15_ascUrunList_kiyaslaEkle( this );
			});	
	},
	init: function(){
		var _t = this;
			_t.begin();
	}
};

stage.addEventListener("CustomEvent", [{ type: "itemCompare", handler: "onItemCompare" }]);
stage.addEventListener("CustomEvent", [{ type: "itemCompareClear", handler: "onItemCompareClear" }]);
function onItemCompare(){ compareList.detect(); }
function onItemCompareClear( obj ){
	compareList.clear( obj['type'] );
	compareList.detect();
}

compareList.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// CONVERT DROPDOWN
var convertDrp = {
	arr: [
		{ main: '.memberMenu ul', prop: { attachmentDiv: '.memberMenu', type: 'before', customClass:'memberMenuDrp customDrp' } },
		{ main: '.kutuBodySolMenuTree > ul > li ul', prop: { attachmentDiv: '.kutuSolMenuTree', type: 'before', customClass:'solMenuDrp customDrp' } },
	],	
	init: function(){
		var _t = this, arr = _t.arr;
		for( var i = 0; i < arr.length; ++i ){
			var o = arr[ i ], main = $( o['main'] ), prop = o['prop'];
			if( detectEl( main ) )
				main.minusConvertDropDown( prop );
		}
		iStylers();
	},
};
convertDrp.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// COUNTER
var counter = {
	el: '.urunDetay_urunAdet input, .countProduct input[id$="txtURN_ADET"]',
	init: function(){
		var _t = this, el = $( _t.el );
		if( detectEl( el ) )
			el.attr('min', 1).minusCounter();
	}
};

counter.init();

/////////////////////////////////////////////////////////////////////////////////////////////////////// MAIN PAGE
function mainPage(){
	if( detectEl( $('.mainSlider') ) ) $('.mainSlider').minusSimpleSlider({ infinite: true, rotate:false, navPosition: false });
	if( detectEl( $('.tabWrapper') ) )
		$('.tabWrapper').minusTabMenu({ ajxFind: '.ajxList' }, function(){
			triggerMinusScroller( $('.content .selected[data-content]') );
		});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// LIST PAGE
function listPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// DETAIL PAGE
function detailPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// BLOG PAGE
function blogPage(){
	//noThing
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// PAGES
if( detectEl( $( pages['main'] ) ) ) mainPage();
if( detectEl( $( pages['list'] ) ) ) listPage();
if( detectEl( $( pages['detail'] ) ) ) detailPage();
if( detectEl( $( pages['blog'] ) ) ) blogPage();

/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL FUNC

function getAjax( uri, callback, error ){
	$.ajax({
		type:'GET',
		dataType:'html',
		url: uri,
		error: function( e ){ 
			if( error != undefined ) 
				error( e ); 
		},
		timeout: 30000,
		success:function( d ){ 
			if( callback != undefined ) 
				callback( d );
		}
	});
}

function detectEl( ID ){ return ID.length > 0 ? true : false; }

function cssClass( o, callback ){
	var ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
	if( detectEl( ID ) ){
		if( type == 'add' ){
			cls = o['cls'] || ['ready', 'animate'];
			ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
		}else{
			cls = o['cls'] || ['animate', 'ready'];
			ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( callback != undefined ) callback(); });
		}
	}
}

function pageScroll( t, callback ){
	$('html, body').stop().animate({ scrollTop: t }, 888, 'easeInOutExpo', function(){ if( callback != undefined ) callback();  });
}

function triggerMinusScroller( ID ){
	if( detectEl( ID ) ){
		ID.minusScroller({ resize:true, navigation:true, snap: true, padding:0, minWidth: 250, divName: { wrapper: '#ajxUrunList > .prdListHolder', ul: '> ul', li: '> li' } });
		lazyControl( ID );
	}
}

function lazyControl( ID ){
	if( detectEl( ID ) ){
		if( detectEl( $('img.lazyload', ID) ) )
			$('img.lazyload', ID).unveil().trigger("unveil");
	}
}

function iStylers(){	
	if( detectEl( $("select, input:checkbox, input:radio") ) )
		$("select, input:checkbox, input:radio").iStyler({ wrapper:true });
}

function cleanText( k ){
	return k.replace(/\s+/g, '');
}

function destroy(){
	login.destroy();
	cart.destroy();
	menu.destroy();
	filterBtn.destroy();
}

function changeDivPosition( type ){
	if( type == 'mobi' ){
		// noThing
	}else{
		// noThing
	}
}

function clearClass( type ){
	if( type == 'mobi' ){
		// noThing
	}else{
		// noThing
	}
}

function resetDom(){
	if( $('.smartHeader').is(':visible') && !rstDom ){
		// MOBILE VER.
		rstDom = true;
		clearClass('mobi');
		changeDivPosition('mobi');
		destroy();
	}else if( !$('.smartHeader').is(':visible') && rstDom ){
		// PC VER.
		rstDom = false;
		clearClass('pc');
		changeDivPosition('pc');
		destroy();
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL EVENTS
var events =
{
	
	init: function(){
	
	},
	
	onResize: function(){
		wt = parseFloat( win.width() );
		ht = parseFloat( win.height() );
		resetDom();		
		menu.resize();	
	},
	
	onScroll: function(){
		wst = parseFloat( win.scrollTop() );
		sRatio = wst / ( doc.height() - ht );
	}
	
};

win.load( events.init );
win.resize( events.onResize ).resize();
win.scroll( events.onScroll ).scroll();	
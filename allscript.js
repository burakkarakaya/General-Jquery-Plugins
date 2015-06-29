/////////////////////////////////////////////////////////////////////////////////////////////////////// GLOBAL VARIABLE
var win = $( window ), doc = $( document ), bdy = $('body'), pages = { main: '.pageHome', list: '.pageList', detail: '.pageDetail', blog: '.pageBlog' }, wt,  ht, wst, sRatio = 0, rstDom = false;

/////////////////////////////////////////////////////////////////////////////////////////////////////// MAIN PAGE
function mainPage(){
	//noThing
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
		ID.minusScroller({ resize:true, navigation:true, snap: true, padding:0, divName: { wrapper: '#ajxUrunList > .prdListHolder', ul: '> ul', li: '> li' } });
		lazyControl( ID );
	}
}

function lazyControl( ID ){
	if( detectEl( ID ) ){
		if( $('img.lazyload', ID).length > 0 )
			$('img.lazyload', ID).unveil().trigger("unveil");
	}
}

function iStylers(){	
	if( detectEl( $("select, input:checkbox, input:radio") ) )
		$("select, input:checkbox, input:radio").iStyler({ wrapper:true });
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
	}else if( !$('.smartHeader').is(':visible') && rstDom ){
		// PC VER.
		rstDom = false;
		clearClass('pc');
		changeDivPosition('pc');
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
	},
	
	onScroll: function(){
		wst = parseFloat( win.scrollTop() );
		sRatio = wst / ( doc.height() - ht );
	}
	
};

win.load( events.init );
win.resize( events.onResize ).resize();
win.scroll( events.onScroll ).scroll();	

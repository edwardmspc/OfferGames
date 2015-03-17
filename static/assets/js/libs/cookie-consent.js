var consented=false;

$(document).ready(function(){

	$("#close-cookies-box").click( function(event) {
		doConsent("button");
		return false;
	});
	
	$("a").filter(':not(.cc-link)').click(implicitConsentHref);
	
	if (typeof referenceSiteCode != 'undefined'){
		$("a").filter(':not(.cc-link)').each(function () {
		    var href = $(this).attr('href');
		    if (href.indexOf("?")>0){
		    	$(this).attr('href', href + '&ref='+referenceSiteCode);
		    }else{
		    	$(this).attr('href', href + '?ref='+referenceSiteCode);
		    }
		});
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()>200){
			implicitConsent("scroll");
		}
	});
	
	$(window).bind("beforeunload", function() {
		 if (!consented){
			 ga('send', 'event', "unconsented", 'click', null, null);
		 }
	 });
		
	function implicitConsent(why){
		if (typeof disallowImplicitCookie != 'undefined'){
			if (!disallowImplicitCookie){
				doConsent(why);
			}
		}else{
			doConsent(why);
		}
		return true;
	};
	
	function doConsent(why){
		if (!consented){
			setcookie();
			hideBanner();
			saveReferenceSite();
			sendConsent(why);
			consented=true;
		}
	};
	
	function implicitConsentHref(){
		if (typeof disallowImplicitCookie != 'undefined'){
			if (!disallowImplicitCookie){
				doConsentHref("nav");
			}
		}else{
			doConsentHref("nav");
		}
	};

	function doConsentHref(why){
		if (!consented){
			setcookie();
			sendConsent(why);
			saveReferenceSite();
		}
	};
	
	function setcookie() {
		var name="CookieConsent";
		var value=true;
		var expirydays=365*2;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expirydays);
		document.cookie = name+'='+value+'; expires='+exdate.toUTCString()+'; path=/'
	};
	
	function saveReferenceSite(){
		if (typeof referenceSiteCode != 'undefined'){
			$.ajax({
				type	: "GET",
				async   : false,
				cache	: false,
				url		: "/ajax/ping?ref="+referenceSiteCode,
			});
		}
	};
	
	function hideBanner(){
		$("#cookies-box").slideUp('fast');
	};
	
	function sendConsent(why){
		ga('send', 'event', 'consent', why, null, null);
	}
	
});


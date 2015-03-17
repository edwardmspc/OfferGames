$(document).ready(function(){
	// FitVid
	$("body").fitVids();

	// Placeholder
	$('input, textarea').placeholder();

	$(".close-banner").click(function(e){
		e.preventDefault();
		$("#switchbanner").hide();
		$.cookie("hideSwitch", ""+true,{ expires: null , path: "/" });
	});
	
	$('#select--user').selectOrDie({
	    onChange: function() {
	    	var href=$(this).find("option:selected").data("href");
	    	if (href){
	    		document.location=href;
	    	}
	    }
	});

	var gamesSuggested = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  remote: '/ajax/titletypeahead.json?q=%QUERY'
		});
		 
	gamesSuggested.initialize();

	$('#select-game').typeahead({
		hint: true,
		highlight: true,
		minLength: 2
	}, {
	  name: 'otogami',
	  displayKey: 'value',
	  source: gamesSuggested.ttAdapter(),
	  templates: {
		    suggestion: render 
		  }
	});
	
	function render(data){
		return '<img src="'+data.img+'"/><div class="info"><p class="name">'+data.value+'</p></div>'
	}
	
	$('#select-game').bind('typeahead:selected', function(obj, datum, name) {     
		document.location=datum.url;
	});

	$('#select-game').focus(function() {
		$('.header__toggledcont').css('overflow', 'visible');
	});

	$('#select-game').blur(function() {
		$('.header__toggledcont').css('overflow', 'hidden');
	});


	sortTable('.offertable',"/ajax/gameoffers")
	sortTable('.consoletable',"/ajax/consoleoffers")
	
	function sortTable(tableName, endpoint){
		$(tableName).each(function(){
			var table=$(this);
			var idcontent=table.data("idcontent");
			$(this).find('.listjs__sort').click(function(){
				var $this=$(this);
				
				var sort=$this.data("sort")
				var prev=table.find(".sorted");
				var by=prev.data("by")
				prev.removeClass(by);
				prev.removeClass("sorted");
				var newBy='asc';
				//Is the same column 
				if (prev.data("sort")==sort){
					if (by=='asc'){
						newBy='desc';
					}else if (by=='desc'){
						newBy='asc';
					}else if (by == undefined){
						newBy='asc';
					}
				}
				$this.addClass("sorted");
				$this.addClass(newBy);
				$this.data("by",newBy);
				var endPoint=endpoint+"?id="+idcontent+"&sort="+sort+"&order="+newBy;
				$.ajax({
					type	: "GET",
					cache	: false,
					url		: endPoint,
					success: function(data) {
						table.find("tbody").html(data);
					}
				});	
			});	
		});
	}
	
	
	
	$( function() {
		tooltipze();
	});

	// Opción en barra de plataformas, imágenes y vídeos
	$('.gopt__title').click(function() {
		var currentClass = 'gopt--current';
		var $thisGopt = $(this).parent('.gopt');
		if ($thisGopt.attr('id')=='gopt--screens'){
			 $(".ggallery--screens img").each(function(){
				 var src=$(this).data("src");
				 if (src){
					 $(this).attr("src",src);
					 $(this).removeAttr("data-src");
				 }
			 });
		}
		$thisGopt.toggleClass(currentClass);
		$('.gopt').not($thisGopt).removeClass(currentClass);
	});



	// Crear togglers de head
	$('.header__logo').before('<span class="header__toggler"><span>menu</span></span>');
	$('.header__toggler').click(function(event) {
		$('#header').toggleClass('header--toggled');
		event.preventDefault();
	});

	var txt=$('.breadcrumbs__toggledcont').data('text');
	$('.breadcrumbs__toggledcont').before('<span class="breadcrumbs__toggler"><span>'+txt+'</span></span>');
	$('.breadcrumbs__toggler').click(function(event) {
		$('.breadcrumbs').toggleClass('breadcrumbs--toggled');
		event.preventDefault();
	});

	// Alternar con clic entre "me gusta" y "no me gusta"
	// y aumentar o reducir la cifra en consecuencia.
	// Y enviar a servidor via AJAX o como se desee.
	$('.heart__icon').click(function(){
		var $heartNumber = $(this).next('.heart__count').find('.heart__number');
		var heartCounter = $heartNumber.text();

		if( $(this).is('.icon-heart-empty') ) {
			//console.log("Switch on heart!");
			heartCounter++;
		} else {
			//console.log("Swith off heart!");
			heartCounter--;
		}
		//console.log("heartCounter: " + heartCounter);
		$heartNumber.text(heartCounter);
		$(this).toggleClass('icon-heart-empty icon-heart-full');
	});


	// Abrir gráfica de mejor precio
	$('.edition__bestprice').click(function(){
		$(this).next('#chart__container').toggle();
	});

	
	/* Edition TAB HASH Management */
	
	function callbackTab(currentTab, event){
		var src=$(currentTab.target).find("a").attr("href");
		var idxRow=src.lastIndexOf("-");
		if (idxRow>=0){
			src=src.substring(0,idxRow);
		}
		document.location.hash=src;
	}
	
	$('.resp-tab--horizontal').easyResponsiveTabs({
		type: 'default', // Types: default, vertical, accordion           
		width: 'auto', // auto or any width like 600px
		fit: true, // 100% fit in a container
		activate: callbackTab// Callback function if tab is switched       
	});
	
	//Tab change if hash selected
	var hash = location.hash;
    var editionId=getEditionId(hash,"_");
    if (editionId){
    	var link=$('#li-'+editionId+" > a");
        link.click();
    }
	
	function getEditionId(hash,char){
		var idxQuest=hash.lastIndexOf("?");
		if (idxQuest>0){
			hash=hash.substring(0,idxQuest);
		}
		var idx=hash.lastIndexOf(char);
		if (idx>=0){
			var idTab=hash.substring(idx+1,idx.length);
			if (endsWith(idTab,'-tab')){
				idTab=idTab.substring(0,idTab.length-4);
			}
			return idTab;
		}
		return 0;
	}	  
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	$('.modal--editioninfo-ajax').click(function(e){
		e.preventDefault();
		var editionId=$(this).data("edition");
		var endPoint='/ajax/editionInfo?editionId='+editionId;
		$.ajax({
			type	: "GET",
			cache	: true,
			url		: endPoint,
			success: function(data) {
				$("body").append(data);
				$("#modal--editioninfo-"+editionId).popup("show");
			}
		});	
	});
	
	
	$('.wishlist-button').click(function(e){
		e.preventDefault();
		var $button=$(this);
		var data=createCollectionData($button, 'wishlist');
		
		$.ajax({
			type	: "POST",
			cache	: false,
			url		: "/user/collection/ajax/add",
			data	: data,
			success: function(data) {
				if (data.result==="ERROR"){
					if (data.messages.length>0){
						alert(data.messages[0].text);
					}
				}else if (data.result==="NONE"){
					
				}else {
					$button.html($button.data("created"));
					$button.removeClass("icon-star-empty");
					$button.addClass("icon-star-full");
					$button.unbind("click");
					$button.attr("href",$button.data("wishlist"));
				}
			}
		});
		
	});
	
	$('.library-button').click(function(e){
		e.preventDefault();
		var $button=$(this);
		var data=createCollectionData($button, 'library');
		
		$.ajax({
			type	: "POST",
			cache	: false,
			url		: "/user/collection/ajax/add",
			data	: data,
			success: function(data) {
				if (data.result==="ERROR"){
					if (data.messages.length>0){
						alert(data.messages[0].text);
					}
				}else if (data.result==="NONE"){
					
				}else {
					$button.html($button.data("created"));
					$button.unbind("click");
					$button.attr("href",$button.data("library"));
				}
			}
		});
		
	});
	
	function createCollectionData($button, collectiontype){
		var type=$button.data("type");
		var id=$button.data("id");
		var subtype=$button.data("subtype");
		var subsubtype=$button.data("subsubtype");
		var data={
			collectiontype: collectiontype,
			type: type,
			id: id,
			subtype: subtype,
			subsubtype: subsubtype
		};
		return data;
	}
});

// Tooltip: http://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly
function tooltipze(){
	var targets = $( '[rel~=tooltip]' ),
	target  = false,
	tooltip = false,
	title   = false;

	targets.bind( 'mouseenter', function(){
		target  = $( this );
		tip     = target.attr( 'title' );
		tooltip = $( '<div id="tooltip"></div>' );

		if( !tip || tip === '' ){
			return false;
		}

		target.removeAttr('title');
		tooltip.css('opacity', 0)
			.html(tip)
			.appendTo('body');

		var init_tooltip = function() {
			if( $( window ).width() < tooltip.outerWidth() * 1.5 ){
				tooltip.css( 'max-width', $( window ).width() / 2 );
			}else{
				tooltip.css( 'max-width', 340 );
			}

			var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
			pos_top  = target.offset().top - tooltip.outerHeight() - 20;

			if( pos_left < 0 ){
				pos_left = target.offset().left + target.outerWidth() / 2 - 20;
				tooltip.addClass( 'left' );
			}else{
				tooltip.removeClass( 'left' );
			}
			if( pos_left + tooltip.outerWidth() > $( window ).width() ){
				pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
				tooltip.addClass( 'right' );
			}else{
				tooltip.removeClass( 'right' );
			}
				//había conflicto con pos_top, cambiado a posi_top
			if( posi_top < 0 ) {
				var posi_top  = target.offset().top + target.outerHeight();
				tooltip.addClass( 'top' );
			} else{
				tooltip.removeClass( 'top' );
			}
			tooltip.css( { left: pos_left, top: pos_top } )
				.animate( { top: '+=10', opacity: 1 }, 50 );
		};

		init_tooltip();
		$( window ).resize( init_tooltip );

		var remove_tooltip = function() {
			tooltip.animate( { top: '-=10', opacity: 0 }, 50, function(){
				$( this ).remove();
			});
			target.attr( 'title', tip );
		};

		target.bind( 'mouseleave', remove_tooltip );
		tooltip.bind( 'click', remove_tooltip );
	});
}


function registrationScreen(){

	var self=this;
	
	this.registrationForm=null;
	
	$(".modal--signup--button").click(function(e){
		e.preventDefault();
		self.show();
	});
	
	this.show=function(onclose){
		var popup=$("#modal--signup");
		if (popup.length==0){
			$.ajax({
				type	: "GET",
				cache	: true,
				url		: "/register-modal",
				success: function(data) {
					$("body").append(data);
					$("#modal--signup").popup({
						onclose: onclose,
						onopen: signupLoaded
					});
					$("#modal--signup").popup("show");
				}
			});
		}else{
			$("#modal--signup").popup("show");
		}
	}
	
	function signupLoaded(){
		self.registrationForm=$(".signup-form");
		
		self.registrationForm.submit(function (e){
			e.preventDefault();
			submitRegister();
			return false;
		});
	};
	
	function submitRegister(){
		var email=self.registrationForm.find(".register-email").val();
		post("/user/ajax/register",{email: email},self.registrationForm,function(){
			showRegisterOk(email);
		});
	}
	
	function showRegisterOk(email){
		$.ajax({
			type	: "POST",
			cache	: false,
			url		: "/user/ajax/registerOk",
			data	: {email: email},
			success: function(content) {
				$("body").append(content);
				$("#modal--signup").popup("hide");
				$("#modal--preregistration-ok").popup("show");
			}
		});
	};
}

var registrationBox=new registrationScreen();



/* User alerts with classes */

	function PriceAlert(alertElement){
		this.alertElement=alertElement;
		$(alertElement).find(".alert-form").each(function(){
			$(this).submit(function (e){
				e.preventDefault();
				return false;
			});
		});
		
		this.button=null;
		this.removeButton=null;
		var buttonElement=$(alertElement).find(".alert-button").first();

		this.button=new PriceAlertSaveButton(buttonElement,this);
		this.amount=new PriceAlertAmount($(alertElement).find(".price-alert-price").first());
		this.available=new PriceAlertAvailable($(alertElement).find(".avail-alert").first());
		var remove=$(alertElement).find(".remove-alert-button");
		if (remove.length>0){
			this.removeButton=new PriceAlertRemoveButton(remove.first(), this);
		}
	}
	
	PriceAlert.prototype.getAlertData=function(){
		var amount=this.amount.value();
		var avail=this.available.value();
		
		var data={amount:amount};
		if (avail!=null){
			data.availability=avail;
		}
		return data;
	}
	
	PriceAlert.prototype.getSaveEndpoint=function(){
		return null;
	}
	
	PriceAlert.prototype.save=function(){
		if (!this.amount.validate()){
			return;
		}
		var endPoint=this.getSaveEndpoint();
		if (endPoint==null){
			return;
		}
		var data=this.getAlertData();
		
		var _self=this;
		$.ajax({
			type	: "POST",
			cache	: false,
			url		: endPoint,
			data	: data,
			success: function(data) {
				if (data.result==="ERROR"){
					if (data.messages.length>0){
						_self.onErrorAlert(data.messages[0].text);
					}
				}else if (data.result==="NONE"){
					
				}else {
					var txt=_self.button.changeStatus(data.result);
					if (data.result==="DELETED"){
						_self.onRemovedAlert();
					}else{
						_self.onCreatedAlert(txt);
					}
				}
			}
		});
	}
	
	PriceAlert.prototype.onRemovedAlert=function(){
		var id=$(this.alertElement).attr("id");
		$("#"+id).popup("hide");
		lightMesssage("Alerta","Alerta eliminada con éxito",3000,null)
	}
	
	PriceAlert.prototype.onCreatedAlert=function(msg){
		var id=$(this.alertElement).attr("id");
		$("#"+id).popup("hide");
		lightMesssage("Alerta",msg,3000,null)
	}
	
	PriceAlert.prototype.onErrorAlert=function(msg){
		$(this.alertElement).find(".popup-message-error").html(msg);
	}
	
	function PriceAlertSaveButton(buttomElement,priceAlert){
		this.buttomElement=buttomElement;
		this.priceAlert=priceAlert;
		
		$(buttomElement).click(function(e){
			e.preventDefault();
			priceAlert.save();
		});
	}
	
	PriceAlertSaveButton.prototype.getData=function(field){
		return this.buttomElement.data(field);
	}

	PriceAlertSaveButton.prototype.changeStatus=function(result){
		var aliasClass=this.buttomElement.data("alias");
		if (result==="CREATED"){
			changeButton(this.buttomElement,"Modificar Alerta");
			changeButton($("."+aliasClass),"Modificar Alerta");
			return("Alerta creada con éxito");
		}else if (result==="UPDATED"){
			changeButton(this.buttomElement,"Modificar Alerta");
			changeButton($("."+aliasClass),"Modificar Alerta");
			return("Alerta modificada con éxito");
		}else if (result==="DELETED"){
			changeButton(this.buttomElement,"Crear Alerta");
			changeButton($("."+aliasClass),"Crear Alerta");
			return("Alerta eliminada con éxito");
		}
	}
	
	function changeButton(button,txt){
		if (button){
			button.html(txt);
			button.attr("title",txt);
		}
	}
	
	function PriceAlertRemoveButton(buttomElement,priceAlert){
		this.buttomElement=buttomElement;
		this.priceAlert=priceAlert;
		
		$(buttomElement).click(function(e){
			e.preventDefault();
			priceAlert.remove();
		});
	}
	
	
	function PriceAlertAmount(inputElement){
		this.inputElement=inputElement;
	}
	
	PriceAlertAmount.prototype.value=function(){
		var value=this.inputElement.val();
		value=$.trim(value)
		value=value.replace(",",".");
		return value;
	}
	
	PriceAlertAmount.prototype.validate=function(){
		var value=this.value();
		//TODO: Hacer que si es vacío quitar la alerta?
		if (value.length==0){
//			showError("Por favor introduce el importe de la alerta");
//			return false;
		}
		if (value.length>0 && !isDecimal(value)){
			msgError("Por favor introduce un nº válido");
			return false;
		}
		return true;
	};
	
	function PriceAlertAvailable(inputElement){
		this.inputElement=inputElement;
	}
	
	PriceAlertAvailable.prototype.value=function(){
		if (this.inputElement.length==0){
			return null;
		}
		var check=this.inputElement.is(":checked");
		return check;
	}
	
	function VideogamePriceAlert(alertElement){
		PriceAlert.call(this,alertElement);
		this.editionType=$(alertElement).find(".edition-alert").first();
	}
	
	VideogamePriceAlert.prototype = Object.create(PriceAlert.prototype);
	
	VideogamePriceAlert.prototype.getSaveEndpoint=function(){
		return "/user/alert/ajax/create";
	}
	
	VideogamePriceAlert.prototype.getAlertData=function(){
		var data=PriceAlert.prototype.getAlertData.call(this);
		data.id=this.button.getData("gameId");
		data.platform=this.button.getData("platform");
		data.edition=this.button.getData("edition");
		data.editionType=this.editionType.val();
		return data;
	}
		
	function ConsolePriceAlert(alertElement){
		PriceAlert.call(this,alertElement);
	}
	
	ConsolePriceAlert.prototype = Object.create(PriceAlert.prototype);
	
	ConsolePriceAlert.prototype.getSaveEndpoint=function(){
		return "/user/alert/ajax/console/create";
	}
	
	ConsolePriceAlert.prototype.getAlertData=function(){
		var data=PriceAlert.prototype.getAlertData.call(this);
		data.id=this.button.getData("consoleId");
		return data;
	}
	
	function msgError(msg,time){
		time= time || 3000;
		lightMesssage("",msg,time);
	}
	
	function msgInform(msg,time){
		time= time || 2000;
		lightMesssage("",msg,time);
	}
	
	function isDecimal(value){
		var decimal=/^[-+]?[0-9]+\.[0-9]*$/; 
		if(value.match(decimal)){
			return true;
		}else{
			var integer=/^[-+]?[0-9]+$/;
			if (value.match(integer)){
				return true;
			}else{
				return false;
			}
		}
	};
	
	
function post(url, data, form, afterExecute){
	$.ajax({
		type	: "POST",
		cache	: false,
		url		: url,
		data	: data,
		success: function(data) {
			if (data.result==="ERROR"){
				var msg="";
				for (i=0;i<data.messages.length;i++){
					msg=msg+"<p>"+data.messages[i].text+"</p>";
				}
				form.find(".message").html(msg);
			}else{
				form.find(".message").html("");
				if (afterExecute){
					afterExecute();
				}
			}
		}
	});
};

function lightMesssage(title,msg,time,callback){
	var id="light-box"+new Date().getTime();
	var div='<div class="modal" id="'+id+'"><div class="modal__header"><h2 class="modal__title">'+title+'</h2></div><div class="modal__content">'+msg+'</div></div>'
	$("body").append(div);
	
    $("#"+id).popup("show");
    setTimeout(function() {
    	$("#"+id).popup("hide");
    	$("#"+id).remove();
        if (callback){
        	callback();
        }
    },time);
};


function popupMesssage(title,msg,callback){
	var id="light-box"+new Date().getTime();
	var div='<div class="modal" id="'+id+'">';
		  div+='<div class="modal__header"><h2 class="modal__title">'+title+'</h2><a class="modal__close '+id+'_close" href="#'+id+'"><span>Cerrar ventana modal</span></a></div>';
		  div+='<div class="modal__content">'+msg+'</div>';
		  div+='<div class="modal__footer"><ul class="button-list"><li><a href="#" class="button button-primary button-pill button-3d '+id+'_close" role="button">Aceptar</a></li></ul></div>';
      div+='</div>';
	$("body").append(div);
	$("#"+id).popup({
		onclose: function() {
			$("#"+id).remove();
	        if (callback){
	        	callback();
	        }
		}
	});	
    $("#"+id).popup("show");
};


/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);
$(document).ready(function(){

	// Swipebox
	$('.swipebox, .swipebox-video').swipebox({
		hideBarsOnMobile : false
	});
	
	// Slider de pantallas
	$('.ggallery--screens').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: true,
		responsive: [
			{
				breakpoint: 2560,
				settings: {
					infinite: false,
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: true
				}
			},
			{
				breakpoint: 1200,
				settings: {
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 900,
				settings: {
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			}
		]
	});



	// Slider de videos
	$('.ggallery--videos').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 2560,
				settings: {
					infinite: false,
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: true
				}
			},{
				breakpoint: 1400,
				settings: {
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},{
				breakpoint: 1050,
				settings: {
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},{
				breakpoint: 900,
				settings: {
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					infinite: true,
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			}
		]
	});
	
	
	
	// Slider de Plataforma
	if (platformsSize>1){
		var resp=[6,5,4,3,2,2,1];
		if (platformsSize==2){
			resp=[2,2,2,2,2,2,1];
		}else if (platformsSize==3){
			resp=[3,3,3,3,2,2,1];
		}else if (platformsSize==4){
			resp=[4,4,4,3,2,2,1];		
		}else if (platformsSize==5){
			resp=[5,5,4,3,2,2,1];			
		}
		$('.platforms--game').slick({
			responsive: [
				{
					breakpoint: 2800,
					settings: {
						infinite: false,
						slidesToShow: resp[0],
						slidesToScroll: 1,
						dots: true
					}
				},
				{
					breakpoint: 1180,
					settings: {
						infinite: false,
						slidesToShow: resp[1],
						slidesToScroll: 1,
						dots: true
					}
				},
				{
					breakpoint: 1100,
					settings: {
						infinite: false,
						slidesToShow: resp[2],
						slidesToScroll: 1,
						dots: true
					}			
				},
				{
					breakpoint: 800,
					settings: {
						infinite: false,
						slidesToShow: resp[3],
						slidesToScroll: 1,
						dots: true
					}			
				},			
				{
					breakpoint: 610,
					settings: {
						arrows: false,
						infinite: false,
						slidesToShow: resp[4],
						slidesToScroll: 3,
						dots: true
					}
				},
				{
					breakpoint: 420,
					settings: {
						arrows: false,
						infinite: false,
						slidesToShow: resp[5],
						slidesToScroll: 1,
						dots: true
					}
				},
				{
					breakpoint: 360,
					settings: {
						arrows: false,
						infinite: false,
						slidesToShow: resp[6],
						slidesToScroll: 1,
						dots: true
					}			
				}
			]
		});	
	}
	
	//Gaujes de scores
	function createGauger(colorStart){
		return {
			lines: 12, // The number of lines to draw
			angle: 0.35, // The length of each line
			lineWidth: 0.1, // The line thickness
			pointer: {
				length: 0.9, // The radius of the inner circle
				strokeWidth: 0.035, // The rotation offset
				color: '#000000' // Fill color
			},
			limitMax: 'false', // If true, the pointer will not go past the end of the gauge
			colorStart: colorStart, // Colors
			colorStop: '#222', // just experiment with them
			strokeColor: '#fff', // to see which ones work best for you
			generateGradient: true,
		};
	}
	
	gauge('score--metacritic',createGauger('#FBC932'));
	gauge('score--otoscore',  createGauger('#ff035a'));
	gauge('score--otogamer',  createGauger('#3cb392'));
	
	function gauge(element, options){
		var score = document.getElementById(element);
		var gauge = new Donut(score).setOptions(options);
		gauge.maxValue = 100;
		gauge.animationSpeed = 32;
		gauge.set($("#"+element).data("value"));
	}
	
	// Slider de DLCs
	$('.dlcs__list').slick({
		responsive: [
			{
				breakpoint: 321,
				settings: {
					infinite: false,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 2560,
				settings: {
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});
	
	// Slider de Opiniones
	$('.opninion__slick').slick({
		responsive: [
			{
				breakpoint: 321,
				settings: {
					infinite: false,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 2560,
				settings: {
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});
	
	// Rating
	$('.rating__label').on({
		mouseover: function(){
			if (!$('.rating-value').length) {
				$('.rating').after('<span class="rating-value"></span>');
			}
			$('.rating-value').html($(this).attr('title'));
		},
		mouseout: function(){
			$('.rating-value').empty();
		},
		click: function(){
			$('.rating-value').html($(this).attr('title'));
			$('.rating__label').unbind('mouseover mouseout');
		}
	});
	
	
	
	$('.sendUserReview').click(function(event){
		event.preventDefault();
		var form=$("#sendUserReview");
		
		var reviewGameId = form.find("#reviewGameId").val();
		var reviewTitle = form.find("#reviewTitle").val();
		var reviewText = form.find("#reviewText").val();
		var reviewRate = form.find('input[name="reviewRate"]:checked').val();
		
		if (reviewRate=="" || reviewRate==undefined){
			popupMesssage("Review de juego","<b style='color:red;'>¿Qué puntuación le das al juego?</b>");
			return;
		}
		if (reviewTitle==""){
			popupMesssage("Review de juego","<b style='color:red;'>¿Cómo quieres titular tu review?</b>",function(){
				$("#reviewTitle").focus();
			});
			return;
		}
		if (reviewText==""){
			popupMesssage("Review de juego","<b style='color:red;'>Pero cuéntanos qué te pareció el juego!</b>",function(){
				$("#reviewText").focus();
			});
			return;
		}
		
		var formInfo={
			gameId: reviewGameId,
			title: reviewTitle,
			text: reviewText,
			rate: reviewRate
		};
		
		post("/user/ajax/saveReview",formInfo,form, function(){
			$("#modal--review-ok").popup({
				onclose: function() {
					location.reload(true);
				}
			});
			$("#modal--review-ok").popup("show");
		});
		
	});    
	
	
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
});



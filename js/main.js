
var fsScreenW = window.innerWidth;
var fsScreenH = window.innerHeight;

var introTimer = 5000,
	introDelay;

var fsStarDelay,
	fsByHover = false,
	fsStarTimer = 2500;
	
var fsSwiper, fsSlider, fsExTraSlider;
var fsByClick = false;
var fsExTraShow = false;

$.fn.rand = function(arg) {
	if ($.isArray(arg)) {
		return arg[$.rand(arg.length)];
	} else if (typeof arg == "number") {
		return Math.floor(Math.random() * arg);
	} else {
		return 4;  // chosen by fair dice roll
	}
};
	

var fs_starArr = [1,2,3,4,5,6,7,8];
var fs_temp_starArr = fs_starArr.slice();
var fsPopDelay;

var isFacebookApp = function() {
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}


function positionTV() {
	var arrTV = [1,2,3,4,5,6];
	var fsItemTV = arrTV[Math.floor(Math.random() * arrTV.length)];
	
	var olfFirst = $('.fs_lev_3 li:nth-child(1)').clone(true)[0];
	var newFirst = $('.fs_lev_3 li:nth-child('+ fsItemTV +')').clone(true)[0];
		
	$('.fs_lev_3 li:nth-child(1)').replaceWith(newFirst);
	$('.fs_lev_3 li:nth-child('+ fsItemTV +')').replaceWith(olfFirst);
	
}


//Lazayload images
function ImgLazyLoad(objects){
	
	$(objects).each(function(index,obj){
		
		if($(window).width() > 1100) {
			$(obj).find('.cmPic.lazy, .pcPic.lazy').each(function(i,lazyImage){
				$(lazyImage).attr('src', $(this).data("original"));
				$(lazyImage).removeClass('lazy');
			});
			$(obj).find('.cmBg.lazy, .pcBg.lazy').each(function(i,lazyBg){
				$(lazyBg).css({'background-image': 'url('+ $(this).data("original") +')'});
				$(lazyBg).removeClass('lazy');
			});
		}else {
			$(obj).find('.cmPic.lazy, .spPic.lazy').each(function(i,lazyImage){
				$(lazyImage).attr('src', $(this).data("original"));
				$(lazyImage).removeClass('lazy');
			});
			$(obj).find('.cmBg.lazy, .spBg.lazy').each(function(i,lazyBg){
				$(lazyBg).css({'background-image': 'url('+ $(this).data("original") +')'});
				$(lazyBg).removeClass('lazy');
			});
		}
		
	});
	
}


function fsStopVideo() {
	if(fs_video_hd_8k_thumb) {
		fs_video_hd_8k_thumb.pause();
		fs_video_hd_8k.pause();
		fs_video_4k_8k_thumb.pause();
		fs_video_4k_8k.pause();
	}
	
}

function introLoop() {

	introDelay = setTimeout(function(){
		
		var nextBg = $('.fs_intro_bg.show').next();
		var nextItem = $('.fs_8k_box_item.show').next();
		
		if(nextBg.length == 0) {
			nextBg = $('.fs_intro_bg').first();
			nextItem = $('.fs_8k_box_item').first();
		}
		
		$('.fs_intro_bg, .fs_8k_box_item').removeClass('show');
		
		nextBg.addClass('show');
		nextItem.addClass('show');
		
		introLoop();
		
	},introTimer);
	
}

function fsaniStar() {
	
	if(fsByHover) {
		fsStarTimer = 1000;
	}
	
	if(fs_temp_starArr.length == 0) {
		fs_temp_starArr = fs_starArr.slice();
	}
	
	$('.fs_features li, .fs_features_title_spv li').removeClass('fs_play');
	var index = fs_temp_starArr[Math.floor(Math.random() * fs_temp_starArr.length)];
	var num = fs_temp_starArr.indexOf(index);
	fs_temp_starArr.splice(num, 1); 
	
	$('.fs_features li[data-ani='+ index +'], .fs_features_title_spv li[data-ani='+ index +']').addClass('fs_play');
	
	fsStarTimer = 2500;
	fsByHover = false;
	
	fsStarDelay = setTimeout(function(){
		fsaniStar();
	}, fsStarTimer);

}


var fsVisitInfo = {
	isVisited: false,
	isForm: false,
	step: 'none',
	stepStatus:0
}


var fsVisited = '0',
	fsFormOpened = '0',
	fsStepPage = '0',
	stepStatus = '0',
	fsFirstTime = true;

var fsNextBut = $('.fs_intro .fs_but a:nth-child(1)');
var fsLogBut = $('.fs_intro .fs_but a:nth-child(2)');

function fsProgress() {
	
	if(fsStepPage == '0') {
		//Luu step
		localStorage.setItem('fs_step', '1');
		
	} else {
		if(fsStepPage == '1') { //intro
			//Logo click [reset button ]
			fsNextBut.css({'display': 'inline-block'});
			fsNextBut.text(fsNextBut.attr('data-default'));
			fsLogBut.addClass('fs_hide_but');
			
		}else {
			
			// Tiep tuc trai nghiem
			fsNextBut.text(fsNextBut.attr('data-text'));
			
			if(fsStepPage == '2') { //star
			
			}else if(fsStepPage == '3') { //compare
				
			}else if(fsStepPage == '4') { //upscaling
				$('.fs_compare').addClass('fs_go');
				
			}else if(fsStepPage == '5' || fsStepPage == '6') { //quantum || extra
				$('.fs_compare, .fs_upscaling').addClass('fs_go');
				
				// Yeu cau login
				fsNextBut.css({'display': 'none'});
				fsLogBut.removeClass('fs_hide_but');
				
				// Bat indicator item
				if(fsStepPage == '5') {
					// Trang chu
					$('.fs_indicator li:nth-child(1)').addClass('fs_indicator_active');
					
					if(fsFormOpened == '1') {
						// Dang ky
						$('.fs_indicator li:nth-child(2)').addClass('fs_indicator_active');	
					}
					
				}else {
					// Mo het
					$('.fs_indicator li').addClass('fs_indicator_active');
				}

			}
			
		}
		
	}
	
	if(fsVisited == '1') {
		// Bat indicator
		$('.fs_indicator').addClass('fs_show_indicator');
	}else {
		// La moi thi luu
		localStorage.setItem('fs_visitor', '1');
	}
	

}


function fsFullPage() {
	
	fsSwiper = new Swiper ('.fs_fullpage', {
			speed:500,
			effect:'fade',
			simulateTouch:false,
			allowTouchMove:false,
			on: {
				init: function() {
					fsCompare();
					fsParallax.init();
					introLoop();
					ImgLazyLoad($('.fs_section.fs_swiper-slide-active, .fs_section.fs_swiper-slide-next'));
				},
				transitionStart: function() {
					
					ImgLazyLoad($('.fs_section.fs_swiper-slide-active, .fs_section.fs_swiper-slide-next'));
					
					if(fsByClick) {
						
						if($('.fs_section.fs_swiper-slide-active').hasClass('fs_intro')) {
							introLoop();
							$('.fs_main_logo, .fs_nav_indi').removeClass('show');
						}else {
							clearTimeout(introDelay);
							$('.fs_main_logo, .fs_nav_indi').addClass('show');
						}
						
						if($('.fs_section.fs_section.fs_swiper-slide-active').hasClass('fs_quantum')) {
							$('.fs_indicator li:nth-child(2)').addClass('fs_indicator_active');
							setTimeout(fsAniQuanTum,1000);
						}else {
							clearTimeout(fsQuanTimer);
						}
						
						if($('.fs_section.fs_swiper-slide-active').hasClass('fs_star')) {
							
							setTimeout(function(){
								fsaniStar();
							},500);
							
						}else {
							clearTimeout(fsStarDelay);
						}
						
						if(!$('.fs_section.fs_swiper-slide-active').hasClass('fs_upscaling')) {
							fsStopVideo();
						}
						
						if($('.fs_section.fs_swiper-slide-active').hasClass('fs_extra')) {
							$('.fs_indicator li:nth-child(3)').addClass('fs_indicator_active');
							$('.fs_share_sp').addClass('show');
							$('.fs_step_star li:nth-child(1), .fs_step_star li:nth-child(2), .fs_step_star li:nth-child(3)').addClass('active');
							fsExTraShow = true;
							fsExTraSlider.slideTo(1, 50, null);
						}else {
							fsExTraShow = false;
							$('.fs_share_sp').removeClass('show');
						}
						
						if(!$('.fs_section.fs_swiper-slide-active').hasClass('fs_intro') && !$('.fs_section.fs_swiper-slide-active').hasClass('fs_star')) {
							$('.fs_step_star').addClass('show');
						}else {
							$('.fs_step_star').removeClass('show');
						}
						
						//Star show
						if($('.fs_section.fs_swiper-slide-active').hasClass('fs_compare')) {
							$('.fs_step_star li:nth-child(1)').addClass('active');
						}else if($('.fs_section.fs_swiper-slide-active').hasClass('fs_upscaling')) {
							$('.fs_step_star li:nth-child(1), .fs_step_star li:nth-child(2)').addClass('active');
						}else if($('.fs_section.fs_swiper-slide-active').hasClass('fs_quantum')) {
							$('.fs_step_star li:nth-child(1), .fs_step_star li:nth-child(2), .fs_step_star li:nth-child(3)').addClass('active');
							
						}
						
					}
					
					fsByClick = false;

				},
				transitionEnd: function() {
					
				}
			}
	});
	
	fsSlider = new Swiper ('.fs_quantum_slider', {
			loop:true,
			speed:800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			navigation: {
			  nextEl: '.fs_quantum_next',
			  prevEl: '.fs_quantum_prev',
			},
			on: {
				init: function() {
					
				},
				transitionStart: function() {
				},
				transitionEnd: function() {
					
				}
			}
	});
	
	fsExTraSlider = new Swiper ('.fs_extra_slider', {
			loop:true,
			speed:800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			navigation: {
			  nextEl: '.fs_extra_next',
			  prevEl: '.fs_extra_prev',
			},
			on: {
				init: function() {
					
				},
				transitionStart: function() {
					
					if(fsExTraShow) {
						var target = $('.fs_extra_slider .fs_swiper-slide.fs_swiper-slide-active').attr('data-target');
						$('.fs_step_star li[data-step='+ target +']').addClass('active');
					}
					
				},
				transitionEnd: function() {
					
				}
			}
	});
	
	
	
	// Get info
	fsVisited = localStorage.getItem('fs_visitor');
	fsFormOpened = localStorage.getItem('fs_activeform');
	fsStepPage = localStorage.getItem('fs_step') || '0';
	
	fsProgress();
	
	ImgLazyLoad($('.fs_section'));
	
}

var fsMouse =  false;
//Parallax
var fsParallax = {
    animationFrameHandler: null,
    background: $(".fs_bg"),
    pageWidth : $(window).width(),
    pageHeight : $(window).height(),
    midpoint: { x: window.innerWidth/2, y: window.innerHeight/2  },
    limit: { x: 20,  y: 20 ,
        device:{
            x:20,
            y:20
        }
    },    
    target: { x: 0, y:  0 },
    curPos: { x: 0, y:  0 },
	mouse: {x:0, y:0 },
    isMobile: false,
    easing: 0.03,

    init: function() {
        
        this.isMobile = navigator.userAgent.match(/(iPad|iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini)/g) ? true : false;
		
        var self = this;
        
        if(this.isMobile && window.DeviceOrientationEvent) {        
            
            window.addEventListener('deviceorientation', function(eventData){self.deviceMove(eventData)}, false);        
            this.limit.x = this.limit.device.x;
            this.limit.y = this.limit.device.y;
			
        }else{
            $(document).on('mousemove', $.proxy(this.mouseMove,this));                
        }
		
        this.sizePage();    
        this.render();        
        $(window).resize($.proxy(this.sizePage, this));
    },
   
    sizePage: function () {
		$('.fs_bg').css({'width': (100 +  this.limit.x) +'%'});
		$('.fs_bg').css({'height': (100 +  this.limit.y) +'%'});
		$('.fs_bg').css({'left':  -this.limit.x/2 +'%'});
		$('.fs_bg').css({'top':  -this.limit.y/2 +'%'});
    },
    mouseMove: function (e) {
        
		this.mouse.x = e.pageX;
		this.mouse.y = e.pageY;
		
        this.target.x = -(e.pageX - this.midpoint.x) / this.limit.x;
        this.target.y = -(e.pageY - this.midpoint.y) / this.limit.y;
		
		fsMouse = true;
    },
	
    deviceMove: function (a) {
		
		this.target.x = a.beta;
        this.target.y = a.gamma;
		
		this.mouse.x = this.target.x;
		this.mouse.y = this.target.y;
		

    },

    update:function(){
        this.curPos.x += (this.target.x - this.curPos.x) * this.easing;
        this.curPos.y += (this.target.y - this.curPos.y) * this.easing;
		this.draw();
    },
    draw: function(){
		
		if(this.isMobile) {
				
			TweenLite.set($('.fs_section.fs_swiper-slide-active .fs_bg'), {
				x:this.curPos.x/4,
				y:this.curPos.y/4,                                    
			});
			
		}else {
			
			TweenLite.set($('.fs_section.fs_swiper-slide-active .fs_bg'), {
				x:this.curPos.x,
				y:this.curPos.y,                                    
			});

			/*var delX = this.mouse.x / $('.fs_section.fs_swiper-slide-active .fs_wrapper').width(),
				delY = this.mouse.y / $('.fs_section.fs_swiper-slide-active .fs_wrapper').height();
				if(fsMouse) {
					rotateX = -15 + 30 * delX;
					rotateY =  15 - 30 * delY;
				}else {
					rotateX = 0;
					rotateY = 0;
				}
				
			TweenLite.to($('.fs_section.fs_swiper-slide-active .fs_wrapper'), 1, {
				rotationX: rotateY,
				rotationY: rotateX,
				rotationZ: 0,
				transformPerspective: 1200,
				ease: Quad.easeOut
			});*/
			
		}
		

    },

    render: function(){
        
        var self = this;
        this.update();        
        this.animationFrameHandler = window.requestAnimationFrame(function () {
            self.render();
        });
		
    },
   
    shutdown : function () {
        window.cancelAnimationFrame(this.animationFrameHandler); 
    }
        
};

// Comparisions
function fsCompare() {
	var x, i, is4k = false, is8k = false;
	
	x = document.getElementsByClassName("fs_is_overlay");
	
	for (i = 0; i < x.length; i++) {
		fsCreateCompare(x[i]);
	}
	
	function fsCreateCompare(img) {
		var fs_slider, img, clicked = 0, w, h, fs_next_slider, fs_prev_slider;
		w = img.offsetWidth;
		
		fs_slider = document.querySelector(".fs_compare_slider");
		fs_next_slider = document.querySelector(".fs_slider_next");
		fs_prev_slider = document.querySelector(".fs_slider_prev");
		
		img.style.width = "50%";
		
		fs_slider.style.left = "50%";
		
		fs_next_slider.onclick = function() {
			fs_slider.classList.add('fs_hide_bg');
			fs_slider.style.left = "100%";
			img.style.width = "100%";
			is4k = true;
			$('.fs_slider_nav').addClass('fs_brief_right');
			fsCheck();
		};
		
		fs_prev_slider.onclick = function() {
			fs_slider.classList.add('fs_hide_bg');
			fs_slider.style.left = "0%";
			img.style.width = "0%";
			is8k = true;
			fsCheck();
		};
		
		function fsCheck() {
			if(is4k && is8k) {
				$('.fs_compare').addClass('fs_go');
			}
		}
		
	}
  
}

var fsQuanTimer = null;
var fsStep = 1;
var fsT = $('.fsT');
var fsA = $('.fsA');
var fsD = $('.fsD');

var fsMove1 = 'z-index:1;-webkit-transform:translateX(-135%) scale(0.8);transform:translateX(-135%) scale(0.8);';
var fsMove2 = 'z-index:2;-webkit-transform:translateX(-50%) scale(1);transform:translateX(-50%) scale(1);';
var fsMove3 = 'z-index:1;-webkit-transform:translateX(35%) scale(0.8);transform:translateX(35%) scale(0.8);';


	
fsD.attr('style', fsMove3);
fsT.addClass('fs_highlight').attr('style', fsMove2);
fsA.attr('style', fsMove1);

function fsAniQuanTum() {
		
		if(fsStep > 3) {
			fsStep = 0;
		}
		
		if(fsStep == 0) {
			fsD.removeClass('fs_highlight').attr('style', fsMove3);
			fsT.addClass('fs_highlight').attr('style', fsMove2);
			fsA.removeClass('fs_highlight').attr('style', fsMove1);
		}
		else if(fsStep == 1) {//A T D
			fsA.addClass('fs_highlight').attr('style', fsMove2);
			fsT.removeClass('fs_highlight').attr('style', fsMove3);
			fsD.removeClass('fs_highlight').attr('style', fsMove1);
			
		}else if(fsStep == 2) {//A D T
			fsT.removeClass('fs_highlight').attr('style', fsMove1);
			fsD.addClass('fs_highlight').attr('style', fsMove2);
			fsA.removeClass('fs_highlight').attr('style', fsMove3);
			
		}
		
		fsStep++;
		
		fsQuanTimer = setTimeout(function(){
			fsAniQuanTum();
		},3000);
		
}


function fseVents() {
	
	$('.fs_next').click(function(e){
		e.preventDefault();
		fsByClick = true;
		
		if($(this).hasClass('fs_request_login')) {
			
			// Mo form
			localStorage.setItem('fs_activeform','1');
			localStorage.setItem('fs_step', '6');
			$('.fs_form_popup').addClass('active');
			$('.fs_main_logo').addClass('show');
			$('.fs_indicator li').addClass('fs_indicator_active');
			
			fsPopDelay = setTimeout(function(){
				$('.fs_form_popup').removeClass('active');
				var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
				fsSwiper.slideTo(index, 500, null);
			},5000);
			
			
		}else if ($(this).hasClass('fs_go_5star')) {
			var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
			localStorage.setItem('fs_step', '6');
			fsSwiper.slideTo(index, 500, null);
			$('.fs_indicator li').addClass('fs_indicator_active');
			
		} else {
			 
			 var curStep = parseInt(fsStepPage);
			
			 if(fsFirstTime && curStep > 1) {
					 
					 var index = $('.fs_section.fs_swiper-slide[data-step='+ fsStepPage +']').index();
					 fsSwiper.slideTo(index, 500, null);
					 fsFirstTime = false;
				 
			 }else {
				
					var nextStep = parseInt($('.fs_section.fs_swiper-slide.fs_swiper-slide-active').next().attr('data-step'));
					
					if(nextStep > curStep) {
						localStorage.setItem('fs_step', nextStep.toString());

						if(fsVisited == '1') {
							fsStepPage = nextStep.toString();
						}
					}
					
					if(nextStep == 5) { // quantum
						
						// Trang chu
						$('.fs_indicator li:nth-child(1)').addClass('fs_indicator_active');
						
						if(fsFormOpened == '1') {
							// Dang ky
							$('.fs_indicator li:nth-child(2)').addClass('fs_indicator_active');	
						}
					
					}else if(nextStep == 6) {
						// Mo het
						$('.fs_indicator li').addClass('fs_indicator_active');
					}
					 
					fsSwiper.slideNext();
					 
			 }
		}
		
	});
	
	$('.fs_prev').click(function(e) {
		e.preventDefault();
		fsByClick = true;
		fsFirstTime = false;
		fsSwiper.slidePrev();
		
	});
	
	$('.fs_next_pop').click(function(e){
		e.preventDefault();
		$('.fs_form_popup').addClass('show_thanks');
		$('.fs_box_formInfo').fadeOut(100, function(){
			$('.fs_form_thanks').fadeIn(300);
		});
	});
	
	$('.fs_next_thanks').click(function(e){
		e.preventDefault();
		fsByClick = true;
		
		// Gui thong tin va den trang trai nghiem them
		localStorage.setItem('fs_step', '6');
		var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
		
		// Mo tat ca indicator
		$('.fs_indicator li').addClass('fs_indicator_active');
		fsSwiper.slideTo(index, 500, null);
				
		setTimeout(function(){
			$('.fs_form_popup').removeClass('active');
			$('.fs_nav_indi').removeClass('fs_open_indicator');
			$('.fs_form_popup').removeClass('show_thanks');
			$('.fs_form_thanks').css({'display': 'none'});
			$('.fs_box_formInfo').css({'display': 'block'});
		},150);
		
	});
	
	$('.fs_main_logo a').click(function(e) {
		e.preventDefault();
		fsByClick = true;
		
		clearTimeout(fsPopDelay);
		
		var href = window.location.href;
		
		if(href.indexOf('#register') >= 0) {
			href = href.replace("#register", "");
			window.location = href;
			
		}else {
			fsSwiper.slideTo(0, 500, null);
			
			fsFirstTime = false;
			
			fsNextBut.css({'display':'inline-block'});
			fsNextBut.text(fsNextBut.attr('data-default'));
			fsLogBut.addClass('fs_hide_but');
			
			setTimeout(function(){
				$('.fs_form_popup').removeClass('active');
				$('.fs_nav_indi').removeClass('fs_open_indicator');
				if($('.fs_section.fs_swiper-slide.fs_swiper-slide-active').hasClass('fs_intro')) {
					$('.fs_main_logo').removeClass('show');
				}
				
			},150);
		}
		
	});
	
	$('.fs_indicator li').click(function(e){
		e.preventDefault();
		fsByClick = true;
		fsFirstTime = false;
		$('.fs_indicator, .fs_nav_indi').removeClass('fs_open_indicator');
		
		if($(this).hasClass('fs_indicator_active')) {
			var target = $(this).attr('data-go');
			
			if(target == 'fs_intro') {
				
				clearTimeout(fsPopDelay);
				
				fsSwiper.slideTo(0, 500, null);
				
				fsNextBut.css({'display':'inline-block'});
				fsNextBut.text(fsNextBut.attr('data-default'));
				fsLogBut.addClass('fs_hide_but');
				
				if($('.fs_form_popup.active').length) {
					setTimeout(function(){
						$('.fs_form_popup').removeClass('active');
						$('.fs_main_logo').removeClass('show');
						$('.fs_nav_indi').removeClass('fs_open_indicator');
					},150);
				}
				
			}else if(target == 'fs_register') {
				
				if(!$('.fs_form_popup').hasClass('active')) {
					$('.fs_main_logo').addClass('show');
					$('.fs_form_popup').addClass('active');
					$('.fs_indicator li').addClass('fs_indicator_active');
					
					fsPopDelay = setTimeout(function(){
						$('.fs_form_popup').removeClass('active');
						localStorage.setItem('fs_step', '6');
						var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
						fsSwiper.slideTo(index, 500, null);
						
					},5000);
					
				}
				
			}else if(target == 'fs_extra') {
				
				clearTimeout(fsPopDelay);
				
				localStorage.setItem('fs_step', '6');
				fsStepPage = '6';
				
				var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
				
				fsSwiper.slideTo(index, 500, null);
				
				if($('.fs_form_popup.active').length) {
					setTimeout(function(){
						$('.fs_form_popup').removeClass('active');
						$('.fs_nav_indi').removeClass('fs_open_indicator');
					},150);
				}
				
			}
		}
		
	});
	
	
	$('.fs_upscaling_item').click(function() {
		
		var dataVid = $(this).attr('data-video');
		$(".fs_upscaling_video").addClass('fs_hide_video');
		$(".fs_upscaling_video[data-target= '"+ dataVid +"']").removeClass('fs_hide_video');
		$('.fs_upscaling_note').addClass('fs_show_note');
		
		
		if(dataVid == 'fs_video_4k_8k') {
			fs_video_4k_8k_thumb.play();
			fs_video_4k_8k.play();
			
			fs_video_hd_8k_thumb.pause();
			fs_video_hd_8k.pause();
			
		}else {
			fs_video_hd_8k_thumb.play();
			fs_video_hd_8k.play();
			
			fs_video_4k_8k_thumb.pause();
			fs_video_4k_8k.pause();
		}
		
			
		$(this).addClass('fs_hide_brief_nav');
		$(this).addClass('fs_video_checked');
		$('.fs_upscaling').addClass('fs_is_playing');
		
		//Change hint
		$('.fs_upscaling_item.fs_hide_brief_nav').each(function(i,elm) {
			
			if(!$(elm).hasClass('fs_video_checked')) {
				$(elm).removeClass('fs_hide_brief_nav');
			}else {
				$(elm).addClass('fs_hide_brief_nav');
			}
			
		});
		
		
		if($('.fs_video_checked').length == 2) {
			$('.fs_upscaling').addClass('fs_go');
		}
		
	});
	
	$('.fs_select_header').on('click', function(e) {
		e.preventDefault();
		var that = $(this);
		
		//Scroll to selected item
		var fsBox = that.parent();
		var fsList = that.parent().find('ul');
		var fsItem = that.parent().find('ul li.selected');
		var fsItemH  = fsItem.innerHeight();
		var fsItemN = fsItem.index();
		fsList.scrollTop((fsItemN * fsItemH));
		
		//If year
		if(fsBox.hasClass('fs_lev_5') && fsItem.length > 0) {
			var year = fsItem.find('.span-text').text();
			fsBox.find('.fs_select_header p').html(year);
		}
		
		if(that.hasClass('active')) {
			that.removeClass('active');
		}else  {
			$('.fs_select_header').removeClass('active');
			that.addClass('active');
		}
		
	});

	$(document).on('click', '.fs_select_box li',function(e){
		
		var that = $(this);
		var box = $(this).parent().parent().parent();
		
		var yearInput = box.find('.fs_select_txt input');
		
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.find('.fs_select_header').removeClass('active');
			box.find('.fs_select_header p').html(that.text());
			
			if(yearInput.length > 0) {
				yearInput.val(that.text());
			}
			
		}	
			
	});
	
	$('.fs_select_txt input').keypress(function(e) {
		 var keycode = (e.keyCode ? e.keyCode : e.which);
		
		if(keycode == 13) {
			e.preventDefault();
			var value = $(this).val() || 'Năm sinh';
			var box = $(this).parent().parent().parent();
			box.find('.fs_select_header p').html(value);
			box.find('.fs_select_header').removeClass('active');
			
			//Check selected
			box.find('ul li').each(function(index,elm){
				var text = $(elm).find('.span-text').text();
				box.find('ul li').removeClass('selected');
				
				if(text == value) {
					$(elm).addClass('selected');
					var elmH  = $(elm).innerHeight();
					box.find('ul').scrollTop((index * elmH));
					return false;
				}
				
			});
			
		}
			
	});
	
	$('.fs_select_txt input').focus(function (e) {
        $(this).val("");
    }).focusout(function (e) {
		var value = $(this).val() || 'Năm sinh';
		var box = $(this).parent().parent().parent();
		box.find('.fs_select_header p').html(value);
		box.find('.fs_select_header').removeClass('active');
		
		//Check selected
		box.find('ul li').each(function(index,elm){
			var text = $(elm).find('.span-text').text();
			box.find('ul li').removeClass('selected');
			
			if(text == value) {
				$(elm).addClass('selected');
				var elmH  = $(elm).innerHeight();
				box.find('ul').scrollTop((index * elmH));
				return false;
			}
			
		});
		
    });
	
	$('.fs_star .fs_star_icon').mouseenter(function(){
		var target = $(this).parent().attr('data-ani');
		clearTimeout(fsStarDelay);
		fsByHover = true;
		$('.fs_features li, .fs_features_title_spv li').removeClass('fs_play');
		$('.fs_features_title_spv li[data-ani='+ target +']').addClass('active');
	}).mouseleave(function() {
		fsaniStar();
		fsByHover = false;
		$('.fs_features_title_spv li').removeClass('active');
	});
	
	//Extra
	var fs_cur_ex = null;
	var fs_has_ex = false;
	var fs_delay_ex = null;
	var fs_timer_ex = 0;
	
	$('.fs_extra_item').mouseenter(function() {
		fs_cur_ex = $(this);
		
		if(fs_has_ex) {
			fs_timer_ex = 190;
		}else {
			fs_timer_ex = 0;
		}
		
		fs_delay_ex = setTimeout(function(){
			fs_cur_ex.addClass('fs_ex_active');
		},fs_timer_ex);
			
		
	}).mouseleave(function() {
		fs_has_ex = true;
		fs_cur_ex.removeClass('fs_ex_active');
	});
	
	$('.fs_extra_detail').mouseleave(function() {
		$('.fs_extra_item').removeClass('fs_ex_active');
		fs_has_ex = false;
		fs_timer_ex = 0;
		clearTimeout(fs_delay_ex);
	});
	
	
	//facebook
	$('.fs_share a, .fs_share_sp a').click(function(){
		
		  FB.ui({
			method: 'share',
			display: 'popup',
			href: 'www.samsung.com/vn/tvs/qled-tv/qled-8k-su-kien-8-sao/',
		  }, function(response){});
		
	});
	
	$('.fs_nav_indi').click(function(){
		if($(this).hasClass('fs_open_indicator')) {
			$('.fs_nav_indi, .fs_indicator').removeClass('fs_open_indicator');
		}else {
			$('.fs_nav_indi, .fs_indicator').addClass('fs_open_indicator');
		}
		
	});
	
}


function fsScroll() {

}

function fsResize() {
	
	if($(window).width() > 1100) {
		//$('.fs_main').css({'height': window.innerHeight - 65});
		window.cancelAnimationFrame(fsParallax.animationFrameHandler);
		setTimeout(function(){
			fsParallax.render();
		},50);
	}
	
	ImgLazyLoad('.fs_section');
	
}

function Rotate() {
	
	window.cancelAnimationFrame(fsParallax.animationFrameHandler);
	$('.fs_fullpage').css({'opacity': 0});
	
	setTimeout(function(){

		var  angle = window.orientation;
		if(angle == 0) {
			
			clearTimeout(fsQuanTimer);
			
			if(fsScreenH > fsScreenW) {
				$('.fs_main').css({'height': fsScreenH});
			}else {
				$('.fs_main').css({'height': fsScreenW});
			}
			
			$( "html, body" ).scrollTop(63);
			$('.fs_fullpage').animate({'opacity': 1}, 500, function() {
				$( "html, body" ).scrollTop(63);
			});
			
		}else {
			
			if(fsScreenH > fsScreenW) {
				$('.fs_main').css({'height': fsScreenW});
			}else {
				$('.fs_main').css({'height': fsScreenH});
			}
			
			$( "html, body" ).scrollTop(63);
			$('.fs_fullpage').animate({'opacity': 1}, 500, function() {
				$( "html, body" ).scrollTop(63);
			});
			
		}
		
		fsParallax.render();
		
		
	},50);
	
	ImgLazyLoad('.fs_section');
}

	
$(document).on('click touchstart', function(event) {
	if ($(".fs_select_header").has(event.target).length == 0 && $(".fs_select_box").has(event.target).length == 0){
	  $(".fs_select_header").removeClass("active");
	}
	
});

$(window).on('scroll', fsScroll);
$(window).on('resize', fsResize);
$(window).on("orientationchange", Rotate);

$(window).on('load', function(){ 
	
	fsFullPage();
	
	$('.fs_fullpage ').animate({'opacity': 1}, 300, function() {
			
		if($(window).width() > 1100) {
			$('.fs_main').css({'height': window.innerHeight - 65});
		}else {
			$('.fs_main').css({'height': window.innerHeight});
		}
		
		if(fsScreenW <= 1100) {
			$( "html, body" ).scrollTop(63);
		}
		
	});
	
	if(window.location.hash){
		var hash = window.location.hash.substr(1);
		
		if(hash.indexOf('register') >= 0) {
			$( ".fs_form_popup").addClass('active');
			$('.fs_main_logo').addClass('show');
			$('.fs_indicator li').addClass('fs_indicator_active');
			
			fsPopDelay = setTimeout(function(){
				$('.fs_form_popup').removeClass('active');
				localStorage.setItem('fs_step', '6');
				var index = $('.fs_section.fs_swiper-slide[data-step="6"]').index();
				fsSwiper.slideTo(index, 500, null);
			},5000);
		}
		
	}
	
	
});


(function() {
	
	ImgLazyLoad($('.fs_intro, .fs_form_popup, .fs_main_logo'));

	if($(window).width() > 1100) {
		$('.fs_main').css({'height': window.innerHeight - 65});
	}else {
		$('.fs_main').css({'height': window.innerHeight});
	}
	
	fseVents();
	
})();
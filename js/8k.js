

//Variables condition

var compareCon = {
	is4k: false,
	is8k: false	
}

var splitCon = 0;

var videoCon = {
	isVideo: false,
	isSound: false,
	isFade: false	
}

// Parallax
var app = {
        
    animationFrameHandler: null,
    background: $(".fs_bg"),
    flare: $(".fs_detail"),
    pageWidth : $(window).width(),
    pageHeight : $(window).height(),
    midpoint: { x: window.innerWidth/2, y: window.innerHeight/2  },
    limit: { x: 20,  y: 20 ,
        device:{
            x:120,
            y:85
        }
    },    
    target: { x: 0, y:  0 },
    curPos: { x: 0, y:  0 },
    isMobile: false,
    easing: 0.1,

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
		
		//this.flare[0].style.width = 100 +  this.limit.x + "%";
        //this.flare[0].style.height = 100 + this.limit.y + "%";
		/*
        this.background[0].style.position = "absolute";
        this.background[0].style.width = 100 +  this.limit.x + "%";
        this.background[0].style.height = 100 + this.limit.y + "%";
        this.background[0].style.left = -this.limit.x/2+'%';
        this.background[0].style.top = -this.limit.y/2+'%';
		//this.flare[0].style.width = 100 +  this.limit.x + "%";
        //this.flare[0].style.height = 100 + this.limit.y + "%";
		*/
      
    },
    mouseMove: function (e) {
        
        this.target.x = -(e.pageX - this.midpoint.x) / this.limit.x;
        this.target.y = -(e.pageY - this.midpoint.y) / this.limit.y;
         
    },
	
    deviceMove: function (a) {
               
        this.target.x = a.gamma * 2; //exaggeration 
        this.target.y = a.beta * 3;

    },

    update:function(){

        this.curPos.x += (this.target.x - this.curPos.x) * this.easing;
        this.curPos.y += (this.target.y - this.curPos.y) * this.easing;
		this.draw();
    },
    draw: function(){
        
        //TweenLite.set(this.background, 
		TweenLite.set($('.active .fs_bg'), 
		{
			x:this.curPos.x,
			y:this.curPos.y,                                    
		});
        //TweenLite.set(this.flare, 
		/*TweenLite.set($('.active .fs_detail'), 
		{
			x:-this.curPos.x/2.5,
			y:-this.curPos.y/2.5,
			//y:-this.curPos.y,                                    
		});*/
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


function createSlider() {
	if($('.fs_slider_home').length){
			
		var Banner = new Swiper('.fs_slider', {
			autoplay: false,
			speed: 600,
			slidesPerView: 1,
			pagination: '.pagination',
			paginationClickable: true,
			autoplayDisableOnInteraction: false,
			simulateTouch:false,
			effect: "fade",
		onInit: function (swiper) {
		},
		onTransitionStart: function (swiper) {
		},
		onTransitionEnd: function (swiper) {
		}, 
		});
		
	}
	
}

function createFullPage() {
	$('#fs_fullpage').fullpage({
        lockAnchors: false,
        slidesNavigation: true,
        scrollingSpeed:0,
        autoScrolling:true,
		responsiveHoz:true,
		canScroll:false,
        scrollBar: false,
        fitToSection: true,
		touchSensitivity:10,
        onLeave: function(index, nextIndex, direction){
        },
		afterLoad:function(anchorLink, index){
		}
	
    });
	
	$('#fs_fullpage').fullpage.setMouseWheelScrolling(false);
    $('#fs_fullpage').fullpage.setAllowScrolling(false);
	
	
}

//Main
function fsScroll() {
}

function fsResize() {
}


$(window).on('scroll', fsScroll);
$(window).on('resize', fsResize);
$(window).on('load', function(){
	createFullPage();
	app.init()
});

(function() {
})();



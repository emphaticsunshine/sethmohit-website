var sethmohit = {
	pages:['simple-cartoon','modern-cartoon'],
	currIndex:0,
	container:$("#content"),
	pipeline:[],
	sliding:false,
	showNextPage: function(){
		this.currIndex++;
		this.currIndex = (this.currIndex === this.pages.length)?0:this.currIndex;
		var pageName = this.pages[this.currIndex],
			nextPage = $('div#'+pageName);
		this.slidePage(nextPage);
	},
	slide:function(page,left){
		var dfd = new $.Deferred();
		page.animate({"left":left},1500,dfd.resolve);
		return dfd.promise();
	},
	slidePage:function(page){
		if(this.sliding){
			this.pipeline.push(page);
			return false;
		}
		this.sliding = true;
		$.when(sethmohit.slide($('div.current',this.container),'-800px'))
		.then(sethmohit.slide(page,'0px'))
		.then(function(){
			$('div.current',this.container).removeClass('current').css('left','1024px');
			page.addClass('current');
			sethmohit.sliding = false;
			if(sethmohit.pipeline.length){
				sethmohit.slidePage(sethmohit.pipeline.shift());
			}
		});
	},
	adjustContentHeight:function(){
		var $header = $("#header").outerHeight(),
			$footer = $("#footer").outerHeight(),
			$content = $("#content").outerHeight(),
			$doc = $(document).outerHeight(),
			$cartoon = $(".cartoon");
		if($doc > ($header+$footer+$content)){
			$content = $("#content").height($doc-($header+$footer)).height();
		}
		$cartoon.height($content*0.80);
		$("#next-icon").css('top',$content/2-100);

	},
	init:function(){
		this.adjustContentHeight();
		$("#next-icon").bind('click',function(){
			sethmohit.showNextPage();
			return false;
		});
	}
}
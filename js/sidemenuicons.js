(function($) {
	$.fn.sidemenu = function() {
	// menu
	$("button.sidemenu-icon-yoko-kakudai").hover(function () {
		$(this).addClass("sidemenu-icon-yoko-kakudai-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-yoko-kakudai-mouseover");
	});
	$("button.sidemenu-icon-yoko-shukusyo").hover(function () {
		$(this).addClass("sidemenu-icon-yoko-shukusyo-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-yoko-shukusyo-mouseover");
	});
	$("button.sidemenu-icon-tate-kakudai").hover(function () {
		$(this).addClass("sidemenu-icon-tate-kakudai-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-tate-kakudai-mouseover");
	});
	$("button.sidemenu-icon-tate-shukusyo").hover(function () {
		$(this).addClass("sidemenu-icon-tate-shukusyo-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-tate-shukusyo-mouseover");
	});
	$("button.sidemenu-icon-tategaki").hover(function () {
		$(this).addClass("sidemenu-icon-tategaki-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-tategaki-mouseover");
	});
	$("button.sidemenu-icon-yokogaki").hover(function () {
		$(this).addClass("sidemenu-icon-yokogaki-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-yokogaki-mouseover");
	});
	$("button.sidemenu-icon-ueni").hover(function () {
		$(this).addClass("sidemenu-icon-ueni-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-ueni-mouseover");
	});
	$("button.sidemenu-icon-shitani").hover(function () {
		$(this).addClass("sidemenu-icon-shitani-mouseover");
	}, function () {
		$(this).removeClass("sidemenu-icon-shitani-mouseover");
	});
	};
})(jQuery);

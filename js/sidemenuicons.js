(function($) {
	$.fn.sidemenu = function() {
	// menu
	$("button.sidemenu-icon-yoko-kakudai").hover(function () {
		console.log("yoko");
		$(this).addClass("sidemenu-icon-yoko-kakudai-mouseover");
	}, function () {
		console.log("yoko-mouse");
		$(this).removeClass("sidemenu-icon-yoko-kakudai-mouseover");
	});
	};
})(jQuery);

$(window).on('load', function () {
	console.log("preloading");
	var $preloader = $('.page-preloader'),
		$spinner = $preloader.find('.page-preloader__spinner');
	$spinner.fadeOut();
	$preloader.fadeOut('fast');
});
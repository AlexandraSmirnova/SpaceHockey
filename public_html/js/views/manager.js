define([
	'backbone'
], function (Backbone) {

	var views = [];
	var $page = $(".page");

	var Manager = Backbone.View.extend({
		inited: false,

		addView: function (currentView) {
			$page.append(currentView.$el);
			views.push(currentView);

			this.listenTo(currentView, 'show', function () {
				this.postInit();

				views.forEach(function (view) {
					if (view && view != currentView) {
						view.hide();
					}
				});
			});
		},
		orientationchange: function () {
			var header = $(".header__game-title");
			if (window.orientation % 180 == 0) {
				if (header) {
					header.show();
				}
			} else {
				if (header) {
					header.hide();
				}
			}
		},

		postInit: function () {
			if (this.inited) {
				return;
			}
			this.hidePreloader();
		},

		hidePreloader: function () {
			var $preloader = $('.page-preloader');

			$preloader.find('.page-preloader__spinner').fadeOut(200, function () {
				$preloader.fadeOut('fast');
			});
			this.inited = true;
		}
	});

	var manager = new Manager();

	window.addEventListener('orientationchange', manager.orientationchange);
	manager.orientationchange();

	return manager;
});

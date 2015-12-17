define([
	'backbone'
], function (Backbone) {

	var views = [];
	var $page = $(".page");

	var Manager = Backbone.View.extend({
		addView: function (currentView) {
			$page.append(currentView.$el);
			views.push(currentView);

			this.listenTo(currentView, 'show', function () {
				views.forEach(function (view) {
					if (view && view != currentView) {
						view.hide();
					}
				});
			});
		},
		orientationchange : function () {
			console.log("orientation: " + window.orientation);
			//var gameF = $(".gameField");
			var header = $(".header");
			if (window.orientation%180==0) {
				if(header) {
					header.show();
				}
			} else {
				if(header) {
					header.hide();
				}
			}
		}
	});

	var manager = new Manager();
	window.addEventListener('orientationchange', manager.orientationchange);
	manager.orientationchange();

	return manager;
});

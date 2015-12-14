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
		}

	});

	return new Manager();
});

define([
    'backbone'
], function (
    Backbone
) {

    var views = [];

    var Manager = Backbone.View.extend({

        addView: function (currentView) {
            views.push(currentView);	  

            this.listenTo(currentView, 'show', function () {
		//console.log(currentView.cid);
                views.forEach(function (view) {
                    if (view.cid != currentView.cid && view != undefined)
			//console.log("hide:" + view.cid);
                        view.hide();
                });
            });
        }

    });

    return new Manager();
});

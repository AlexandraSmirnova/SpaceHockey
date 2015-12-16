define([
	'backbone',
	'tmpl/scoreboard',
	'models/score',
	'collections/scores'
], function (Backbone,
             tmpl,
             playerModel,
             playerCollection) {

	var ScoreBoardView = Backbone.View.extend({
		template: tmpl,
		collection: playerCollection,
		tagName: 'div',

		initialize: function () {
			console.log('initializing scoreboard view');
			$('.page').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.collection.toJSON()));
		},


		show: function () {
			this.trigger('show', this);
			this.$el.show();
		},
		hide: function () {
			this.$el.hide();
		}

	});
	return new ScoreBoardView();
});


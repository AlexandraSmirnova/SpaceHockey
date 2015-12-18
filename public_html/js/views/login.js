define([
	'backbone',
	'tmpl/login',
	'utils/validator',
	'models/userProfile'
], function (Backbone,
             tmpl,
             Validator,
             User) {

	var formClass = ".form_signin";
	var validator = new Validator();

	var View = Backbone.View.extend({
		template: tmpl,
		model: User,

		events: {
			"submit .form_signin": "submitSignin"
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			$(this.el).html(this.template());
			return this;
		},

		submitSignin: function (event) {
			validator.clearErrors();
			validator.validateForm(formClass);

			if (validator.form_valid) {
				var user = this.model;
				var data = {
					'login': $(formClass + " input[name = login]").val(),
					'password': $(formClass + " input[name = password]").val()
				};
				this.model.login(data, {
					success: function (response) {
						response = JSON.parse(response);
						console.log(response.status);
						if (response.status == "200") {
							console.log(response.body.login);
							user.set({
								'login': response.body.login
							});
							Backbone.history.navigate('menu', {trigger: true});
						}
						else {
							var $error = $(".form__row_errors");
							$error.append("Login or password is incorrect!");
							$error.show();
						}
					},
				});
			}
			return false;

		},

		show: function () {
			validator.clearErrors()
			this.$el.show();
			this.trigger("show", this);
		},

		hide: function () {
			this.$el.hide();
		}

	});

	return new View();
});

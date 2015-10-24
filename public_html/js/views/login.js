define([
    'backbone',
    'tmpl/login',
    'utils/validator',
    'models/user'
], function(
    Backbone,
    tmpl,
    Validator,
    User
){
    var form_class = ".form_signin";
    var validator = new Validator(form_class);

    var View = Backbone.View.extend({
	template: tmpl,
		   
	events: {
	    "submit .form_signin": "submitSignin"
	},
	
	initialize: function () { 
	    $('.page').append(this.el);            
            this.render();
        },

        render: function () {						
            $(this.el).html(this.template());	
	    return this;
        },

	submitSignin: function(event) {

	    validator.validateForm();
	    if(validator.form_valid){
		var formData = {
		    'login':    $(form_class + " input[name = login]").val(),
		    'password': $(form_class +" input[name = password]").val() 
		};
		$.ajax({
		    type: "POST",
		    url: "/auth/signin",		   
		    data: formData,
		    success: function(data){
			data =  JSON.parse(data);
			if(data["status"] == "200"){
			    alert("Welcome!");
                            console.log("ajax success");

			    Backbone.history.navigate('', { trigger: true });
			 }
			else{
                            var $error = $(".form__row_errors"); 
                            $error.append("Login or password is incorrect!");
                            $error.show();
                        }
		    }
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

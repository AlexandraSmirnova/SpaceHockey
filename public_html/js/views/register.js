define([
    'backbone',
    'tmpl/register',
    'utils/validator'
   // 'models/user'
], function(
    Backbone,
    tmpl,
    Validator
 //   User
){
    var formClass = ".form_signup";
    var validator = new Validator(formClass);

    var View = Backbone.View.extend({
	template: tmpl,
				
	events: {
	    "submit .form_signup": "submitSignup"
	},

	initialize: function () { 
	    $('.page').append(this.el);            
            this.render();
        },

	render: function () {
	    $(this.el).html(this.template());
	    return this;
	},

	submitSignup: function(event) {
	    validator.clearErrors();
	    validator.validateForm();
	    if(validator.form_valid){	
		var formData = {
		    'login':    $(formClass + " input[name = login]").val(),
		    'password': $(formClass + " input[name = password]").val(),
		    'email':    $(formClass + " input[name = email]").val()
		};

		$.ajax({
		    type: "POST",
		    url: "/auth/signup",
		    data: formData,
										
		    success: function(data){
			alert(data);
			data =  JSON.parse(data);
			if(data["status"] == "200"){
                             console.log("ajax success");
			    /* var user = new User({login: formData['login'],
						 password: formData['password'],
						 email: formData['email'],
						 url = formData['login']+"/ ",
						 });*/
                             Backbone.history.navigate('', { trigger: true });
			 }
			else{
                            var $error = $(".form__row_errors"); 
                            $error.append("User cann't be registrated. Try to change your input data");
                            $error.show();
                        }
			//window.location.replace("/#game");
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

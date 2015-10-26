define([
    'backbone',
    'tmpl/login',
    'utils/validator',
    //'utils/signin',  
    'models/user'
], function(
    Backbone,
    tmpl,
    Validator,
    //SigninManager,
    User
){
    var form_class = ".form_signin";
    var validator = new Validator(form_class);
    //var signinManager = new SigninManager();

    var View = Backbone.View.extend({
	template: tmpl,
	user: User,

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
	    validator.clearErrors();
	    validator.validateForm();
	    var that = this;

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
			    localStorage.setItem( 'user', JSON.stringify(formData) );
			    that.user.set(formData);
			    that.user.save();			   
			    Backbone.history.navigate('', {trigger: true});
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

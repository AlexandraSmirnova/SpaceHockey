define([
    'backbone',
    'tmpl/register',
    'utils/validator'
], function(
    Backbone,
    tmpl,
    Validator
){
    var validator = new Validator("register");

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
	},

	submitSignup: function(event) {
	    
	    validator.validateForm();
	    if(validator.form_valid){	
		var formData = {
		    'login': $("input[name = login]").val(),
		    'password': $("input[name = password]").val(),
		    'email': $("input[name = email]").val()			
		};

		$.ajax({
		    type: "POST",
		    url: "/auth/signup",
		    data: formData,
										
		    success: function(data){
			data =  JSON.parse(data);
			if(data["status"] == "200"){
                             console.log("ajax success");
                             Backbone.history.navigate('', { trigger: true });
			 }
			else{
                            var $error = $(".form__row_errors"); 
                            $error.append("I'm error!");
                            $error.show();
                        }
			//window.location.replace("/#game");
		    }
		});
	    }																
	    return false;
	},

	show: function () {	  
	    this.trigger("show", this);
	    this.$el.show();
	},

	hide: function () {
	    this.$el.empty();
	}

    });

    return new View();
});

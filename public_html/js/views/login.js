define([
    'backbone',
    'tmpl/login',
    'utils/validator'
], function(
    Backbone,
    tmpl,
    Validator
){
    var validator = new Validator("login");

    var View = Backbone.View.extend({
//	el: $("#page"),
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
		    'login': $("input[name = login]").val(),
		    'password': $("input[name = password]").val() 
		};
		$.ajax({
		    type: "POST",
		    url: "/auth/signin",		   
		    data: formData,												 
		    success: function(data){
			alert(data);
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
		    }
		});
	    }
	    return false;

	},

        show: function () {
	    this.$el.show();
	    this.trigger("show", this);
        },
        hide: function () {
	    this.$el.hide();
        }

    });

    return new View();
});

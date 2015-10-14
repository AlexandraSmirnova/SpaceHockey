define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
	el: $("#page"),
	template: tmpl,
	
	events: {
	    "submit .form_signin": "submitSignin",
	    "click a": "hide"
	},

        render: function () {						
            $(this.el).html(this.template());																								 
            return this;
        },

	submitSignin: function(event) {
				
	    if(validateForm()){
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
	    this.$el.render();
        },
        hide: function () {
	    this.$el.empty();
        }

    });

    function validateForm(){
 	var valid = checkName() && checkPassword();
	if(!valid)
	    $('.form__row_errors').css('display', 'block');		
        return valid;
    }

    function checkName(){
	var userName = $("input[name = login]").val();
        if (userName == '') {
	    $('.form__row_errors').text("Input your login, please!");
	    return false;				
	}		
	return true;
    }
		
    function checkPassword(){
	var userPassword = $("input[name = password]").val();
	if (userPassword == '') {
	    $('.form__row_errors').text("Input your password, please!");
	    return false;				
	}		
	return true;
    }
    return new View();
});

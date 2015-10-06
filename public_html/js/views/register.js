define([
    'backbone',
    'tmpl/register'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
			  el: $("#page"),
        template: tmpl,
				
				events: {
            "submit #idFormSignup": "submitSignup",
            "click a": "hide"
				},

        render: function () {
            $(this.el).html(this.template());
				},

				submitSignup: function(event) {

					if(validateForm()){	
									$.ajax({
												 type: "POST",
												 url: "/auth/signup",
												 data: $(this).serialize(),
													
												 success: function(data){
														 window.location.replace("/#main");
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
 				var valid = checkName() && checkPasswords() && checkEmail();
				if(!valid)
						$('.form-div_errors').css('display', 'block');		
        return valid;
    }
		
		function checkPasswords(){
		    var userPassword1 = $("input[name = password]").val();
				var userPassword2 = $("input[name = password2]").val();
				if (userPassword1 == '' || userPassword2 == '' ) {
            $('.form-div_errors').text("Input your password in both fields!");
            return false;
        }
        if (userPassword1 != userPassword2 ) {
            $('.form-div_errors').text("Passwords should be the same! Input again, please.");
            return false;
        }
				return true;
		}

		function checkName(){
			var userName = $("input[name = login]").val();
        if (userName == '') {
            $('.form-div_errors').text("Input your login, please!");
						return false;				
				}		
				return true;
		}

		function checkEmail(){
			var userEmail = $("input[name = email]").val();
        if (userEmail == '') {
            $('.form-div_errors').text("Input your email, please!");
						return false;				
				}		
				return true;
		}

    return new View();
});

define(['backbone'],
function(
    Backbone
){
    // if typeForm = 1 -> it is login form, if typeForm = 0 -> register form
    var Validator = function(typeForm){
	this.form_valid = false;
	this.validateForm = function(){
	    var self = this;
	    if(typeForm == "login")
		this.form_valid = validateLogin();
	    else if (typeForm == "register") 
		this.form_valid = validateRegister();
	};
    }

    
    function validateLogin(){
 	var valid = checkName() && checkPassword();
	if(!valid)
	    $('.form__row_errors').css('display', 'block');		
        return valid;
    }

      function validateRegister(){
	var valid = checkName() && checkPasswords() && checkEmail();
	if(!valid)
	    $('.form__row_errors').css('display', 'block');		
	return valid;
    }
		
    function checkPasswords(){
	var userPassword1 = $("input[name = password]").val();
	var userPassword2 = $("input[name = password2]").val();
	if (userPassword1 == '' || userPassword2 == '' ) {
	    $('.form__row_errors').text("Input your password in both fields!");
	    return false;
        }
        if (userPassword1 != userPassword2 ) {
            $('.form__row_errors').text("Passwords should be the same! Input again, please.");
            return false;
        }
	return true;
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
    
    function checkEmail(){
	var userEmail = $("input[name = email]").val();
	if (userEmail == '') {
	    $('.form__row_errors').text("Input your email, please!");
	    return false;				
	}		
	return true;
    }

    return Validator;
});

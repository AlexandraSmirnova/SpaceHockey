define([
	'backbone'
], function (Backbone) {

	var showErrors = function(){

		this.signinErrors = function(response){
			var $error = $(".form_signin .form__row_errors");
			if(response.status == '302'){
				$error.append("You have been login already !");
			}
			else{ 
				$error.append("Login or password is incorrect!");
			}
			$error.show();
		};

		this.signupErrors =  function(){
			var $error = $(".form__row_errors");
			if(reponse.status == '500'){
				$error.append("INTERNAL_SERVER_ERROR");	
			}
			else{
				$error.append("User cann't be registrated. Try to change your input data");
			}
			$error.show();

		};
	}
	return new showErrors();

	
});	
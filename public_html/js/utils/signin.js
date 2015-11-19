define([
	'backbone',
	'utils/ajax'
],
function(
    Backbone,
    ajax
    
){
      
    var form_class = ".form_signin";

    var SigninManager = function(){
	
		this.signinRequest = function(model){
		    console.log("request");
		    var dataAjax = {
				'login':    $(form_class + " input[name = login]").val(),
				'password': $(form_class +" input[name = password]").val() 
		    };

		    $.when(ajax.sendAjax(dataAjax, "/auth/signin", "POST")).then(
				function(response){				    
				    response =  JSON.parse(response);				    
				    console.log(response.status)
				    if(response.status == "200"){ 				    
						console.log(response.body.login);
						model.set({
							"login": response.body.login
		  				});		   
		  				//model.save();	
						Backbone.history.navigate('game', {trigger: true});
				    }
				    else{
						var $error = $(".form__row_errors"); 
						$error.append("Login or password is incorrect!");
						$error.show();
				    }
				},
				function (error) {
		 		 	console.log(error.statusText);
				}
		    ); 
		}
    }
	



    return   new SigninManager();

});

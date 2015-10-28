define(['backbone'],
function(
    Backbone
){
      
    var form_class = ".form_signin";

    var SigninManager = function(){
	
	this.signinRequest = function(model){
	    console.log("request");
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
			model.set(formData);
			model.save();			   
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
    }
	



    return   new SigninManager();

});

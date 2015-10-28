define(['backbone'],
function(
    Backbone
){
    var formClass =  ".form_signup";

    var SignupManager = function(){

	this.signupRequest = function(){
	    var formData = {
		'login':    $(formClass + " input[name = login]").val(),
		'password': $(formClass + " input[name = password]").val(),
		'email':    $(formClass + " input[name = email]").val()
	    };

	    $.ajax({
		type: "POST",
		url: "/auth/signup",
		data: JSON.stringify(formData),
		
		success: function(data){
		    alert(data);
		    data = JSON.parse(data);
		    if(parseInt(data["status"]) == "200"){
			
                        console.log("ajax success");
			Backbone.history.navigate('', { trigger: true });
		    }
		    else{
			alert(parseInt(data["status"], 10));
                        var $error = $(".form__row_errors"); 
                        $error.append("User cann't be registrated. Try to change your input data");
                        $error.show();
                    }
		}
	    });
	}
    }

    return   new SignupManager();

});

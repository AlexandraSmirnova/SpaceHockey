define(['backbone'],
function(
    Backbone
){
    // модуль, отвечающий за разлогинивание

    var SignoutManager = function(){
	
	this.exitRequest = function(model){
	    localStorage.clear();
	    $.ajax({
		    type: "GET",
		    url: "/auth/signout",		    
										
		    success: function(data){
			alert(data);		
			localStorage.clear("user");
			data =  JSON.parse(data);
			if(data["status"] == "200"){
			    console.log("ajax success");
			    model.set({"logged_in": false});
			    model.save();
			    Backbone.history.navigate('', { trigger: true });
			 }
		
		    }
		});
	};

    };
        
    return new SignoutManager();

});

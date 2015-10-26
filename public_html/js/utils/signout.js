define(['backbone'],
function(
    Backbone
){
    // модуль, отвечающий за разлогинивание

    var SignoutManager = function(){
	
	this.exitRequest = function(event){
	    console.log("xi!!");
	    localStorage.clear();
	    $.ajax({
		    type: "GET",
		    url: "/auth/signout",		    
										
		    success: function(data){
			alert(data);		
			localStorage.clear();
			data =  JSON.parse(data);
			if(data["status"] == "200"){
                             console.log("ajax success");
			     Backbone.history.navigate('', { trigger: true });
			 }
		
		    }
		});
	};

    };
        
    return new SignoutManager();

});

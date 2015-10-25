define(['backbone'],
function(
    Backbone
){
    // модуль, отвечающий за разлогинивание

    var logoutItem = ".menu__item_logout";
    var regItem    = ".menu__item_reg";
    var logoutItem = ".menu__item_logout"; 

    var SignoutManager = function(){
	
	exitReguest: function(event){
	    $.ajax({
		    type: "POST",
		    url: "/auth/signout",		    
										
		    success: function(data){
			alert(data);
			showMenuItems();
			data =  JSON.parse(data);
			if(data["status"] == "200"){
                             console.log("ajax success");
			     Backbone.history.navigate('', { trigger: true });
			 }
		
		    }
		});
	},

	showMenuItems: function(){
	    $(loginItem).show();
	    $(regItem).show();
	    $(logoutItem).hide();
	    
	}
    }
    
    $(logoutItem ).on( 'click', SignoutManager.exitReguest(event));
    return SignoutManager;

});

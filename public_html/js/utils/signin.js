define(['backbone'],
function(
    Backbone
){
    // модуль, который отвечает за действия производимые после входа игрока

    var loginItem  = ".menu__item_login";
    var regItem    = ".menu__item_reg";
    var logoutItem = ".menu__item_logout"; 

    var SigninManager = function(){
	
	// пока здесь только сокрытие кнопок меню
	this.hideMenuItems = function(){
	    $(loginItem).hide();
	    $(regItem).hide();
	    $(logoutItem).show();
	    
	}
    }

    return SigninManager;

});

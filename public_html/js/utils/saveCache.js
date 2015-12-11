define([
	'backbone'
],
function (Backbone) {

	var saveCache = function (formClass) {
		var elements = $(formClass + " input");		
		for (i = 0; i < elements.length; i++) {
			(function (element) {
				var id = element.getAttribute('id');
				element.value = sessionStorage.getItem(id); // обязательно наличие у элементов id
				element.oninput = function () {
					sessionStorage.setItem(id, element.value);
				};
			})(elements[i]);
		}
	};

	return saveCache;
});			
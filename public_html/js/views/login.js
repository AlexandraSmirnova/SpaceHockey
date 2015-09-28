define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
				el: $("#page"),
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
						
            $(this.el).html(this.template());
						
						$("#idForm").on("submit", function(event) {
								var url = "/signin";
								event.preventDefautlt();

								$.ajax({
											 type: "POST",
											 url: url,
											 data: $(this).serialize(),
											 
											 success: function(data)
											 {
													 window.location.replace("/#main");
												   //postDispatcher(data);
											 }
										 });

						});
																			 
            return this;
        },
        show: function () {
            // TODO
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});

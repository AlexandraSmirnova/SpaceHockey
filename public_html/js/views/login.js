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

        render: function () {
						
            $(this.el).html(this.template());
						
						$("#idForm").on("submit", function(event) {
								var url = "/api/v1/auth/signin";
								alert(url);
								//event.preventDefautlt();

								$.ajax({
											 type: "POST",
											 url: url,
											 data: $(this).serialize(),
											 
											 success: function(data)
											 {
													 window.location.replace("/#game");
												   //postDispatcher(data);
											 }
										 });

						});
																			 
            return this;
        },
        show: function () {
          	 this.$el.render();
        },
        hide: function () {
             this.$el.empty();
        }

    });

    return new View();
});

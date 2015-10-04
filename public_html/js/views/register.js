define([
    'backbone',
    'tmpl/register'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
			  el: $("#page"),
        template: tmpl,
				
				check: function(){
					pass1 = $('#password').val();
					pass2 = $('#password2').val();
					alert(pass1+ " " + pass2 );
					return pass1 === pass2;
				},

        render: function () {
            $(this.el).html(this.template());
									
						$("#idForm").on("submit", function(event) {
								var url = "/auth/signup";
								//event.preventDefautlt();
								alert("ха"+url);
								if(this.check()){
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
										}
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

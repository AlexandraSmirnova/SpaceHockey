define([
    'backbone'
], function(
    Backbone
){

    return function(method, model, options) {
        options || (options = {});

        switch (method) {
            case 'create':
                $.ajax({
                       type: 'POST',
                       url: options.url || this.url,
                       data: options.data || this.toJSON(),
                       success: function(response) {
                           try {
                               var responseObj = JSON.parse(response);
                           } catch (err) {
                               var responseObj = response;
                           }
                           if (responseObj.login_status == false) {
                               options.error(responseObj.error_massage);   
                           }
                           else {
                               options.success(response);
                           }
                       },
                       error: function(xhr, status, error) {
                           options.error(error);
                       }
                   });
                break;

            case 'update':
                this.sync.call(this, 'create', model, options);  
                break;
            case 'delete':
                console.log('destroy');
                options.type = 'GET';
                Backbone.sync.call(this, method, model, options); 
                break;        
            case 'read':
                console.log('read');
                Backbone.sync.call(this, method, model, options);
                break;
            default:
                // Something probably went wrong
                console.error('Unknown method:', method);
                break;
          }

        
    };
});


/*var methods = {
            'create': {
                send: function() {
                    $.ajax({
            type: "POST",
            url: '/auth/signin',
                        data: JSON.stringify(model.toJSON())
            });//ajax
                }//send
            },//create
        };
return methods[method].send();
        */
(function($) {
    
    // Called on submit form
    var zapierURL = "https://hooks.zapier.com/hooks/catch/1686133/mwv397/";
    
    // Submit form event
    $('#contact-form').submit(function(event) {
        event.preventDefault(); // Disable default
        
        // Get form data
        var name = $('#contact-form input#name').val().trim();
        var email = $('#contact-form input#email').val().trim();
        var phone = $('#contact-form input#phone').val().trim();
        var message = $('#contact-form textarea#message').val().trim();
        
        // Call zapier endpoint
        if (name.length == 0 || email.length == 0 || phone.length == 0 || message.length == 0) {
            // Empty inputs
            alert('Please fill all the fields!');
        } else {
            // Submit
            var bodyToSend = {
                'name' : name,
                'email' : email,
                'phone' : phone,
                'message' : message
            }
            $.post(zapierURL, bodyToSend, function( data ) {
                // Success, go to thank you page
                window.location.href = "#thank-you?name=" + name;
            }, 'json');
        }
        
    });
    
    // Get query parameter for thank you page name
    $(window).bind('hashchange', function() {
        
        // Function to extract url query params
        function getUrlVar(paramName) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }            
            var pm = vars[paramName];
            if (pm == undefined) {
                return '';
            } else {
                return pm;
            }
        }
        
        // Set name
        var name = getUrlVar('name');
        if (name.length == 0) {
            $('#thank-you-name').html(',');
        } else {
            $('#thank-you-name').html('&nbsp<strong>' + name + '</strong>,');
        }
        
    });
    
})(jQuery);
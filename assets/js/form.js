(function($) {
    
    // Called on submit form
    var zapierURL = "https://hooks.zapier.com/hooks/catch/1686133/mwv397/";
    
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
                window.location.href = "#thank-you"
            }, 'json');
        }
        
    });
    
})(jQuery);
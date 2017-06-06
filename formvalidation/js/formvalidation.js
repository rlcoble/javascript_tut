$(document).ready(function(){
	$('form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},

			confirmemail: {
				required: true,
				email: true,
				equalTo: 'email'
			},

			password: {
				required: true,
				minlength: 5
			},

			confirmpassword: {
				required: true,
				minlength: 5,
				equalTo: 'password'
			},

		},

		messages: {
			email: {
				required: 'Please provide an email',
				//email: 'Your password must be at least 5 characters long'
			},

			confirmemail: {
				required: 'Please provide an email confirmation',
				//email: 'Your password must be at least 5 characters long'
				equalTo: 'Please enter the same email as above'
			},

			password: {
				required: 'Please provide a password',
				minlength: 'Your password must be at least 5 characters long'
			},

			confirmpassword: {
				required: 'Please provide a password',
				minlength: 'Your password must be at least 5 characters long',
				equalTo: 'Please enter the same password as above'
			}
		}
	});
});
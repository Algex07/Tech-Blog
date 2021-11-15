async function signupFormHandler(event) {
    event.preventDefault();

    // getting data from the form
    const username = document.getElementById('username-signup')
    const password = document.getElementById('password-signup')

        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({
            userName:username.value,
            password:password.value,
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
    // check the response status
        console.log("RESPONSE SIGN UP FORM", response)
    if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');

      } else {
        alert(response.statusText);
      }
    }


document.querySelector('#signup-form').addEventListener('submit', signupFormHandler); 
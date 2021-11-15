

const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();


        const response = await fetch ('api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                userName:username,
                password:password
            }),
            headers: {'Content-Type': 'application/json'},
        });

        console.log(response + " from the loginHandler")

        if (response.ok){
            console.log("success")
            document.location.replace('/dashboard');
        } else {
            alert("Wrong credentials");
        }
};

document.querySelector("#login-form").addEventListener('submit', loginFormHandler)
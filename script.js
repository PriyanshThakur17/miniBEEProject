document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    try{

        const response = await fetch("users.json");

        if(!response.ok){
            throw new Error("Cannot load users.json");
        }

        const users = await response.json();

        const validUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if(validUser){
            message.style.color = "green";
            message.textContent = "Login Successful!";
        }else{
            message.style.color = "red";
            message.textContent = "Invalid Username or Password";
        }

    }
    catch(error){
        message.style.color = "red";
        message.textContent = "Error loading user data.";
        console.error(error);
    }

});
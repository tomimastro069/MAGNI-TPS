function login() {
    //Traigo el valor del input username y lo guardo en la variable user
    let user = document.getElementById("username").value;
    //Traigo el valor del input password y lo guardo en la variable pass
    let pass = document.getElementById("password").value;

    
    //Hago un fetch a la url del login, pasando el usuario y la contraseña como parametros
    fetch(`http://localhost:8080/tp1/login?usuario=${user}&clave=${pass}`)
    //respuesta del servidor la convierto a json
        .then(response => response.json())
        .then(data => {   //data es la respuesta del servidor en formato json
                console.log(data);
            if (user === "" || pass === "") {
                document.getElementById("mensaje").innerText = "Debe completar ambos campos";
                return;
            }
            if (data.respuesta === "OK") {
                window.location.href = "../lista/lista.html";
            } else {
                document.getElementById("mensaje").innerText = data.mje; //muestra el mensaje de error en el elemento con id mensaje
            }

        })
        .catch(error => console.log(error)); 
}
function irARegistro() {
    window.location.href = "../register/register.html";
}
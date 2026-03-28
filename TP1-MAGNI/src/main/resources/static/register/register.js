function registrar() {
    //traigo valor de los datos de usuario y los guardo en variables
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value;
    let apellido = document.getElementById("apellido").value;
    let nombre = document.getElementById("nombre").value;

    fetch("http://localhost:8080/tp1/usuarios", {
        method: "POST",   //tipo de peticion
        headers: {
            "Content-Type": "application/json"    //tipo de contenido que se envia al servidor
        },
        body: JSON.stringify({   //cuerpo de la peticion, se convierte a formato json
            usuario: usuario,
            clave: clave,
            apellido: apellido,
            nombre: nombre,
            bloqueado: "N"
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.respuesta === "OK") {
            document.getElementById("mensaje").innerText = "Usuario creado correctamente";
            window.location.href = "../login/login.html";
        } else {
            document.getElementById("mensaje").innerText = data.mje;
        }

    })
    .catch(error => console.log(error));
}
function volverLogin() {
    window.location.href = "../login/login.html";
}
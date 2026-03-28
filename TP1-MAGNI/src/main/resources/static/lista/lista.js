function cargarUsuarios() {

    fetch("http://localhost:8080/tp1/lista?action=BUSCAR")
        .then(response => response.json())
        .then(data => {
            mostrarUsuarios(data); //respuesta del srv
        });
}

function buscarUsuarios() {

    let texto = document.getElementById("buscar").value;

    fetch(`http://localhost:8080/tp1/lista?action=BUSCAR&usuario=${texto}`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                alert("No hay resultados");
            }

            mostrarUsuarios(data);
        });
}

function bloquear(id, estado) {

    fetch(`http://localhost:8080/tp1/lista?action=BLOQUEAR&idUser=${id}&estado=${estado}`)
        .then(response => response.json())
        .then(data => {

            alert(data.mje);
            cargarUsuarios();

        });
}
function volverLogin() {
    window.location.href = "../login/login.html"; 
}

function mostrarUsuarios(data) {
    //traigo el tbody de la tabla y lo guardo en la variable tbody
    let tbody = document.querySelector("#tabla tbody");

    // limpio tabla
    tbody.innerHTML = "";

    // armo el HTML dentro del js
    let html = "";

    data.forEach(u => {
        let clase 
        if (u.bloqueado === 'Y') {
            clase = 'bloqueado';
        } else {
            clase = 'no-bloqueado';
            }
        html += `
        
            <tr class="${clase}">
                <td>${u.id}</td>
                <td>${u.usuario}</td>
                <td>${u.bloqueado}</td>
                <td>${u.apellido}</td>
                <td>${u.nombre}</td>
                <td>
                    <button onclick="bloquear(${u.id}, 'Y')">Bloquear</button>
                </td>
                <td>
                    <button onclick="bloquear(${u.id}, 'N')">Desbloquear</button>
                </td>
            </tr>
        `;

    });

    // lo mando al HTML
    tbody.innerHTML = html;
}
window.onload = function() {
    cargarUsuarios();
};
const regresar = document.querySelector('#return')
const cerrarS = document.querySelector('#logout')
//Crear objeto modal para cerrar el modal
const myModal = new bootstrap.Modal('#editPerfil', {
    keyboard: false
});

numButton = 0;
document.addEventListener("click", (e) => {
    // CARGA DE DATOS DEL USUARIO AL FRONTEND
    if (e.target.matches("#editar")) {
        e.preventDefault();
        console.log("test")
        document.querySelector("#nombre-form").disabled = false;
        document.querySelector("#telefono-form").disabled = false;

        const user = firebase.auth().currentUser;
        if (user) {
            const doc = db.collection("usuarios").doc(user.uid);
            doc.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data(), user.email);
                    document.querySelector("#nombre-form").value = doc.data().nombre;
                    document.querySelector("#telefono-form").value = doc.data().telefono;
                    document.querySelector("#email-form").value = user.email;
                    document.querySelector("#rol-form").value = doc.data().rol;
                } else {
                    console.log("No such document");
                    document.querySelector("#email-form").value = user.email;

                    db.collection("usuarios").doc(user.uid).set({
                        nombre: user.displayName,
                        telefono: null,
                        rol: "usuario"
                    })
                    document.querySelector("#nombre-form").value = user.displayName;
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        } else {
            alert("User is signed out!!");
        }
    }

    // ACTUALIZAR LOS DATOS DEL USUARIO
    if (e.target.matches("#user-btn")) {
        e.preventDefault();
        const user = firebase.auth().currentUser;

        if (user) {
            const doc = db.collection("usuarios").doc(user.uid);

            return doc.update({
                nombre: document.querySelector("#nombre-form").value,
                telefono: document.querySelector("#telefono-form").value
            })
                .then(() => {
                    alert("Se han actualizado exitosamente los datos");
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        } else {
            alert("User is signed out!!");
        }
    }
    //SELECCIONAR LA OPCION QUE SE VA A MODIFICAR
    if (e.target.matches("#email-edit")) {
        numButton = 1;
    }

    if (e.target.matches("#pass-edit")) {
        numButton = 2;
    }
    // BORRAR CUENTA
    if (e.target.matches("#delete-btn")) {
        numButton = 3;
    }

    // REAUTENTIFICAR AL USUARIO PARA CAMBIAR CORREO O PASSWORD
    if (e.target.matches("#confi")) {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            document.querySelector("#passEdit-form").value
        );
        user.reauthenticateWithCredential(credential)
            .then(() => {
                if (numButton == 1) {
                    document.querySelector("#email-form").disabled = false;
                    document.querySelector("#email-btn").disabled = false;
                }
                if (numButton == 2) {
                    document.querySelector("#pass-form").disabled = false;
                    document.querySelector("#confipass-form").disabled = false;
                    document.querySelector("#pass-btn").disabled = false;
                }
                if (numButton == 3) {
                    user.delete().then(() => {
                        alert("User deleted.!!");
                    }).catch((error) => {
                        alert("An error ocurred!!");
                    });
                }

                myModal.hide();
            }).catch((error) => {
                alert("Password incorrecta")
                console.log(error);
            });
    }

    // ACTUALIZAR CORREO
    if (e.target.matches("#email-btn")) {
        e.preventDefault();

        const user = firebase.auth().currentUser;

        if (user) {
            // ACTUALIZAR CORREO
            user.updateEmail(
                document.querySelector("#email-form").value
            ).then(() => {
                // Update successful
                alert("Update successful");
                document.querySelector("#email-form").disabled = true;
                document.querySelector("#email-btn").disabled = true;
            }).catch((error) => {
                // An error occurred
                console.log("error occurred: ", error);
                alert("error occurred: ");
            });
        } else {
            alert("User is signed out!!");
        }
    }

    // ACTUALIZAR PASSWORD
    if (e.target.matches("#pass-btn")) {
        e.preventDefault();

        const user = firebase.auth().currentUser;

        if (user) {
            //ACTUALIZAR PASSWORD
            user.updatePassword(
                document.querySelector("#pass-form").value
            ).then(() => {
                // Update successful.
                alert("Update successful");
                document.querySelector("#pass-form").disabled = true;
                document.querySelector("#confipass-form").disabled = true;
                document.querySelector("#pass-btn").disabled = true;
            }).catch((error) => {
                // An error ocurred
                console.log("error occurred: ", error);
                alert("error occurred: ");
            });
        } else {
            alert("User is signed out!!");
        }
    }
})

regresar.addEventListener('click',() =>{
    location.href = "perfil.html"
})

cerrarS.addEventListener('click',()=>{
    firebase.auth().signOut()
    .then(function() {
        location.href = "index.html"
    })
    .catch(function(error) {
        console.log(error);
    })
})
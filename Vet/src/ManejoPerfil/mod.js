
//esta libreria sirve para saber los cambios que tiene el usuario en la pagina (a lo que entendi son, si esta con la sesion iniciada o no)
import { onAuthStateChanged, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
//esta libreria sirve para llamar los documentos que se guardaron en la coleccion de firebase, pero estos son para llamarlo individualmente
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
//estos son de firebase, ahi te pongo en el documento de donde salen
import { auth, db } from "../app/firebase.js";


const myModal = new bootstrap.Modal('#editPerfil', {
    keyboard: false
});

var numButton = 0;

document.addEventListener("click", (e) => {
    if (e.target.matches("#editar")) {
        e.preventDefault();
        console.log("test");
        document.querySelector("#nombre-form").disabled = false;
        document.querySelector("#telefono-form").disabled = false;
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                //obtengo el id del usuario para comparar en los docu
                const id = user.uid
                /*recuperacion de datos del firestore
               aqui con las constante que se importaron se le pasan los valores de la bd (en que base de datos se va a guardar), en 
               que coleccion va mandar llamar los datos y por ultimo que documento va a solicitar por su id */
                const docRef = doc(db, "Usuarios", id);
                //esta constate guarda todo lo recuperda del documeto que se encontro 
                const docSnap = await getDoc(docRef);


                //revisa si la informacion del usuario esta guardada en la base de datos de firestores 
                if (docSnap.exists()) {
                    console.log("Document data", docSnap.data(), user.email);
                    document.querySelector('#nombre-form').value = docSnap.data().nombre;
                    document.querySelector('#telefono-form').value = docSnap.data().telefono;
                    document.querySelector('#email-form').value = user.email;
                    document.querySelector('#rol-form').value = docSnap.data().rol;
                    console.log("Se ha encontrado la informacion del usuario :D")
                } else {
                    //se guardan los datos en la base de datos para que el usuario pueda editarlos mas adelante
                    try {
                        await setDoc(doc(db, "Usuarios", id), {
                            telefono: null,
                            nombre: user.displayName,
                            rol: "usuario"
                        });
                    } catch (error) {
                        console.log(error)
                    }
                    console.log("No se ha encontado la informacion del usuario D:")
                }
                console.log("Se ha encontrado sesion del usuario :D");
            } else {
                console.log("No se ha encontrado sesion del usuario D:")
            }
        })
    }

    // ACTUALIZAR LOS DATOS DEL USUARIO
    if (e.target.matches("#user-btn")) {
        e.preventDefault();

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                //obtengo el id del usuario para comparar en los docu
                const id = user.uid
                /*recuperacion de datos del firestore
               aqui con las constante que se importaron se le pasan los valores de la bd (en que base de datos se va a guardar), en 
               que coleccion va mandar llamar los datos y por ultimo que documento va a solicitar por su id */
                const UserRef = doc(db, "Usuarios", id);
                try {
                    await updateDoc(UserRef, {
                        nombre: document.querySelector("#nombre-form").value,
                        telefono: document.querySelector("#telefono-form").value
                    })
                    alert("Se han actualizado exitosamente los datos");
                    console.log("Se han actualizado exitosamente los datos");
                } catch (error) {
                    console.log("Error updating document: ", error);
                }
            } else {
                alert("User is signed out!!");
            }
        })
    }

    //SELECCIONAR LA OPCION QUE SE VA A MODIFICAR
    if (e.target.matches("#email-edit")) {
        console.log("Has pulsado el boton");
        numButton = 1;
    }

    if (e.target.matches("#pass-edit")) {
        console.log("Has pulsado el boton");
        numButton = 2;
    }
    // BORRAR CUENTA
    if (e.target.matches("#delete-btn")) {
        console.log("Has pulsado el boton");
        numButton = 3;
    }


    // REAUTENTIFICAR AL USUARIO PARA CAMBIAR CORREO O PASSWORD
    if (e.target.matches("#confi")) {
        onAuthStateChanged(auth, async (user) => {
            const credential = promptForCredentials(
                user.email,
                document.querySelector("#passEdit-form").value
            );
            reauthenticateWithCredential(user, credential).then(() => {
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
                        alert("An error ocurred!!", error);
                    });
                }
                //myModal.hide()
            }).catch((error) => {
                alert("Contraseña incorrecta");
                console.log(error);
            });
        })

    }
})


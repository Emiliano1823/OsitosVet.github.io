/*Archivos necesarios para recuperar el usuario y el manejo de esto*/

//esta libreria sirve para saber los cambios que tiene el usuario en la pagina (a lo que entendi son, si esta con la sesion iniciada o no)
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
//esta libreria sirve para llamar los documentos que se guardaron en la coleccion de firebase, pero estos son para llamarlo individualmente
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
//estos son de firebase, ahi te pongo en el documento de donde salen
import { auth, db } from "../app/firebase.js";
//esta es otra clase pero es para cerrar sesion desde la pestaña del perfil :D
import "./logoutP.js"

//esta constatnte tambien de firebase la cual si no ha iniciado sesion un usario te regresa en null
const user = auth.currentUser;


//este es el metodo que to utilizo para saber si esta iniciado sesion
onAuthStateChanged(auth, async (user) => {



    //este if funciona solo si se encuentra un usuario, si lo encuentra va a entrar a if
    if (user) {
        document.querySelector('#NombrePerfil').disable = false
        document.getElementById('ApellidosPerfil').disable = false
        document.getElementById('CorreoPerfil').disable = false
        document.getElementById('RolPerfil').disable = false

        //esto solo lo encontro y mostrarlo en la consola 
        console.log(user)
        console.log("Se ha encontrado un usuario :D")
        const id = user.uid
        console.log(user)

        /*recuperacion de datos del firestore
        aqui con las constante que se importaron se le pasan los valores de la bd (en que base de datos se va a guardar), en 
        que coleccion va mandar llamar los datos y por ultimo que documento va a solicitar por su id */
        const docRef = doc(db, "usuarios", id);


        //esta constate guarda todo lo recuperda del documeto que se encontro 
        const docSnap = await getDoc(docRef);
        //ahora se utiliza el metodo .exists para comprobar que se ha encontrado un documento, si se encuentra entra en el if sino lo salta
        try {
            if (docSnap.exists()) {
                console.log("se ha encontrado documento");
            }else{
                console.log("no se ha encontrado");
            }
        } catch (error) {
            console.log(error);
        }
        if (docSnap.exists()) {
            /*se utiliza el metodo .data() para recuperar los datos del documento pero se le agrega por lo que se va a filtrar en este caso 
              es por el rol asi que se le agregar un .rol (esto puede variar dependiendo de como lo guarden en la coleccion de firebase)

              esto los filtra asi dado que en el combobox yo le asigne esos valores 
              3 para administrador 
              2 para veterinario
              1 para usuario
            
              tambien se puede filtrar por palabras como
              - admin
              - veterinario
              - usuario 
              ya solo lo acomodas como lo hayan guardado ustedes*/
            if (docSnap.data().rol == "administrador") {
                /* esta funcion es complemento del css, dado que al iniciar el css desactiva todos los elementos lo que hace es volverlos
                   a activar, este a lo que vi tambien le pudes pasar 'none' el cual los vuelve a desactivar, esto lo comento por si quieres
                   jugar ya con eso tu
                */
                console.log(docSnap.data());

                //recuperacion de valores e impresos en campos correspondietes
                document.getElementById('NombrePerfil').value = docSnap.data().nombre
                document.getElementById('ApellidosPerfil').value = docSnap.data().telefono
                document.getElementById('CorreoPerfil').value = user.email
                document.getElementById('RolPerfil').value = 'Administrador'

                //Elementos ha mostrar para el usuario de administrador :D
                document.getElementById('UsuarioPerfil').style.display = 'block';
                document.getElementById('CitasPerfil').style.display = 'block';
                document.getElementById('MascotasPerfil').style.display = 'block';
                document.getElementById('ProgramarcPerfil').style.display = 'block';
                document.getElementById('UsuariosPerfil').style.display = 'block';


            } else if (docSnap.data().rol == "veterinario") {
                //recuperacion de valores e impresos en campos correspondietes
                document.getElementById('NombrePerfil').value = docSnap.data().nombre
                document.getElementById('ApellidosPerfil').value = docSnap.data().telefono
                document.getElementById('CorreoPerfil').value = user.email
                document.getElementById('RolPerfil').value = 'Veterinario'


                //Elementos ha mostrar para el usuario de administrador :D
                document.getElementById('UsuarioPerfil').style.display = 'block';
                document.getElementById('CitasPerfil').style.display = 'block';
                document.getElementById('MascotasPerfil').style.display = 'block';
                document.getElementById('ProgramarcPerfil').style.display = 'block';



            } else if (docSnap.data().rol == "usuario") {
                //recuperacion de valores e impresos en campos correspondietes
                document.getElementById('NombrePerfil').value = docSnap.data().nombre
                document.getElementById('ApellidosPerfil').value = docSnap.data().telefono
                document.getElementById('CorreoPerfil').value = user.email
                document.getElementById('imagenPerfil').src = user.photoURL
                document.getElementById('RolPerfil').value = 'Usuario'


                //Elementos ha mostrar para el usuario de administrador :D
                document.getElementById('UsuarioPerfil').style.display = 'block';
                document.getElementById('MascotasPerfil').style.display = 'block';
                document.getElementById('ProgramarcPerfil').style.display = 'block';


            }

        } else {
            /*Este else es por si no se encuentra ningun documento, dado que los que esten loggeados con facebook y google no van a 
              tener pero que si les muetre los componentes que ve el usuario  
            */
            console.log("No se encontro ningun documento D:")
            document.getElementById('NombrePerfil').value = user.displayName
            document.getElementById('CorreoPerfil').value = user.email
            document.getElementById('imagenPerfil').src = user.photoURL
            document.getElementById('UsuarioPerfil').style.display = 'block';
            document.getElementById('MascotasPerfil').style.display = 'block';
            document.getElementById('ProgramarcPerfil').style.display = 'block';
        }



    } else {
        console.log("no se ha encontrado ningun usuario D:")
    }
})

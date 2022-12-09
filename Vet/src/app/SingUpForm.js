import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'
import { saveUser } from './firebase.js'

const singupForm = document.querySelector('#loginForm')
const rolSelected = document.querySelector('#Rol-selected')

rolSelected.addEventListener('change', () =>{
    const Rol = rolSelected.value
    console.log(Rol)
})

singupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    /*Recupero los datos de para el registro de la autenticacion, recupero dos veces el usuario y el email 
      por que se me bugeo y no me pasaba bien los datos al firestore y los tuve que acomodar como estan 
      para que asi los pasi bien :D */
    const email = singupForm['singup-email'].value
    const password = singupForm['singup-password'].value

    // const email2 = singupForm['singup-name'].value
    // const password2 =  singupForm['singup-Telefono'].value
    const name = singupForm['singup-name'].value
    const telefono = singupForm['singup-Telefono'].value
    //esta constante de rol selecciona del combobox el rol que se ha seleccionado al momento de registralo y asi guardarlo,
    //este no da problemas asi que se le pasa asi 
    const Rol = rolSelected.value

    console.log(email, password)
   


    try {
        // estos metodos supongo que ya los tienen pero se los pongo por si las dudas
        // es este solo se le pasan los datos capturado y ya :D
        const UserCredentials = await createUserWithEmailAndPassword(auth, email, password)
        // esta constante recupera el id que le genero firebase al momento de registrarlo en la autenticacion por correo
        const id = UserCredentials.user.uid
        // esta constante le pasa los valores al metodo que se crea para el registro del usuario en firebase
        const guardarU = saveUser(name,telefono,Rol,id)
        console.log(id)
        console.log(UserCredentials)
        console.log(guardarU)

        // const singupModal = document.querySelector('#singupmodal')
        // const modal = bootstrap.Modal.getInstance(singupModal)
        

        showMessage("Bienvenido " + UserCredentials.user.email)
        // modal.hide()
        location.href = "perfil.html"

    } catch (error) {
        console.log(error.message)
        console.log(error.code)

        if (error.code === 'auth/email-already-in-use') {
            showMessage("Este correo ya esta en uso", "Error")
        } else if (error.code === 'auth/invalid-email') {
            showMessage("El correo ingresado es invalido", "Error")
        } else if (error.code === 'auth/weak-password') {
            showMessage("Tu contaseña no se puede utilizar", "Error")
        } else if (error.code === 'auth/network-request-failed') {
            showMessage("No tienes conexion a internet", "Error")
        } else if (error.code) {
            showMessage("Tu tranquilo no eres el del problema, o si -_-", "Error")
        }


    }




})
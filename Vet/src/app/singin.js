import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const signInForm = document.querySelector('#login')

signInForm.addEventListener('submit', async e => {
    const email = login['login-email'].value
    const password = login['login-password'].value


    e.preventDefault()
    console.log(email, password)

    try {
        const Credentials = await signInWithEmailAndPassword(auth, email, password)
        console.log(Credentials)

        const singupModal = document.querySelector('#singmodal')
        const modal = bootstrap.Modal.getInstance(singupModal)
        modal.hide()
        //showMessage("Bienvenido :D " + Credentials.user.email)
        //location.replace("ruta a abrir")
        location.href = "perfil.html"
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            showMessage("Este usuario no existe", "Error")
            console.log(error)
        } else if (error.code === 'auth/wrong-password') {
            showMessage("Contrasea incorrecta", "Error")
            console.log(error)
        } else if (error.code === 'auth/too-many-requests') {
            showMessage("Has hecho demaciados intentos, prueba más tarde", "Error")
            console.log(error)
        } else if (error.code === 'auth/network-request-failed') {
            showMessage("No tienes conexion a internet :c", "error")
            console.log(error)
        } else if (error.code) {
            showMessage("Tu tranquilo no eres el del problema, o si -_-", "Error")
            console.log(error)
        }
    }


})


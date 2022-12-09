import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js"

const GoogleButton = document.querySelector('#googleLogin')

GoogleButton.addEventListener('click', async() => {

    const provider = new GoogleAuthProvider()

    try {
        const credentials  = await signInWithPopup(auth, provider)
        console.log(credentials)

        const singupModal = document.querySelector('#singmodal')
        const modal = bootstrap.Modal.getInstance(singupModal)
        modal.hide()
        showMessage('Bienvenido '+credentials.user.displayName)
        location.href = "perfil.html"

    } catch (error) {
        console.log(error)
      }
})
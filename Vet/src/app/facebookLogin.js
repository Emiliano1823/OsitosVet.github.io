import { FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMessage } from "./showMessage.js"

const FacebookButton = document.querySelector('#FacebookLogin')

FacebookButton.addEventListener('click', async() => {

    const provider = new FacebookAuthProvider()

    try {
        const credentials  = await signInWithPopup(auth, provider)
        console.log(credentials)

        const singupModal = document.querySelector('#singmodal')
        const modal = bootstrap.Modal.getInstance(singupModal)
        location.href = "perfil.html"

        // modal.hide()
        // showMessage('Bienvenido '+credentials.user.displayName)

    } catch (error) {
        console.log(error)
      }
})
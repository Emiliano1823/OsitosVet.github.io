import { signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { auth } from '../app/firebase.js'
import { showMessage } from '../app/showMessage.js'


logoutP.addEventListener('click', async () => {
    await signOut(auth)
    console.log('el usuario a cerrado sesion')
    showMessage("Vuelve Pronto :D")
    location.href = "index.html"
})



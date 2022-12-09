import { signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'


logout.addEventListener('click', async () => {
    await signOut(auth)
    console.log('el usuario a cerrado sesion')
    showMessage("Vuelve Pronto!")
})



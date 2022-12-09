// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    // Paste your firebase config here
    apiKey: "AIzaSyDuo3oLYQnxdKdE-t7ZAW7QlyDJy-EzPT8",
    authDomain: "veterinaria-osillos.firebaseapp.com",
    projectId: "veterinaria-osillos",
    storageBucket: "veterinaria-osillos.appspot.com",
    messagingSenderId: "529718415902",
    appId: "1:529718415902:web:8dbdde92187512d68b540f"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

/* creo que esto ya lo tienen pero se los agrego
   este metodo lo exporto para asi solo pasarle los datos que recupera del modal de registro
   para esto utilizo el metodo de set docs dado que este si funciona para asignarle el id de la autenticacion que le 
   asigna firebase al usuario registrado
    */
export const saveUser = async (nombre, telefono, rol, id) => {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "Usuarios", id), {
        telefono: telefono,
        nombre: nombre,
        rol: rol
    });
}
    
/*
necesario importar collection y addDoc para el funcionamiento de este metodo :D
 export const saveUser = (nombre,apellido,correo,pass,rol) => {
    addDoc(collection(db,'Usuarios'),{
        nombre,
        apellido,
        correo,
        pass,
        rol
    })
 }*/
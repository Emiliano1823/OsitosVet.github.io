const firebaseConfig = {
  // Paste your firebase config here
  apiKey: "AIzaSyDuo3oLYQnxdKdE-t7ZAW7QlyDJy-EzPT8",
  authDomain: "veterinaria-osillos.firebaseapp.com",
  projectId: "veterinaria-osillos",
  storageBucket: "veterinaria-osillos.appspot.com",
  messagingSenderId: "529718415902",
  appId: "1:529718415902:web:8dbdde92187512d68b540f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();
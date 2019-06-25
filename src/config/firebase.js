import firebase  from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA3d6ARiE4TQYtn5FAOaND9OrHa_H-ZlsQ",
    authDomain: "food-app-210.firebaseapp.com",
    databaseURL: "https://food-app-210.firebaseio.com",
    projectId: "food-app-210",
    storageBucket: "food-app-210.appspot.com",
    messagingSenderId: "477395494158",
    appId: "1:477395494158:web:597f9d6b640110f8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebaseApp.firestore();

  const auth=firebase.auth();


  
  export  {db,auth} ;

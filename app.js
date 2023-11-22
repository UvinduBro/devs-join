// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDTkxP0z0_HMeMnAzHTgSsZnTzP1IF4y0c",
  authDomain: "devslk.firebaseapp.com",
  projectId: "devslk",
  storageBucket: "devslk.appspot.com",
  messagingSenderId: "65076380686",
  appId: "1:65076380686:web:a8c8af6cc6df90c123285f",
  measurementId: "G-ND5VDGXYYD"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

async function signInWithGitHub() {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.setCustomParameters({
    client_id: 'e8dedc1e2e8dc901b462',
  });

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    // Save user data and selected category to Firebase
    saveUserData(user, document.getElementById('category').value);
  } catch (error) {
    console.error(error);
  }
}

function saveUserData(user, category) {
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    category: category
  };

  // Save data to Firebase database
  database.ref('users/' + user.uid).set(userData);
}
// Firebase authentication
var auth = firebase.auth();
var db = firebase.firestore();

// GitHub sign-in function
function signInWithGitHub() {
  var provider = new firebase.auth.GithubAuthProvider();

  auth.signInWithPopup(provider)
    .then(function(result) {
      var user = result.user;
      saveUserData(user);
    })
    .catch(function(error) {
      console.error(error);
    });
}

// Sign out function
function signOut() {
  auth.signOut()
    .then(function() {
      console.log("Sign out successful");
    })
    .catch(function(error) {
      console.error("Error signing out: ", error);
    });
}

// Save user data to Firestore
function saveUserData(user) {
  db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
  })
  .then(function() {
    console.log("User data successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing user data: ", error);
  });
}

// Listen for authentication state changes
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user);
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});

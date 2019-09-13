export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signInAnonymously  = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInAnonymously().then(() => {
      dispatch({ type: 'LOGIN_ANONYMOUSLY_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ANONYMOUSLY_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const anonymousTopermanentUser = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();

    // firebase.auth().createUserWithEmailAndPassword(
    //   newUser.email, 
    //   newUser.password
    // ).then(resp => {
      var credential = firebase.auth.EmailAuthProvider.credential(newUser.email, newUser.password);
      console.log("Anonoymous User")
      return firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function(usercred) {
        var user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
        dispatch({ type: 'CONVERSION_SUCCESS' });
      }, function(error) {
        console.log("Error upgrading anonymous account", error);
        dispatch({ type: 'CONVERSION_ERROR', error});
      });
    // }).then(() => {
    //   dispatch({ type: 'CONVERSION_SUCCESS' });
    // }).catch((err) => {
    //   dispatch({ type: 'CONVERSION_ERROR', err});
    // });
  }
}
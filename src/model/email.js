import firebase from '../config/fbConfig'
import 'firebase/storage';
import 'firebase/auth';

export const emailPassword  = (emailAddress) => {
    var auth = firebase.auth();

auth.sendPasswordResetEmail(emailAddress).then(function() {
  console.log('email for password setting send')
  return true;
}).catch(function(error) {
  console.log (error)
});
  }

  export const emailSelectedSlides = (email) =>{
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link'
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
  }
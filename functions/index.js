const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});

exports.deleteUsers = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().deleteUser(data.uid)
  .then(function() {
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });
});

exports.createUser = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().createUser({
    email:data.email,
    emailVerified: false,
    password:data.password,
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      return{
        message:userRecord.uid,
        emails:userRecord.email
      } 
    })
    .catch(function(error) {
      console.log('Error creating new user:', error);
    });
});

exports.addBranchRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      branch: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an branch.`
    }
  }).catch(err => {
    return err;
  });
});


import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import { CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cogConfig from './Config';
import {User} from 'src/app/Models/user.model'
export class CognitoAuth {

  userSession;
  userPool;
  options = new Config();

  constructor() {
    this.userSession = null;
    this.configure(cogConfig);
  }

  isAuthenticated(cb?): boolean | any {
    const cognitoUser = this.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          if (cb === undefined) {
            return false;
          } else {
            return cb(err, false);
          }
        }

        if (cb === undefined) {
          return true;
        } else {
          return cb(null, true);
        }
      });
    } else {
      if (cb === undefined) {
        return false;
      } else {
        return cb(null, false);
      }
    }
  }

  configure(config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Error('[CognitoAuth error] valid option object required');
    }

    this.userPool = new CognitoUserPool({
      UserPoolId: config.UserPoolId,
      ClientId: config.ClientId,
    });


    this.options.region = config.region;
    this.options.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    });
  }

  signup(user, name, familyName, emailAddress, password, cb) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      }),

      /*new CognitoUserAttribute({
        Name: 'family_name',
        Value: familyName
      }),*/

      new CognitoUserAttribute({
        Name: 'email',
        Value: emailAddress
      })
    ];

    this.userPool.signUp(user, password, attributeList, null, cb);
  }

  authenticate(username, pass, cb) {
    const authenticationData = { Username: username, Password: pass };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('access token + ' + result.getAccessToken().getJwtToken());

        /*var logins = {};
        logins['cognito-idp.' + this.options.region + '.amazonaws.com/' + this.option.UserPoolId] = result.getIdToken().getJwtToken();
        console.log(logins);
        Config.credentials = new CognitoIdentityCredentials({
            IdentityPoolId: this.options.UserPoolId,
            Logins: logins
        });*/

        cb(true, result);
      },
      onFailure: (err) => {
        cb(false, err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log('New password is required');
      }
    });
  }

  getCurrentUser() {
    return this.userPool.getCurrentUser();
  }

  confirmRegistration(username, code, cb) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    });

    cognitoUser.confirmRegistration(code, true, cb);
  }

  logout() {
    this.getCurrentUser().signOut();
  }

  getIdToken(cb) {
    if (this.getCurrentUser() ==  null) {
      return cb(null, null);
    }

    this.getCurrentUser().getSession((err, session) => {

      if (err) {
        return cb(err);
      }

      if (session.isValid()) {
        return cb(null, session.getIdToken().getJwtToken());
      }

      cb(Error('Session is invalid'));
    });
  }

  recoverPassword(user, pass, cb) {
    const userData = { Username: user, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        // successfully initiated reset password request
        console.log('CodeDeliveryData from forgotPassword: ' + data);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
      // Optional automatic callback
      inputVerificationCode: (data) => {
        const verificationCode = prompt('Por favor introduce el código de verificación enviado: ', '');
        cognitoUser.confirmPassword(verificationCode, pass, {
          onSuccess() {
            cb(true);
          },
          onFailure(err) {
            cb(err);
          }
        });
      }
    });
  }
}

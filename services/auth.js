const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const authParse = require('../services/authParse')

const poolInfo = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolInfo)

function signUp (form) {
  const email = form.email
  const name = form.name
  const password = form.password
  const confirmPassword = form.confirmPassword
  const errorArr = []
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (password !== confirmPassword) { errorArr.push('Las constraseñas no coinciden') }
  if (!email || !emailRegex.test(email)) { errorArr.push('Email invalido') }
  if (!name) { errorArr.push('No hay nombre') }

  if (errorArr.length) {
    return errorArr
  } else {
    const userData = { email, name }
    const attributes = authParse.attributeMapping(userData)
    return new Promise(function (resolve, reject) {
      userPool.signUp(email, password, attributes, null, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.user)
        }
      })
    })
  }
}

function login (form) {
  const email = form.email
  const password = form.password

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password })

  const userDetails = {
    Username: email,
    Pool: userPool
  }
  return new Promise(function (resolve, reject) {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (data) => {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(err)
          } else {
            localStorage.setItem('token', session.getIdToken().getJwtToken())
          }
        })
        resolve(data)
      },
      onFailure: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
  signUp,
  login
}

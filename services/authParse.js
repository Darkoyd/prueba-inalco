const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

function attributeMapping (userDetails) {
  const email = userDetails.email
  const name = userDetails.name

  const emailData = {
    Name: 'email',
    Value: email
  }
  const nameData = {
    Name: 'name',
    Value: name
  }

  const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData)
  const nameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(nameData)

  const attributes = [emailAttribute, nameAttribute]
  return attributes
}

module.exports = {
  attributeMapping
}

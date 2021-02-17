"user strict"
console.log("Loading function");
const pwdHistory = require('./pwd.js')
var AWS = require("aws-sdk");
var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
exports.handler = (event, context, callback) => {
    var userId = event.userName;
    console.log(event);
    if(event.triggerSource === "PostAuthentication_Authentication")
    {
        pwdHistory.addorUpdatePassword("localtestcog1@yopmail.com","Test@q342342dd3", (output)=>{
            if(!output)
            {
                callback(null, event);
            }
        });
    }
    if(event.triggerSource == "PostConfirmation_ConfirmForgotPassword")
    {
        pwdHistory.checkpasswordHistory("localtestcog1@yopmail.com","Test@q342342dd3")
    }
   //addorUpdatePassword("localtestcog1@yopmail.com");


    // Return to Amazon Cognito
    callback(null, event);
};
const passwordHistory = require('./models/passwordHistory.js')
const crypto = require('./crypto.js');

module.exports = {
     checkPasswordHistory(email, currentPwd, output) {
        passwordHistory.findExistingRecordsHistory(email, (result) => {
            if(result.kind && result.kind == 'not_found'){
                return ;
            }
            else {
                output({success: checkpasswordHistory(crypto.gethash(currentPwd), JSON.parse(result.pasword) )})
                return;
            }
        
        })
        return;    
    },
     addorUpdatePassword(email, output) {
        passwordHistory.findExistingRecordsHistory(email, (result)=>{
            if(result.kind && result.kind == 'not_found'){
                console.log('inside create');
                   passwordHistory.create(email, pwd, (result) => {
                    output({result});
                   })
            }
            else {
                const response = verifyPasswordlengthandPwd(result,pwd);
                passwordHistory.updateById(response.password, result.id, result.passwordID, (updateresult)=>{
                    output({result});
                    return;
                })
            }
            return false;
        });
        return false;
    },
     
     verifyPasswordlengthandPwd(pwddata, currentPwd) {
       if(pwddata) {
        const pwdArray = JSON.parse(pwddata.pasword);
        console.log("array == ", pwddata);
       const searchItem =  pwdArray.find(x=>x == crypto.gethash(currentPwd));
        if(!searchItem){
            pwdArray &&  pwdArray.length>=14  ? pwdArray.pop() :
            pwdArray.push(crypto.gethash(currentPwd));
            pwddata.password = JSON.stringify(pwdArray);
        }
       }
       return pwddata;
    },
     checkpasswordHistory(currentpwd, passworhistoryArray) {
        passworhistoryArray.forEach(element => {
            if(currentpwd === element)
            {
                console.log(false);
                return false;
            }
        });
        return true;
    }
}






const sql = require('./db.js')
const PasswordHistory = function(pwd){
    this.id = pwd.id
    this.password = pwd.password;
    this.consumer_ID = pwd.consumer_ID
}
PasswordHistory.create  = (email, newpwd, result) => {
    const query = `select id from consumer where email = '${email}'`;

    sql.query(query, (err, res) =>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        console.log("select" + res)
        if(res && res.length)
        {
            console.log(res[0])
            const pwdObj = {
                consumer_ID: res[0].id,
                pasword: JSON.stringify([newpwd])
            }
            console.log(pwdObj);
            sql.query("INSERT INTO passwordhistory SET ?", pwdObj, (err, res) =>{
                if(err){
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result({kind: 'data Created'})
                console.log("Created date:")
            });
        }
    });
}

PasswordHistory.findExistingRecordsHistory = (email, result) => {
    const query = `select consumer.id, passwordhistory.pasword,  passwordhistory.id as passwordID
    from passwordhistory inner join consumer on consumer.id = passwordhistory.consumer_ID
    where consumer.email = '${email}'`;
    console.log(query);
        sql.query(query, (err, res) => {
        if (err) {
                console.log("error: ", err);
                result(err, null);
                return; 
            }
          if (res.length) {
                console.log("data: ", res[0]);
                result( res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
            return;

        });
    }

    PasswordHistory.updateById = (newpwd,consumerID,id,  result) => {
        console.log(newpwd);
        sql.query(
            "update passwordhistory SET consumer_ID =?, pasword = ?  where id =?",
            [consumerID, newpwd, id],
            (err, res) => {
                if(err){
                    console.log("error:", err);
                    return result({err});
                }
                if(res.affectedRows ==0) {
                result({kind: "not_found"}, null)
                }
                result(null, {});
            }
           
        )
    }
module.exports = PasswordHistory;
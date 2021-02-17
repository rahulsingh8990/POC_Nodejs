var crypto = require('crypto');
const hashdata = function(){};
module.exports = {
gethash(key)
{
    var crypto = require('crypto');
    var hash = crypto.createHash('md5').update(key).digest('hex');
    console.log(hash)
    return hash;
}
};
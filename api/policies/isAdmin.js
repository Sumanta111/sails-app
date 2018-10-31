var jwt = require('jwt-simple');

module.exports = function (req,res,next){
    var token = customService.getTokens(req.headers);
    var decoded = jwt.decode(token, 'MySecretForEncode');

    User.findOne(decoded.id,function(err,foundUser){
        if(err){
            res.negotiate(err);
        }

        if(!foundUser){
            res.forbidden('You are not permitted to perform this action');
        }
        if(foundUser.role == 2 || foundUser.role == 3){
            return next();
        }else{
            return res.forbidden('You are not permitted to perform this action');
        }
    });
}
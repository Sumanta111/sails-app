/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

module.exports = {
  register : function(req,res){
      data = {
          name  : req.body.name,
          email : req.body.email,
          password : req.body.password
      };
      User.create(data,function(err,user){
          if(err){
              res.status(500).send({err:"Database Error Occured"});
          }else{
              res.status(201).send({status:201,msg:"User Successfully Created"});
          }

      });
  },

  login : function(req,res){
      User.findOne({
          email : req.body.email
      },function(err,user){
          if(err){
            res.status(500).send({err:"Database Error Occured"});
          }
          if(!user){
            res.send({success: false, msg: 'Authentication failed. User not found.'});
          }else{
            User.comparePassword(req.body.password,user,function(err,isMatch){
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, 'MySecretForEncode');
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                  } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                  }
            })
          }
      });
  },
  profile : function(req,res){
    var token = customService.getTokens(req.headers);
    if (token) {
        var decoded = jwt.decode(token, 'MySecretForEncode');
        User.findOne({
          email: decoded.email
        }, function(err, user) {
            if (err) throw err;
     
            if (!user) {
              return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                  res.json({success: true, msg: 'Welcome to your profile area :  ' + user.name});
                
            }
        });
      } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
  }

};


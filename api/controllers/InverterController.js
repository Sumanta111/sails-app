/**
 * InverterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create : async function(req,res){
        var userId = req.body.userId;
        var user = await User.findOne({ id: userId });
        if (!user){
            return res.status(403).send({msg:'Invalid User Id'});
        }else{
            await Inverter.create({
                name : req.body.name,
                company : req.body.company,
                owner : user.id
            },function(err,inverter){
                if(err){
                    res.status(500).send({err:"Database Error Occured"});
                }else{
                    res.status(201).send({status:201,msg:"Inverter added to the User successfully",detail:inverter});
                }
            })
        }
    },
    read : async function(req,res){
        var userId = req.param('userId');
        var user = await User.findOne({ id: userId });
        if (!user){
            return res.status(403).send({msg:'Invalid User Id'});
        }else{
            var inverters = await User.findOne({id:userId}).populate('inverters');
            res.json({data : inverters})
        }
    }

};


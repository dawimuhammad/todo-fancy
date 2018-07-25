const User  = require('../models/model-user')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')

class UserController{
    static getHome (req, res) {
        res.send('You are in User Route Homepage')
    }
    
   static logIn (req, res){
        let { email, password } = req.body

        User.findOne({ email })
        .then( function (user) {
          user.comparePassword( password, function (err, isMatch) {
            if ( err ) {
               res
               .status(401)
               .json({
                  message: err.message
               })
            }
            else {
               if( isMatch ){
                  let token = jwt.sign({_id: user.id}, process.env.secretKey)
                  res
                    .status(200)
                    .json({
                        user, 
                        token, 
                        message: "Token generated"
                    });
               }
               else{
                  res
                    .status(400)
                    .json({
                        message: "Password is wrong!"
                    })
               }
            }
          })
      })
      .catch(function(err){
         res
         .status(400)
         .json("User is not found!");
      })
   }

   static findOne(req, res){
      let {id} = req.headers;

      User.findById(id)
      .then(function(user){
         res.status(200)
         .json(user);
      })
      .catch(function(err){
         res.status(400)
         .json(err.message)
      })
   }

   static register(req, res){
        let {email, username, password} = req.body;
        
        User.create({
            email,
            username,
            password
        })
        .then( function() {
            res
                .status(201)
                .json({
                    message: "Successfully created new user",
                })
        })
        .catch( function (err) {
            res
                .status(401)
                .json({
                    message: err.message
                })
        })
   }
}

module.exports = UserController;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupModel = require("../models/RegisterModel");

const hashThePassword = async (password) => {
    let resultReturn;
    let salt = await bcrypt.genSalt(10);
    await bcrypt
        .hash(password, salt)
        .then((result) => {
            resultReturn = result;
        })
        .catch((err) => (resultReturn = ""));
    return resultReturn;
};

const SignupUser = async (req, res) => {
    let { name, email, mobile, password ,device,browser} = req.body;

    signupModel.count({ email }, async(err, count) => {
        if (err) throw err
        console.log(count,req.body)
        if (count) {
            res.status(200).json({
                status: 200,
                redirect: true,
                signup: 'failed',
                message: 'User is already reistered ! Proceed to login'
            })
        } else {
            let hsdpass=await hashThePassword(password)
            let newuser = new signupModel({
                name,
                email,
                mobile,
                password: hsdpass,
                date: new Date(),
                device,
                browser,
            });
            newuser
                .save()
                .then(() => {
                    res.status(200).json({
                        status: 200,
                        signup: "success",
                        redirect: true,
                        message: "Signup Success ! Proceed to login",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: 500,
                        signup: "failed",
                        redirect: false,
                        message: "Signup failed ! Please try again",
                    });
                });
        }
    });
};

const Login =  (req, res) => {
    let { email, password } = req.body;
    
    let resObject

    signupModel.find({email})
    .then((result)=>{
        console.log(result)
        if (result.length>0 && bcrypt.compareSync(password, result[0].password)) {
            resObject = {
                login: "success",
                valid_user: true,
                redirect:true,
                message: "loggin success",
            };
            let payload = resObject;
    
            const token = jwt.sign(
                {
                    data: payload,
                },
                "shaktksha",
                { expiresIn: 60 * 60 * 24 }
            );
            resObject["token"] = token;
            res.status(200).json(resObject)
        } else {
            resObject = {
                login: "failed",
                valid_user: false,
                redirect:false,
                message: "invalid username or password",
            };
            res.status(200).json(resObject)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json(err)
    })
};

module.exports = { Login, SignupUser };

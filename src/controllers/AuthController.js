let models = require('../models')
let Users = models.Users
let Role = models.Role
let UserPerusahaan = models.UserPerusahaan
let jwt = require('jsonwebtoken')  
let bcrypt = require('bcrypt')
let Yup = require('yup')
let { JWTSECRET } = require('../constants');
const fetch = require('node-fetch');

async function postLogin(req, res) {
	let { username, password, tokenCaptcha } = req.body
	let including  = [{
		model:UserPerusahaan
	},{
		model:UserPerusahaan,
		as:'UserPerusahaans',
	}]
	
	try{

		const validCaptcha = await validateTokenCaptcha(tokenCaptcha)
		if(!validCaptcha){
			return res.status(400).json({message: 'Captcha tidak valid!' })
		}

		let user = await Users.findOne({
			where: {
				email: username
			},
			include: including
		})
		
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({message: 'username atau password salah' })
		}

		let payload = {user: {
			id: user.id,
			username: user.username,
			email: user.email,
			roleId: user.roleId,
		}
		} // untuk generate jwt
		let token = jwt.sign(payload, 'abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', { expiresIn: '0.5h' })

		return res.status(200).json({ message: 'success', token:token})
	} catch (err) {
		return res.status(500).json({message: err.message})
	}
}

async function validateTokenCaptcha(tokenCaptcha) {
	const secret = process.env.NODE_ENV_RECAPTCHA_SECRET_KEY
	const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${tokenCaptcha}`,
    {
      method: "POST",
    }
	);
	
	const data = await response.json();
	console.log(data, 'validate token Captcha')
  return data.success;
}


const AuthController = {
	postLogin,
}

module.exports =  AuthController

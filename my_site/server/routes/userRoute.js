import express from 'express'
import User from '../db/schemas/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {secret} from '../config.js'

const router = express.Router()

const generateAccessToken = (user) => {
  const payload = {
    user
  }
  return jwt.sign(payload, secret, {expiresIn: "1h"})
}

router.post('/registration', async (req, res) => {
    const response = {
      ok: false,
      errMsg: 'Ошибка при регистрации'
    }
  
    const { body } = req
    try {
      
        await bcrypt.hash(body.password, 3, async (err, result) => {
            const user = new User({
                login: body.login,
                password: result,
                name: body.name,
                fullname: body.fullname,
                email: body.email,
            })

            const existingUser = await User.findOne({ email: body.email });
            if (existingUser) {
              response.errMsg = 'Пользователь с таким адресом электронной почты уже существует';
              return res.status(400).json(response);
            }
    
            await user.save();
      
            response.ok = true;
            response.errMsg = '';
            response.user = user; 
            res.status(200).json(response);
        })
        
  
    } catch (error) {
      res.status(400).json(response);
    }
  })

router.post('/login', async (req, res) => {
    const response = {
      ok: false,
      errMsg: 'Ошибка при авторизации'
    }
  
    const { body } = req
    try {
      const user = await User.findOne({email: body.email});

      const isPassed = await bcrypt.compare(body.password, user.password);

      if (!isPassed) {
        response.ok = false;
        response.errMsg = 'Почта или пароль введены неправильно';
        res.status(200).json(response);
        return;
      }

      const token = generateAccessToken(user)

      response.ok = true;
      response.errMsg = '';
      response.user = user; 
      response.token = token;
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(response);
    }
  })


  export default router
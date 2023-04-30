import express from 'express'
import { registerUser, loginUser, doesUserExist } from '../controllers/auth'
import { body } from 'express-validator';

const router = express.Router();

//POST /auth/
router.post('/', [
    body('name').trim().notEmpty().isLength({ min: 4 }),
    body('email').trim().isEmail().custom(emailId => {
        return doesUserExist(emailId).then((status) => {
            if (status) {
                return Promise.reject("User already exists");
            }
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
    ).normalizeEmail(),
    body('password').trim().isLength({ min: 8 }).withMessage("Enter atleast 8 character long password")
], registerUser);

//POST /auth/login
router.post('/login', [
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Email!"),
    body("password")
        .trim()
        .isLength({ min: 8 })], loginUser)

export default router;
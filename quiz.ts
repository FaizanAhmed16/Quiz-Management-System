import express from 'express';

import { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz } from '../controllers/quiz';
import { isAuthenticated } from '../middlewares/isAuth';
import { body } from 'express-validator';
import { isValidQuizName } from '../controllers/quiz';

const router = express.Router();

//POST /Create quiz
router.post('/', [
    body("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Please enter a valid name, minimum 10 character long").custom((name) => {
            return isValidQuizName(name)
                .then((status: Boolean) => {
                    if (!status) {
                        return Promise.reject("Plaase enter an unique quiz name.");
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }),], isAuthenticated, createQuiz)

//GET /Get quiz with id
router.get('/:quizId', isAuthenticated, getQuiz)

//UPDATE /Update a quiz
router.put('/', [body("name")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid name, minimum 10 character long")], isAuthenticated, updateQuiz)

//DELETE /Delete a quiz
router.delete('/:quizId', isAuthenticated, deleteQuiz)

//PUBLISH /Publish a quiz
router.patch('/publish', isAuthenticated, publishQuiz)

export default router;
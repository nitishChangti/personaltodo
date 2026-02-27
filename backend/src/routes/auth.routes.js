import express from "express";
const router = express.Router();
import {body} from "express-validator";
import {registerUser, loginUser,logoutUser, getCurrentUser, getAllUsersAdmin, deleteUserAdmin} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/verifyJwt.middlewares.js";
import { get } from "mongoose";

router.route('/register').post(
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    registerUser
);
router.route('/login').post(
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
    loginUser
);

router.route('/logout').post(
    verifyJWT,
    logoutUser);

router.route('/me').get(
    verifyJWT,
    getCurrentUser);

router.route('/admin/users').get(
    verifyJWT,
    getAllUsersAdmin);

router.route('/admin/:id').delete(
    verifyJWT,
    deleteUserAdmin
)

export default router;
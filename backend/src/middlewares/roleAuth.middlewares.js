import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.utils.js';
import {ApiError} from '../utils/ApiError.utils.js';
import { config } from '../config/config.js';
const authorizaion = (allowedRoles)=>{
    return asyncHandler(async(req,res,next)=>{
        const token = req.headers.cookies?.token || req.header('Authorization')?.replace("Bearer", " ").trim();
        if(!token){
            return res.status(401).json(new ApiError(401, "Unauthorized", "No token provided"));
        }
        // console.log('decoded token:', token);
        const decoded = jwt.verify(token, config.get('ACCESS_TOKEN_SECRET'));
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json(new ApiError(401, "Unauthorized", "Invalid token"));
        }
        if(!allowedRoles.includes(user.role)){
            return res.status(403).json(new ApiError(403, "Forbidden", "You don't have permission to access this resource"));
        }
        req.user = user;
        next();
    })
}
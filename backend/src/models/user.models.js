import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true   
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    refreshToken:{
        type:String,
        trim:true,
        default:null
    }
},{
    timestamps:true
})


userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

userSchema.methods.generateAccessToken = function(){
    const token =
    jwt.sign(
        {id:this._id,role:this.role},
        config.get('ACCESS_TOKEN_SECRET'),
        {expiresIn:config.get('ACCESS_TOKEN_EXPIRY')}
    );
    return token;
}

userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign(
        {id:this._id,role:this.role},
        config.get('REFRESH_TOKEN_SECRET'),
        {expiresIn:config.get('REFRESH_TOKEN_EXPIRY')}
    );
    // this.refreshToken = refreshToken;
    return refreshToken;
}



const User = mongoose.model('User',userSchema);
export default User;
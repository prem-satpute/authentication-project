import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import config from '../config/config.js';
import User from '../models/user.model.js'
import passport from 'passport';

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb)=> {
    try{
       const user =await   User.findOneAndUpdate({ googleId: profile.id },{isLoggedIn:true});

       if(!user){
        await User.create({
            username:profile.displayName,
            email:profile.emails[0].value,
            googleId:profile.id,
            avatar:profile.photos[0].value,
            isLoggedIn:true,
            isVerified:true
        });

       }

       return cb(null,user);
    }catch(err){
        return cb(err,null);
    }
  }
));
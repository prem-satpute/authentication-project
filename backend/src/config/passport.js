import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';

import config from './config.js'
import User from '../models/user.model.js';
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, cb) =>{
    
    try{
       const email = profile.emails?.[0]?.value;
       if (!email) {
         return cb(new Error('Google account did not provide an email address'));
       }

       const user = await User.findOneAndUpdate(
         { googleId: profile.id },
         {
           $set: { isLoggedIn: true },
           $setOnInsert: {
             googleId: profile.id,
             username: profile.displayName,
             email,
             avatar: profile.photos?.[0]?.value,
             verified: true,
           },
         },
         { upsert: true, new: true, setDefaultsOnInsert: true },
       );

       return cb(null, user);

    }catch(err){
        return cb (err, null)

    }
    
  }
));
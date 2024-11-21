import { Request } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SECRET } from "../config";
import { getUserById } from "../helpers/user.helper";
import { jwtAuth } from "../utils/token.utils";


const cookieExtractor = function(req: Request) {
    var token = null;
    if (req && req.cookies)
    {
        if (req.cookies.bearerToken){
            const bTokenCookie = req.cookies.bearerToken;
            const bToken = bTokenCookie.split(" ");
            token = bToken[1];
        } else {
            token = req.cookies
        }
    }
    return token;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: SECRET,
}

export const passportStrategy = new Strategy(opts, async (jwt_payload, done) => {
    try {
        let user = await getUserById( jwt_payload.id);
        if(user){
            console.log(user);
            console.log(jwt_payload);
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
        return done(err, false);
    }    
})

export const authenticateToken = passport.authenticate("jwt", {session: false});
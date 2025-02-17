import passport from 'passport';
import { Request } from 'express';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;

const secret = process.env.JWT_SECRET;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.jwt;
  }

  return jwt;
};

const cookieExtractorForRefresh = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.refresh;
  }

  return jwt;
};

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done('Unauthorized', false);
      }

      done(null, jwtPayload);
    }
  )
);

passport.use(
  'jwt-refresh',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractorForRefresh,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done('Unauthorized', false);
      }

      done(null, jwtPayload);
    }
  )
);

import { PassportStatic } from 'passport';//this is just for typescript
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { MyUser } from './Models/MyUser.js'

export default function initialize(
  passport: PassportStatic, 
  getUserByUserName: (username: string) => Promise< MyUser | undefined>, 
  getUserById: (id:number) => Promise< MyUser| undefined >
) {

  passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    const user = await getUserByUserName(username);
    if (user === null || user === undefined)
      return done(null, false, { message: 'No user found' }); //the first argument is a server error, and we have no server-side error if the user wasn't found
    // false shows that a user wasn't found
    try {
      if (await bcrypt.compare(password, user.password)){
        console.log('logged in')
        return done(null, user as Express.User) //the comparison was right, so we just return the user
      }
        
      else
        return done(null, false, { message: 'Password incorrect' })
    } catch (e) {
      return done(e);//this time we had a server-side problem, so the first argument is not null
    }
  })); //okay, okay
  //It loads forever if you don't implement these two functions:
  passport.serializeUser((user, done) => done(null, (user as MyUser).id)); //we're telling typescript that we know what we're doing here
  //so it stops giving those dumb errors
  passport.deserializeUser(async (id:number, done) => {
    const deserializedUser = await getUserById(id);
    return done(null, deserializedUser);
  });

}
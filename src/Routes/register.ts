import { Router, Request, Response, json } from "express";
import { checkNotAuthenticated } from "../Services/CheckAuthService.js";
import { insertUser } from "../Services/DatabaseService.js";
import bcrypt from 'bcrypt';
import { UserDtos } from "../Models/MyUser.js";

// :/register

const route = Router();
//route.use( urlencoded({ extended : false }) );
route.use( json() );
route.use( checkNotAuthenticated);  //this will probably work before every request, I think

type RegisterPostRequest = Request<{}, {}, { username: string, password: string }> //we've written the req.body composition

route.post('/', async (req: RegisterPostRequest, res: Response) => {
  //due to the urlencoded middleware, we can immediately use req.body.<insert name of input here>
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is how many times that hash is hashed from what I understand
    const user = new UserDtos( req.body.username, hashedPassword);
    const success = await insertUser(user);
    if (success)
      console.log('successfully pushed:', user);
    res.redirect('../login');
  } catch {
    res.redirect('/');
  }
});

export default route;
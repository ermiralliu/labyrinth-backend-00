import { Router, Request, Response, json } from "express";
import { PassportStatic } from "passport"; //We actually need to use passport from the index.ts, so I'm not sure if this is gonna work
import { checkNotAuthenticated } from "../Services/CheckAuthService.js";

// :/login
export default function loginRoute(passport: PassportStatic) {
  const route = Router();
  route.use(json());
  route.use(checkNotAuthenticated);

  route.get('/', async (req: Request, res: Response) => {
    res.json(req.user ?? {message: 'is not defined, srry'});    //we won't need to pass any extra info to this
  });

  route.post('/', checkNotAuthenticated, (req,res,next)=>{
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    return next();
  }, passport.authenticate('local'), (req: Request, res: Response)=>{
    if(req.user)
      res.send({
        status: 200,
        data: "login successful"
      });
    else
      res.send({
        status: 404,
        data: "login unsuccessful"});
  });
  return route;
}
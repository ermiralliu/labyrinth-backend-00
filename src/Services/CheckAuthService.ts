import { Request, Response, NextFunction } from 'express';

export function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated())
    return next();
  const message = 'not authenticated, srry';
  console.log(message)
  //res.redirect('../login');
  res.json({message});
}

export function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated())
    return next();
  const message = 'already authenticated';
  console.log(message)
  //res.redirect('../login');
  res.json({message});
}

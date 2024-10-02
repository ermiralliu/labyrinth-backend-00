import { Router, urlencoded } from 'express';
import { getBoardsforUser, saveBoard } from '../Services/DatabaseService.js';
import { checkAuthenticated } from '../Services/CheckAuthService.js';
import { MyUser } from '../Models/MyUser.js';

const route = Router();

route.use(checkAuthenticated);
route.use(urlencoded({extended:false}));

route.get('/', async (req, res) => {
  const user = req.user as MyUser;
  const boards = await getBoardsforUser(user.id);
  res.json(boards);
});

route.post('/', async (req, res)=>{
  const board: string = req.body.board;
  const user = req.user as MyUser;
  const result = await saveBoard(user.id, board);
  if(result)
    res.redirect('');  //gonna place the urls to redirect in some constants file or sth
  else
    res.redirect('');
});

export default route;
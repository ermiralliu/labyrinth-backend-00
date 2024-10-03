import { json, Router } from 'express';
import { getBoardsforUser, saveBoard } from '../Services/DatabaseService.js';
import { checkAuthenticated } from '../Services/CheckAuthService.js';
import { MyUser } from '../Models/MyUser.js';

const route = Router();

route.use(checkAuthenticated);
route.use(json());

route.get('/', async (req, res) => {  //returns only the names and date added for the board, but not their representative strings
  const user = req.user as MyUser;
  const boards = await getBoardsforUser(user.id);
  res.json(boards);
});

route.get('/:id', async (req,res)=>{
  console.log(req.url);
  /*
  const board = await getBoard(id, req.user.id);
  res.json({message: 'Board NOT FOUND'});
  */
})

route.post('/', async (req, res)=>{
  const board: string = req.body.board;
  const boardName: string = req.body.boardName;
  const user = req.user as MyUser;
  const result = await saveBoard(user.id, boardName, board);
  if(result)
    res.json({message: 'board added successfully'});  //gonna place the urls to redirect in some constants file or sth
  else
    res.json({message: 'board not added successfully'});
});

export default route;
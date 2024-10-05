import { json, Router } from 'express';
import { getBoard, getBoardsforUser, saveBoard, updateBoard } from '../Services/DatabaseService.js';
import { checkAuthenticated } from '../Services/CheckAuthService.js';
import { MyUser } from '../Models/MyUser.js';
import { BoardDtos } from '../Models/Board.js';

const route = Router();

route.use(checkAuthenticated);
route.use(json());

route.get('/', async (req, res) => {  //returns only the names and date added for the board, but not their representative strings
  const user = req.user as MyUser;
  const boards = await getBoardsforUser(user.id);
  res.json(boards);
});

route.get('/:id', async (req, res)=>{
  const user = req.user as MyUser;    // we're using check authenticatated as middleware so the userIs always defined
  let idStr = req.url;
  idStr = idStr.substring( idStr.lastIndexOf('/') + 1 );
  const id = parseInt(idStr);
  console.log(id);

  const board = await getBoard( id, user.id);
  console.log(board);
  if(board === null)
    res.json({message: 'Board NOT FOUND'});
  else{
    res.json(board);
  }
})


route.post('/', async (req, res)=>{
  const userId = (req.user as MyUser).id;
  const board = {userId, ...req.body} as BoardDtos;
  const result = await saveBoard(board);
  if(result)
    res.json({message: 'board added successfully'});  //gonna place the urls to redirect in some constants file or sth
  else
    res.json({message: 'board not added successfully'});
});

route.put('/', async (req, res)=>{
  console.log(req.body);
  const {boardId, boardName, boardString,  level, points} = req.body;
  const user = req.user as MyUser;
  const result = await updateBoard(user.id, boardName, boardId, boardString, level, points);
  if(result)
    res.json({message: 'Board updated successfully'});
  else
    res.json({message: 'Board NOT FOUND'});
});

export default route;
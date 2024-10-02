import { MyUser, UserDtos } from "../Models/MyUser.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertUser(user: UserDtos): Promise<boolean>{
    const data = user;
    console.log(data);
    try{
        const new_user = await prisma.user.create({
            data
        });
        console.log(new_user);
        return true;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

export async function findUserById(id: number){
    const user = await prisma.user.findUnique({
        where: {id} //meaning id of database row = id on the argument
    });
    return user as MyUser;  //I'm not sure if this conversion should be done, but I'm leaving this here for now //It probably works
}
export async function findUserbyUsername(username: string){
    const user = await prisma.user.findUnique({
        where: {username}  //this looks really clean ngl
    })
    return user as MyUser;
}

export async function disconnectDatabase(){
    await prisma.$disconnect();
}

export async function saveBoard(userId: number, boardString: string){
    const data = {
        userId,
        boardString
    };
    try{
        const new_board = await prisma.board.create({
            data
        });
        console.log(new_board);
        return true;
    }
    catch(e){
        console.error(e);
        return false;
    }
}

export async function getBoardsforUser(userId:number){
    const boards: { userId: number, boardString: string, createdAt: Date, boardId: number }[] = await prisma.board.findMany({
        where: {userId}
    })
    const toSend = boards.map( element => {
        const { userId, ...result } = element;
        return result;
    });
    return toSend;
}
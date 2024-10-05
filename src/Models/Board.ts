export class Board{    //had to rename this to MyUser, cause Express.User exists and TS got them confused
    constructor(    // by writing the access modifiers, we declare them as instance variables (meaning no need to write the stuff inside)
        public boardId: number,
        public userId: number, 
        public points: number,
        public level: number,
        public boardName: string,
        public boardString: string, 
        public createdAt: Date
    ){}
}

export class BoardDtos{
    constructor(
        public userId: number, 
        public points: number,
        public level: number,
        public boardName: string,
        public boardString: string,
    ){}
}
export class MyUser{    //had to rename this to MyUser, cause Express.User exists and TS got them confused
    constructor(    // by writing the access modifiers, we declare them as instance variables (meaning no need to write the stuff inside)
        public username: string,
        public password: string,
        public id: number,    //I will never know how to handle this autogenerated stuff
    ){}
}

export class UserDtos{
    constructor(
        public username: string,
        public password: string
    ){}
}
import { User } from './user.model';

export class Todo {
  constructor(
    public id: number,
    public processId: number,
    // public username,
    public user:User,
    public description: string,
    public priority: number,
    public status: number,
    public type: number,
    public targetDate: Date,
  ) {
    //ID  	DESCRIPTION  	PRIORITY  	STATUS  	TARGET_DATE  	TYPE  	PROCESS_ID  	USERNAME
    //insert into to_do(1,'Test desc',0,0,sysdate(),0,1,'dejan')
  }
}

import { Branch } from './branch.model';
import { User } from './user.model';
export class BatchOrder {
  constructor(
    public order_number:string
  ){}
}
export class Batch {
    constructor(public id:number, 
        public batch_number:number, 
        public departure_time:string, 
        public status:string,
        public branch_from?:Branch,
        public delivery_time?:string,
        public branch_to?:Branch,
        public messenger?:User,
        public branch_staff?:User,
        public batch_orders?:BatchOrder[]
        ){}
}

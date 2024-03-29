import { Role } from './role.model';
import { Branch } from './branch.model';
export class User {
    constructor(public id: number,
        public full_name: string, 
        public email: string, 
        public branch: Branch, 
        public roles: Role[]|any, 
        public groups?: number[]) { }
}

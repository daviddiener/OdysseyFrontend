import { Role } from './role';

export class User {
    // tslint:disable-next-line:variable-name
    _id: string;
    email: string;
    name: string;
    role: Role;
    exp: number;
    iat: number;
}

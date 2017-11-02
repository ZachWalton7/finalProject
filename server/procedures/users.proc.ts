import { rows, row } from '../config/db';

export function all(): Promise<Array<models.IUser>> {
    return rows('GetAllUsers');
}

export function read(id: number): Promise<models.IUser> {
    return row('GetSingleUser', [id]);
}

export function readByEmail(email: string): Promise<models.IUser> {
    return row('GetUserByEmail', [email]);
}

export function create(username: string, email: string, hash: string, truckname: string) {
    return row('InsertUser', [username, email, hash, truckname]);
}
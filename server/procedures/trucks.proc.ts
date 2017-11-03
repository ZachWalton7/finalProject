import { row, rows, empty } from '../config/db';

export function all(): Promise<Array<models.ITrucks>> {
    return rows('GetAllTrucks');
}

export function read(id: number): Promise<models.ITrucks> {
    return row('GetSingleTruck', [id]); 
}

export function categoryread(categoryid: number): Promise<Array<models.ITrucks>> {
    return rows('GetTrucksByCatID', [categoryid]);
}

export function userread(userid: number): Promise<models.ITrucks> {
    return row('GetTruckByUserID', [userid]);
}

export function update(id: number, userid: number, categoryid: number, name: string, description: string, imageurl: string, menuimg: string) {
    return empty('UpdateTruck', [id, userid, categoryid, name, description, imageurl, menuimg]);
}

export function create(userid: number, categoryid: number, name: string, description: string, imageurl: string, menuimg: string) {
    return row('InsertTruck', [userid, categoryid, name, description, imageurl, menuimg]);
}

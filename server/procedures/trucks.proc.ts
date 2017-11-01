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

export function update(id: number, categoryid: number, name: string, description: string, imageurl: string, menuimg: string) {
    return empty('UpdateTruck', [id, categoryid, name, description, imageurl, menuimg]);
}

export function create(categoryid: number, name: string, description: string, imageurl: string, menuimg: string) {
    return row('InsertTruck', [categoryid, name, description, imageurl, menuimg]);
}

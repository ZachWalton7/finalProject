import { row, rows, empty } from '../config/db';

export function all() {
    return rows('allMenuItems');
}

export function update(menusId: Number, item: String, cost: Number){
    return empty('UpdateMenu', [menusId, item, cost])
}

export function single(menusId: Number){
    return row('SingleMenuItem', [menusId])
}
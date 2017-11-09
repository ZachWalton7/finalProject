import { row, rows, empty } from '../config/db';

export function all() {
    return rows('allMenuItems');
}

export function menu(foodTruckId: Number) {
    return rows('MenuItems', [foodTruckId]);
}

export function update(idmenus: Number, item: String, cost: Number){
    return empty('UpdateMenu', [idmenus, item, cost])
}

export function single(menusId: Number){
    return row('SingleMenuItem', [menusId])
}
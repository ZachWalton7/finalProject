import { row, rows, empty } from '../config/db';

export function menu(foodTruckId: Number) {
    return rows('MenuItems', [foodTruckId]);
}

export function update(idMenus: Number, item: String, cost: Number){
    return empty('UpdateMenu', [idMenus, item, cost])
}
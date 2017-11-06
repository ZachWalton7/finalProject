import { row, rows, empty } from '../config/db';

export function menu(foodTruckId: Number) {
    return rows('MenuItems', [foodTruckId]);
}
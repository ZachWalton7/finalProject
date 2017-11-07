import { row, rows, empty } from '../config/db';

export function all(): Promise<Array<models.ICategories>> {
    return rows('GetAllCategories');
}

export function read(id: number): Promise<models.ICategories> {
    return row('GetSingleCategory', [id]);
}

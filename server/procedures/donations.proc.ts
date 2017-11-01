import { row, rows, empty } from '../config/db';

export function all(): Promise<Array<models.IDonations>> {
    return rows('GetAllDonations');

}

export function read(id: number): Promise<models.IDonations> {
    return row('GetSingleDonation', [id]);
}

export function create(amount: number, stripetransactionid: string): Promise<models.IDonations> {
    return row('InsertDonation', [amount, stripetransactionid]);

}
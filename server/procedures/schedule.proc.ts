import { row, rows, empty } from '../config/db';

export function all(): Promise<Array<models.ISchedule>> {
    return rows('GetAllSchedules');
}

export function read(trucksid: number): Promise<models.ISchedule> {
    return row('GetSingleSchedule', [trucksid]);
}

export function create(location: string, locationname: string, dayofweek: string, lunchdinner: string, lat: number, lng: number) {
    return row('InsertSchedule', [location, locationname, dayofweek, lunchdinner, lat, lng]);
}

export function update(id: number, location: string, locationname: string, dayofweek: string, lunchdinner: string, lat: number, lng: number) {
    return empty('UpdateSchedule', [id, location, locationname, dayofweek, lunchdinner, lat, lng])
}

export function daily() {
    return rows("getDailySchedule")
}
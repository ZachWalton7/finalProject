declare namespace models {
    interface ITrucks {
        id: number;
        userid: number;
        categoryid: number;
        name: string;
        descripton: string;
        imgone: string;
        imgtwo: string;
        imgthree: string;
    }
    interface ICategories {
        id: number;
        name: string;
    }
    interface IUsers {
        id: number;
        email: string;
        username: string;
        password: string;
    }
    interface ISchedule {
        trucksid: number;
        location: string;
        locationname: string;
        dayofweek: string;
        lunchdinner: string;
        lat: number;
        lng: number;
        open: string;
        close: string;
    }
    interface IDonations {
        id: number;
        amount: number;
        stripetransactionid: number;
    }
    interface IUser {
        id: number;
        truckid: number;
        username: string;
        password: string;
    }
}
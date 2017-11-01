declare namespace models {
    interface ITrucks {
        id: number;
        categoryid: number;
        name: string;
        descripton: string;
        imageurl: string;
        menuimg: string;
    }
    interface ICategories {
        id: number;
        name: string;
    }
    interface IUsers {
        id: number;
        truckid: number;
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
    }
}
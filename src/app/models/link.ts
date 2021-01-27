export class Link {
    name: string;
    route: string;
    params: any;

    constructor(name: string, route: string, params?: any) {
        this.name = name;
        this.route = route;
        this.params = params;
    }
}
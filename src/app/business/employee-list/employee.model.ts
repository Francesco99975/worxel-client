import { Department } from "../department-list/department.model";
import * as dateFns from "date-fns";

enum FlagType {
    NOT_AVAILABLE = 0,
    VACATION = 1,
    DAYS_OFF = 3
}

class Shift {
    start: Date;
    end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end  = end;
    }
}

class Flag {
    from: Date
    to: Date
    flagType: FlagType

    constructor(from: Date, to: Date, flagType: FlagType) {
        this.from = from;
        this.to = to;
        this.flagType = flagType;
    }
}

export class Employee {
    id: string;
    businessId: string;
    firstname: string;
    lastname: string;
    email: string;
    departments: Department[];
    color: string;
    priority: number;
    shifts: Shift[];
    flags: Flag[];
    manager: boolean;

    constructor({id, businessId, firstname, lastname, email, departments, color, priority, shifts, flags, manager}) {
        this.id = id;
        this.businessId = businessId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.departments = departments;
        this.color = color;
        this.priority = priority;
        this.shifts = shifts;
        this.flags = flags;
        this.manager = manager;
    }

    get fullname(): string { return this.firstname + " " + this.lastname};

    get hours(): number {
        if(this.shifts.length < 1) {
            return 0;
        }

        return this.shifts
        .filter(shift => !dateFns.isSameWeek(shift.start, new Date()))
        .reduce((prev, shift) => prev + (dateFns.differenceInMinutes(shift.end, shift.start) / 60), 0.0);
    }

    getDepartment(): string {
        if(this.departments.length == 1) {
            return this.departments[0].name;
        } else {
            return this.departments.map(dept => dept.name).join("/");
        }
    }

    getJSON(password: string) {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            departments: this.departments.map(dept => dept.id),
            color: this.color,
            priority: this.priority,
            manager: this.manager,
            email: this.email,
            password: password
        }
    }
}
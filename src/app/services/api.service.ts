import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { industries } from "../data/industries";
import { Item } from "../models/app.model";

@Injectable()
export class ApiService {
    getIndustries(): Observable<Item[]>{
        return of(industries).pipe(delay(1000));
    }
}
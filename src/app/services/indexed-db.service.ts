//libraries
import { Injectable } from "@angular/core";
import Dexie from "dexie";
import * as _ from "lodash";

//constants
import { CONSTANTS } from "../constants";

@Injectable()
export class IndexedDBService {
  db: any;

  constructor() {
    this.db = new Dexie("MainThreadIDB");
    this.db.version(1).stores(this.getStores());
  }

  upsertList(storename: string, objects: any) {
    objects = _.map(objects, o => {
      return { id: o.id, str: JSON.stringify(o) };
    });
    let myDb: any = this.db;
    return myDb
      .open()
      .then(function() {
        return myDb[storename].bulkPut(objects);
        //promise,which when resolved gives id of the last object added
      })
      .catch(function(error) {
        console.log("Error " + error);
      });
  }

  getStores() {
    var storesArray = CONSTANTS.STORES;
    let i: number;
    let stores: any = {};
    for (i = 0; i < storesArray.length; i++) {
      stores[storesArray[i].db_name] = storesArray[i].indexed_fields;
    }
    console.log("Stores:", stores);
    return stores;
  }
}

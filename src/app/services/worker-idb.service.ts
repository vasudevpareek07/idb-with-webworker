//libraries
import { Injectable } from "@angular/core";
import * as _ from "lodash";

//constants
import { CONSTANTS } from "../constants";

@Injectable()
export class WorkerIDBService {
  db: any;
  worker: any;
  map: any = {};
  rejectMap: any = {};

  constructor() {
    this.initWebWorker();

    this.createDB("WebWorkerIDB", CONSTANTS.STORES);

    this.worker.onmessage = e => {
      //console.log("getting res from worker", e);
      if (e.data.error == true) {
        // this.rejectMap[e.data.uid](e.data);
        console.error("Error! Promise not resolved!", e);
      } else {
        this.map[e.data.uid](e.data.data);
      }
      delete this.rejectMap[e.data.uid];
      delete this.map[e.data.uid];
    };
  }

  initWebWorker() {
    if (typeof Worker != "undefined") {
      this.worker = new Worker("assets/worker.js");
      console.log("worker obj", this.worker);
    } else {
      alert(
        "Your browser does not support web workers, please download the latest version of your browser"
      );
    }
  }

  private make_params(dbName, store, data, function_name) {
    let uid = this.generateUniqueID();
    let params = {
      uid: uid,
      dbName: dbName,
      store: store,
      data: data,
      function: function_name
    };
    params = JSON.parse(JSON.stringify(params));
    return params;
  }

  createDB(dbName: string, storeConfig: any) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, null, storeConfig, "initDB");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  upsertList(dbName: string, store: string | object, objects: any) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, store, objects, "upsertList");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  upsertSingle(dbName: string, storename: string, object: any): any {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, object, "upsertSingle");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  getAll(dbName: string, storename: string) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, null, "getAll");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  getByIds(dbName: string, storename: string, ids: number[]) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, ids, "getByIds");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  getById(dbName: string, storename: string, id: number): any {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, id, "getById");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  deleteAll(dbName: string, storename: string) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, null, "deleteAll");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  deleteById(dbName: string, storename: string, id: number): any {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, id, "deleteById");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  deleteDB(dbName: string, storename: string) {
    let promise = new Promise((resolve, reject) => {
      let params = this.make_params(dbName, storename, null, "deleteDB");
      this.worker.postMessage(params);
      this.map[params.uid] = resolve;
      this.rejectMap[params.uid] = reject;
    });
    return promise;
  }

  generateUniqueID() {
    let x = Math.floor((1 + Math.random()) * 0x10000);
    return x;
  }
}

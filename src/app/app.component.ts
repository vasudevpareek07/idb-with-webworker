import { Component } from "@angular/core";

//services
import { IndexedDBService } from "./services/indexed-db.service";
import { WorkerIDBService } from "./services/worker-idb.service";

//constants
import { CONSTANTS } from "./constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  objectsCount: number = 100000;

  constructor(
    private workerIDBService: WorkerIDBService,
    private indexedDBService: IndexedDBService
  ){
    this.workerIDBService.upsertList(
      "WebWorkerIDB",
      "topODITeams",
      CONSTANTS.storeData.topODITeams
    );
    this.indexedDBService.upsertList(
      "topODITeams",
      CONSTANTS.storeData.topODITeams
    );
  }

  createObjects(n, inBackgroundThread) {
    let x = [];
    for (let i = 0; i < n; i++) {
      x.push({ id: i + 1, name: "Random Text" });
    }
    if (inBackgroundThread) {
      this.workerIDBService.upsertList("WebWorkerIDB", "topODITeams", x);
    } else {
      this.indexedDBService.upsertList("topODITeams", x);
    }
  }
}

//libraries
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//components
import { AppComponent } from "./app.component";

//services
import { WorkerIDBService } from "./services/worker-idb.service";
import { IndexedDBService } from "./services/indexed-db.service";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, WorkerIDBService, IndexedDBService],
  bootstrap: [AppComponent]
})


export class AppModule {}

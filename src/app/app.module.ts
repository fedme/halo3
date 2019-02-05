import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppInfo } from './app.info';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// Ionic Pro setup
Pro.init(AppInfo.id, {
  appVersion: AppInfo.version
})

// Ionic Storage config
const storageConfig = {
  name: AppInfo.id,
  driverOrder: ['sqlite', 'indexeddb', 'websql']
}

// Ionic Monitoring: custom error handler
@Injectable()
export class MyErrorHandler extends ErrorHandler {
  constructor() { super() }
  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    console.log(err);
  }
}

// Ngx-Translate setup
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const translateConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
  }
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(storageConfig),
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: MyErrorHandler },
    AndroidFullScreen,
    Device,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

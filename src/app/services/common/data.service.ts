import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { AppService } from './app.service';
import { AppInfo } from './../../app.info';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public recordsNumber: number = 0;
  public allRecords: any[] = [];

  constructor(
    private storage: Storage,
    private device: Device,
    private platform: Platform,
    private fileSystem: File,
    private toastCtrl: ToastController,
    private app: AppService
  ) {

    // Initialize
    this.init();

  }

  public init(): void {
    console.log('[DataService] init()');

    // Update number of records
    this.updateRecordsNumber();
  }

  public async save() {

    console.log('[DataService] Saving data... DB driver:', this.storage.driver);

    // Use participant id as record id
    const recordId = this.app.participant.id;

    // Create data object
    const dataObject = {
      'id': recordId,
      'participant': this.getParticipantInfo(),
      'app': this.getAppInfo(),
      'session': this.getSessionInfo(),
      'data': this.app.getExperimentData(),
      'platformInfo': this.getPlatformInfo()
    }
    console.log('[DataService] Serialized data:', dataObject);


    // Save data to local database
    const res = await this.storage.set(recordId, dataObject);
    console.log('[DataService] Saved data to local db:', res);

    // Update records count
    this.updateRecordsNumber();
  }

  private getParticipantInfo() {
    return {
      'code': this.app.participant.code,
      'age': this.app.participant.age,
      'ageGroup': this.app.participant.ageGroup,
      'grade': this.app.participant.grade,
      'gender': this.app.participant.gender
    }
  }

  private getSessionInfo() {
    const now = new Date();
    const duration = Math.floor(Date.now() - this.app.initialTimestamp);
    return {
      'datetime': now.toJSON(),
      'duration': duration
    }
  }

  private getAppInfo() {
    return {
      'id': AppInfo.id,
      'version': AppInfo.version,
      'nameLabel': AppInfo.nameLabel,
      'lang': localStorage.getItem('lang')
    }
  }

  private getPlatformInfo() {
    return {
      'platform': this.device.platform,
      'platforms': this.platform.platforms(),
      'height': this.platform.height(),
      'width': this.platform.width(),
      'uuid': this.device.uuid,
      'model': this.device.model,
      'cordovaVersion': this.device.cordova,
      'version': this.device.version,
      'manufacturer': this.device.manufacturer,
      'serial': this.device.serial
    }
  }


  public async loadAllRecords() {
    console.log('[DataService] Loading all records from local db...');

    // get records
    let records = await this.storageGetAll();

    // order records by date (DESC)
    records.sort((a, b) => new Date(b['session']['datetime']).getTime()
      - new Date(a['session']['datetime']).getTime());
    
    records.reverse();

    this.allRecords = records;
    console.log('[DataService] All records:', this.allRecords);
  }


  public async exportRecordsAsJSON() {
    console.log('[DataService] Exporting JSON file to local memory...');

    // get records
    let records = await this.storageGetAll();

    // order records by date (DESC)
    records.sort((a, b) => new Date(b['session']['datetime']).getTime()
      - new Date(a['session']['datetime']).getTime());
    
    records.reverse();

    // debug records
    console.log('[DataService] All records:', records);

    // save records to JSON file
    let fileContent = JSON.stringify(records);
    this.saveOutputFile(fileContent);

    // show toast
    const toast = await this.toastCtrl.create({
      message: 'Saving JSON file to internal memory...',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  async updateRecordsNumber() {
    let records = await this.storageGetAll();
    if (records == null) return 0;
    this.recordsNumber = records.length;
  }


  /**
   * Returns a Promise with the raw records from Storage
   */
  storageGetAll() {
    return this.storage.keys()
      .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }


  saveOutputFile(csvContent, fileExt = 'json') {
    // build file name
    let currentdate = new Date();
    let day = ('0' + currentdate.getDate()).slice(-2);
    let month = ('0' + (currentdate.getMonth() + 1)).slice(-2);
    let filename = 'data-' + day + month + currentdate.getFullYear() + '-'
      + currentdate.getHours() + currentdate.getMinutes() + '.' + fileExt;

    // access file system
    this.fileSystem.resolveDirectoryUrl(this.fileSystem.externalDataDirectory)
      
    .then(directory => {
        // get or create results file
        this.fileSystem.getFile(directory, filename, { create: true, exclusive: false })

          .then(file => {
            console.log('[DataService] Writing file to local memory', file.isFile.toString());
            this.writeFile(file, csvContent);
          })

          .catch(err => {
            console.log('[DataService] File error:', err);
          });
      })

      .catch(err => {
        console.log('[DataService] Filesystem error:', err);
      });
  }

  writeFile(fileEntry, data) {
    fileEntry.createWriter(
      function (writer) {
        writer.onwriteend = function (evt) {
          console.log('[DataService] File successfully created!');
        };
        writer.write(data);
      },
      function (evt, where) {
        console.log('[DataService] Error writing file:', evt);
      }
    );
  }

  mapToObj(strMap) {
    let obj = {};
    strMap.forEach((value, key, map) => {
      obj[key] = value;
    });
    return obj;
  }

}

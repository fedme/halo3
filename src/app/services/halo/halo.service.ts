import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';

@Injectable({
  providedIn: 'root'
})
export class HaloService implements IExperiment {

  constructor() { }

  public setupExperiment(): void {
    console.log('[HaloService] setupExperiment()');
    this.resetData();
  }

  public resetData() {

  }

  public getExperimentData() {

    const data = {
    };

    return data;
  }

}

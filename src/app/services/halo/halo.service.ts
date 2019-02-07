import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';
import { Video, Condition, TestBattery, TestRound, MemoryCheck, ExplanationBattery, MemoryCheckBattery } from './models';
import { Utils } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class HaloService implements IExperiment {

  condition: Condition;
  testBattery: TestBattery;
  initialCheckBattery: MemoryCheckBattery;
  finalCheckBattery: MemoryCheckBattery;
  explanationBattery: ExplanationBattery;
  private explanationIndex: number;
  private videoIndex: number;
  private testIndex: number;

  constructor() { }

  public setupExperiment(): void {
    console.log('[HaloService] setupExperiment()');
    this.resetData();
    this.chooseCondition();
    this.setupTests();
    this.setupChecks();
    this.setupExplanations();
  }

  public resetData() {
    this.condition = null;
    this.testBattery = null;
    this.initialCheckBattery = null;
    this.finalCheckBattery = null;
    this.explanationBattery = null;
    this.videoIndex = 0;
    this.testIndex = 0;
    this.explanationIndex = 0;
  }

  public get currentVideo(): Video {
    if (this.videoIndex >= this.condition.videos.length) return null;
    return this.condition.videos[this.videoIndex];
  }

  public isLastVideo(): boolean {
    return this.videoIndex >= this.condition.videos.length - 1;
  }

  public nextVideo() {
    this.videoIndex++;
  }

  public get currentTest(): TestRound {
    if (this.testIndex >= this.testBattery.tests.length) return null;
    return this.testBattery.tests[this.testIndex];
  }

  public isLastTest(): boolean {
    return this.testIndex >= this.testBattery.tests.length - 1;
  }

  public nextTest() {
    this.testIndex++;
  }

  public get currentExplanation(): string {
    if (this.explanationIndex >= this.explanationBattery.explanations.length) return null;
    return this.explanationBattery.explanations[this.explanationIndex];
  }

  public isLastExplanation(): boolean {
    return this.explanationIndex >= this.explanationBattery.explanations.length - 1;
  }

  public nextExplanation() {
    this.explanationIndex++;
  }

  setupChecks() {
    this.initialCheckBattery = MemoryCheckBattery.getDefault();
    this.finalCheckBattery = MemoryCheckBattery.getDefault();
  }

  setupTests() {
    this.testBattery = TestBattery.getDefault();
  }

  setupExplanations() {
    this.explanationBattery = ExplanationBattery.getDefault();
  }

  chooseCondition() {

    // Get condition ids from local storage
    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem('isrc-halo3-conds'));
    }
    catch(error) {
      console.log('Error parsing condition ids from json', error);
    }
    
    // If not present, set initial condition ids
    if (ids == null || ids.length == 0) {
      ids = this.setInitialConditions();
    }

    // Shuffle the condition ids
    ids = Utils.getShuffledCopy(ids);

    // Pick condition
    const conds = Condition.getAll();
    const id = ids.shift();
    this.condition = conds[id];

    // Update condition ids in local storage
    localStorage.setItem('isrc-halo3-conds', JSON.stringify(ids));

    console.log('[HaloService] Condition chosen', this.condition);

  }

  setInitialConditions(): number[] {
    // Save an array with 20 possible condition ids to local Storage
    let ids = Array(5).fill(0).concat(Array(5).fill(1)).concat(Array(5).fill(2)).concat(Array(5).fill(3));
    ids = Utils.getShuffledCopy(ids);
    localStorage.setItem('isrc-halo3-conds', JSON.stringify(ids));
    return ids;
  }

  public getExperimentData() {

    const data = {
      condition: this.condition,
      initialChecks: this.initialCheckBattery,
      test: this.testBattery,
      finalChecks: this.finalCheckBattery
    };

    return data;
  }

}

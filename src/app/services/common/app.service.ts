import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Participant } from './participant';
import { IExperiment } from './experiment.interface';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class AppService implements IExperiment {

  // Reference to custom experiment code
  public exp: IExperiment;

  public initialTimestamp: number;
  public participant: Participant;
  public langChangedEvent: EventEmitter<string> = new EventEmitter();
  public lang: string = 'en';
  public availableLangs: string[];

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private androidFullScreen: AndroidFullScreen
  ) { }

  public init(customExp: IExperiment): void {
    console.log('[ExperimentService] init()');

    // Set up reference to custom experiment code
    this.exp = customExp;

    // App Initialization
    this.platform.ready().then(() => {
      this.initTranslate();
      //this.enterImmersiveMode();
      //this.enterPinnedMode();
      this.disableBackButton();

      // Manage app language
      this.manageAppLanguage();
    });

  }

  public setupExperiment(): void {
    console.log('[CommonService] setupExperiment()');

    // Remember current language
    localStorage.setItem('lang', this.lang);

    // Start measuring time
    this.initialTimestamp = Date.now();

    // TODO: remove this workaround once made sure that navCtrl.navigateRoot
    // always calls ngOnInit on registration page
    this.participant.generateId(); // re-generate participant random id

    // Setup custom experiment
    this.exp.setupExperiment();
  }

  public getExperimentData() {
    return this.exp.getExperimentData();
  }

  private initTranslate(): void {
    // Set the default language
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');

    // Get saved language from local storage
    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
      this.translate.use(localStorage.getItem('lang'));
    }

    // Update language when changed by an app component
    this.langChangedEvent.subscribe(lang => {
      console.log('language change evend emitted: ', lang);
      this.translate.use(lang);
    });
  }

  private manageAppLanguage(): void {
    this.availableLangs = this.translate.langs;
    // Get language from localStorage
    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != '') {
      this.lang = localStorage.getItem('lang');
    }
  }

  private enterImmersiveMode(): void {
    if (this.platform.is('android')) {
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));
    }
  }

  private enterPinnedMode(): void {
    if (typeof cordova !== 'undefined') {
      cordova.plugins.screenPinning.enterPinnedMode(
        () => { console.log('entered pinned mode') },
        (error) => { console.log('error when entering pinned mode: ' + error) },
        true
      );
    }
  }

  private disableBackButton(): void {

    this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('Back Button Pressed');
      // Do nothing when back button is pressed
    });

  }

}

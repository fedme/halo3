import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Participant } from '../services/common/participant';
import { DataService } from '../services/common/data.service';
import { AppService } from '../services/common/app.service';
import { AppInfo } from '../app.info';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public appName: string = AppInfo.nameLabel;
  public appVersion: string = AppInfo.version;

  constructor(
    public app: AppService,
    public dataService: DataService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private zone: NgZone
  ) { }

  ngOnInit() {

    // TODO: Make sure ngOnInit is called every time the user navigates to this page!

    // Create a new Participant
    this.app.participant = new Participant()

    // Update records count
    this.dataService.updateRecordsNumber();

    console.log('[RegistrationPage] ngOnInit()');
  }

  public handleRegistration(): void {

    const codeNull = this.app.participant.code == null
      || this.app.participant.code == '';

    const genderNull = this.app.participant.gender == null
      || this.app.participant.gender == '';

    const ageNull = this.app.participant.age == null
      || this.app.participant.age == 0;

    // If some info is missing...
    if (codeNull || ageNull || genderNull) {

      let alertMsg: string = 'You are missing: ';
      if (codeNull) alertMsg += '<br>- Participant Code';
      if (ageNull) alertMsg += '<br>- Age';
      if (genderNull) alertMsg += '<br>- Gender';

      // Present alert
      this.showValidationAlert(alertMsg, ageNull, codeNull);
    }

    // Otherwise, proceed to registration
    else {
      this.doRegistration();
    }

  }

  private async showValidationAlert(alertMsg: string, ageNull: boolean, codeNull: boolean) {
    const alert = await this.alertCtrl.create({
      header: 'Missing some info. Proceed?',
      message: alertMsg,
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            // Fill default info
            if (ageNull) {
              this.app.participant.age = 0;
              this.app.participant.grade = 0;
            }
            if (codeNull) {
              this.app.participant.code = 'nocode';
            }

            this.zone.run(async () => {
              await this.doRegistration();
            });
          }
        },
        {
          text: 'Stay here',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    alert.present();
  }

  private async doRegistration(): Promise<void> {
    this.app.setupExperiment();
    await this.navCtrl.navigateRoot('/videos');
  }

}

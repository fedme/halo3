import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(
    public halo: HaloService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

    

  }

  ngOnInit() {
  }

  async chooseInstructor(i: number) {

    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.halo.testBattery.currentTest.chooseInstructor(i);
          }
        }
      ]
    });

    await alert.present();
  }

  async chooseConfidence(i: number) {

    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.halo.testBattery.currentTest.chooseConfidence(i);
          }
        }
      ]
    });

    await alert.present();
  }

  async chooseConfidenceLevel(i: number) {

    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.halo.testBattery.currentTest.chooseConfidenceLevel(i);
            if (this.halo.testBattery.isLastTest()) {
              this.navCtrl.navigateRoot('/final-check');
            }
            else {
              this.halo.testBattery.nextTest();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}

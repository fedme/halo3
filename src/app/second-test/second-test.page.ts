import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';
import { DataService } from '../services/common/data.service';

@Component({
  selector: 'app-second-test',
  templateUrl: './second-test.page.html',
  styleUrls: ['./second-test.page.scss'],
})
export class SecondTestPage implements OnInit {

  constructor(
    private appData: DataService,
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
            this.halo.secondTestBattery.currentTest.chooseInstructor(i);
            if (this.halo.secondTestBattery.isLastTest()) {
              this.appData.save();
              this.navCtrl.navigateRoot('/explanation');
            }
            else {
              this.halo.secondTestBattery.nextTest();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}

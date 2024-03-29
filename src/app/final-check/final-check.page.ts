import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-final-check',
  templateUrl: './final-check.page.html',
  styleUrls: ['./final-check.page.scss'],
})
export class FinalCheckPage implements OnInit {

  constructor(
    public halo: HaloService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
  }

  async chooseByIndex(i: number) {

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
            this.halo.finalCheckBattery.currentCheck.chooseByIndex(i);
            if (this.halo.finalCheckBattery.isLastCheck()) {
              this.navCtrl.navigateRoot('/second-test');
            }
            else {
              this.halo.finalCheckBattery.nextCheck();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-initial-check',
  templateUrl: './initial-check.page.html',
  styleUrls: ['./initial-check.page.scss'],
})
export class InitialCheckPage implements OnInit {

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
            this.halo.initialCheckBattery.currentCheck.chooseByIndex(i);
            if (this.halo.initialCheckBattery.isLastCheck()) {
              this.navCtrl.navigateRoot('/test');
            }
            else {
              this.halo.initialCheckBattery.nextCheck();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}

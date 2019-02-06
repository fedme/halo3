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

  async next() {

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
            this.navCtrl.navigateRoot('/test');
          }
        }
      ]
    });

    await alert.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
})
export class ExplanationPage implements OnInit {

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
            if (this.halo.isLastExplanation()) {
              this.navCtrl.navigateRoot('/end');
            }
            else {
              this.halo.nextExplanation();
            }     
          }
        }
      ]
    });

    await alert.present();
  }

}

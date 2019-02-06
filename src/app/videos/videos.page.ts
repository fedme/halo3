import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

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
            if (this.halo.isLastVideo()) {
              this.navCtrl.navigateRoot('/initial-check');
            }
            else {
              this.halo.nextVideo();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}

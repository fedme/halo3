import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HaloService } from '../services/halo/halo.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public halo: HaloService,
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {
  }

  public next(): void {
    this.navCtrl.navigateRoot('/end');
  }

}

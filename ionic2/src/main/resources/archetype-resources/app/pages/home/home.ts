import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MDKInitStatusEnum } from 'mdk-ionic2-lib-core';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private coreObject: string;
  constructor(public navCtrl: NavController) {
    this.coreObject = MDKInitStatusEnum[MDKInitStatusEnum.NOT_STARTED];
  }
}

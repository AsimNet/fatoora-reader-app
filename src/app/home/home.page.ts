import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as FatooraTags from '@kawkab-oss/fatoora-parser';
import {HttpClient} from '@angular/common/http';
import {Html5QrcodeScanner} from 'html5-qrcode';
import {IonRouterOutlet, ModalController} from "@ionic/angular";
import {CameraModalComponent} from "../camera-modal/camera-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  items = [1, 2, 3, 4, 5];

  constructor(private http: HttpClient,
              private modalController: ModalController,
              public routerOutlet: IonRouterOutlet) {
  }

  ngOnInit() {
    const test = FatooraTags.toJson('AQVTYWxsYQIKMTIzNDU2Nzg5MQMUMjAyMS0wNy0xMlQxNDoyNTowOVoEBjEwMC4wMAUFMTUuMDA=');
    console.log(test);
  }

  remove(item: any) {

  }

  async openCameraModal() {
    const modal = await this.modalController.create({
      component: CameraModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onWillDismiss().then(({data}) => {
      console.log(data.decodedText);
    });

    return await modal.present();
  }


}

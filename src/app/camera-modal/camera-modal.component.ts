import {Component, OnInit} from '@angular/core';
import {Html5QrcodeScanner} from 'html5-qrcode';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
})
export class CameraModalComponent implements OnInit {
  html5QrcodeScanner;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    this.openCamera();
  }

  openCamera() {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      {fps: 10, qrbox: {width: 250, height: 250}},
      /* verbose= */ false);
    this.html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);

  }

  onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    this.html5QrcodeScanner.clear().then(_ => {
      // the UI should be cleared here
      this.modalController.dismiss({decodedText}).catch((e) => console.error(e));
    }).catch(error => {
      // Could not stop scanning for reasons specified in `error`.
      // This conditions should ideally not happen.
      console.error(error);
      this.modalController.dismiss({decodedText}).catch((e) => console.error(e));
    });
  }

  onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
}

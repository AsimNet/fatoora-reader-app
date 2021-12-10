import {Component, OnInit} from '@angular/core';
import * as FatooraTags from '@kawkab-oss/fatoora-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit() {
    const test = FatooraTags.toJson('AQVTYWxsYQIKMTIzNDU2Nzg5MQMUMjAyMS0wNy0xMlQxNDoyNTowOVoEBjEwMC4wMAUFMTUuMDA=');
    console.log(test);
  }

  remove(item: any) {

  }
}

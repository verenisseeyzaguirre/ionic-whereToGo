import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpentripmapService } from '../services/opentripmap.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  placesFound: any[];
  cityFound: any;
  countPlacesFound: number = 0;
  constructor(private opentripmapService: OpentripmapService) {}
  async ionViewDidEnter() {
    try {
      this.cityFound = await this.opentripmapService.getCityFromSearch(
        environment.openTripMap.defaultCity
      );
      if (this.cityFound) {
        this.placesFound = await this.opentripmapService.getPlacesByLatLon(
          environment.openTripMap.radius,
          this.cityFound.lon,
          this.cityFound.lat,
          environment.openTripMap.rate,
          environment.openTripMap.formatJson
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

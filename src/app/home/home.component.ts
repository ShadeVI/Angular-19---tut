import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService = inject(HousingService)
  filteredLocationList: HousingLocation[] = []

  constructor() {
    this.housingService.getAllHousingLocations().then((locations) => {
      this.housingLocationList = locations
      this.filteredLocationList = locations
    })
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList
    this.filteredLocationList = this.housingLocationList.filter(location => location.city.toLowerCase().includes(text.toLowerCase()))
  }

  resetHousingLocationList() {
    this.filteredLocationList = this.housingLocationList
    // We cannot clean the input field here because we are not using two-way data binding. We are using one-way data binding. The input field is not bound to a property in the component. In this case, we can use the reset attribute to clean the input.

  }

}

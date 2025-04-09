import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService: HousingService = inject(HousingService)
  housingLocation: HousingLocation | undefined

  constructor() {

    // Subscribe to the route parameters to get the housing location ID. Dynamic routing allows you to pass parameters in the URL. Reactiva (observable)
    /* this.route.paramMap.subscribe(params => {
      this.housingLocationId = Number(params.get('id'))
    }) */

    // Alternatively, you can use the snapshot method to get the ID directly. Snapshot is a one-time read of the route parameters. Instantánea (sincrónica).
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId)
  }
}

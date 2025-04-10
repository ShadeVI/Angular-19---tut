import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  // router: Router = inject(Router)
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService: HousingService = inject(HousingService)
  housingLocation: HousingLocation | undefined

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("")
  })

  constructor() {

    // Subscribe to the route parameters to get the housing location ID. Dynamic routing allows you to pass parameters in the URL. Reactiva (observable)
    /* this.route.paramMap.subscribe(params => {
      this.housingLocationId = Number(params.get('id'))
    }) */

    // Alternatively, you can use the snapshot method to get the ID directly. Snapshot is a one-time read of the route parameters. Instantánea (sincrónica).
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(location => this.housingLocation = location)
  }

  submitApplication() {
    // Get the values from the form controls
    const firstName = this.applyForm.get('firstName')?.value ?? "";
    const lastName = this.applyForm.get('lastName')?.value ?? "";
    const email = this.applyForm.get('email')?.value ?? "";

    // Call the submitApplication method from the housing service
    this.housingService.submitApplication(firstName, lastName, email);

    // Redirect to the home page after submission
    // this.router.navigate(['/home']);
    console.log("Application submitted")
  }
}

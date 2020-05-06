import { Injectable } from "@angular/core";
import { Education } from "../_model/education";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EducationService {
  eductionArray: Education[] = [];
  // add new eduction to form
  addEduction(edu: Education) {
    this.eductionArray.push(edu);
  }

  editEducation(newEducation: Education, educationIndex: number) {
    this.eductionArray[educationIndex] = newEducation;
  }
}

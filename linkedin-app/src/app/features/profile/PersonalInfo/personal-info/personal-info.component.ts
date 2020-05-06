import { UserService } from "./../../../../user.service";
import { Component, OnInit, Input } from "@angular/core";
import { User } from "./../../../../_model/user";
import { FormGroup, FormControl, FormControlName } from "@angular/forms";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.css"]
})
export class PersonalInfoComponent implements OnInit {
  @Input()
  user: User;
  editClick = false;
  editProfileForm: FormGroup;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // console.log(this.user);
    this.editProfileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      jobTitle: new FormControl(this.user.jobTitle),
      jobAndEducation: new FormControl(this.user.jobAndEducation),
      address: new FormControl(this.user.address)
    });
  }

  openEditModal() {
    this.editClick = !this.editClick;
  }

  edit() {
    this.editClick = !this.editClick;
    // console.log(this.editClick);
    // console.log(this.editProfileForm);
    this.user.firstName = (<FormControl>(
      this.editProfileForm.get("firstName")
    )).value;

    this.user.lastName = (<FormControl>(
      this.editProfileForm.get("lastName")
    )).value;

    this.user.jobTitle = (<FormControl>(
      this.editProfileForm.get("jobTitle")
    )).value;

    this.user.jobAndEducation = (<FormControl>(
      this.editProfileForm.get("jobAndEducation")
    )).value;

    this.user.address = (<FormControl>(
      this.editProfileForm.get("address")
    )).value;

    // console.log(this.user);
    // console.log(this.editProfileForm);
    this.userService.update(this.user);
  }
}

import { Component, OnInit } from "@angular/core";
import { User } from "./../../_model/user";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "src/app/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  userid: number;
  user: User;
  ngOnInit() {
    // this.userid = this.route.snapshot.params["id"];
    this.route.params.subscribe((params: Params) => {
      this.userid = +params["id"];
      this.userService.userChanged.emit(this.userid);
      this.user = this.userService.getById(this.userid);
    });
    // console.log(this.userid);
    // // console.log(this.user);
    // console.log(this.user);

    // this.route.params.subscribe((params: Params) => {
    //   this.userid = this.route.snapshot.params["id"];
    // });
    // this.user = this.userService.getById(this.userid);
    // console.log(this.user);
  }
}

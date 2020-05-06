import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "src/app/user.service";
import { User } from "src/app/_model/user";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  userid: number = 1;
  user: User;
  allUsers: User[];
  displaySearchResult: User[] = [];
  num: any[];
  ngOnInit() {
    this.allUsers = this.userService.getAllUsers();
    this.userService.userChanged.subscribe(id => {
      this.userid = id;
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.userid = +params["id"];
    //   this.user = this.userService.getById(this.userid);
    //   // console.log(this.userid);
    // });
    // console.log(this.allUsers);
    this.userService.searchResult.subscribe(res => {
      this.num = res;
    });
  }
  value: string;
  search(event) {
    this.value = event.target.value;
    if (this.value === "") {
      this.displaySearchResult = [];
    } else {
      for (let index = 0; index < this.allUsers.length; index++) {
        if (this.allUsers[index].firstName.includes(this.value)) {
          this.displaySearchResult.push(this.allUsers[index]);
        }
        console.log(this.displaySearchResult);
      }
    }
    this.userService.searchResult.emit(this.displaySearchResult);
    this.displaySearchResult = [];
  }
}

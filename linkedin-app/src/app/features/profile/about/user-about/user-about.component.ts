import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { User } from "./../../../../_model/user";
import { UserService } from "src/app/user.service";

@Component({
  selector: "app-user-about",
  templateUrl: "./user-about.component.html",
  styleUrls: ["./user-about.component.css"]
})
export class UserAboutComponent implements OnInit {
  @ViewChild("closebutton", { static: false }) closebutton;
  @ViewChild("SpanAboutContent", { static: false }) SpanAboutContent;
  @Input() user: User;
  isEditOpen = false;

  //  user:User={
  //   id: 5,
  //   name: "hala nazmi",
  //   profileImg: "",
  //   coverImg: "",
  //   jobTitle: "FrontEnd Developer",
  //   jobAndEducation: "FrontEnd Developer",
  //   address: "cairo",
  //   about: "hamadaaaaaaaaaaaaaaaaaaaaaaaa",
  //   expriences: ["1 year exprience"],
  //   skills: ["team lead", "active team member"],
  //   connectionIds: [2, 3, 4, 5]
  //  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    // console.log(this.user);
  }

  onSubmitAbout(textAreaAbout: HTMLTextAreaElement) {
    this.user.about = textAreaAbout.value;

    (this.SpanAboutContent
      .nativeElement as HTMLSpanElement).textContent = this.user.about;

    // this.closebutton.nativeElement.click();
    // console.log(this.user);
    this.userService.update(this.user);
    this.isEditOpen = !this.isEditOpen;
  }

  openEditModal() {
    this.isEditOpen = !this.isEditOpen;
  }
}

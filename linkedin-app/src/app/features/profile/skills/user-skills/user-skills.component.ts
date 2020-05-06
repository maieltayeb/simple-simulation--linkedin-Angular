import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "src/app/_model/user";
import { UserService } from "src/app/user.service";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-skills",
  templateUrl: "./user-skills.component.html",
  styleUrls: ["./user-skills.component.css"]
})
export class UserSkillsComponent implements OnInit {
  User: User;
  userId: number;
  isOpen = false;
  isOpenEdit = false;
  skills: string[];
  editData = {
    name: "",
    index: 0
  };
  EditSkillName: string;
  constructor(
    private route: ActivatedRoute,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.params["id"];
    this.User = this.userservice.getById(this.userId);
    this.skills = this.User.skills;
  }

  openModal() {
    this.isOpen = !this.isOpen;
  }

  openEditModal() {
    this.isOpenEdit = !this.isOpenEdit;
  }
  onSubmit(skillForm: NgForm) {
    const skill = skillForm.form.value.skillName;
    if (skill !== "") {
      this.skills.push(skill);
    }
    this.isOpen = !this.isOpen;
  }

  editSkill(skill: string, index: number) {
    // console.log(skill);
    // let skille = this.skills[index];

    this.EditSkillName = this.skills[index];
    this.editData["name"] = this.EditSkillName;
    this.editData["index"] = index;
    // this.skills.push(skille);
  }

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
  }
  onSubmitEdit(FormEdit: NgForm) {
    let index;
    let skill = FormEdit.form.value.skillName;
    // if (skill === this.editData["name"])
    index = this.editData["index"];
    this.skills[index] = skill;
    this.isOpenEdit = !this.isOpenEdit;
  }
}

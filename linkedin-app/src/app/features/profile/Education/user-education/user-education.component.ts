import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { User } from "src/app/_model/user";
import { FormsModule } from "@angular/forms";
import { Experience } from "src/app/_model/experience";
import { UserService } from "src/app/user.service";
import { TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EducationService } from "../../../../services/education.service";
import { Education } from "../../../../_model/education";
@Component({
  selector: "app-user-education",
  templateUrl: "./user-education.component.html",
  styleUrls: ["./user-education.component.css"]
})
export class UserEducationComponent implements OnInit {
  @Input() user: User;
  @ViewChild("closebutton", { static: false }) closebutton;
  @ViewChild("closebuttonn", { static: false }) closebuttonn;

  @ViewChild("SkillContainer", { static: false }) SkillContainer: ElementRef;
  @ViewChild("SkillContainerparent", { static: false })
  SkillContainerparent: ElementRef;
  @ViewChild("texttitleEdit", { static: false })
  texttitleEdit: HTMLInputElement;
  @ViewChild("TitleExpSpan", { static: false }) TitleExpSpan;
  @ViewChild("EmploytypeExpSpan", { static: false }) EmploytypeExpSpan;
  @ViewChild("CompanyNameExpSpan", { static: false }) CompanyNameExpSpan;
  @ViewChild("StartDateExpSpan", { static: false }) StartDateExpSpan;
  @ViewChild("EndDateExpSpan", { static: false }) EndDateExpSpan;
  userService: UserService;

  ValuetitleEdit;
  valueEndDateEdit;
  valueStartDateEdit;
  valueNameCompanyEdit;
  valueEmploymentTypeEdit;

  x;
  isChangedtitle = false;
  isChangedComName = false;
  ischangedType = false;
  isChangedStartDate = false;
  isChangedEndDate = false;

  isEditModalOpen = false;
  isAddModalOpen = false;

  eductionForm: FormGroup;
  modalRef: BsModalRef;
  educationData: Education[] = [];
  editMode: boolean;
  editedEducation: Education;
  educationIndex: number;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private educationService: EducationService
  ) {}

  ngOnInit() {
    this.educationData = this.educationService.eductionArray;

    this.eductionForm = this.fb.group({
      school: [""],
      degree: [""],
      fieldOfStudy: [""],
      startYear: [""],
      endYear: [""],
      grade: [""]
    });
  }

  openEditModal() {
    this.isEditModalOpen = !this.isEditModalOpen;
  }
  openAddModal() {
    this.isAddModalOpen = !this.isAddModalOpen;
  }

  openModal(
    template: TemplateRef<any>,
    editMode?: boolean,
    education?,
    educationIndex?: number
  ) {
    this.modalRef = this.modalService.show(template);
    if (editMode) {
      this.editMode = true;
      this.eductionForm.setValue(education);
      education = this.eductionForm.value;
      this.editedEducation = education;
      this.educationIndex = educationIndex;
    } else {
      this.editMode = false;
      this.eductionForm.reset();
    }
  }
  onSubmit() {
    // close model
    this.modalRef.hide();
    // push form object in array in service
    if (this.editMode) {
      this.educationService.editEducation(
        this.eductionForm.value,
        this.educationIndex
      );
    } else {
      this.educationService.addEduction(this.eductionForm.value);
    }
    // reset form
    this.eductionForm.reset();
  }
  cancel() {
    this.modalRef.hide();
  }
  inputChange() {
    this.isChangedtitle = true;
  }
  inputChangeType() {
    this.ischangedType = true;
  }

  inputChangeStartDate() {
    this.isChangedStartDate = true;
  }
  //      inputChangeEndDate(){
  //       this.isChangedEndDate=true;

  //        }
  inputChangeCompanyName() {
    this.isChangedComName = true;
  }
  onSubmitModalAddExp(MyModalAddFormExp: HTMLFormElement) {
    //console.log(MyModalAddFormExp.value.title)

    let index = this.user.expriences.length;

    let newExp: Experience = {
      experienceId: this.user.expriences.length + 1,
      expTitle: MyModalAddFormExp.value.title,
      expEmploymentType: MyModalAddFormExp.value.EmploymentType,
      expCompanyName: MyModalAddFormExp.value.NameCompany,
      expStartDate: MyModalAddFormExp.value.StartDate,
      expEndDate: MyModalAddFormExp.value.EndDate
    };
    console.log(newExp);

    this.user.expriences.push(newExp);

    MyModalAddFormExp.value.title = "";
    // MyModalAddFormExp.value.EmploymentType="";
    // MyModalAddFormExp.value.NameCompany="";
    //  MyModalAddFormExp.value.StartDate="";
    //  MyModalAddFormExp.value.EndDate="";
    MyModalAddFormExp.reset();
    //this.closebutton.nativeElement.click();
    this.isAddModalOpen = !this.isAddModalOpen;
  }
  onSubmitModalEditExp(MyModalEditFormExp: HTMLFormElement) {
    if (this.isChangedtitle) {
      this.ValuetitleEdit = MyModalEditFormExp.value.titleEdit;

      console.log("from if", this.ValuetitleEdit);
    }
    if (this.ischangedType) {
      this.valueEmploymentTypeEdit =
        MyModalEditFormExp.value.EmploymentTypeEdit;
    }
    if (this.isChangedStartDate) {
      this.valueStartDateEdit = MyModalEditFormExp.value.StartDateEdit;
    }
    if (this.isChangedEndDate) {
      this.valueEndDateEdit = MyModalEditFormExp.value.EndDateEdit;
    }
    if (this.isChangedComName) {
      this.valueNameCompanyEdit = MyModalEditFormExp.value.NameCompanyEdit;
    }
    // }else{

    //   this.ValuetitleEdit
    //   console.log("from else",this.ValuetitleEdit);
    // }
    // console.log("from ",this.ValuetitleEdit);
    // console.log( "bfor set",MyModalEditFormExp.value.titleEdit)

    // MyModalEditFormExp.value.EmploymentTypeEdit=this.valueEmploymentTypeEdit;
    //  console.log("sfter set", MyModalEditFormExp.value.titleEdit)
    //  console.log("before update this.ValuetitleEdit " ,this.ValuetitleEdit);
    //this.ValuetitleEdit= MyModalEditFormExp.value.titleEdit;

    // this.valueEmploymentTypeEdit=MyModalEditFormExp.value.EmploymentTypeEdit;
    console.log("after update this.ValuetitleEdit ", this.ValuetitleEdit);
    //this.valueNameCompanyEdit=MyModalEditFormExp.value.NameCompanyEdit;
    // this.valueStartDateEdit=MyModalEditFormExp.value.StartDateEdit;
    // this.valueEndDateEdit=MyModalEditFormExp.value.EndDateEdit
    (this.TitleExpSpan
      .nativeElement as HTMLSpanElement).textContent = this.ValuetitleEdit;
    //  (this.TitleExpSpan.nativeElement as HTMLSpanElement).textContent=MyModalEditFormExp.value.titleEdit;
    (this.EmploytypeExpSpan
      .nativeElement as HTMLSpanElement).textContent = this.valueEmploymentTypeEdit;
    //   (this.CompanyNameExpSpan.nativeElement as HTMLSpanElement).textContent= MyModalEditFormExp.value.NameCompanyEdit;;
    //  (this.StartDateExpSpan.nativeElement as HTMLSpanElement).textContent=MyModalEditFormExp.value.StartDateEdit;
    //  (this.EndDateExpSpan.nativeElement as HTMLSpanElement).textContent=MyModalEditFormExp.value.EndDateEdit;
    //  console.log(MyModalEditFormExp.value.titleEdit);
    // this.ValuetitleEdit=MyModalEditFormExp.value.titleEdit;
    //  this.valueEndDateEdit=MyModalEditFormExp.value.EndDateEdit;
    // this.valueStartDateEdit=MyModalEditFormExp.value.StartDateEdit;
    //  this.valueNameCompanyEdit=MyModalEditFormExp.value.NameCompanyEdit;
    //  this.valueEmploymentTypeEdit=MyModalEditFormExp.value.EmploymentTypeEdit

    //console.log(this.ValuetitleEdit)
    this.user.expriences[this.x].expTitle = this.ValuetitleEdit;
    //console.log(this.user.expriences[this.x].expTitle)
    // console.log(this.valueEmploymentTypeEdit)
    this.user.expriences[
      this.x
    ].expEmploymentType = this.valueEmploymentTypeEdit;
    // console.log(this.valueNameCompanyEdit)
    this.user.expriences[this.x].expCompanyName = this.valueNameCompanyEdit;
    //  console.log(this.valueStartDateEdit)

    this.user.expriences[this.x].expStartDate = this.valueStartDateEdit;
    this.user.expriences[this.x].expEndDate = this.valueEndDateEdit;

    // this.closebuttonn.nativeElement.click();
    this.isEditModalOpen = !this.isEditModalOpen;
  }

  OnClickEditIcon(indexofExp: number, MyModalEditFormExp: HTMLFormElement) {
    // console.log("after save", MyModalEditFormExp.value.titleEdit);
    this.x = indexofExp;

    this.ValuetitleEdit = this.user.expriences[indexofExp].expTitle;

    this.valueEndDateEdit = this.user.expriences[indexofExp].expEndDate;
    this.valueStartDateEdit = this.user.expriences[indexofExp].expStartDate;
    this.valueNameCompanyEdit = this.user.expriences[indexofExp].expCompanyName;
    this.valueEmploymentTypeEdit = this.user.expriences[
      indexofExp
    ].expEmploymentType;
    // return indexofExp;
  }
}

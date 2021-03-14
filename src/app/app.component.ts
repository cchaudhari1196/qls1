import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './common.service';
export class SD {
  student_name: String;
  board_id: any;
  medium_id: any;
  standard_id: any;
  password: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qls';
  studentDetails = new FormGroup({
    studentName: new FormControl(''),
    board: new FormControl('', [Validators.required]),
    medium: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required)
  },this.pwdMatchValidator);


  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('cPassword').value
       ? null : {'mismatch': true};
  }

  get studentName() { return this.studentDetails.get('studentName'); }
  get board() { return this.studentDetails.get('board'); }
  get medium() { return this.studentDetails.get('medium'); }
  get standard() { return this.studentDetails.get('standard'); }
  get password() { return this.studentDetails.get('password'); }

  get getControl(){
    return this.studentDetails.controls;
  }

  boards: any[];
  mediums: any[];
  standards: any;
  constructor(private formBuilder: FormBuilder,
    private service: CommonService) {
    this.service.getBoard().subscribe((res: any) => {
      this.boards = res;
    })

    // this.studentDetails = this.formBuilder.group({
    //   name: ''
    // });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    var sd = new SD();
    sd.student_name = this.studentDetails.value.studentName
    sd.board_id = this.studentDetails.value.board.board_id
    sd.medium_id = this.studentDetails.value.medium.medium_id
    sd.standard_id = this.studentDetails.value.standard.standard_id
    sd.password = this.studentDetails.value.password
    console.log(sd);

    this.service.post(sd).subscribe((res: any) => {
      console.log(res.status)
    })
    console.warn(this.studentDetails.value);
  }
  ngoninit() {
  }

  onSelectBoard() {
    var board = this.studentDetails.get("board").value
    this.service.getMediumUsingBoardId(board.board_id).subscribe((res: any) => {
      this.mediums = res;
    })
  }


  onSelectMedium() {
    var medium = this.studentDetails.get("medium").value
    console.log(this.studentDetails.get("medium").value)
    this.service.getStandardUsingMediumId(medium.medium_id).subscribe((res: any) => {
      this.standards = res;
    })
  }

  onSelectStandard() {

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: any;
  userDetails: any;
  editUserForm: FormGroup = new FormGroup({});
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data.id;
    });
    if (this.userId !== '') {
      //View the user details
      this.userService
        .viewUser(this.userId)
        .toPromise()
        .then((data) => {
          this.userDetails = data;
          Object.assign(this.userDetails, data);

          //Build the edit form
          this.editUserForm = this.formBuilder.group({
            name: new FormControl(this.userDetails.name),
            email: new FormControl(this.userDetails.email),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  updateUser() {
    console.log(this.editUserForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userForm!: NgForm;
  user: any = {
    id: 0,
    name: '',
    surname: '',
    avatar: '',
    username: '',
    email: '',
    password: '',
  };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSRV: UserService,
    private authSRV: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData() {
    this.userSRV.getUser().subscribe((utente) => {
      this.user = utente;
    });
  }

  onSubmit() {
    this.authSRV.updateUserInfo(this.user).subscribe(
      () => {
        window.location.href = '/home';
      },
      (error) => {
        console.log(error);
      }
    );
  }
  cancel(): void {
    this.router.navigate(['']);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      this.userSRV.uploadImage(formData).subscribe((response) => {
        this.user.avatar = `${response}`;
      });
    }
  }
}

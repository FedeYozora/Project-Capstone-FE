import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.scss'],
})
export class NewWorkComponent implements OnInit {
  work: any = {
    name: '',
    description: '',
    dateCreated: '',
    dateUploaded: '',
    image: '',
    workStatus: '',
    featured: '',
  };
  constructor(
    private workSRV: WorksService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addWork() {
    this.workSRV.createWork(this.work).subscribe();
    this.snackBar.open('New Work Created!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['works']);
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.workSRV.uploadImage(formData).subscribe((response) => {
        this.work.image = `${response}`;
      });
    }
  }
}

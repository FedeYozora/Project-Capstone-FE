import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  constructor(private workSRV: WorksService, private router: Router) {}

  ngOnInit(): void {}

  addWork() {
    this.workSRV.createWork(this.work).subscribe();
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

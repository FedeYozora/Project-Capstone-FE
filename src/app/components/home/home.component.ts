import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private worksService: WorksService) {}
  works!: any[];
  formModel: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  formSubmited!: boolean;

  ngOnInit(): void {
    this.getFeaturedWorks();
  }

  getFeaturedWorks(): void {
    this.worksService.getFeaturedWorks().subscribe((response: any) => {
      this.works = response;
    });
  }

  sendMail() {
    this.worksService.sendEmail(this.formModel).subscribe();
    this.formSubmited = true;
  }
}

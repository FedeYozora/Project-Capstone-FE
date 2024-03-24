import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss'],
})
export class EditWorkComponent implements OnInit {
  workForm!: NgForm;
  work: any = {
    id: 0,
    name: '',
    description: '',
    dateCreated: '',
    dateUploaded: '',
    image: '',
    worksStatus: '',
  };
  id!: number;

  constructor(
    private workSRV: WorksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.loadWorkData();
  }

  private loadWorkData() {
    this.workSRV.getWork(this.id).subscribe((work) => {
      this.work = work;
    });
  }

  deleteWork(workId: number) {
    this.workSRV.deleteWork(workId).subscribe(() => {
      this.router.navigate(['works']);
    });
  }

  onSubmit() {
    this.workSRV.updateWork(this.id, this.work).subscribe(() => {
      this.router.navigate([`details/${this.id}`]);
    });
  }
  cancel(): void {
    this.router.navigate(['works']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WorksService } from 'src/app/services/works.service';
import { AuthData } from 'src/app/models/auth-data';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(private worksService: WorksService) {}
  works!: any[];
  searchInput!: string;
  userIsAdmin!: boolean;
  userLoggedIn!: AuthData | null;

  ngOnInit(): void {
    this.getWorks();
    // this.canActivate().subscribe((isAdmin) => {
    //   if (isAdmin) {
    //     this.userIsAdmin = true;
    //   }
    // });
  }

  getWorks(): void {
    this.worksService.getWorks().subscribe((response: any) => {
      this.works = response.content;
    });
  }

  // canActivate(): Observable<boolean> {
  //   return this.userService.isAdmin();
  // }

  searchWorks(searchValue: string): void {
    this.searchInput = searchValue.trim();
    if (!this.searchInput) {
      this.getWorks();
      return;
    }

    this.works = this.works.filter((work) =>
      work.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }
}

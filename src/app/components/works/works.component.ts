import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WorksService } from 'src/app/services/works.service';
import { UserService } from 'src/app/services/user.service';
import { AuthData } from 'src/app/models/auth-data';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(
    private worksService: WorksService,
    private userSRV: UserService
  ) {
    this.page = 0;
  }
  works!: any[];
  searchInput!: string;
  userIsAdmin!: boolean;
  userLoggedIn!: AuthData | null;
  page!: number;

  canActivate(): Observable<boolean> {
    return this.userSRV.isAdmin();
  }

  ngOnInit(): void {
    this.getWorks();
    this.canActivate().subscribe((isAdmin) => {
      if (isAdmin) {
        this.userIsAdmin = true;
      }
    });
  }

  getWorks(): void {
    this.worksService.getWorks(this.page).subscribe((response: any) => {
      this.works = response.content;
    });
  }

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

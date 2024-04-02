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
  isLoading = false;
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
  totalElements!: number;
  totalPages!: number;

  canActivate(): Observable<boolean> {
    return this.userSRV.isAdmin();
  }

  ngOnInit(): void {
    this.works = [];
    this.canActivate().subscribe((isAdmin) => {
      if (isAdmin) {
        this.userIsAdmin = true;
        this.getWorks();
      } else {
        this.getWorksVisibleComments();
      }
    });
  }

  getWorks(): void {
    this.worksService.getWorks(this.page).subscribe((response: any) => {
      this.works = this.works.concat(response.content);
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  getFirstPage(): void {
    this.worksService.getWorks(0).subscribe((response: any) => {
      this.works = response.content;
      this.page = 0;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  getWorksVisibleComments(): void {
    this.worksService
      .getWorksVisibleComments(this.page)
      .subscribe((response: any) => {
        this.works = this.works.concat(response.content);
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      });
  }

  getFirstPageVisibleComments(): void {
    this.worksService.getWorksVisibleComments(0).subscribe((response: any) => {
      this.works = response.content;
      this.page = 0;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  searchWorks(searchValue: string): void {
    this.searchInput = searchValue.trim();
    if (!this.searchInput && this.userIsAdmin === true) {
      this.getFirstPage();
      return;
    } else if (!this.searchInput) {
      this.getFirstPageVisibleComments();
      return;
    }
    if (this.userIsAdmin === true) {
      this.worksService
        .getWorksBySearchInput(this.searchInput)
        .subscribe((response: any) => {
          this.works = response;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
        });
    } else {
      this.worksService
        .getWorksBySearchInputVisibleComments(this.searchInput)
        .subscribe((response: any) => {
          this.works = response;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
        });
    }
  }

  loadNextPage(): void {
    this.page++;
    if (this.userIsAdmin === true) {
      this.getWorks();
    } else {
      this.getWorksVisibleComments();
    }
  }

  hasMorePages(): boolean {
    return this.page < this.totalPages - 1;
  }
}

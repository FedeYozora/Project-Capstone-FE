import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/services/works.service';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  works: { totalElements: number } = { totalElements: 0 };
  comments: any;
  totalComments!: number;

  serverStatus = 'Not started';
  constructor(
    private authSrv: AuthService,
    private worksSrv: WorksService,
    private commentsSrv: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.worksSrv.getWorks(1).subscribe(
      (works) => {
        this.works = works;
        this.serverStatus = 'Server is up and running';
      },
      (error) => {
        console.error('Errore nella GET', error);
        this.serverStatus = 'Server is down';
      }
    );
    this.commentsSrv
      .getAllComments()
      .subscribe(
        (response: any) => (
          (this.comments = response.content),
          (this.totalComments = response.totalElements)
        )
      );
  }

  getWork(workId: number): void {
    this.worksSrv.getWorkByCommentId(workId).subscribe((work) => {
      this.router.navigate(['details', work.id]);
    });
  }

  toggleCommentStatus(comment: Comment) {
    if (comment.commentStatus === 'HIDDEN') {
      comment.commentStatus = 'VISIBLE';
    } else {
      comment.commentStatus = 'HIDDEN';
    }
    console.log(comment.commentStatus);
    this.commentsSrv.updateComment(comment.id, comment).subscribe(() => {});
  }

  deleteComment(commentId: number) {
    this.commentsSrv.deleteComment(commentId).subscribe(() => {
      this.commentsSrv
        .getAllComments()
        .subscribe(
          (response: any) => (
            (this.comments = response.content),
            (this.totalComments = response.totalElements)
          )
        );
    });
  }
}

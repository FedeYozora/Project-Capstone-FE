import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { WorksService } from 'src/app/services/works.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/models/comment';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss'],
})
export class WorkDetailsComponent implements OnInit {
  currentUser: any;
  work: any | undefined;
  comments!: any;
  userIsAdmin!: boolean;
  commentForm: Comment = {
    workId: Number(this.route.snapshot.params['id']),
    content: '',
    id: 0,
    userId: 0,
    createdAt: new Date(),
    commentStatus: 'VISIBLE',
  };

  constructor(
    private workSrv: WorksService,
    private route: ActivatedRoute,
    private commentSrv: CommentsService,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const workId = Number(params.get('id'));
          return this.canActivate().pipe(
            map((isAdmin) => {
              if (isAdmin) {
                this.userIsAdmin = true;
              }
              return workId;
            })
          );
        })
      )
      .subscribe((workId) => {
        if (!isNaN(workId) && this.userIsAdmin === true) {
          this.workSrv.getWork(workId).subscribe((work) => {
            this.work = work;
            this.getComments(workId);
          });
        } else if (!isNaN(workId)) {
          {
            this.workSrv.getWork(workId).subscribe((work) => {
              this.work = work;
              this.getVisibleComments(workId);
            });
          }
        }
      });
  }

  canActivate(): Observable<boolean> {
    return this.userSrv.isAdmin();
  }

  createComment(comment: Comment) {
    let utente = this.userSrv.getValidUser();
    if (utente) {
    }
    this.commentSrv.createComment(comment).subscribe(() => {
      this.getComments(this.commentForm.workId);
    });
  }

  getComments(workId: number): void {
    this.commentSrv.getCommentsForWork(workId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  getVisibleComments(workId: number): void {
    this.commentSrv.getVisibleCommentsForWork(workId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  deleteComment(commentId: number) {
    this.commentSrv.deleteComment(commentId).subscribe(() => {
      this.getComments(this.commentForm.workId);
    });
  }

  toggleCommentStatus(comment: Comment) {
    if (comment.commentStatus === 'HIDDEN') {
      comment.commentStatus = 'VISIBLE';
    } else {
      comment.commentStatus = 'HIDDEN';
    }
    console.log(comment.commentStatus);
    this.commentSrv.updateComment(comment.id, comment).subscribe(() => {});
  }

  speakText(text: string): void {
    if ('speechSynthesis' in window) {
      const textRead = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(textRead);
    } else {
      console.error('Text-to-speech non supportato.');
    }
  }

  ngOnDestroy(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

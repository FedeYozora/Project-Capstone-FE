import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { WorksService } from 'src/app/services/works.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss'],
})
export class WorkDetailsComponent implements OnInit {
  currentUser: any;
  works!: any[];
  work: any | undefined;
  comments!: any;
  commentForm: Comment = {
    workId: Number(this.route.snapshot.params['id']),
    content: '',
    id: 0,
    userId: 0,
    createdAt: new Date(),
  };

  constructor(
    private workSrv: WorksService,
    private route: ActivatedRoute,
    private commentSrv: CommentsService,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const workId = Number(params.get('id'));
      if (!isNaN(workId)) {
        this.workSrv.getWork(workId).subscribe((work) => {
          this.work = work;
          this.getComments(workId);
        });
      }
    });
  }

  createComment(comment: Comment) {
    let utente = this.userSrv.getValidUser();
    if (utente) {
      console.log(utente);
      // let userId = utente.user.id;
      // this.commentForm.userId = userId;
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

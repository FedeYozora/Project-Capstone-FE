import { Directive, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../components/image-dialog/image-dialog.component';

@Directive({
  selector: '[appImageOverlay]',
})
export class ImageOverlayDirective {
  constructor(private el: ElementRef, private dialog: MatDialog) {}

  @HostListener('click')
  onClick() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: {
        imageUrl: this.el.nativeElement.src,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}

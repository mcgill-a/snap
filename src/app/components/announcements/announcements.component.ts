import { Component, Input } from '@angular/core';

@Component({
  selector: 'fido-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent {
  @Input()
  public text?: string;
}

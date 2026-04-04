// session.page.ts
import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-session',
  imports: [CommonModule, IonicModule],
  templateUrl: 'session.page.html',
  styleUrls: ['session.page.scss'],
})
export class SessionPage {
  private route = inject(ActivatedRoute);
  public sessionId!: string;


  constructor() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId')!;
  }
}

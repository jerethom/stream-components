import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonDirective } from '../../../common/directives/button.directive';
import { ChatService } from '../../../services/chat.service';
import { ForModule, LetModule } from '@rx-angular/template';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs';
import { Message } from '@stream-components/shared';
import { InputDirective } from '../../../common/directives/input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandCardComponent } from '../../component/command-card/command-card.component';
import { CommandService } from '../../../services/command.service';
import { TrackByService } from '../../../services/track-by.service';
import { NgClass, NgIf } from '@angular/common';
import { LoaderComponent } from '../../../common/components/loader/loader.component';
import { Dialog } from '@angular/cdk/dialog';
import { NewCommandDialogComponent } from '../../component/new-command-dialog/new-command-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-dashboard-page',
  standalone: true,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
  templateUrl: 'dashboard-page.component.html',
  imports: [
    ButtonDirective,
    ForModule,
    InputDirective,
    ReactiveFormsModule,
    CommandCardComponent,
    LetModule,
    NgIf,
    LoaderComponent,
    NgClass,
  ],
  providers: [RxState],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    public readonly chatService: ChatService,
    public readonly commandService: CommandService,
    public readonly trackBy: TrackByService,
    public readonly dialog: Dialog,
    public readonly state: RxState<{ messages: Message[] }>,
  ) {}

  ngOnInit(): void {
    this.state.set({
      messages: [],
    });

    this.state.connect(
      'messages',
      this.chatService.messageAdded$.pipe(
        map((message) => [...this.state.get('messages'), message].slice(-5)),
      ),
    );
  }

  openNewCommandDialog() {
    console.log('ok');
    this.dialog.open(NewCommandDialogComponent);
  }
}

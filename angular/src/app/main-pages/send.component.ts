import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { emailMatcher } from '../form-validators/email-matcher';
import * as fromRoot from '../store';
import * as fromMainPage from '../store/main-page/main-page.reducer';
import * as fromPsst from '../store/psst/psst.reducer';
import * as page from '../store/main-page/main-page.actions';
import { SendMessageAction, ResetSendAction } from '../store/psst/psst.actions';

@Component({
  selector: 'send',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./send.component.html')
})
export class SendComponent implements OnInit {
  message: FormGroup;
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromPsst.State>;

  private uuid: string = undefined;
  private window = window;

  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getPsstState);

  }

  ngOnInit() {
    this.message = this.fb.group({
      senderName: ['', [Validators.required, Validators.minLength(2)]],
      senderEmail: ['', Validators.required],
      recipientName: ['', [Validators.required, Validators.minLength(2)]],
      recipientEmail: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.store.dispatch(new ResetSendAction());
  }

  hasError(name: string, error: string = undefined): boolean {
    if (name === 'name') {
      if (error) {
        return this.message.get(name).hasError(error) && this.message.get(name).touched;
      } else {
        return this.message.get(name).errors && this.message.get(name).touched;
      }
    } else {
      if (error) {
        return this.message.get(name).hasError(error) && this.message.get(name).touched;
      } else {
        return this.message.get(name).errors && this.message.get(name).touched;
      }
    }
  }

  onSubmit() {
    console.log(this.message.value, this.message.valid);

    this.store.dispatch(new SendMessageAction(this.message.value));
  }

  resetSend() {
    this.message.reset();
    this.store.dispatch(new ResetSendAction());
  }
}


import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { emailMatcher } from '../form-validators/email-matcher';
import * as fromRoot from '../store';
import * as fromMainPage from '../store/main-page/main-page.reducer';
import * as page from '../store/main-page/main-page.actions';
import { ApiService } from '../services/api.service';
import { Message } from '../models/message';

@Component({
  selector: 'message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./read-message.component.html')
})
export class ReadMessageComponent implements OnInit {
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;

  private message: Observable<Message>;

  private window = window;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  ngOnInit() {
    this.message = this.route.params.switchMap((params: any) => {
        let messageId = params['messageId'] || 0;
        
        return this.apiService.get(messageId);
    });

    this.message.subscribe(val => console.log(val));
  }

}


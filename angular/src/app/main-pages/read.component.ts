import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { emailMatcher } from '../form-validators/email-matcher';
import * as fromRoot from '../store';
import * as fromMainPage from '../store/main-page/main-page.reducer';
import * as page from '../store/main-page/main-page.actions';

export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  };
}

@Component({
  selector: 'read',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./read.component.html')
})
export class ReadComponent implements OnInit {
  message: FormGroup;
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;

  private window = window;

  constructor(
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private router: Router,    
    private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  ngOnInit() {
    this.message = this.fb.group({
      uuid: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  hasError(name: string, error: string = undefined): boolean {
    if (error) {
    return this.message.get(name).hasError(error) && this.message.get(name).touched;
    } else {
    return this.message.get(name).errors && this.message.get(name).touched;
    }
  }

  onSubmit() {
    console.log(this.message.value, this.message.valid);

    this.router.navigate(['/message', this.message.value.uuid]);
  }
}


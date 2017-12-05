import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../store';
import * as psst from './psst.actions';
import { go } from '@ngrx/router-store';
import { ApiService } from '../../services/api.service';
import { OutboundMessage } from 'src/app/models/outbound-message';
import { Message } from 'src/app/models/message';


@Injectable()
export class PsstEffects {

    @Effect()
    sendMessage$: Observable<Action> = this.actions$
        .ofType(psst.ACTION.SEND_MESSAGE)
        .debounceTime(300)
        .map((action: psst.SendMessageAction) => action.payload)
        .switchMap((message: OutboundMessage) => {
            const nextSearch$ = this.actions$.ofType(psst.ACTION.SEND_MESSAGE).skip(1);

            console.log('sendMessage');
            // this.loaderService.show();
            return this.apiService.post(message)
                .takeUntil(nextSearch$)
                .map((uuid: string) => {
                    return new psst.MessageSentAction(uuid);
                })
                .catch((error: any) => {
                    console.log(error);
                    console.log('Could not send message.');
                    return of({ type: 'NO_OP' });
                })
                .finally(() => {
                    // this.loaderService.hide();
                });
        });

        @Effect()
        getMessage$: Observable<Action> = this.actions$
            .ofType(psst.ACTION.GET_MESSAGE)
            .debounceTime(300)
            .map((action: psst.GetMessageAction) => action.payload)
            .switchMap((uuid: string) => {
                const nextSearch$ = this.actions$.ofType(psst.ACTION.GET_MESSAGE).skip(1);
    
                console.log('getMessage');
                // this.loaderService.show();
                return this.apiService.get(uuid)
                    .takeUntil(nextSearch$)
                    .map((message: Message) => {
                        return new psst.MessageRetrievedAction(message);
                    })
                    .catch((error: any) => {
                        console.log(error);
                        console.log('Could not get message.');
                        return of({ type: 'NO_OP' });
                    })
                    .finally(() => {
                        // this.loaderService.hide();
                    });
            });
    
    
    constructor(private actions$: Actions,
                private store: Store<fromRoot.State>,
                private apiService: ApiService) {

    }

}

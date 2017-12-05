import { Action } from '@ngrx/store';
import { type } from '../util';
import { Message } from '../../models/message';
import { OutboundMessage } from '../../models/outbound-message';

export const ACTION = {
    RESET_SEND: type('[Psst] Reset Send'),
    GET_MESSAGE: type('[Psst] Get Message'),
    MESSAGE_RETRIEVED: type('[Psst] Message Retrieved'),
    SEND_MESSAGE: type('[Psst] Send Message'),
    MESSAGE_SENT: type('[Psst] Message Sent'),
    DELETE_MESSAGE: type('[Psst] Delete Message'),
    MESSAGE_DELETED: type('[Psst] Message Deleted'),
};

export class ResetSendAction implements Action {
    type = ACTION.RESET_SEND;
}

export class GetMessageAction implements Action {
    type = ACTION.GET_MESSAGE;

    constructor(public payload: string) {
    }
}

export class MessageRetrievedAction implements Action {
    type = ACTION.MESSAGE_RETRIEVED;

    constructor(public payload: Message) {
    }
}

export class SendMessageAction implements Action {
    type = ACTION.SEND_MESSAGE;

    constructor(public payload: OutboundMessage) {
    }
}

export class MessageSentAction implements Action {
    type = ACTION.MESSAGE_SENT;

    constructor(public payload: string) {
    }
}

export class DeleteMessageAction implements Action {
    type = ACTION.DELETE_MESSAGE;

    constructor(public payload: string) {
    }
}

export class MessageDeletedAction implements Action {
    type = ACTION.MESSAGE_DELETED;
}



export type Actions
    = GetMessageAction
    | MessageRetrievedAction
    | SendMessageAction
    | MessageSentAction
    | DeleteMessageAction
    | MessageDeletedAction;

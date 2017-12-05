import { createSelector } from 'reselect';
import * as psst from './psst.actions';
import { Message } from '../../models/message';

export interface State {
  sendEditing: boolean;
  uuid: string;
  message: Message;
};

const initialState: State = {
  sendEditing: true,
  uuid: undefined,
  message: undefined
};

export function reducer(state = initialState, action: psst.Actions): State {
  switch (action.type) {
    case psst.ACTION.RESET_SEND:
      return Object.assign({}, state, {
        sendEditing: true,
        uuid: undefined                
      });

    case psst.ACTION.MESSAGE_SENT:
      return Object.assign({}, state, {
        sendEditing: false,
        uuid: (<psst.MessageSentAction>action).payload
      });

    case psst.ACTION.GET_MESSAGE:
      return Object.assign({}, state, {
        message: undefined
      });
    
    case psst.ACTION.MESSAGE_RETRIEVED:
      return Object.assign({}, state, {
        message: (<psst.MessageRetrievedAction>action).payload
      });
  

    default:
      return state;
  }
}

export const getPsstState = (state: State) => state;

export const getPsstMessage = (state: State) => state.message;

import { createSelector } from 'reselect';
import * as psst from './psst.actions';

export interface State {
  sendEditing: boolean;
  uuid: string;
};

const initialState: State = {
  sendEditing: true,
  uuid: undefined,
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

    default:
      return state;
  }
}

export const getPsstState = (state: State) => state;

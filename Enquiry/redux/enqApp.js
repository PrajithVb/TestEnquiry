import remove from 'lodash.remove';

// Action Types

export const SAVE_ITEM = 'SAVE_ITEM';

// Action Creators

let noteID = 0;

export function saveItem(item) {
  return {
    type: SAVE_ITEM,
    item: item,
  };
}

// reducer

const initialState = [];

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_ITEM:
      return [
        ...state,
        {
          item: action.item,
        },
      ];

    default:
      return state;
  }
}

export default itemReducer;

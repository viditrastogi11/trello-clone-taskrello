import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: { lists: ["49d25ee3-e3d2-4c03-aabe-9c0782948adb"] },
  lists: {
    "49d25ee3-e3d2-4c03-aabe-9c0782948adb": {
      id: "49d25ee3-e3d2-4c03-aabe-9c0782948adb",
      title: "To-Do",
      cards: [
        "4fa8a642-3c84-4a76-aec3-7b6dfd7c6778",
        "68d67fdd-673b-4c4c-9564-289716ef235d",
      ],
    },
  },
  cards: {
    "4fa8a642-3c84-4a76-aec3-7b6dfd7c6778": {
      text: "Task 1",
      id: "4fa8a642-3c84-4a76-aec3-7b6dfd7c6778",
      description: "This is my first taks",
      created_on: "1 Oct 2022, 7:45 pm",
    },
    "68d67fdd-673b-4c4c-9564-289716ef235d": {
      text: "Task 2",
      id: "68d67fdd-673b-4c4c-9564-289716ef235d",
      description: "This is my second taks",
      created_on: "1 Oct 2022, 7:48 pm",
    },
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addList: (state, action) => {
      const { listId, listTitle } = action.payload;
      state.board = { lists: [...state.board.lists, listId] };
      state.lists = {
        ...state.lists,
        [listId]: { id: listId, title: listTitle, cards: [] },
      };
    },
    moveList: (state, action) => {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.board.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state.board = { lists: newLists };
      console.log(state, action);
    },
    deleteList: (state, action) => {
      const { listId, cards: cardIds } = action.payload;
      const filterDeleted = (tmpListId) => tmpListId !== listId;
      const newLists = state.board.lists.filter(filterDeleted);
      state.board = { lists: newLists };
      const { [listId]: deletedList, ...restOfLists } = state.lists;
      state.lists = restOfLists;
      console.log(cardIds);
      if (cardIds.cards.length > 0)
        state.cards = Object.keys(state.cards)
          .filter((cardId) => !cardIds.cards.includes(cardId))
          .reduce(
            (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
            {}
          );
    },
    changeListItem: (state, action) => {
      const { listId, listTitle } = action.payload;
      state.lists = {
        ...state.lists,
        [listId]: { ...state.lists[listId], title: listTitle },
      };
    },
    addCard: (state, action) => {
      const { listId, cardText, cardDate, cardDescription, cardId } =
        action.payload;
      console.log(listId, cardText, cardId);
      state.cards = {
        ...state.cards,
        [cardId]: {
          text: cardText,
          id: cardId,
          description: cardDescription,
          created_on: cardDate,
        },
      };
      state.lists = {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          cards: [...state.lists[listId].cards, cardId],
        },
      };
      console.log(state.cards, state.lists);
    },
    moveCard: (state, action) => {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } =
        action.payload;

      if (sourceListId === destListId) {
        const newCards = Array.from(state.lists[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        state.lists = {
          ...state.lists,
          [sourceListId]: { ...state.lists[sourceListId], cards: newCards },
        };
      } else {
        const sourceCards = Array.from(state.lists[sourceListId].cards);
        const [removedCard] = sourceCards.splice(oldCardIndex, 1);
        const destinationCards = Array.from(state.lists[destListId].cards);
        destinationCards.splice(newCardIndex, 0, removedCard);
        state.lists = {
          ...state.lists,
          [sourceListId]: { ...state.lists[sourceListId], cards: sourceCards },
          [destListId]: { ...state.lists[destListId], cards: destinationCards },
        };
      }
    },
    deleteCard: (state, action) => {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId) => cardId !== deletedCardId;
      state.lists = {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          cards: state.lists[listId].cards.filter(filterDeleted),
        },
      };
      const { [deletedCardId]: deletedCard, ...restOfCards } = state.cards;
      state.cards = restOfCards;
    },
    changeCardText: (state, action) => {
      const { cardText, cardId } = action.payload;
      state.cards = {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], text: cardText },
      };
      console.log(state.cards);
    },
  },
});

export const {
  addList,
  moveList,
  deleteList,
  moveCard,
  addCard,
  changeCardText,
  changeListItem,
  deleteCard,
} = boardSlice.actions;

export default boardSlice.reducer;

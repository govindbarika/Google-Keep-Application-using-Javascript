let states = [];

export function keepApp(state = [], action) {
    switch (action.type) {
        case 'SAVE_CARD':
            state.concat(action.cardData)
            var s = action.cardData;
            states.push(s);
            console.log(states);
            return s;

        case 'GET_CARDS':
            var s = state.concat(action.cardsData);
            states.push(s);
            return s;
        case 'DELETE_CARD':
            for (var i = 0; i < state.length; i++) {
                if (state[i].id == action.id) state.splice(i, 1);
            }
            console.log('this is deleted card data from reducer' + action.id);
            break;
        default:
            return state;
    }
}

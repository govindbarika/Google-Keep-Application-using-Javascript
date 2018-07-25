let states = [];

export function keepApp(state = { tasks: [], cardTitle: "" }, action) {
    switch (action.type) {
        case 'SAVE_CARD':
            const s = [{ tasks: [...state.tasks, ...action.cardData.tasks], cardTitle: action.cardData.cardTitle }]
            states.push(s);

            console.log(states);
            return s;
        default:
            return state;
    }
}

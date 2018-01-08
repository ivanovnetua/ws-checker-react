const currenciesDefaultState = {
    modalStepActive: 1
};


export default function changeSteps (state = currenciesDefaultState, action) {
    // console.log('action', action);
    // console.log('state', state);

    if (action.type === 'CHANGE_MODAL_STEPS') {
        return {...state, modalStepActive: action.modalStepActive }
    }

    return state
} 
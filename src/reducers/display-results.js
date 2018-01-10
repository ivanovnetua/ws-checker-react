export default function displayResults(state = {}, action) {

    // console.log(state, action);

    if (action.type === 'DISPLAY_RESULTS') {

        // todo: results

        console.log('display results:', action);

        return state
    }


    return state
}
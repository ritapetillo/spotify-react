import { act } from "react-dom/test-utils";

export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    refreshToken:null
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user:action.user
            }
                break
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                refreshToken:action.refreshToken
            }
            break
        default:
            return state;
    }
    
}
export default reducer;
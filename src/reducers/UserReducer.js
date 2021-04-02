export const initialState = {
    id: '',
};

export const UserReducer = (state, action) => {
    switch(action.type)
    {
        case 'setId':
            return { ...state, id: action.payload.id };
        break;    
        
        default:
            return state;
    }
}
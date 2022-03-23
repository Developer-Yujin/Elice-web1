export function userReducer(userState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("%c로그인!", "color: #d93d1a;");
            return {
                ...userState,
                user: action.payload,
            };
        case "LOGOUT":
            console.log("%c로그아웃!", "color: #d93d1a;");
            return {
                ...userState,
                user: null,
            };
        default:
            return userState;
    }
}

export function categoryReducer(categoryState, action){
    if(action.type === 'SET_CATEGORY'){
        return {
            ...categoryState,
            category: action.payload,
        }
    }
}

export const articleReducer = (state, action) => {
    const {id, title, description, author} = action.payload
    switch(action.type){
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, {id: state.length+1, title, description, author}]
        case 'EDIT':
            return state.map((article) => 
                article.id === action.payload.id
                ? {id, title, description, author}
                : article
            )
        case 'DELETE':
            return state.filter((article) => article !== action.payload)
        default:
            return state
    }
}

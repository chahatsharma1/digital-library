import {
    FETCH_LIBRARIES_REQUEST,
    FETCH_LIBRARIES_SUCCESS,
    FETCH_LIBRARIES_FAILURE,
    FETCH_LIBRARY_BY_ID_REQUEST,
    FETCH_LIBRARY_BY_ID_SUCCESS,
    FETCH_LIBRARY_BY_ID_FAILURE
} from "./ActionType";

const initialState = {
    libraries: [],
    selectedLibrary: null,
    loading: false,
    error: null,
};

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIBRARIES_REQUEST:
        case FETCH_LIBRARY_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_LIBRARIES_SUCCESS:
            return {
                ...state,
                libraries: action.payload,
                loading: false,
            };

        case FETCH_LIBRARY_BY_ID_SUCCESS:
            return {
                ...state,
                selectedLibrary: action.payload,
                loading: false,
            };

        case FETCH_LIBRARIES_FAILURE:
        case FETCH_LIBRARY_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default libraryReducer;

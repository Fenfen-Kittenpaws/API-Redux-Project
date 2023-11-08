import { useDispatch } from 'react-redux';
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS_PENDING = 'Spots/FETCH_SPOTS_PENDING';
const FETCH_SPOTS_FULFILLED = 'Spots/FETCH_SPOTS_FULFILLED';
const FETCH_SPOTS_REJECTED = 'Spots/FETCH_SPOTS_REJECTED';

// Action Creators
export const fetchSpotsPending = () => ({
    type: FETCH_SPOTS_PENDING
});

export const fetchSpotsFulfilled = (spots) => ({
    type: FETCH_SPOTS_FULFILLED,
    payload: spots
});
export const fetchSpotsRejected = (error) => ({
    type: FETCH_SPOTS_REJECTED,
    payload: error
});

// Thunk Action
export const fetchSpots = () => async (dispatch) => {
    dispatch(fetchSpotsPending());
    try {
        const response = await csrfFetch('/api/spots');
        const spots = await response.json();
        dispatch(fetchSpotsFulfilled(spots.Spots));
    } catch (error) {
        dispatch(fetchSpotsRejected(error));
    }
};

// Spots Reducer
const initialState = { items: [], loading: false, error: null };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SPOTS_PENDING:
            return { ...state, loading: true, error: null };
        case FETCH_SPOTS_FULFILLED:
            return { ...state, items: action.payload, loading: false };
        case FETCH_SPOTS_REJECTED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default spotsReducer;

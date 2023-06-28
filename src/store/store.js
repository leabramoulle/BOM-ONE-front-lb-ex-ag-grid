import { configureStore } from '@reduxjs/toolkit';
import cpnReducer from '../pages/cpn/cpnReducer';

export default configureStore({
  reducer: {
    pokemons: cpnReducer,
  },
})
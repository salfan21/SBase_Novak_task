import { configureStore } from '@reduxjs/toolkit';
import dataSliece from './dataSliece';
import userSliece from './userSliece';
 
const store = configureStore({
    reducer: {
        posts: dataSliece,
        users: userSliece
    }
});

export default store;
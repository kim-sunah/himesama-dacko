import { configureStore } from '@reduxjs/toolkit';
import channelslice from './channel-slice';



export const store = configureStore({reducer : {channel : channelslice.reducer}});


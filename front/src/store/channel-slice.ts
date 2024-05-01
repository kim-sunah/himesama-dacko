import {createSlice ,type PayloadAction} from "@reduxjs/toolkit"

export type channelItem = {
    
        upload: string;
        videoDuration : string
        order :  string
    
}
type  channeState = {
    items : channelItem[]

}
const initialState: channeState = {
    items : []
}

export const channelslice = createSlice({
    name : "channel",
    initialState,
    reducers:{
        addTochannelInfo(state , action){
         state.items = [];
         state.items.push(action.payload)
       
        },
    }

})


export const channelActions = channelslice.actions
export default channelslice;
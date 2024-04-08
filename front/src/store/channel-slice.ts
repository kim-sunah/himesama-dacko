import {createSlice ,type PayloadAction} from "@reduxjs/toolkit"

export type channelItem = {
    channelInfo :{
        id: number;
        Channel_Id: string;
        Channel_Url_Id: string;
        Channel_img: string;
        Channel_nickname: string;
        subscriberCount: string;
        Channel_category: string
        videoCount: string;
        viewCount: string;
        previous_subscriberCount: string
        previous_viewCount: string
        previous_videoCount : string
    }
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
         console.log(action.payload.channelInfo.Channel_Id)
        },
    }

})


export const channelActions = channelslice.actions
export default channelslice;
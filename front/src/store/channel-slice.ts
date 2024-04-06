import {createSlice ,type PayloadAction} from "@reduxjs/toolkit"

export type channelItem = {
    Channel_Id: string
    isRunning :  boolean
    Channel_category : string
    Channel_img : string
    subscriberCount : number
    id: number
    videoCount : number
    viewCount : number

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
        addTochannelInfo(state , action : PayloadAction<{ Channel_Id: string ,isRunning :  boolean, Channel_category : string,Channel_img : string,subscriberCount : number,videoCount : number,viewCount : number,}>){
           console.log(action.payload.Channel_Id)
        },
    }

})


export const channelActions = channelslice.actions
export default channelslice;
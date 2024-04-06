import { type ReactNode, createContext, useContext, useReducer } from "react";

type TimerState = {
    id?: string
    isRunning :  boolean;

}
type TimersContextValue = TimerState & {  
    startTimers : () => void,
}
     

const TimerContext = createContext<TimersContextValue | null>(null);

export function useChannelContext(){
    const timerCtx = useContext(TimerContext)
    if(timerCtx === null){
        throw new Error("TimersContext is null - that should not be the case!")
    }
    return timerCtx
}

type  TimersContextProviderProps = {
    children : ReactNode;
}

type StartTimersAction = {
    type : "START"
}

type Action = StartTimersAction
   
const initialState : TimerState = {
    isRunning: false,
  
}

function timersReducer(state : TimerState, action : Action) : TimerState {
    if(action.type === "START"){
        // state.isRunning = true
        return {
            isRunning : true
        }
    }
    return state
}


export default function ChannelContextProvider({children} : TimersContextProviderProps){
    // const [timerState , dispatch]  = useReducer(timersReducer, initialState)
    // const ctx  : TimersContextValue = {
    //     isRunning : timerState.isRunning,
    //     id :
    //     startTimers() {
    //         dispatch({type : "START"});
    //     },
      
    // }
    // return (<TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>)
}
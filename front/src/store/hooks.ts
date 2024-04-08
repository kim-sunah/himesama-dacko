import {useDispatch, useSelector, type TypedUseSelectorHook} from "react-redux"
import { RootState } from "./store";


export const useChannelSelector: TypedUseSelectorHook<RootState> = useSelector;
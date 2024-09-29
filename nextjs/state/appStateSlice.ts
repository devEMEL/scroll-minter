import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface itemsInterface {
    chainId: number;
    contractAddress: string;
    name: string;
    symbol: string;
    creator: string;
    timestamp: number;
    price: number;
    maxSupply: number;
    imageURI: string;
}

interface stateInterface {
    items: Array<itemsInterface>;
    loading: boolean;
    error: any;
}

const initialState: stateInterface = {
    items: [
        //     {
        //     chainId: 111555,
        //     contractAddress: "0xsknnkkflepo",
        //     name: "Dominic Art",
        //     symbol: "DAT",
        //     creator: "0xhjkkajioHIOICHIHoonciiowowoowowwolooo",
        //     timestamp: 1908494909101,
        //     price: 12,
        //     maxSupply: 1000,
        //     imageURL: "ipfs://bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i",
        // }
    ],
    loading: false,
    error: null,
};

export const fetchNfts = createAsyncThunk(
    'nfts/fetchNfts',
    async (requestURL: string) => {
        const response = await axios.get(requestURL);
        return response.data.data.nfts;
    }
);

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNfts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNfts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNfts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    /*..FUNCTIONS FROM REDUCERS AND EXTRAREDUCERS..*/
} = appStateSlice.actions;
export default appStateSlice.reducer;

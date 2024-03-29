import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    currentPairInfo: null,

    currentChainInfo: {
      id: 1,
      name: '',
      nativeCurrency: {
        decimals: 18,
        name: "",
        symbol: ""
      }
    },
    input: {
      name: '',
      balance: 0,
      symbol: '',
      inputValue: 0,
      decimals: 18,
    },
    output: {
      name: '',
      balance: 0,
      symbol: '',
      inputValue: 0,
      decimals: 18,
    },
    selectType: 'output',
    isBuy: true, // true 买入币 false 卖出币
  },
  reducers: {
    setAddress: (state, { payload }) => {
      state.address = payload
    },

    setCurrentChainInfo: (state, { payload }) => {
      state.currentChainInfo = { ...payload }
    },

    setCurrentPairInfo: (state, { payload }) => {
      state.currentPairInfo = payload
    },

    setInput: (state, { payload }) => {
      state.input = {
        ...state.input,
        ...payload
      }
    },

    setOutput: (state, { payload }) => {
      state.output = {
        ...state.output,
        ...payload
      }
    },

    setSelectType: (state, { payload }) => {
      state.selectType = payload
    },

    setIsBuy: (state, { payload }) => {
      state.isBuy = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions

export default userSlice.reducer

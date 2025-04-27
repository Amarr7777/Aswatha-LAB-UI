import { createSlice } from '@reduxjs/toolkit'
import {
  ADD_NEW_PARAMETER_ERROR,
  ADD_NEW_PARAMETER_REQUESTING,
  ADD_NEW_PARAMETER_SUCCESS,
  ADD_NEW_RECORD_ERROR,
  ADD_NEW_RECORD_REQUESTING,
  ADD_NEW_RECORD_SUCCESS,
  ADD_NEW_TEST_ERROR,
  ADD_NEW_TEST_REQUESTING,
  ADD_NEW_TEST_SUCCESS,
  ADD_NEW_UNIT_ERROR,
  ADD_NEW_UNIT_REQUESTING,
  ADD_NEW_UNIT_SUCCESS,
  GET_PARAMETER_ERROR,
  GET_PARAMETER_REQUESTING,
  GET_PARAMETER_SUCCESS,
  GET_RECORD_ERROR,
  GET_RECORD_REQUESTING,
  GET_RECORD_SUCCESS,
  GET_TEST_ERROR,
  GET_TEST_REQUESTING,
  GET_TEST_SUCCESS,
  GET_UNIT_ERROR,
  GET_UNIT_REQUESTING,
  GET_UNIT_SUCCESS
} from '../constants/actionTypes';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    testValue: {
      requesting: false,
      error: false,
      data: []
    },
    parameterValue: {
      requesting: false,
      error: false,
      data: []
    },
    unitValue: {
      requesting: false,
      error: false,
      data: []
    },
    recordValue: {
      requesting: false,
      error: false,
      data: []
    }
  },
  reducers: {
    //TEST
    [ADD_NEW_TEST_REQUESTING]: (state) => {
      state.testValue.requesting = true;
      state.testValue.error = false;

    },
    [ADD_NEW_TEST_SUCCESS]: (state) => {
      state.testValue.requesting = false;
      state.testValue.error = false;
    },
    [ADD_NEW_TEST_ERROR]: (state) => {
      state.testValue.requesting = false;
      state.testValue.error = true;
    },

    [GET_TEST_REQUESTING]: (state) => {
      state.testValue.requesting = true;
      state.testValue.error = false;

    },
    [GET_TEST_SUCCESS]: (state,{payload}) => {
      console.log("payload in test:  ",payload)
      state.testValue.requesting = false;
      state.testValue.error = false;
      state.testValue.data = payload;
    },
    [GET_TEST_ERROR]: (state) => {
      state.testValue.requesting = false;
      state.testValue.error = true;
    },

    //PARAMETER
    [ADD_NEW_PARAMETER_REQUESTING]: (state) => {
      state.parameterValue.requesting = true;
      state.parameterValue.error = false;

    },
    [ADD_NEW_PARAMETER_SUCCESS]: (state) => {
      state.parameterValue.requesting = false;
      state.parameterValue.error = false;
    },
    [ADD_NEW_PARAMETER_ERROR]: (state) => {
      state.parameterValue.requesting = false;
      state.parameterValue.error = true;
    },
    
    [GET_PARAMETER_REQUESTING]: (state) => {
      state.parameterValue.requesting = true;
      state.parameterValue.error = false;

    },
    [GET_PARAMETER_SUCCESS]: (state,{payload}) => {
      state.parameterValue.requesting = false;
      state.parameterValue.error = false;
      state.parameterValue.data = payload;
    },
    [GET_PARAMETER_ERROR]: (state) => {
      state.parameterValue.requesting = false;
      state.parameterValue.error = true;
    },

    //UNIT
    [ADD_NEW_UNIT_REQUESTING]: (state) => {
      state.unitValue.requesting = true;
      state.unitValue.error = false;
    },
    [ADD_NEW_UNIT_SUCCESS]: (state) => {
      state.unitValue.requesting = false;
      state.unitValue.error = false;
    },
    [ADD_NEW_UNIT_ERROR]: (state) => {
      state.unitValue.requesting = false;
      state.unitValue.error = true;
    },
    [GET_UNIT_REQUESTING]: (state) => {
      state.unitValue.requesting = true;
      state.unitValue.error = false;
    },
    [GET_UNIT_SUCCESS]: (state,{payload}) => {
      state.unitValue.requesting = false;
      state.unitValue.error = false;
      state.unitValue.data = payload;
    },
    [GET_UNIT_ERROR]: (state) => {
      state.unitValue.requesting = false;
      state.unitValue.error = true;
    },

    //RECORD
    [ADD_NEW_RECORD_REQUESTING]: (state) => {
      state.recordValue.requesting = true;
      state.recordValue.error = false;
    },
    [ADD_NEW_RECORD_SUCCESS]: (state) => {
      state.recordValue.requesting = false;
      state.recordValue.error = false;
    },
    [ADD_NEW_RECORD_ERROR]: (state) => {
      state.recordValue.requesting = false;
      state.recordValue.error = true;
    },
    [GET_RECORD_REQUESTING]: (state) => {
      state.recordValue.requesting = true;
      state.recordValue.error = false;
    },
    [GET_RECORD_SUCCESS]: (state, {payload}) => {
      state.recordValue.requesting = false;
      state.recordValue.error = false;
      state.recordValue.data = payload;
    },
    [GET_RECORD_ERROR]: (state) => {
      state.recordValue.requesting = false;
      state.recordValue.error = true;
    },
  },
});

export const appActions = appSlice.actions;
const makeAppSelector = (state) => state.app;

export const getTests = (state) => makeAppSelector(state).testValue.data;
export const getParameters = (state) => makeAppSelector(state).parameterValue.data;
export const getUnits = (state) => makeAppSelector(state).unitValue.data;
export const getRecords = (state) => makeAppSelector(state).recordValue.data;
export const getRecordsRequesting = (state) => makeAppSelector(state).recordValue.requesting;
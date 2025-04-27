import {
    put, takeLatest, call, select
} from "redux-saga/effects";
import { ADD_NEW_PARAMETER_ERROR, ADD_NEW_PARAMETER_SAGA_REQUESTING, ADD_NEW_PARAMETER_SUCCESS, ADD_NEW_RECORD_ERROR, ADD_NEW_RECORD_SAGA_REQUESTING, ADD_NEW_RECORD_SUCCESS, ADD_NEW_TEST_ERROR, ADD_NEW_TEST_SAGA_REQUESTING, ADD_NEW_TEST_SUCCESS, ADD_NEW_UNIT_ERROR, ADD_NEW_UNIT_SAGA_REQUESTING, ADD_NEW_UNIT_SUCCESS, DELETE_RECORD_SAGA_REQUESTING, GET_PARAMETER_ERROR, GET_PARAMETER_SAGA_REQUESTING, GET_PARAMETER_SUCCESS, GET_RECORD_ERROR, GET_RECORD_SAGA_REQUESTING, GET_RECORD_SUCCESS, GET_TEST_ERROR, GET_TEST_SAGA_REQUESTING, GET_TEST_SUCCESS, GET_UNIT_ERROR, GET_UNIT_SAGA_REQUESTING, GET_UNIT_SUCCESS } from "../constants/actionTypes";
import axiosInstance from "../utils/axiosConfig";
import { appActions } from "../store/app";


function* addTestWatcher({payload}) {
    try {
        const postData = {
            name: payload
        }
        const response = yield call(axiosInstance.post, '/tests', postData)
        if (response.status === 201) {
            yield put(appActions[ADD_NEW_TEST_SUCCESS]())
            yield call(getTestWatcher)
        }
    } catch (error) {
        console.error(error)
        yield put(appActions[ADD_NEW_TEST_ERROR]())
    }
}

function* addParameterWatcher({ payload }) {
    try {
        const postData = {
            name: payload
        }
        const response = yield call(axiosInstance.post, '/parameters', postData)
        if (response.status === 201) {
            yield put(appActions[ADD_NEW_PARAMETER_SUCCESS]())
            yield call(getParameterWatcher)
        }
    } catch (error) {
        console.error(error)
        yield put(appActions[ADD_NEW_PARAMETER_ERROR]())
    }
}

function* addUnitWatcher({payload}) {
    try {
        const postData = {
            name: payload
        }
        const response = yield call(axiosInstance.post, '/units', postData)
        if (response.status === 201) {
            yield put(appActions[ADD_NEW_UNIT_SUCCESS]())
            yield call(getUnitWatcher)
        }
    } catch (error) {
        console.error(error)
        yield put(appActions[ADD_NEW_UNIT_ERROR]())
    }
}

function* addRecordWatcher({payload}) {
    console.log("payload in add record: ",payload)
    try {
        const response = yield call(axiosInstance.post, '/records',payload)
        if (response.status === 201) {
            yield put(appActions[ADD_NEW_RECORD_SUCCESS]())
            yield call(getRecordWatcher)
        }
    } catch (error) {
        console.error(error)
        yield put(appActions[ADD_NEW_RECORD_ERROR]())
    }
}


function* getTestWatcher() {
    try {
        console.log("getTestWatcher:: start")
        const response = yield call(axiosInstance.get, '/tests')
        if (response.status === 200) {
            yield put(appActions[GET_TEST_SUCCESS](response.data))
        }
        console.log("getTestWatcher:: end")
    } catch (error) {
        console.error(error);
        yield put(appActions[GET_TEST_ERROR]())
    }
}
function* getParameterWatcher() {
    console.log("getParameterWatcher:: start")
    try {
        const response = yield call(axiosInstance.get, '/parameters')
        if (response.status === 200) {
            yield put(appActions[GET_PARAMETER_SUCCESS](response.data))
        }
        console.log("getParameterWatcher:: end")
    } catch (error) {
        console.error(error);
        yield put(appActions[GET_PARAMETER_ERROR]())
    }
}
function* getUnitWatcher() {
    try {
        console.log("getUnitWatcher:: start")
        const response = yield call(axiosInstance.get, '/units')
        if (response.status === 200) {
            yield put(appActions[GET_UNIT_SUCCESS](response.data))
        }
        console.log("getUnitWatcher:: end")
    } catch (error) {
        console.error(error);
        yield put(appActions[GET_UNIT_ERROR]())
    }
}
function* getRecordWatcher() {
    try {
        console.log("getUnitWatcher:: start")
        const response = yield call(axiosInstance.get, '/records')
        if (response.status === 200) {
            yield put(appActions[GET_RECORD_SUCCESS](response.data))
        }
    } catch (error) {
        console.error(error);
        yield put(appActions[GET_RECORD_ERROR]())
    }
}

function* deleteRecordWatcher({payload}) {
    try {
        console.log("getUnitWatcher:: start")
        const response = yield call(axiosInstance.delete, `/records/${payload}`)
        if (response.status === 200) {
            yield call(getRecordWatcher);
        }
    } catch (error) {
        console.error(error);
        // yield put(appActions[GET_RECORD_ERROR]())
    }
}


export default function* appWatcher() {
    yield takeLatest(ADD_NEW_TEST_SAGA_REQUESTING, addTestWatcher);
    yield takeLatest(ADD_NEW_PARAMETER_SAGA_REQUESTING, addParameterWatcher);
    yield takeLatest(ADD_NEW_UNIT_SAGA_REQUESTING, addUnitWatcher);
    yield takeLatest(ADD_NEW_RECORD_SAGA_REQUESTING, addRecordWatcher);
    yield takeLatest(GET_TEST_SAGA_REQUESTING, getTestWatcher);
    yield takeLatest(GET_PARAMETER_SAGA_REQUESTING, getParameterWatcher);
    yield takeLatest(GET_UNIT_SAGA_REQUESTING, getUnitWatcher);
    yield takeLatest(GET_RECORD_SAGA_REQUESTING, getRecordWatcher);
    yield takeLatest(DELETE_RECORD_SAGA_REQUESTING, deleteRecordWatcher);
}
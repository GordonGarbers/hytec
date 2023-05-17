import { takeEvery, all, call, put } from "redux-saga/effects";
import {
  dataPedding,
  dataFulfilled,
  dataReject,
} from "../features/data/data.slice";
import {IResponseGenerator } from "../interfaces/interfaces";
import axios, { AxiosError } from "axios";

const fetchHeroDetails = async (url: string) => {
  // return await axios.get(url);
  //using WEB SERVER FOR CHROME
  return await axios.get('http://127.0.0.1:8887/en/data.json');

  // return await axios({
  //   method: 'get',
  //   url:'http://127.0.0.1:8887/en/data.json',
  //   headers: {
  //     'Access-Control-Allow-Origin': 'http://localhost:3000'
  //   }
  
  // })
};

function* getHeroDetailsWorker(action: { type: string; payload: string }) {
  try {
    const response: IResponseGenerator = yield call(
      fetchHeroDetails,
      action.payload
    );

    yield put(dataFulfilled(response.data));

  } catch (error: any | unknown) {
    let err = "";
    if (error instanceof AxiosError) err = error.message;
    else err = "Something went wrong";
    yield put(dataReject(err));
  }
}

function* getHeroDetails() {
  yield takeEvery(dataPedding.type, getHeroDetailsWorker);
}

export default function* rootSaga() {
  yield all([call(getHeroDetails)]);
}

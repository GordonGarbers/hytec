import { takeEvery, all, call, put } from "redux-saga/effects";
import {
  heroDetailsPedding,
  heroDetailsFulfilled,
  heroDetailsReject,
} from "../features/heroDetails/heroDetails.slice";
import {IResponseGenerator } from "../interfaces/interfaces";
import axios, { AxiosError } from "axios";

const fetchHeroDetails = async (url: string) => {
  return await axios.get(url);
};

function* getHeroDetailsWorker(action: { type: string; payload: string }) {
  try {
    const response: IResponseGenerator = yield call(
      fetchHeroDetails,
      action.payload
    );
    yield put(heroDetailsFulfilled(response.data));
  } catch (error: any | unknown) {
    let err = "";
    if (error instanceof AxiosError) err = error.message;
    else err = "Something went wrong";
    yield put(heroDetailsReject(err));
  }
}

function* getHeroDetails() {
  yield takeEvery(heroDetailsPedding.type, getHeroDetailsWorker);
}

export default function* rootSaga() {
  yield all([call(getHeroDetails)]);
}

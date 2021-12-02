import {
  FETCH_CAT_BREED,
  FETCH_CAT_LIST_BY_BREED,
  FETCH_IMAGE_DETAILS,
} from "./actions";
import { AppDispatch } from "../store";
import axiosInstance from "../../utils/axiosInstance";

export const fetchCatBreed = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: FETCH_CAT_BREED.REQUEST });
    const { data } = await axiosInstance("/breeds");
    dispatch({ type: FETCH_CAT_BREED.SUCCESS, payload: { list: data } });
  } catch (error) {
    dispatch({ type: FETCH_CAT_BREED.FAILED, payload: { error } });
    throw error;
  }
};

export const fetchCatListByBreed =
  (breed: string, page: number = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_CAT_LIST_BY_BREED.REQUEST, payload: { breed } });
      const { data } = await axiosInstance("/images/search", {
        params: {
          page: page || 1,
          limit: 10,
          breed_id: breed,
        },
      });
      dispatch({
        type: FETCH_CAT_LIST_BY_BREED.SUCCESS,
        payload: { list: data, breed, page },
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAT_LIST_BY_BREED.FAILED,
        payload: { error, breed },
      });
      throw error;
    }
  };

export const fetchImageDetails =
  (imageId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_IMAGE_DETAILS.REQUEST, payload: { imageId } });
      const { data } = await axiosInstance("/images/" + imageId);
      dispatch({
        type: FETCH_IMAGE_DETAILS.SUCCESS,
        payload: { imageId, data },
      });
    } catch (error) {
      dispatch({
        type: FETCH_IMAGE_DETAILS.FAILED,
        payload: { imageId, error },
      });
    }
  };

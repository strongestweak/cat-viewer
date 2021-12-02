import {
  FETCH_CAT_BREED,
  FETCH_CAT_LIST_BY_BREED,
  FETCH_IMAGE_DETAILS,
} from "../actions/actions";
import { PayloadAction } from "../store";
import { ErrorMessage } from "../../utils";

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

export interface BreedImage {
  id: string;
  height: number;
  width: number;
  url: string;
  breeds: Breed[];
}

interface BreedImages {
  fetching: boolean;
  list: BreedImage[];
  error?: string;
  hasNext: boolean;
  currentPage: number;
}

export interface ImageDetails {
  fetching: boolean;
  data: BreedImage;
  error?: string;
}

export interface CatReducerHandler {
  fetchingBreed: boolean;
  breedList: Breed[];
  breedError?: string | null;
  breedImages: Record<string, BreedImages>;
  imageDetails: Record<string, ImageDetails>;
}

const initialState: CatReducerHandler = {
  fetchingBreed: false,
  breedList: [],
  breedError: null,
  breedImages: {},
  imageDetails: {},
};

interface UpdateDataOptions {
  key: string;
  data: any;
}

const CatReducer = (
  state = initialState,
  action: PayloadAction
): CatReducerHandler => {
  const { payload, type } = action;
  const nextState = Object.assign({}, state);

  const updateBreedImages = (
    options: UpdateDataOptions
  ): Record<string, BreedImages> => {
    const data = (nextState?.breedImages || {})[options.key] || {};
    return {
      ...(nextState?.breedImages || {}),
      [options.key]: { ...data, ...options?.data },
    };
  };

  switch (type) {
    case FETCH_CAT_BREED.REQUEST: {
      return { ...nextState, fetchingBreed: true, breedError: null };
    }
    case FETCH_CAT_BREED.SUCCESS: {
      return {
        ...nextState,
        fetchingBreed: false,
        breedList: payload?.list || [],
      };
    }
    case FETCH_CAT_BREED.FAILED: {
      return {
        ...nextState,
        fetchingBreed: false,
        breedError: ErrorMessage(payload?.error),
      };
    }
    case FETCH_CAT_LIST_BY_BREED.REQUEST: {
      return {
        ...nextState,
        breedImages: updateBreedImages({
          key: payload?.breed,
          data: { fetching: true },
        }),
      };
    }
    case FETCH_CAT_LIST_BY_BREED.SUCCESS: {
      let currentList = nextState?.breedImages[payload?.breed]?.list || [];
      if (payload?.page === 1) {
        currentList = [];
      }
      //Distinct by breed image id
      const newList = (payload?.list || []).filter((e: BreedImage) => {
        return !Boolean(
          currentList.map((c) => c.id).find((id: string) => id === e.id)
        );
      });
      currentList = [...currentList, ...newList];
      return {
        ...nextState,
        breedImages: updateBreedImages({
          key: payload?.breed,
          data: {
            fetching: false,
            list: currentList,
            hasNext: newList.length === 10,
            currentPage: payload?.page,
          },
        }),
      };
    }
    case FETCH_CAT_LIST_BY_BREED.FAILED: {
      return {
        ...nextState,
        breedImages: updateBreedImages({
          key: payload?.breed,
          data: {
            fetching: false,
            error: ErrorMessage(payload?.error),
          },
        }),
      };
    }

    case FETCH_IMAGE_DETAILS.REQUEST: {
      return {
        ...nextState,
        imageDetails: {
          ...nextState.imageDetails,
          [payload?.imageId]: {
            ...(nextState?.imageDetails[payload?.imageId] || {}),
            fetching: true,
            error: null,
          },
        },
      };
    }

    case FETCH_IMAGE_DETAILS.SUCCESS: {
      return {
        ...nextState,
        imageDetails: {
          ...nextState.imageDetails,
          [payload?.imageId]: {
            ...(nextState?.imageDetails[payload?.imageId] || {}),
            fetching: false,
            data: payload.data,
          },
        },
      };
    }

    case FETCH_IMAGE_DETAILS.FAILED: {
      return {
        ...nextState,
        imageDetails: {
          ...nextState.imageDetails,
          [payload?.imageId]: {
            ...(nextState?.imageDetails[payload?.imageId] || {}),
            fetching: false,
            error: ErrorMessage(payload?.error),
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default CatReducer;

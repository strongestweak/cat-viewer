const TypeGenerate = (type: string) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILED: `${type}_FAILED`,
});

export const FETCH_CAT_BREED = TypeGenerate("FETCH_CAT_BREED");
export const FETCH_CAT_LIST_BY_BREED = TypeGenerate("FETCH_CAT_LIST_BY_BREED");
export const FETCH_IMAGE_DETAILS = TypeGenerate("FETCH_IMAGE_DETAILS");

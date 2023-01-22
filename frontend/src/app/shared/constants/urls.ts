const BASE_URL = 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const FOOD_ADD_URL = FOODS_URL + '/add';
export const DELETE_FOOD_BY_ID = FOODS_URL + '/delete/'

export const UPDATE_FOOD_RESERVED = FOODS_URL+'/update';

export const FOOD_ADD_OPINION_URL = FOODS_URL + '/addOpinion';
export const OPINION_BY_FOOD_URL = FOODS_URL + '/opinion/';

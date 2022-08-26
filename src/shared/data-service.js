import * as axios from 'axios';
import { API } from './config';

const statusDescriptions = new Map([
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [409, 'Conflict'],
  [500, 'Internal Server Error'],
  [501, 'Not Implemented'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
]);

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const handleError = function handleError(error) {
  // eslint-disable-next-line no-console
  console.error(error);
  if (error.response) {
    // eslint-disable-next-line no-console
    console.log(error.response);
    if (error.response.statusText.length === 0 && statusDescriptions.has(error.response.status)) {
      // eslint-disable-next-line no-param-reassign
      error.response.statusText = statusDescriptions.get(error.response.status);
    }
    return {
      statusCode: error.response.status,
      statusMessage: error.response.statusText,
      data: error.response.body,
    };
  }
  return {
    statusCode: 500,
    statusMessage: error.toString(),
    data: '',
  };
};

const getMenus = async function getMenus() {
  try {
    const response = await axios.get(`${API}/public/api/menus`);
    return parseList(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
};

const getCategories = async function getCategories() {
  try {
    const response = await axios.get(`${API}/api/menu/categories`);
    return parseList(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
};

const getItems = async function getItems() {
  try {
    const response = await axios.get(`${API}/api/menu/items`);
    return parseList(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
};

export const getCategoryById = async function getCategoryById(id) {
  try {
    const response = await axios.get(`${API}/api/menu/categories/${id}`);
    return parseList(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const updateCategory = async function updateCategory(category) {
  try {
    const response = await axios.put(`${API}/api/menu/categories/${category.id}`, category);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const createCategory = async function createCategory(category) {
  try {
    const response = await axios.post(`${API}/api/menu/categories/`, category);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const deleteCategory = async function deleteCategory(id) {
  try {
    const response = await axios.delete(`${API}/api/menu/categories/${id}`);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getMenuItemById = async function getMenuItemById(id) {
  try {
    const response = await axios.get(`${API}/api/menu/items/${id}`);
    return parseList(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const createMenuItem = async function createMenuItem(menuItem) {
  try {
    const response = await axios.post(`${API}/api/menu/items/`, menuItem);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const updateMenuItem = async function updateMenuItem(menuItem) {
  try {
    const response = await axios.put(`${API}/api/menu/items/${menuItem.id}`, menuItem);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const deleteMenuItem = async function deleteMenuItem(id) {
  try {
    const response = await axios.delete(`${API}/api/menu/items/${id}`);
    return {
      statusCode: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const dataService = {
  getMenus,
  getCategories,
  getItems,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  createMenuItem,
};

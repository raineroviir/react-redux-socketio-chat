export const SHOW_ALL = 'show_all';
export const SHOW_MARKED = 'show_marked';
export const SHOW_UNMARKED = 'show_unmarked';
import * as types from '../constants/Filters.js';

export function showAll(message) {
  return {
    type: types.SHOW_ALL,
    message
  };
}

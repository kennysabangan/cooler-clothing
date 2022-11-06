import { CategoriesState } from './category.reducer';
import { RootState } from './../store';
import { createSelector } from 'reselect';
import { CategoryMap } from './category.types';

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)
)

export const selectIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
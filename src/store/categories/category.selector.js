export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc, category) => {
  console.log(category);
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
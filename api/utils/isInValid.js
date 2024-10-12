const reqFields = [
    "recipeName",
    "category",
    "recipeTime",
    "servingSuggestion",
    "ingredients",
    "instructions",
];
const isInValid = (data) => {
    return reqFields.some((field) => !data[field]);
};

export default isInValid;
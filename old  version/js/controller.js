import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const view = new View();

init();

async function init() {
    await model.loadingData();

    const sortingElements = view.sortingElements();

    model.updateFromURL(sortingElements);

    sortProduct();
    addEventListeners()
}

function addEventListeners() {
    view.elements.sortTypeSelect.addEventListener('change', sortProduct);
    view.elements.sortOrderSelect.addEventListener('change', sortProduct);
    view.elements.sortCategorySelect.addEventListener('change', sortProduct);
    view.elements.filterInput.addEventListener('input', filterProducts);

    view.elements.form.addEventListener('submit', resetFilter);
}

function sortProduct(e) {
    const sortingValue = view.sortingElementsValue();
    
    model.sortingProducts(sortingValue)
    const sortingData = model.sortingProducts(sortingValue);

    view.renderProducts(sortingData);
    model.updateURL(sortingValue);
}


function filterProducts() {
    const value = this.value.toLowerCase();
    
    model.filterSearch(value)
    sortProduct();
}

function resetFilter() {
    e.preventDefault();
    
    const sortingElements = this.sortingElements();
    model.resetFilter(sortingElements);

    sortProduct()
}


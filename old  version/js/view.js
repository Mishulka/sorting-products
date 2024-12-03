export class View {
    constructor() {}

    elements = {
        productList: document.querySelector(".productList"),
        sortTypeSelect: document.querySelector("#sortType"),
        sortCategorySelect: document.querySelector("#sortCategory"),
        sortOrderSelect: document.querySelector("#sortOrder"),
        filterInput: document.querySelector("#filterInput"),
        form: document.querySelector("#form"),
    };

    highlightFilter(name, filterValue){
        const lowercaseName = name.toLowerCase();
        const lowercaseFilterValue = filterValue.toLowerCase();

        const startIndex = lowercaseName.indexOf(lowercaseFilterValue);
        if(startIndex !== -1){

            const start = name.substring(0, startIndex);
            const interval = name.substring(startIndex, startIndex + filterValue.length);
            const end = name.substring(startIndex + filterValue.length);

            const highlightedName = `${start}<span class="highlighted">${interval}</span>${end}`;
            return highlightedName;
        }
        return name;
    }

    renderProducts(arrData){
        this.elements.productList.innerHTML = "";

        arrData.forEach((product)=>{
            const name = this.highlightFilter(
                product.name,
                this.elements.filterInput.value
            )
            const markup = `
                <li>
                    <span>${product.subtitle}</span>
                    <h3>${name}</h3>
                    <p>Цена: ${product.price} руб</p>
                    <p>Дата добавления: ${product.date}</p>
                </li>
            `;
            this.elements.productList.insertAdjacentHTML("afterbegin", markup)
        });
    }

    sortingElementsValue() {
        return {
            sortType: this.elements.sortTypeSelect.value,
            sortOrder: this.elements.sortOrderSelect.value,
            sortCategory: this.elements.sortCategorySelect.value,
        }
    }

    sortingElements() {
        return {
            sortType: this.elements.sortTypeSelect,
            sortOrder: this.elements.sortOrderSelect,
            sortCategory: this.elements.sortCategorySelect,
        }
    }
}
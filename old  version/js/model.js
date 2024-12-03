export class Model {
    constructor() {
        this.data = [];
        this.filterData = [];
    }

    async loadingData() {
        return new Promise((resolve, reject) => {
            fetch("data.json")
                .then((res) => res.json())
                .then((data) => {
                    this.data = data;
                    this.filterData = [...this.data]
                    resolve();
                }).catch((err) => {
                    console.error('Произошла ошибка загрузки данных');
                    reject(err);
                })
        })
    }
    sortingProducts(sortingValue) {
        const {sortType, sortOrder, sortCategory} = sortingValue;

        let filterData;

        if(sortCategory !== 'all'){
            filterData = this.filterData.filter((request) => {
                return request.category === sortCategory;
            })
        }else{
            filterData = [...this.filterData];
        };

        return filterData.sort((a,b) => {
            switch (sortType) {
                case 'date':
                    return sortOrder === 'desc' 
                        ? Date.parse(a.data) - Date.parse(b.data)
                        : Date.parse(b.data) - Date.parse(a.data);
                case 'alphabet':
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if(sortOrder === 'desc') {
                        if(nameA < nameB){
                            return 1;
                        }else if(nameA > nameB){
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                    if(sortOrder === 'asc') {
                        if(nameA > nameB){
                            return 1;
                        }else if(nameA < nameB){
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                    
                case 'price':
                    const priceA = a.price
                    const priceB = b.price
                    return sortOrder === 'desc' 
                        ? priceA - priceB
                        : priceB - priceA;
            }
        });
    }

    filterSearch(value){
        if(value === ''){
            this.filterData = [...this.data]
        }else {
            this.filterData = this.filterData.filter((product) => 
                product.name.toLowerCase().includes(value))
        }
    }

    resetFilter(sortingElements){
        const {sortType, sortOrder, sortCategory} = sortingElements;

        sortType.value = 'price';
        sortOrder.value = 'asc';
        sortCategory.value = 'all';
    }

    updateURL(sortingValue){
        const {sortType, sortOrder, sortCategory} = sortingValue;
        const urlParams = new URLSearchParams();

        if (sortType) urlParams.set('sortType', sortType);
        if (sortOrder) urlParams.set('sortOrder', sortOrder);
        if (sortCategory) urlParams.set('sortCategory', sortCategory);

        window.history.replaceState({}, '', `?${urlParams.toString()}`);
    }

    updateFromURL(sortingElements){
        const {sortType, sortOrder, sortCategory} = sortingElements;
        const urlParams = new URLSearchParams(window.location.search);
         
        const sortTypeValue = urlParams.get('sortType') || 'price';
        const sortOrderValue = urlParams.get('sortOrder') || 'asc';
        const sortCategoryValue = urlParams.get('sortCategory') || 'all';

        sortType.value = sortTypeValue;
        sortOrder.value = sortOrderValue;
        sortCategory.value = sortCategoryValue;
    }
}
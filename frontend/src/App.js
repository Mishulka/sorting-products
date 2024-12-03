import './App.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Использование useNavigate вместо useHistory
import ProductList from './views/ProductList'; // Компонент списка товаров
import SortingForm from './views/SortingForm'; // Компонент формы сортировки

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [sortType, setSortType] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortCategory, setSortCategory] = useState('all');

  const location = useLocation(); // Для чтения строки запроса
  const navigate = useNavigate(); // Для обновления строки запроса

  // Загрузка параметров из URL при первом рендере
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    setSortType(urlParams.get('sortType') || 'date');
    setSortOrder(urlParams.get('sortOrder') || 'asc');
    setSortCategory(urlParams.get('sortCategory') || 'all');
    setFilterValue(urlParams.get('filter') || '');
  }, [location.search]);

  // Загрузка данных из JSON
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Начальное состояние
      })
      .catch((err) => {
        console.error('Произошла ошибка загрузки данных:', err);
      });
  }, []);

  // Применение фильтров и сортировки
  useEffect(() => {
    let updatedProducts = [...products];

    // Фильтрация по категории
    if (sortCategory !== 'all') {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === sortCategory
      );
    }

    // Фильтрация по строке
    if (filterValue) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Сортировка
    updatedProducts.sort((a, b) => {
      if (sortType === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortType === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortType === 'alphabet') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    setFilteredProducts(updatedProducts);
  }, [filterValue, sortType, sortOrder, sortCategory, products]);

  // Обновление URL при изменении параметров
  const updateURL = () => {
    const urlParams = new URLSearchParams();

    if (sortType) urlParams.set('sortType', sortType);
    if (sortOrder) urlParams.set('sortOrder', sortOrder);
    if (sortCategory) urlParams.set('sortCategory', sortCategory);
    if (filterValue) urlParams.set('filter', filterValue);

    navigate({ search: urlParams.toString() });
  };

  useEffect(() => {
    updateURL();
  }, [sortType, sortOrder, sortCategory, filterValue]);

  const resetFilters = () => {
    setFilterValue('');
    setSortType('date');
    setSortOrder('asc');
    setSortCategory('all');
  };

  return (
    <div className="App">
      <h1>Приложение по сортировке товаров</h1>
      <div className="container">
        <SortingForm
          filterValue={filterValue}
          sortType={sortType}
          sortOrder={sortOrder}
          sortCategory={sortCategory}
          onFilterChange={setFilterValue}
          onSortTypeChange={setSortType}
          onSortOrderChange={setSortOrder}
          onSortCategoryChange={setSortCategory}
          onReset={resetFilters}
        />
        <ProductList products={filteredProducts} filterValue={filterValue} />
      </div>
    </div>
  );
}

export default App;

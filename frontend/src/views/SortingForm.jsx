import React from 'react';

export default function SortingForm({
  filterValue,
  sortType,
  sortOrder,
  sortCategory,
  onFilterChange,
  onSortTypeChange,
  onSortOrderChange,
  onSortCategoryChange,
  onReset,
}) {
  return (
    <div>
      <form id="form">
        <div className="sortBody">
          {/* Фильтрация по строке */}
          <div className="sortContent">
            <label htmlFor="filterInput">Фильтрация по буквам</label>
            <input
              type="text"
              id="filterInput"
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
            />
          </div>

          {/* Сортировка по категории */}
          <div className="sortContent">
            <p>Сортировка по категории</p>
            <select
              id="sortCategory"
              value={sortCategory}
              onChange={(e) => onSortCategoryChange(e.target.value)}
            >
              <option value="all">Все</option>
              <option value="laptops">Ноутбуки</option>
              <option value="tablets">Планшеты</option>
              <option value="phones">Телефоны</option>
              <option value="headset">Гарнитуры</option>
            </select>
          </div>

          {/* Тип сортировки */}
          <div className="sortContent">
            <p>Тип сортировки</p>
            <select
              id="sortType"
              value={sortType}
              onChange={(e) => onSortTypeChange(e.target.value)}
            >
              <option value="date">По дате</option>
              <option value="price">По цене</option>
              <option value="alphabet">По алфавиту</option>
            </select>
          </div>

          {/* Направление сортировки */}
          <div className="sortContent">
            <p>Направление сортировки</p>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value)}
            >
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </div>

          {/* Кнопка сброса */}
          <button type="button" onClick={onReset}>
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
}
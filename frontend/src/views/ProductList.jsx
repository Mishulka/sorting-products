import React from 'react';

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p>Нет товаров для отображения.</p>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.subtitle}</span>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб</p>
            <p>Дата добавления: {product.date}</p>
            <p>Категория: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
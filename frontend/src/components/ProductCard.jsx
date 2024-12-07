import React from 'react';
import PropTypes from 'prop-types'; // For type-checking props

const ProductCard = ({ product, onAdd, onRemove }) => {
    return (
        <div className="product-card">
            <img 
                src={product.image || 'https://via.placeholder.com/150'} // Fallback for missing image
                alt={product.name || 'Product Image'}
                className="product-image"
            />
            <h3>{product.name || 'Unnamed Product'}</h3>
            <p>Price: ${product.price ? product.price.toFixed(2) : 'N/A'}</p> {/* Display price with two decimals */}
            <div className="product-actions">
                <button onClick={() => onAdd(product._id)}>Add</button>
                <button onClick={() => onRemove(product._id)}>Remove</button>
            </div>
        </div>
    );
};

// Type-checking props to ensure correct usage
ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default ProductCard;

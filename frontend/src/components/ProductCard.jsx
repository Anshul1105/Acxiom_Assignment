import React from 'react';
import PropTypes from 'prop-types'; // For type-checking props

const ProductCard = ({ product, onAdd, onRemove }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
    <img 
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
    <div className="flex space-x-2 mt-4">
        <button 
            onClick={() => onAdd(product._id)} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
            Add
        </button>
        <button 
            onClick={() => onRemove(product._id)} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
            Remove
        </button>
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

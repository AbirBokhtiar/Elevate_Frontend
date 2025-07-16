import React from 'react';

type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description?: string;
};

type ProductGridProps = {
    products: Product[];
    onProductClick?: (product: Product) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
    return (
        <div style={styles.grid}>
            {products.map((product) => (
                <div
                    key={product.id}
                    style={styles.card}
                    onClick={() => onProductClick && onProductClick(product)}
                >
                    <img src={product.imageUrl} alt={product.name} style={styles.image} />
                    <h3 style={styles.name}>{product.name}</h3>
                    <p style={styles.price}>${product.price.toFixed(2)}</p>
                    {product.description && (
                        <p style={styles.description}>{product.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
        padding: '24px',
    },
    card: {
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center' as const,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s',
    },
    image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover' as const,
        borderRadius: '4px',
        marginBottom: '12px',
    },
    name: {
        fontSize: '1.1rem',
        margin: '8px 0 4px 0',
    },
    price: {
        color: '#2e7d32',
        fontWeight: 600,
        margin: '4px 0',
    },
    description: {
        fontSize: '0.95rem',
        color: '#555',
        marginTop: '8px',
    },
};

export default ProductGrid;
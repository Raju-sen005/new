import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState } from "react";

const TopPicks = ({ products }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { addToCart } = useCart();
    // Track selected size for each product by product ID
    const [selectedSizes, setSelectedSizes] = useState({});
    // Track main image for each product
    const [mainImages, setMainImages] = useState({});
    // Track error messages
    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();

    const handleThumbnailClick = (productId, image) => {
        setMainImages(prev => ({
            ...prev,
            [productId]: image
        }));
    };

    const handleSizeSelect = (productId, size) => {
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: size
        }));
        // Clear error when size is selected
        setErrorMessages(prev => ({
            ...prev,
            [productId]: null
        }));
    };

    const handleAddToCart = (product) => {
        if (!selectedSizes[product.id] && product.sizes?.length > 0) {
            setErrorMessages(prev => ({
                ...prev,
                [product.id]: "Please select a size"
            }));
            return;
        }

        addToCart(
            product?.productId,
            product?.id,
            selectedSizes[product.id]
        );
    };

    return (
        <section className="body-font">
            <div className="sm:px-18 px-5 sm:py-24 py-10 mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-bold sm:text-[32px] text-[18px]">TOP PICKS FOR YOU</h1>
                    <Link to="/catalog-products" className="items-center flex cursor-pointer text-[#906951]">VIEW MORE <i className="bi bi-arrow-right-short ms-2" /></Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products && products.map((product) => {
                        const currentMainImage = mainImages[product.id] || product.images[0];
                        const errorMessage = errorMessages[product.id];

                        return (
                            <div
                                key={product.id}
                                className="relative p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition"
                                onClick={() => navigate(`/product/${product.productId}/${product.id}`)}
                            >
                                {/* Product Image */}
                                <div className="block bg-[#F6F4F0] h-[350px] overflow-hidden rounded-lg">
                                    <img
                                        alt={product.title}
                                        className="h-full w-full object-cover bg-[#E9E2D8] rounded-lg"
                                        src={url + "/uploads/" + currentMainImage}
                                    />
                                </div>

                                {/* Thumbnails */}
                                {product.images && product.images.length > 0 && (
                                    <div className="flex space-x-2 my-2">
                                        {product.images.slice(0, 3).map((image, index) => (
                                            <img
                                                key={index}
                                                src={url + "/uploads/" + image}
                                                alt={product.title}
                                                className={`w-10 h-10 rounded-md border cursor-pointer ${currentMainImage === image ? 'border-[#AA8265] border-2' : 'border-gray-300'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent redirect on image click
                                                    handleThumbnailClick(product.id, image);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Product Info */}
                                <div className="mt-4">
                                    {product.rating > 4.5 && <p className="text-sm text-red-600 font-semibold">BEST SELLER</p>}
                                    <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
                                    <p className="text-sm text-gray-600">{product.description}</p>
                                    <p className="text-xl font-semibold text-gray-900 mt-2">
                                        ${JSON.parse(product?.price)[0]}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default TopPicks;
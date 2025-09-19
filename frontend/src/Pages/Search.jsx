import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import axios from 'axios';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products");
        console.log("Products fetched:", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 Filter products based on title inside ProductVariants[0]
  const filteredProducts = products.filter((product) => {
    const variant = product?.ProductVariants?.[0];
    return variant?.title?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className='pt-[150px]'>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="container lg:w-7xl mx-auto lg:my-10 mt-4">
          {/* Search Input */}
          <div className="lg:ms-8 items-baseline sm:w-2xl ms-8 my-3">
            <i className="bi md:text-[36px] text-[20px] bi-search" />
            <input
              type="text"
              className="outline-none md:text-[36px] text-[20px] text-[#D5C4B3] md:ms-4"
              placeholder="SEARCH"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-between lg:mx-10 items-baseline md:mx-8 ms-8">
            <h2 className="text-[#121212] text-[24px] md:text-[36px] font-bold">TOP PICKS FOR YOU</h2>
            <Link to="#" className="text-[#906951] text-[16px] hidden md:block">
              VIEW MORE <i className="bi bi-arrow-right" />
            </Link>
          </div>

          {/* Product Cards */}
          <div className="flex flex-wrap m-4">
            {loading ? (
              <p className="text-gray-500">Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const variant = product?.ProductVariants?.[0];

                return (
                  <div key={product.id} className="relative lg:w-1/4 md:w-1/3 p-4 w-full box">
                    <Link className="block relative bg-[#F6F4F0] h-[350px] overflow-hidden">
                      <img
                        alt={variant?.title || "Product Image"}
                        className="h-full w-full block bg-[#E9E2D8]"
                        src={`http://localhost:8000/uploads/${JSON.parse(variant?.images || '[]')[0]}`} // image path fix
                      />
                    </Link>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 font-semibold">BEST SELLER</p>
                      <h2 className="text-lg font-bold text-gray-800">{variant?.title}</h2>
                    
<p className="text-xl font-semibold text-gray-900 mt-2">
  ₹{JSON.parse(JSON.parse(variant?.price || '["0"]'))[0]}
</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No matching products found.</p>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Search;

import React, {  useCallback,  useEffect,  useRef,  useState} from "react";
import {  add_to_card_product_axios,  product_get,} from "../axios/product.axios";
import { useNavigate } from "react-router-dom";
import "../design/product.css";
import { useAuth } from "../context/User.login.context";


function Product() {

 const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
 const [error, setError] = useState("");

  const pageRef = useRef(1);

  const hasNextPageRef = useRef(true);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);

  const { serachproduct, card, setcard, accessToken, } = useAuth();
  const navigate = useNavigate();
  const getProducts = useCallback(
    async (pageNumber = 1) => {

      if (loadingRef.current) {
        return;
      }

    if (
        pageNumber !== 1 &&
        !hasNextPageRef.current
      ) {
        return;
      }
      loadingRef.current = true;
     try {
        if (pageNumber === 1) {

          setLoading(true);
          setError("");

        } else {

          setLoadingMore(true);

        }
        console.log("Fetching product page:",pageNumber);

       const response = await product_get(pageNumber);
       console.log( "API response:", response);

        const newProducts = Array.isArray(response?.product)? response.product: [];


        // =========================
        // FIRST PAGE
        // =========================

        if (pageNumber === 1) {

          setProduct(newProducts);

        }


        // =========================
        // NEXT PAGE
        // =========================

        else {

          setProduct(
            (previousProducts) => [
              ...previousProducts,
              ...newProducts
            ]
          );

        }


        // =========================
        // PAGINATION
        // =========================

        const nextPage =
          response?.pagination?.hasNextPage ??
          false;


        hasNextPageRef.current =
          nextPage;


        pageRef.current =
          pageNumber;


      } catch (error) {

        console.log(
          "Product API error:",
          error
        );


        if (pageNumber === 1) {

          setError(
            "Unable to load products."
          );

        }

      } finally {

        loadingRef.current = false;

        setLoading(false);

        setLoadingMore(false);

      }

    },
    []
  );


  // =====================================================
  // FIRST API CALL
  // =====================================================

  useEffect(() => {

    getProducts(1);

  }, [getProducts]);


  // =====================================================
  // INTERSECTION OBSERVER
  // =====================================================

  useEffect(() => {

    const loader =
      loaderRef.current;


    if (!loader) {
      return;
    }


    const observer =
      new IntersectionObserver(

        (entries) => {

          const entry =
            entries[0];


          // Sentinel not visible
          if (!entry.isIntersecting) {
            return;
          }


          // Already loading
          if (loadingRef.current) {
            return;
          }


          // No more products
          if (!hasNextPageRef.current) {
            return;
          }


          // =========================
          // NEXT PAGE
          // =========================

          const nextPage =
            pageRef.current + 1;


          console.log(
            "Loading next page:",
            nextPage
          );


          getProducts(nextPage);

        },


        {
          root: null,

          // Start loading 200px before bottom
          rootMargin: "200px",

          threshold: 0
        }

      );


    observer.observe(loader);


    // =========================
    // CLEANUP
    // =========================

    return () => {

      observer.disconnect();

    };

  }, [getProducts]);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight =
      document.documentElement.scrollHeight;

    const remaining =
      documentHeight - (scrollTop + windowHeight);

    if (remaining > 300) {
      return;
    }

    console.log("🔥 Loading next page");

    if (loadingRef.current) {
      return;
    }

    if (!hasNextPageRef.current) {
      console.log("✅ All products loaded");
      return;
    }

    const nextPage = pageRef.current + 1;

    console.log("➡️ Loading page:", nextPage);

    getProducts(nextPage);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [getProducts]);
  // =====================================================
  // INITIAL LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="product-page-state">

        <p>
          Loading products...
        </p>

      </div>
    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <div className="product-page-state error-state">

        <p>
          {error}
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    );

  }


  // =====================================================
  // EMPTY
  // =====================================================

  if (product.length === 0) {

    return (
      <div className="product-page-state">

        <h3>
          No Products Found
        </h3>

        <p>
          There are no products available right now.
        </p>

      </div>
    );

  }


  // =====================================================
  // ADD TO CART
  // =====================================================

  async function hendle_adtocard(productId) {

    try {

      if (!accessToken) {

        console.log(
          "Access token not available"
        );

        return;
      }


      const response =
        await add_to_card_product_axios(
          productId,
          accessToken
        );


      setcard(response.card);


    } catch (error) {

      console.log(
        "Cart error:",
        error
      );

    }

  }


  // =====================================================
  // CHECK CART
  // =====================================================

  const isProductInCart =
    (productId) => {

      if (!card?.items) {
        return false;
      }


      return card.items.some(
        (item) => {

          const cartProductId =
            item.product?._id ||
            item.product;


          return (
            cartProductId?.toString() ===
            productId?.toString()
          );

        }
      );

    };


  // =====================================================
  // SEARCH
  // =====================================================

  const display = serachproduct === null ? product: serachproduct;


  // =====================================================
  // SEARCH EMPTY
  // =====================================================

  if (display.length === 0) {

    return (
      <div className="product-page-state">

        <h3>
          Product Not Found
        </h3>

        <p>
          No products matched your search.
        </p>

      </div>
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="product-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="product-header">

        <div>

          <h2>
            Products
          </h2>

          <p>
            Explore our latest products
          </p>

        </div>


        <span className="product-count">

          {display.length} Products

        </span>

      </div>


      {/* =========================
          PRODUCT GRID
      ========================= */}

      <div className="product-container">

        {display.map((item) => {

          const productInCart =
            isProductInCart(item._id);


          return (

            <div
              className="product-card"
              key={item._id}
            >


              {/* IMAGE */}

              <div
                className="product-image-box"

                onClick={() =>
                  navigate(
                    `/product-detail/${item._id}`
                  )
                }
              >

                {item.image ? (

                  <img
                    src={item.image}
                    className="product-image"
                    alt={item.name}
                    loading="lazy"
                  />

                ) : (

                  <div className="no-image">

                    No Image

                  </div>

                )}


                {item.discount > 0 && (

                  <span className="discount-badge">

                    {item.discount}% OFF

                  </span>

                )}

              </div>


              {/* INFO */}

              <div className="product-info">


                {item.brand && (

                  <p className="product-brand">

                    {item.brand}

                  </p>

                )}


                <h3 className="product-name">

                  {item.name}

                </h3>


                {item.description && (

                  <p className="product-description">

                    {item.description}

                  </p>

                )}


                <div className="product-price">

                  ₹{item.price}

                </div>


                {/* BUTTONS */}

                <div className="product-actions">

                  <button
                    className="add-cart-btn"

                    onClick={(e) => {

                      e.stopPropagation();

                      hendle_adtocard(
                        item._id
                      );

                    }}
                  >

                    {productInCart
                      ? "Remove from Cart"
                      : "Add to Cart"}

                  </button>


                  <button
                    className="details-btn"

                    onClick={(e) => {

                      e.stopPropagation();

                      navigate(
                        `/product-detail/${item._id}`
                      );

                    }}
                  >

                    Details

                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* =================================================
          SENTINEL
      ================================================= */}

      {!serachproduct &&
        hasNextPageRef.current && (

        <div
          ref={loaderRef}
          className="product-loader"
        >

          {loadingMore
            ? "Loading more products..."
            : "Scroll for more products"}

        </div>

      )}


      {/* =================================================
          END
      ================================================= */}

      {!hasNextPageRef.current &&
        product.length > 0 && (

        <div className="product-end">

          All products loaded

        </div>

      )}

    </div>

  );

}


export default Product;
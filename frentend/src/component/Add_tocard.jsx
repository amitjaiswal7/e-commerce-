import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_current_add_to_caed_axios } from "../axios/product.axios";
import { useAuth } from "../context/User.login.context";
import "../design/addtocard.css";

const COUPON_CODE = "#wt2t1";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

function Userproduct() {
  const { card, setcard, accessToken } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  // Fetch cart
  useEffect(() => {
    let cancelled = false;

    async function fetchCart() {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await get_current_add_to_caed_axios(
          accessToken
        );

        console.log("Cart response:", response);

        const items = response?.card?.items ?? [];

        const products = items
          .filter((item) => item?.product)
          .map((item) => {
            const product = item.product;

            // Image can exist on cart item or populated product
            const image =
              item.image ||
              item.imageUrl ||
              product.imageUrl ||
              product.image?.url ||
              null;

            return {
              ...product,
              image,
              quantity: Math.max(
                1,
                Number(item.quantity) || 1
              ),
              cartItemId: item._id,
            };
          });

        if (!cancelled) {
          setcard(products);
        }
      } catch (err) {
        console.error("Cart fetch failed:", err);

        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Unable to load cart."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCart();

    return () => {
      cancelled = true;
    };
  }, [accessToken, setcard]);

  const safeCard = Array.isArray(card) ? card : [];

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = safeCard.reduce((sum, item) => {
      const price = Math.max(0, Number(item.price) || 0);
      const quantity = Math.max(1, Number(item.quantity) || 1);

      return sum + price * quantity;
    }, 0);

    const productDiscount = safeCard.reduce((sum, item) => {
      const price = Math.max(0, Number(item.price) || 0);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const discount = Math.min(
        100,
        Math.max(0, Number(item.discount) || 0)
      );

      return sum + (price * quantity * discount) / 100;
    }, 0);

    const afterDiscount = Math.max(
      0,
      subtotal - productDiscount
    );

    const couponDiscount = appliedCoupon
      ? afterDiscount * 0.1
      : 0;

    const taxableAmount = Math.max(
      0,
      afterDiscount - couponDiscount
    );

    const platformFee = safeCard.length ? 10 : 0;
    const gst = taxableAmount * 0.18;
    const total = taxableAmount + platformFee + gst;

    return {
      subtotal,
      productDiscount,
      couponDiscount,
      platformFee,
      gst,
      total,
      savings: productDiscount + couponDiscount,
    };
  }, [safeCard, appliedCoupon]);

  function applyCoupon() {
    if (
      coupon.trim().toLowerCase() ===
      COUPON_CODE.toLowerCase()
    ) {
      setAppliedCoupon(true);
      setCouponMessage(
        "Coupon applied successfully. 10% off!"
      );
    } else {
      setAppliedCoupon(false);
      setCouponMessage(
        coupon.trim()
          ? "Invalid coupon code."
          : "Please enter a coupon code."
      );
    }
  }

  function removeCoupon() {
    setAppliedCoupon(false);
    setCoupon("");
    setCouponMessage("");
  }

  function removeProduct(productId) {
    setcard(
      safeCard.filter(
        (item) => item.cartItemId !== productId
      )
    );
  }

  if (loading) {
    return (
      <main className="up-page">
        <div className="up-state">
          <span className="up-spinner" />
          <p>Loading your cart...</p>
        </div>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className="up-page">
        <section className="up-state">
          <h2>Please sign in</h2>
          <p>Sign in to view your shopping cart.</p>
          <button
            className="up-primary-btn"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="up-page">
        <section className="up-state">
          <h2>Unable to load cart</h2>
          <p>{error}</p>
          <button
            className="up-primary-btn"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (safeCard.length === 0) {
    return (
      <main className="up-page">
        <section className="up-state">
          <div className="up-empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Add products to your cart to see them here.</p>
          <button
            className="up-primary-btn"
            onClick={() => navigate("/product")}
          >
            Continue shopping
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="up-page">
      <div className="up-container">
        <header className="up-header">
          <div>
            <span className="up-eyebrow">
              YOUR SHOPPING BAG
            </span>
            <h1>Shopping Cart</h1>
            <p>Review your items before checkout.</p>
          </div>

          <div className="up-count">
            {safeCard.length}{" "}
            {safeCard.length === 1 ? "product" : "products"}
          </div>
        </header>

        <div className="up-layout">
          <section className="up-products">
            <div className="up-section-title">
              <h2>Your items</h2>
              <span>{safeCard.length} items</span>
            </div>

            {safeCard.map((item, index) => {
              const price = Math.max(
                0,
                Number(item.price) || 0
              );

              const quantity = Math.max(
                1,
                Number(item.quantity) || 1
              );

              const discount = Math.min(
                100,
                Math.max(0, Number(item.discount) || 0)
              );

              const image =
                item.image ||
                item.imageUrl ||
                item.images?.[0] ||
                null;

              return (
                <article
                  className="up-product"
                  key={
                    item.cartItemId ||
                    item._id ||
                    `${item.name}-${index}`
                  }
                >
                  <div className="up-image">
                    {image ? (
                      <img
                        src={image}
                        alt={item.name || "Product"}
                        loading="lazy"
                        onError={(event) => {
                          console.error(
                            "Image failed to load:",
                            event.currentTarget.src
                          );

                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <span className="up-placeholder">
                        ◇
                      </span>
                    )}
                  </div>

                  <div className="up-product-info">
                    <span className="up-category">
                      {item.category || "GENERAL"}
                    </span>

                    <h3>
                      {item.name || "Unnamed product"}
                    </h3>

                    {item.brand && (
                      <p className="up-brand">
                        {item.brand}
                      </p>
                    )}

                    {item.description && (
                      <p className="up-description">
                        {item.description}
                      </p>
                    )}

                    <div className="up-meta">
                      <span>Quantity: {quantity}</span>

                      {discount > 0 && (
                        <span className="up-discount-badge">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="up-remove"
                      onClick={() =>
                        removeProduct(item.cartItemId)
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div className="up-product-price">
                    <strong>
                      {money(price * quantity)}
                    </strong>

                    {discount > 0 && (
                      <span>
                        Save{" "}
                        {money(
                          (price * quantity * discount) / 100
                        )}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              className="up-continue"
              onClick={() => navigate("/product")}
            >
              ← Continue shopping
            </button>
          </section>

          <aside className="up-summary">
            <h2>Order summary</h2>

            <p className="up-summary-subtitle">
              Price details for your order
            </p>

            <div className="up-coupon">
              <label htmlFor="up-coupon">
                Coupon code
              </label>

              <div className="up-coupon-row">
                <input
                  id="up-coupon"
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  disabled={appliedCoupon}
                  onChange={(event) => {
                    setCoupon(event.target.value);
                    setCouponMessage("");
                  }}
                />

                <button
                  type="button"
                  onClick={
                    appliedCoupon
                      ? removeCoupon
                      : applyCoupon
                  }
                >
                  {appliedCoupon ? "Remove" : "Apply"}
                </button>
              </div>

              {couponMessage && (
                <p
                  className={`up-coupon-message ${
                    appliedCoupon ? "success" : "error"
                  }`}
                  role="status"
                >
                  {couponMessage}
                </p>
              )}

              {!appliedCoupon && (
                <p className="up-hint">
                  Try <strong>{COUPON_CODE}</strong> for
                  10% off.
                </p>
              )}
            </div>

            <div className="up-price-lines">
              <div>
                <span>Subtotal</span>
                <strong>{money(totals.subtotal)}</strong>
              </div>

              <div>
                <span>Product discount</span>
                <strong className="up-green">
                  −{money(totals.productDiscount)}
                </strong>
              </div>

              {appliedCoupon && (
                <div>
                  <span>Coupon discount</span>
                  <strong className="up-green">
                    −{money(totals.couponDiscount)}
                  </strong>
                </div>
              )}

              <div>
                <span>Platform fee</span>
                <strong>{money(totals.platformFee)}</strong>
              </div>

              <div>
                <span>Estimated GST (18%)</span>
                <strong>{money(totals.gst)}</strong>
              </div>
            </div>

            <div className="up-total">
              <div>
                <strong>Total amount</strong>
                <span>
                  Estimated, including fees and taxes
                </span>
              </div>

              <strong className="up-total-price">
                {money(totals.total)}
              </strong>
            </div>

            {totals.savings > 0 && (
              <div className="up-savings">
                You save{" "}
                <strong>{money(totals.savings)}</strong>{" "}
                on this order.
              </div>
            )}

            <button
              type="button"
              className="up-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout <span>→</span>
            </button>

            <p className="up-note">
              You can review your order before placing it.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Userproduct;
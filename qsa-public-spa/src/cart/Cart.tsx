import React from "react"

const Cart: React.FC = () => {
  return (
    <div id="minicart" className="qg-aside minicart" role="complementary">
      <div className="inner">
        <div id="ssq-minicart" className="placeholder">
          <h2>Cart</h2>
          <div id="ssq-minicart-view">
            <noscript>
              <p className="ssq-minicart-noscript">Edit cart or checkout to place your order.</p>
              <div className="ssq-minicart-submit">
                <input type="hidden" id="ssq-cart-contents" name="ssq-cart-contents" value="" />
                <img src="https://www.smartservice.qld.gov.au/payment/minicart/synchronise?cartId=(cartId)" id="ssq-synch-img" height="0" width="0" alt="" />
                <a href="https://www.smartservice.qld.gov.au/payment/cart/checkout" id="ssq-cart-checkout">
                  <img id="ssq_minicart_checkout" src="https://www.smartservice.qld.gov.au/payment/minicart/btn-checkout.png" alt="Checkout" />
                </a>
                <a href="https://www.smartservice.qld.gov.au/payment/cart/view" id="ssq-cart-edit">
                  <img id="ssq_minicart_cart" src="https://www.smartservice.qld.gov.au/payment/minicart/btn-cart.png" alt="Edit cart" />
                </a>
              </div>
            </noscript>
          </div>
          <div className="ssq-minicart-cards">
            <h3>Cards accepted</h3>
            <ul>
              <li>
                <img src="https://www.smartservice.qld.gov.au/payment/minicart/visa.png" alt="Visa" />
              </li>
              <li>
                <img src="https://www.smartservice.qld.gov.au/payment/minicart/mastercard.png" alt="MasterCard" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
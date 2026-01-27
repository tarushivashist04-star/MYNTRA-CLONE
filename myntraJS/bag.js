//CONSTANTS

const CONVENIENCE_FEES = 99;

//state
let bagItemObjects = [];

//onload
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

//load bag items
function loadBagItemObjects() {
  // bagItems comes from index.js (localStorage)
  bagItemObjects = bagItems
    .map(bagItemId => {
      return items.find(item => item.id === bagItemId);
    })
    .filter(Boolean); // remove undefined items
}

//display bag items
function displayBagItems() {
  const container = document.querySelector('.bag-items-container');
  if (!container) return;

  let html = '';
  bagItemObjects.forEach(item => {
    html += generateItemHTML(item);
  });

  container.innerHTML = html;
}

//bag summary
function displayBagSummary() {
  const summary = document.querySelector('.bag-summary');
  if (!summary) return;

  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  const totalAmount = totalMRP - totalDiscount + CONVENIENCE_FEES;

  summary.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">
        PRICE DETAILS (${bagItemObjects.length} Items)
      </div>

      <div class="price-item">
        <span>Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>

      <div class="price-item">
        <span>Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">
          -₹${totalDiscount}
        </span>
      </div>

      <div class="price-item">
        <span>Convenience Fee</span>
        <span class="price-item-value">₹${CONVENIENCE_FEES}</span>
      </div>

      <hr>

      <div class="price-footer">
        <span>Total Amount</span>
        <span class="price-item-value">₹${totalAmount}</span>
      </div>
    </div>

    <button class="btn-place-order"  onclick="placeOrder()">PLACE ORDER</button>
  `;
}

//remove from bag
function removeFromBag(itemId) {
  bagItems = bagItems.filter(id => id !== itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));

  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

//item html
function generateItemHTML(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.item_image}" alt="product">
      </div>

      <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>

        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">
            (${item.discount_percentage}% OFF)
          </span>
        </div>

        <div class="return-period">
          <span class="return-period-days">14 days</span> return available
        </div>

        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">
            ${item.delivery_date}
          </span>
        </div>
      </div>

      <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">
        X
      </div>
    </div>
  `;
}

function placeOrder(){
  window.location.href = "order.html"
}

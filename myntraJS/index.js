// GLOBAL VARIABLES
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];


// INITIAL CALLS

displayhome();
updateBagCount();


// DISPLAY PRODUCTS (CATEGORY-WISE)

function displayhome() {
  const itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) return;

  // Read category from URL (navbar click)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  let filteredItems = items;

  // Filter items based on category
  if (selectedCategory) {
    filteredItems = items.filter(
      item => item.category === selectedCategory
    );
  }

  let itemsHTML = "";

  if (filteredItems.length === 0) {
    itemsContainerElement.innerHTML =
      "<h3 style='text-align:center;'>No products found</h3>";
    return;
  }

  filteredItems.forEach(item => {
    itemsHTML += `
      <div class="item-container">
        <img class="item-image" src="${item.item_image}" alt="product image">

        <div class="rating">
          ${item.ratings.stars} ⭐ | ${item.ratings.noOfReviews}
        </div>

        <div class="company-name">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>

        <div class="price">
          <span class="current-price">₹${item.current_price}</span>
          <span class="original-price">₹${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>

        <button class="btn-add-bag" onclick="addToBag('${item.id}')">
          Add to Bag
        </button>
      </div>
    `;
  });

  itemsContainerElement.innerHTML = itemsHTML;
}


// ADD TO BAG

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  updateBagCount();
}


// UPDATE BAG COUNT (HEADER)

function updateBagCount() {
  const bagItemCountElement = document.querySelector(".bag-item-count");
  if (!bagItemCountElement) return;

  bagItemCountElement.innerText = bagItems.length;
}

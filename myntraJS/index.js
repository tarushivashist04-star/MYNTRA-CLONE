/************************
 GLOBAL STATE (with localStorage)
*************************/
let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

/************************
 BAG & WISHLIST LOGIC
*************************/
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  updateBagCount();
}

function addToWishlist(itemId) {
  wishlistItems.push(itemId);
  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  updateWishlistCount();
}

/************************
 COUNT UPDATE FUNCTIONS
*************************/
function updateBagCount() {
  const bagCountElement = document.querySelector('.bag-item-count');
  if (!bagCountElement) return;

  if (bagItems.length === 0) {
    bagCountElement.innerText = '';
    bagCountElement.style.display = 'none';
  } else {
    bagCountElement.innerText = bagItems.length;
    bagCountElement.style.display = 'inline-block';
  }
}

function updateWishlistCount() {
  const wishlistCountElement = document.querySelector('.wishlist-item-count');
  if (!wishlistCountElement) return;

  if (wishlistItems.length === 0) {
    wishlistCountElement.innerText = '';
    wishlistCountElement.style.display = 'none';
  } else {
    wishlistCountElement.innerText = wishlistItems.length;
    wishlistCountElement.style.display = 'inline-block';
  }
}

/************************
 HOME PAGE RENDER
*************************/
function displayhome() {
  const itemsContainerElement = document.querySelector('.items-container');
  //for updation of wishlist in 2nd html to

  if (!itemsContainerElement) {
    return;
  }


  let itemsHTML = '';

  items.forEach(item => {
    itemsHTML += `
      <div class="item-container">
        <img class="item-image" src="${item.item_image}" alt="item image">

        <div class="rating">
          ${item.ratings.stars} ⭐ | ${item.ratings.noOfReviews}
        </div>

        <div class="company-name">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>

        <div class="price">
          <span class="current-price">₹${item.current_price}</span>
          <span class="original-price">₹${item.original_price}</span>
          <span class="discount">${item.discount_percentage}% OFF</span>
        </div>

        <button class="btn-add-bag" onclick="addToBag('${item.id}')">
          Add to Bag
        </button>
      </div>
    `;
  });

  itemsContainerElement.innerHTML = itemsHTML;
}

/************************
 INIT (page load)
*************************/
displayhome();
updateBagCount();
updateWishlistCount();

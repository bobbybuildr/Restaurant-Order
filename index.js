import { menuArray } from '/data.js'

const menuItemsContainer = document.getElementById('menu-items')
const orderDetailsContainer = document.getElementById('order-summary')
const modalOverlay = document.getElementById('modal-overlay')
const order = []
let orderTotal = 0

document.addEventListener('click', function(e) {
  if (e.target.dataset.addToOrder) {
    addToOrder(e.target.dataset.addToOrder)
  }
  else if (e.target.dataset.removeItem) {
    removeItem(e.target.dataset.removeItem)
  }
  else if (e.target.id === 'complete-order-btn') {
    e.preventDefault()
    processOrder()
  }
  else if (e.target.id === 'modal-overlay') {
    modalOverlay.classList.add('hidden')
  }
  else if (e.target.id === 'pay-btn') {
    e.preventDefault()
    completeOrder(document.getElementById('name').value)
  }
})

function addToOrder(productId) {
  const orderedItem = menuArray.filter((item) => item.id.toString() === productId)[0]
  order.unshift(orderedItem)

  orderTotal += orderedItem.price
  
  renderOrder(order)
}

function removeItem(productId) {
  const itemToRemove = order.filter((item) => item.id.toString() === productId)[0]

  order.splice(order.indexOf(itemToRemove),1)

  orderTotal -= itemToRemove.price

  renderOrder(order)
}

function processOrder() {
  orderTotal ? modalOverlay.classList.remove('hidden') : null
}

function completeOrder(name) {
  modalOverlay.classList.add('hidden')
  document.getElementById('complete-order-btn').classList.add('hidden')

  orderDetailsContainer.innerHTML = `
  <div class="completed-order">Thanks, ${name}! Your order is on its way!</div>
  `
}

function renderMenuItems() {
  const menuItemsHtml = menuArray.map((item) => {
    return `
      <div class="menu-item">
        <div class="menu-item-image">${item.emoji}</div>
        <div class="menu-item-details">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-ingredients">${item.ingredients.join(', ')}</div>
          <div class="menu-item-price">£${item.price}</div>
        </div>
        <button class="add-to-order-btn" data-add-to-order=${item.id} role="button" aria-label="Add to order">+</button>
      </div>
    `
  }).join('')

  menuItemsContainer.innerHTML = menuItemsHtml
}

function renderOrder(order) {

  let selectedItemsHtml = `
    <div class="selected-item">
      <div class="ordered-item-title">&nbsp;</div>
      <div class="ordered-item-price">&nbsp;</div>
    </div>
  `

  if (order.length > 0) {
    selectedItemsHtml = order.map((item) => {
      return `
      <div class="selected-item">
        <div class="ordered-item-title">${item.name}</div>
        <button class="remove-item" data-remove-item=${item.id} role="button" aria-label="Remove ${item.name}">remove</button>
        <div class="ordered-item-price">£${item.price}</div>
      </div>
    `
    }).join('')

    
  }

  let orderDetailsHtml = `
    <p class="your-order-title">Your Order</p>
    <div class="selected-item-list">
        ${selectedItemsHtml}
    </div>
    <div class="order-total">
      <p class="total-price-label">Total price:</p>
      <p class="total-price">£${orderTotal || '--'}</p>
    </div>
  `
  orderDetailsContainer.innerHTML = orderDetailsHtml
}

renderMenuItems()
renderOrder(order)
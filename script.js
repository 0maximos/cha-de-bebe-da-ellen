const menuItems = document.querySelectorAll('.menu li');
const cartItems = [];

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';

    var closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }
});
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemName = item.textContent.trim();
        cartItems.push(itemName);
        updateCartCount();
        updateCartItems();

        menuItems.forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length;
}

function updateCartItems() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'X';
        cancelButton.classList.add('cancel-button');
        cancelButton.addEventListener('click', () => {
            removeCartItem(item);
        });
        li.appendChild(cancelButton);
        cartList.appendChild(li);
    });
}
function removeCartItem(itemName) {
    const index = cartItems.indexOf(itemName);
    if (index !== -1) {
        cartItems.splice(index, 1); // Remove o item da array
        updateCartCount();
        updateCartItems();
    }
}
function toggleCart() {
    const cart = document.getElementById('cart');
    const nameInput = document.getElementById('name-input');
    const confirmButton = document.getElementById('confirm-button');
    const closeCartButton = document.getElementById('close-cart');
    const cartIcon = document.getElementById('cart-icon');
    if (cart.style.display === 'none') {
        cart.style.display = 'block';
        nameInput.style.display = 'block';
        confirmButton.style.display = 'block';
    } else {
        if (event.target === closeCartButton || closeCartButton.contains(event.target)) {
            cart.style.display = 'none';
            nameInput.style.display = 'none';
            confirmButton.style.display = 'none';
        } else if (event.target !== cartIcon) {
            const name = document.getElementById('name').value.trim();
            if (name !== '') {
                cart.style.display = 'none';
                nameInput.style.display = 'none';
                confirmButton.style.display = 'none';
                sendReport();
            } else {
                alert('Por favor, insira seu nome antes de confirmar.');
            }
        }
    }
}
function sendReport() {
    const name = document.getElementById('name').value;
    const report = `Nome: ${name}\nItens Selecionados:\n${cartItems.join('\n')}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=558481571191&text=${encodeURIComponent(report)}`;
    window.open(whatsappLink, '_blank');
}


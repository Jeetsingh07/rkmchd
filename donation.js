// Amount selection
function selectAmount(amount) {
    const amountInput = document.getElementById('amount');
    const buttons = document.querySelectorAll('.amount-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (amount > 0) {
        amountInput.value = amount;
    } else {
        amountInput.value = '';
        amountInput.focus();
    }
}

// Copy UPI ID
function copyUPI() {
    const upiId = document.getElementById('upiId').textContent;
    navigator.clipboard.writeText(upiId).then(() => {
        alert('UPI ID copied to clipboard: ' + upiId);
    });
}

// Submit donation
function submitDonation() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    if (!name || !email || !amount) {
        alert('Please fill in all required fields (Name, Email, and Amount)');
        return;
    }

    if (amount < 1) {
        alert('Please enter a valid donation amount');
        return;
    }

    // Here you can integrate with payment gateway
    alert(`Thank you ${name}! You are donating ₹${amount}.\n\nPlease proceed with payment using UPI or Bank Transfer.`);
    
    // You can add payment gateway integration here
    // For example: Razorpay, PayU, or any other payment processor
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu icon animation
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.querySelector('.menu-icon');

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        menuIcon.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

console.log('%c🙏 Thank you for supporting Ramakrishna Mission 🙏', 'font-size: 20px; color: #e67e22; font-weight: bold;');

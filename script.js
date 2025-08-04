// --- Site Entry Logic ---
const welcomePage = document.getElementById('welcome-page');
const mainContent = document.getElementById('main-content');
const enterSiteBtn = document.getElementById('enter-site-btn');

enterSiteBtn.addEventListener('click', () => {
    welcomePage.classList.add('fade-out');
    welcomePage.addEventListener('animationend', () => {
        welcomePage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in');
        document.body.style.overflow = 'auto';
        lucide.createIcons();
    }, { once: true });
});

// --- Data for Plans ---
const mtnPlans = [
    { size: '1GB', price: 6 }, { size: '2GB', price: 12 },
    { size: '3GB', price: 17 }, { size: '4GB', price: 22 },
    { size: '5GB', price: 28 }, { size: '6GB', price: 32.5 },
    { size: '7GB', price: 37.5 }, { size: '8GB', price: 43 },
    { size: '10GB', price: 49 }, { size: '15GB', price: 74 },
    { size: '20GB', price: 93.5 }, { size: '25GB', price: 120 },
    { size: '30GB', price: 136 }, { size: '40GB', price: 175 },
    { size: '50GB', price: 218 }, { size: '100GB', price: 410 }
];

const airtelTigoPlans = [
    { size: '1GB', price: 4.9 }, { size: '2GB', price: 9.5 },
    { size: '3GB', price: 14 }, { size: '4GB', price: 19 },
    { size: '5GB', price: 24 }, { size: '6GB', price: 27 },
    { size: '7GB', price: 30 }, { size: '8GB', price: 35.5 },
    { size: '10GB', price: 43.5 }, { size: '15GB', price: 63.5 },
    { size: '20GB', price: 83.5 }, { size: '25GB', price: 100 },
    { size: '30GB', price: 125 }, { size: '40GB', price: 170 },
    { size: '50GB', price: 200 }, { size: '100GB', price: 300 },
    { size: '200GB', price: 515 }
];

// Replace with your actual live Paystack public key!
const PAYSTACK_PUBLIC_KEY = 'pk_live_your_public_key_here';

// --- Function to Create Plan Cards ---
function createPlanCard(plan, network) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col';
    let networkName = network === 'mtn' ? 'MTN' : 'AirtelTigo';
    let borderColor = network === 'mtn' ? 'border-yellow-400' : 'border-blue-500';
    card.innerHTML = `
        <div class="flex-grow">
            <h3 class="text-2xl font-bold text-gray-800 border-b-2 ${borderColor} pb-2 mb-4">${plan.size}</h3>
            <p class="text-4xl font-extrabold text-gray-900 mb-1">GHS ${plan.price}</p>
            <p class="text-gray-500 mb-6">30-Day Validity</p>
        </div>
        <button onclick="openModal('${networkName}', '${plan.size}', ${plan.price})" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Buy Now
        </button>
    `;
    return card;
}

// --- Populate Grids ---
const mtnGrid = document.getElementById('mtn-plans-grid');
mtnPlans.forEach(plan => {
    mtnGrid.appendChild(createPlanCard(plan, 'mtn'));
});
const airtelTigoGrid = document.getElementById('airteltigo-plans-grid');
airtelTigoPlans.forEach(plan => {
    airtelTigoGrid.appendChild(createPlanCard(plan, 'airteltigo'));
});

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- Set current year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Modal Logic ---
const phoneModal = document.getElementById('phoneModal');
const modalContainer = document.getElementById('modalContainer');
const selectedOfferEl = document.getElementById('selectedOffer');
const paymentForm = document.getElementById('paymentForm');
const phoneNumberInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneError');

let selectedPlanDetails = {};

function openModal(network, size, price) {
    selectedPlanDetails = { network, size, price };
    selectedOfferEl.textContent = `${network} ${size} - GHS ${price}`;
    phoneModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        phoneModal.classList.remove('opacity-0');
        modalContainer.classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    phoneModal.classList.add('opacity-0');
    modalContainer.classList.add('scale-95');
    setTimeout(() => {
        phoneModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        paymentForm.reset();
        phoneError.classList.add('hidden');
    }, 300);
}

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const phoneNumber = phoneNumberInput.value.trim();
    if (/^\d{10}$/.test(phoneNumber)) {
        phoneError.classList.add('hidden');
        payWithPaystack(phoneNumber, selectedPlanDetails.price);
    } else {
        phoneError.classList.remove('hidden');
    }
});

phoneModal.addEventListener('click', function(event) {
    if (event.target === phoneModal) {
        closeModal();
    }
});

// --- Paystack Integration ---
function payWithPaystack(phoneNumber, amount) {
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: 'customer@email.com', // collect user email if you wish!
        amount: amount * 100, // Convert to pesewas (GHS) or kobo (NGN)
        currency: 'GHS',
        metadata: {
            custom_fields: [
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: phoneNumber
                },
                {
                    display_name: "Data Plan",
                    variable_name: "data_plan",
                    value: selectedOfferEl.textContent
                }
            ]
        },
        callback: function(response){
            alert('Payment complete! Transaction reference: ' + response.reference);
            closeModal();
        },
        onClose: function(){
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
}

// --- Lucide Icons ---
lucide.createIcons();

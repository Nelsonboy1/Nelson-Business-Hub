// Sample data for both networks
const mtnPlans = [
    { size: '5GB', price: 24 }, { size: '6GB', price: 27 },
    { size: '7GB', price: 30 }, { size: '8GB', price: 35.5 },
    { size: '10GB', price: 43.5 }, { size: '15GB', price: 63.5 },
    { size: '20GB', price: 83.5 }, { size: '25GB', price: 100 },
    { size: '30GB', price: 125 }, { size: '40GB', price: 170 },
    { size: '50GB', price: 200 }, { size: '100GB', price: 300 },
    { size: '200GB', price: 515 }
];
const airtelTigoPlans = [
    { size: '5GB', price: 20 }, { size: '10GB', price: 38 },
    { size: '15GB', price: 55 }, { size: '20GB', price: 70 },
    { size: '25GB', price: 87 }, { size: '30GB', price: 99 },
    { size: '40GB', price: 132 }, { size: '50GB', price: 160 },
    { size: '100GB', price: 280 }
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
            <p class="text-gray-500 mb-6">Non-expiry</p>
        </div>
        <button onclick="openModal('${networkName}', '${plan.size}', ${plan.price})" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Buy Now
        </button>
    `;
    return card;
}

// --- Populate Offers Grid based on selection ---
function populatePlansGrid(network) {
    const plansGrid = document.getElementById('plans-grid');
    plansGrid.innerHTML = '';
    const plans = network === 'mtn' ? mtnPlans : airtelTigoPlans;
    plans.forEach(plan => {
        plansGrid.appendChild(createPlanCard(plan, network));
    });
}

// Initial population (default to MTN)
document.addEventListener('DOMContentLoaded', function() {
    const networkSelect = document.getElementById('network-select');
    if (networkSelect) {
        populatePlansGrid(networkSelect.value);
        networkSelect.addEventListener('change', function() {
            populatePlansGrid(this.value);
        });
    }
    // Modal and year logic
    document.getElementById('year').textContent = new Date().getFullYear();
    lucide.createIcons();
});

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
}

function closeModal() {
    phoneModal.classList.add('hidden');
    paymentForm.reset();
    phoneError.classList.add('hidden');
}

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = phoneNumberInput.value.trim();
    if (!/^0[2354789][0-9]{8}$/.test(phone)) {
        phoneError.classList.remove('hidden');
        return;
    }
    phoneError.classList.add('hidden');
    // Payment logic here ...
    closeModal();
    alert('Payment logic goes here!');
});

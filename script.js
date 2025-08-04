const mtnPlans = [
    { size: '1GB', price: 6 },
    { size: '2GB', price: 11 },
    { size: '3GB', price: 16 },
    { size: '4GB', price: 21 },
    { size: '5GB', price: 24 },
    { size: '6GB', price: 27 },
    { size: '7GB', price: 30 },
    { size: '8GB', price: 35.5 },
    { size: '10GB', price: 43.5 },
    { size: '15GB', price: 63.5 },
    { size: '20GB', price: 83.5 },
    { size: '25GB', price: 100 },
    { size: '30GB', price: 125 },
    { size: '40GB', price: 170 },
    { size: '50GB', price: 200 },
    { size: '100GB', price: 300 },
    { size: '200GB', price: 515 }
];
const airtelTigoPlans = [
    { size: '1GB', price: 5 },
    { size: '2GB', price: 9.5 },
    { size: '3GB', price: 13.5 },
    { size: '4GB', price: 18 },
    { size: '5GB', price: 20 },
    { size: '10GB', price: 38 },
    { size: '15GB', price: 55 },
    { size: '20GB', price: 70 },
    { size: '25GB', price: 87 },
    { size: '30GB', price: 99 },
    { size: '40GB', price: 132 },
    { size: '50GB', price: 160 },
    { size: '100GB', price: 280 }
];

// Special Offer: 5GB + 80 mins - GHS12, 2 DAYS OFFER, INSTANT DELIVERY
const specialOffer = {
    title: "5GB + 80 mins",
    desc: "Only GHS 12 &bull; 2 DAYS OFFER &bull; INSTANT DELIVERY"
};

function renderPlansTable(plans) {
    let rows = plans.map(plan => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">${plan.size}</td>
            <td class="px-4 py-2">GHS ${plan.price}</td>
            <td class="px-4 py-2">Non-expiry</td>
            <td class="px-4 py-2">
                <button class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Buy Now</button>
            </td>
        </tr>
    `).join('');
    return `
        <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded shadow border">
            <thead>
                <tr class="bg-blue-50">
                    <th class="px-4 py-2 text-left">Package</th>
                    <th class="px-4 py-2 text-left">Price</th>
                    <th class="px-4 py-2 text-left">Validity</th>
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        </div>
    `;
}

function renderSpecialOffer() {
    return `
        <div class="mb-2">
            <div class="text-xl font-bold text-yellow-800 mb-2">${specialOffer.title}</div>
            <div class="text-lg text-gray-700 mb-2" style="font-weight:600;" >${specialOffer.desc}</div>
            <button class="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold shadow transition-all">Get Special Offer</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();
    const tabs = document.querySelectorAll('.tab-btn');
    const offersContent = document.getElementById('offers-content');
    const specialOfferCard = document.getElementById('special-offer-card');

    function showNetwork(network) {
        if (network === 'mtn') {
            offersContent.innerHTML = renderPlansTable(mtnPlans);
        } else if (network === 'airteltigo') {
            offersContent.innerHTML = renderPlansTable(airtelTigoPlans);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active', 'bg-blue-600', 'text-white'));
            tabs.forEach(t => t.classList.add('bg-white', 'text-blue-600', 'border', 'border-blue-600'));
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-white', 'text-blue-600', 'border', 'border-blue-600');
            showNetwork(this.getAttribute('data-network'));
        });
    });

    // Initial
    showNetwork('mtn');
    specialOfferCard.innerHTML = renderSpecialOffer();
});

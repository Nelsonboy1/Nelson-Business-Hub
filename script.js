// Your Paystack shop link
const PAYSTACK_SHOP_URL = "https://paystack.shop/pay/5unm4ileb0";

// Data packages for each network
const dataPackages = {
    MTN: [
        { label: "1GB - GHS 6", value: "1GB" },
        { label: "2GB - GHS 11", value: "2GB" },
        { label: "3GB - GHS 16", value: "3GB" },
        { label: "4GB - GHS 21", value: "4GB" },
        { label: "5GB - GHS 24", value: "5GB" },
        { label: "6GB - GHS 27", value: "6GB" },
        { label: "7GB - GHS 30", value: "7GB" },
        { label: "8GB - GHS 35.5", value: "8GB" },
        { label: "10GB - GHS 43.5", value: "10GB" },
        { label: "15GB - GHS 63.5", value: "15GB" },
        { label: "20GB - GHS 83.5", value: "20GB" },
        { label: "25GB - GHS 100", value: "25GB" },
        { label: "30GB - GHS 125", value: "30GB" },
        { label: "40GB - GHS 170", value: "40GB" },
        { label: "50GB - GHS 200", value: "50GB" },
        { label: "100GB - GHS 300", value: "100GB" },
        { label: "200GB - GHS 515", value: "200GB" }
    ],
    AirtelTigo: [
        { label: "1GB - GHS 5", value: "1GB" },
        { label: "2GB - GHS 9.5", value: "2GB" },
        { label: "3GB - GHS 13.5", value: "3GB" },
        { label: "4GB - GHS 18", value: "4GB" },
        { label: "5GB - GHS 20", value: "5GB" },
        { label: "10GB - GHS 38", value: "10GB" },
        { label: "15GB - GHS 55", value: "15GB" },
        { label: "20GB - GHS 70", value: "20GB" },
        { label: "25GB - GHS 87", value: "25GB" },
        { label: "30GB - GHS 99", value: "30GB" },
        { label: "40GB - GHS 132", value: "40GB" },
        { label: "50GB - GHS 160", value: "50GB" },
        { label: "100GB - GHS 280", value: "100GB" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Show offers modal on button click
    document.getElementById('view-offers-btn').onclick = function() {
        document.getElementById('offers-modal').classList.remove('hidden');
        populatePackages();
    };

    // Change packages based on network selection
    document.getElementById('network').onchange = populatePackages;

    // Update paystack link when form values change
    document.getElementById('buy-form').oninput = updatePaystackLink;
    document.getElementById('buy-form').onsubmit = function(e) { e.preventDefault(); };

    // Pre-populate packages for default network
    populatePackages();
    updatePaystackLink();
});

// Populate packages dropdown
function populatePackages() {
    const network = document.getElementById('network').value;
    const packageSelect = document.getElementById('package');
    packageSelect.innerHTML = "";
    dataPackages[network].forEach(pkg => {
        const opt = document.createElement('option');
        opt.value = pkg.label;
        opt.textContent = pkg.label;
        packageSelect.appendChild(opt);
    });
    updatePaystackLink();
}

// Update paystack link with customer details in the query string (optional)
function updatePaystackLink() {
    const network = document.getElementById('network').value;
    const pkg = document.getElementById('package').value;
    const phone = document.getElementById('customer-phone').value.trim();
    let link = PAYSTACK_SHOP_URL;
    // You can pass details as query params if your paystack shop supports it
    if (phone) {
        link += `?network=${encodeURIComponent(network)}&package=${encodeURIComponent(pkg)}&phone=${encodeURIComponent(phone)}`;
    }
    document.getElementById('paystack-link').href = link;
}

// Close modal handler
function closeOffersModal() {
    document.getElementById('offers-modal').classList.add('hidden');
}

// Generate sample data
function generateRevenueData() {
    const data = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toLocaleDateString(),
            revenue: Math.floor(Math.random() * 5000) + 10000
        });
    }
    return data;
}

function generateUserData() {
    return {
        new: Math.floor(Math.random() * 1000) + 500,
        returning: Math.floor(Math.random() * 2000) + 1000,
        inactive: Math.floor(Math.random() * 500) + 200
    };
}

// Update metrics
function updateMetrics() {
    const totalRevenue = 124567;
    const activeUsers = 3456;
    const conversionRate = 3.2;
    const avgOrder = 89.99;

    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('activeUsers').textContent = activeUsers.toLocaleString();
    document.getElementById('conversionRate').textContent = conversionRate + '%';
    document.getElementById('avgOrder').textContent = '$' + avgOrder;
}

// Revenue Chart
function createRevenueChart() {
    const data = generateRevenueData();
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: 'Revenue',
                data: data.map(d => d.revenue),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: value => '$' + (value / 1000) + 'k'
                    }
                }
            }
        }
    });
}

// User Distribution Chart
function createUserChart() {
    const data = generateUserData();
    const ctx = document.getElementById('userChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['New Users', 'Returning', 'Inactive'],
            datasets: [{
                data: [data.new, data.returning, data.inactive],
                backgroundColor: ['#4f46e5', '#10b981', '#f59e0b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Category Chart
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'],
            datasets: [{
                label: 'Sales',
                data: [45, 32, 28, 19, 15],
                backgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Traffic Sources (D3.js)
function createTrafficChart() {
    const data = [
        { source: 'Direct', value: 35 },
        { source: 'Search', value: 28 },
        { source: 'Social', value: 22 },
        { source: 'Referral', value: 15 }
    ];

    const container = d3.select('#trafficChart');
    const width = 400;
    const height = 300;

    const svg = container.append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', \`0 0 \${width} \${height}\`);

    const maxValue = d3.max(data, d => d.value);
    const barHeight = 40;
    const barSpacing = 20;

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 100)
        .attr('y', (d, i) => i * (barHeight + barSpacing))
        .attr('width', d => (d.value / maxValue) * (width - 150))
        .attr('height', barHeight)
        .attr('fill', '#4f46e5')
        .attr('rx', 4);

    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', 10)
        .attr('y', (d, i) => i * (barHeight + barSpacing) + barHeight / 2)
        .attr('dy', '0.35em')
        .text(d => d.source)
        .attr('fill', '#64748b')
        .attr('font-size', '14px');

    svg.selectAll('.value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value')
        .attr('x', d => 110 + (d.value / maxValue) * (width - 150))
        .attr('y', (d, i) => i * (barHeight + barSpacing) + barHeight / 2)
        .attr('dy', '0.35em')
        .text(d => d.value + '%')
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold');
}

// Top Products
function createTopProducts() {
    const products = [
        { name: 'Laptop Pro', sales: 1245 },
        { name: 'Wireless Mouse', sales: 892 },
        { name: 'USB-C Cable', sales: 756 },
        { name: 'Keyboard', sales: 634 },
        { name: 'Monitor', sales: 521 }
    ];

    const container = document.getElementById('topProducts');
    container.innerHTML = products.map(product => \`
        <div class="product-item">
            <span class="product-name">\${product.name}</span>
            <span class="product-sales">\${product.sales} sold</span>
        </div>
    \`).join('');
}

// Initialize dashboard
window.onload = () => {
    updateMetrics();
    createRevenueChart();
    createUserChart();
    createCategoryChart();
    createTrafficChart();
    createTopProducts();
};

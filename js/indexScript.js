var user = []
displayuser()
var products = []
getProducts()
var orders = []
console.log("orders", orders,length);
totalorders()
// COUPONS-COUNT
var coupo = []
displayCoupon()
function displayCoupon() {
    fetch("http://localhost:5001/admin/getALLcoupon")

        .then(response => response.json())
        .then(data => {
            
            coupo = data.coupons;
            console.log(coupo);
            displaycouponCount()
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function displaycouponCount() {
    console.log("Coupon count:", coupo.length);
    document.querySelector('.total-coupons').textContent = coupo.length;
}

// USERS-COUNT
function displayuser() {
    fetch("http://localhost:5001/user/listusers")
        .then(response => response.json())
        .then(data => {
            user = data.data
            console.log("deiiiii", data.data);
            displayUserCount()
            updateChart()
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function displayUserCount() {
    console.log("User count:", user.length);
    document.querySelector('.total-users').textContent = user.length;
}
// PRODUCTS-COUNT
function getProducts() {
    fetch('http://localhost:5001/product/productsAll')
        .then(response => response.json())
        .then(data => {
            products = data.data;
            console.log("products", data.data);
            getProductCount();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getProductCount() {
    const productCount = products.length;
    console.log("Number of products:", productCount);
    document.querySelector('.total-products').textContent = products.length;
}
// ORDERS-COUNT

function totalorders() {
    fetch("http://localhost:5001/user/show-orders")
        .then(response => response.json())
        .then(data => {
            orders = data;
            console.log(orders);
            updateTotalOrders();
            updateChartWithData(orders); //chart.js
        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
// COUNT & progress-bar (DYNAMIC BAR)
function updateTotalOrders() {
    const totalOrdersElement = document.querySelector('.total-orders');
    const progressBar = document.querySelector('.progress-bar');

    if (totalOrdersElement && progressBar) {
        const totalOrdersCount = orders.length;
        totalOrdersElement.textContent = totalOrdersCount;

        const progressBarWidth = (totalOrdersCount / 20) * 100; // assuming max width is 100%
        progressBar.style.width = progressBarWidth + '%';
        progressBar.setAttribute('aria-valuenow', progressBarWidth);
    }
}
// CHART-js ORDERS INTEGRATION

// Define chart data and options
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const chartData = {
    labels: labels,
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

// Get the canvas element
const ctt = document.getElementById('myAreaChart').getContext('2d');

// Initialize the chart
const myChart = new Chart(ctt, {
    type: 'line',
    data: chartData
});

// Function to update chart data
function updateChart() {
    // Update chart data with user data
    myChart.data.datasets[0].data = user.slice(0, 7); // Assuming you want to show data for the first 7 months
    myChart.update(); // Update the chart
}






// -------------------------------------------------
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// Area Chart Example
// var ctx = document.getElementById("myAreaChart");
// var myLineChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//         datasets: [{
//             label: "Earnings",
//             lineTension: 0.3,
//             backgroundColor: "rgba(78, 115, 223, 0.05)",
//             borderColor: "rgba(78, 115, 223, 1)",
//             pointRadius: 3,
//             pointBackgroundColor: "rgba(78, 115, 223, 1)",
//             pointBorderColor: "rgba(78, 115, 223, 1)",
//             pointHoverRadius: 3,
//             pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//             pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//             pointHitRadius: 10,
//             pointBorderWidth: 2,
//             data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
//         }],
//     },
//     options: {
//         maintainAspectRatio: false,
//         layout: {
//             padding: {
//                 left: 10,
//                 right: 25,
//                 top: 25,
//                 bottom: 0
//             }
//         },
//         scales: {
//             xAxes: [{
//                 time: {
//                     unit: 'date'
//                 },
//                 gridLines: {
//                     display: false,
//                     drawBorder: false
//                 },
//                 ticks: {
//                     maxTicksLimit: 7
//                 }
//             }],
//             yAxes: [{
//                 ticks: {
//                     maxTicksLimit: 5,
//                     padding: 10,
//                     // Include a dollar sign in the ticks
//                     callback: function (value, index, values) {
//                         return '$' + number_format(value);
//                     }
//                 },
//                 gridLines: {
//                     color: "rgb(234, 236, 244)",
//                     zeroLineColor: "rgb(234, 236, 244)",
//                     drawBorder: false,
//                     borderDash: [2],
//                     zeroLineBorderDash: [2]
//                 }
//             }],
//         },
//         legend: {
//             display: false
//         },
//         tooltips: {
//             backgroundColor: "rgb(255,255,255)",
//             bodyFontColor: "#858796",
//             titleMarginBottom: 10,
//             titleFontColor: '#6e707e',
//             titleFontSize: 14,
//             borderColor: '#dddfeb',
//             borderWidth: 1,
//             xPadding: 15,
//             yPadding: 15,
//             displayColors: false,
//             intersect: false,
//             mode: 'index',
//             caretPadding: 10,
//             callbacks: {
//                 label: function (tooltipItem, chart) {
//                     var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//                     return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
//                 }
//             }
//         }
//     }
// });
// =====================================================================================
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Direct", "Referral", "Social"],
        datasets: [{
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: false
        },
        cutoutPercentage: 80,
    },
});

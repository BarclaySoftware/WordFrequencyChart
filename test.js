let chart;

function generateWordFrequency() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('results');
    const ctx = document.getElementById('wordFrequencyChart').getContext('2d');
    resultsDiv.innerHTML = '';

    if (!text) {
        alert('Please enter valid text.');
        return;
    }

    const words = text.match(/\p{L}+/gu);
    const frequency = {};

    words.forEach(word => {
        word = word.toLowerCase();
        if (word) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 16);
    const labels = sortedFrequency.map(item => item[0]);
    const data = sortedFrequency.map(item => item[1]);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Word Frequency',
                data: data,
                backgroundColor: 'rgba(25, 118, 210, 1)',
                borderColor: 'rgba(158, 158, 158, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'teal' // Set hover background color to teal
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            family: 'interface',
                            size: 14
                        },
                        color: 'red' // Set x-axis text color to red
                    },
                    grid: {
                        color: 'yellow' // Set x-axis grid lines to yellow
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'interface',
                            size: 14
                        },
                        color: 'red' // Set y-axis text color to red
                    },
                    grid: {
                        color: 'yellow' // Set y-axis grid lines to yellow
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'interface',
                            size: 14
                        },
                        color: 'red' // Set legend text color to red
                    }
                },
                tooltip: {
                    backgroundColor: 'white', // Set tooltip background to white
                    titleColor: 'red', // Set tooltip title text color to red
                    bodyColor: 'red', // Set tooltip body text color to red
                    borderColor: 'pink', // Set border around color box to pink
                    borderWidth: 1, // Ensure border is visible
                    boxPadding: 2, // Padding around color box
                    shadowOffsetX: 3, // Horizontal shadow offset
                    shadowOffsetY: 3, // Vertical shadow offset
                    shadowBlur: 10, // Shadow blur
                    shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
                    titleFont: {
                        family: 'interface',
                        size: 14,
                        weight: 'normal'
                    },
                    bodyFont: {
                        family: 'interface',
                        size: 14
                    },
                    callbacks: {
                        labelColor: function(context) {
                            return {
                                borderColor: 'pink',
                                backgroundColor: context.dataset.backgroundColor,
                                borderWidth: 2,
                                borderDash: [2, 2],
                                borderDashOffset: 0
                            };
                        }
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            }
        }
    });
}

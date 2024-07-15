let chart;

function generateWordFrequency() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('results');
    const ctx = document.getElementById('wordFrequencyChart').getContext('2d');
    resultsDiv.innerHTML = '';

    if (!text) {
        alert('No valid text was found.');
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
                backgroundColor: '#1976d2',
                borderColor: '#9e9e9e',
                borderWidth: 1,
                hoverBackgroundColor: '#004b9b',
                hoverBorderColor: '#9e9e9e',
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
                        color: '#616161'
                    },
                    grid: {
                        color: '#ffffff'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'interface',
                            size: 14
                        },
                        color: '#616161'
                    },
                    grid: {
                        color: '#f4f4f4'
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
                        color: '#1976d2'
                    }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#4d4d4d',
                    bodyColor: '#4d4d4d',
                    borderColor: '#d9d9d9',
                    borderWidth: 1,
                    boxPadding: 2,
                    callbacks: {
                        labelColor: function(context) {
                            return {
                                borderColor: '#d9d9d9',
                                backgroundColor: context.dataset.backgroundColor,
                                borderWidth: 1,
                                borderDashOffset: 0
                            };
                        }
                    },
                    titleFont: {
                        family: 'interface-bold',
                        size: 14,
                        weight: 'normal'
                    },
                    bodyFont: {
                        family: 'interface',
                        size: 14
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

    // Show the download button with tooltip
    document.getElementById('downloadTooltip').style.display = 'inline-block';
}

function downloadChart() {
    const link = document.createElement('a');
    link.href = document.getElementById('wordFrequencyChart').toDataURL('image/png');
    link.download = 'word_frequency_chart.png';
    link.click();
}
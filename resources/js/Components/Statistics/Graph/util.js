import ApexCharts from "apexcharts";

export function loadGraph(data, graphId, graphTitle, graphDescription) {
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const colors = ["black"]

    const options = {
        series: [{
            name: graphDescription,
            data: Object.keys(monthArray).map((key, index) => {
                return data[monthArray[key]].length
            }),
        }],
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        title: {
            text: graphTitle,
            align: 'left'
        },
        xaxis: {
            categories: [
                ['Jan'],
                ['Feb'],
                ['Mar'],
                ['Apr'],
                ['May'],
                ['Jun'],
                ['Jul'],
                ['Aug'],
                ['Sep'],
                ['Okt'],
                ['Nov'],
                ['Dec'],
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        }
    };

    const chart = new ApexCharts(document.querySelector(`#${graphId}`), options);
    chart.render();
}
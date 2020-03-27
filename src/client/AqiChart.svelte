<style>
    .chart{
        max-width: 300px;
    }
</style>
<div class="chart">
    <canvas id="aqichart"></canvas>
</div>

<script>
    export let aqi;
    export let color;

    import { onMount } from 'svelte';

    onMount(renderChart);

    function renderChart() {
        console.log('called', aqi);
		var data = {
            labels: [ `AQI: ${aqi}`],
            datasets: [
                {
                    data: [ aqi, 300 - (aqi)],
                    backgroundColor: [
                        color,
                        "#ddd",
                    ],
                    // hoverBackgroundColor: [
                    //     "#FF6384",
                    //     "#36A2EB",
                    // ]
                }]
        };

        var ctx = document.getElementById("aqichart");

        // And for a doughnut chart
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                events: []
            },
            centerText: {
                display: true,
                text: "280"
            }
        });
	}
</script>
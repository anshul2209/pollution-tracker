<style>
    .chart{
        max-width: 300px;
    }
</style>
<div class="chart">
    <canvas id="aqichart"></canvas>
</div>

<script>
    import { onMount } from 'svelte';
    export let aqi;
    export let color;
    var ctx = document.getElementById("aqichart");

    // onMount(() => {
    //     renderChart(aqi);
    // })

    $: if(aqi !== '') {
        renderChart(aqi);
    }
    // $: renderChart(aqi);

    const renderChart = aqi => {
        var data = {
            labels: [ `AQI: ${aqi}`],
            datasets: [
                {
                    data: [ aqi, 300 - (aqi)],
                    backgroundColor: [
                        color,
                        "#ddd",
                    ]
                }]
        };
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
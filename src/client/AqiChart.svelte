<style>
    .emoji1{
        background: url('/images/aqiemoji.png') no-repeat -7px -30px;
        width: 177px;
        height: 162px;
        background-size: cover;
    }
    .emoji2{
        background: url('/images/aqiemoji.png') no-repeat -209px -28px;
        width: 178px;
        height: 167px;
        background-size: cover;

    }
    .emoji3{
        background: url('/images/aqiemoji.png') no-repeat -406px -29px;
        width: 182px;
        background-size: cover;
        height: 167px;
    }   
    .emoji4{
        background: url('/images/aqiemoji.png') no-repeat -610px -29px;
        width: 179px;
        background-size: cover;
        height: 164px;
    }
    .emoji5{
        background: url('/images/aqiemoji.png') no-repeat -811px -26px;
        background-size: cover;
        width: 177px;
        height: 171px;
    }
    .emoji6{
        background: url('/images/aqiemoji.png') no-repeat -1014px -20px;
        width: 176px;
        background-size: cover;
        height: 189px;
    }
    .chart_wrapper{
        display: flex;
        align-items: center;
        
    }
    .details{
        width: 300px;
    }

</style>

<div class="chart_wrapper">
    <div class="chart">
        <canvas id="aqichart"></canvas>
    </div>
    {#if expression}
        <div class={`emoji${expression}`} />
        <div class="details">
            <label>{aqiMap[expression].label}</label>
            <label>{aqiMap[expression].advisory}</label>
        </div>
    {/if}
</div>

<script>
    export let aqi;
    const aqiMap = {
        1: { color: 'Green', label: 'Good', advisory: 'Safe to go outsidet for a run or a Yoga maybe!' },
        2: { color: 'Yellow', label: 'Moderate', advisory: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.' },
        3: { color: 'Orange', label: 'Unhealthy for Sensitive Groups', advisory: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
        4: { color: 'Red', label: 'Unhealthy', advisory: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
        5: { color: 'Purple', label: 'Very Unhealthy', advisory: 'Health alert: everyone may experience more serious health effects.' },
        6: { color: 'Maroon', label: 'Hazardous', advisory: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' }
    };

    let expression;

    import { afterUpdate } from 'svelte';
    afterUpdate(() => {
        if(aqi) {
            aqi = parseInt(aqi, 10);
            switch(true){
                case aqi <=50: expression = 1; break;
                case aqi <=100: expression = 2; break;
                case aqi <=150: expression = 3; break;
                case aqi <=200: expression = 4; break;
                case aqi <=300: expression = 5; break;
                default : expression = 6;
            }
            renderChart();
        }
    });
    function renderChart() {
		var data = {
            labels: [ `AQI: ${aqi}`],
            datasets: [
                {
                    data: [ aqi, 300 - (aqi)],
                    backgroundColor: [
                        aqiMap[expression].color,
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
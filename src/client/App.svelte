<script>
	import Pollution from './Pollution.svelte';
	import AqiChart from './AqiChart.svelte';
	import Advisory from './Advisory.svelte';
	import Filter from './components/Filter.svelte';
	
	let mainPollutant = '';
	let aqi = '';
	let last_update = '';
	let address = '';
	let expression = ''

	const aqiMap = {
        1: { color: 'Green', label: 'Good', advisory: 'Safe to go outside for a run or a Yoga maybe!' },
        2: { color: 'Yellow', label: 'Moderate', advisory: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.' },
        3: { color: 'Orange', label: 'Unhealthy for Sensitive Groups', advisory: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
        4: { color: 'Red', label: 'Unhealthy', advisory: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
        5: { color: 'Purple', label: 'Very Unhealthy', advisory: 'Health alert: everyone may experience more serious health effects.' },
        6: { color: 'Maroon', label: 'Hazardous', advisory: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' }
    };

	const getAQI = event => {
		const pollutionList = event.detail.text;
		if(pollutionList && pollutionList.length) {
			const PM2 = pollutionList
				.filter(obj => obj.pollutant_id === 'PM2.5')[0];
			const PM10 = pollutionList
				.filter(obj => obj.pollutant_id === 'PM10')[0];
			
			if(PM2.pollutant_avg > PM10.pollutant_avg) {
				mainPollutant = PM2.pollutant_id;
				aqi = PM2.pollutant_avg;
				last_update = PM2.last_update;
				address = `${PM2.station}, ${PM2.city}, ${PM2.state}, ${PM2.country}`
			}
			else{
				mainPollutant = PM10.pollutant_id;
				aqi = PM10.pollutant_avg;
				last_update = PM10.last_update;
				address = `${PM10.station}, ${PM10.city}, ${PM10.state}, ${PM10.country}`
			}	
			findAdvisory(aqi);	
		}
		else{
			mainPollutant = '';
			aqi = '';
			last_update = '';
			address = '';
			expression = '';
		}
		
	}
	const findAdvisory = aqi => {
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
        }
	}	
	 
</script>

<h2>Real time Air Quality Index of <span>{address}</span></h2>
<div class="locationinfo">
	<h3>Last Updated On: {last_update}</h3>
</div>
<Filter on:filterresults={getAQI}/>
<main class="wrapper">
	<div class="left">
		<div class="chart">
			<AqiChart aqi={aqi} color={aqiMap[expression].color} />
			<div class="label_Data">
				<label>Main Pollutant is <span>{mainPollutant}</span></label>
				<label>AQI is <span>{aqi}</span></label>
				<label>Air Quality is <span>{aqiMap[expression].label}</span></label>
			</div>
		</div>
	</div>
	<div class="right">
		<Advisory aqiMap={aqiMap} expression={expression}/>
	</div>
</main>



<style>
	.right{
		padding-top: 75px;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		/* align-items: center; */
		justify-content: space-evenly;
	}
	.label_Data{
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.label_Data label span{
		background: linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98));
		color: white;
		padding: 5px;
		box-sizing: border-box;
	}
	label{
		display: block;
		font-size: 28px;
		line-height: 48px;
	}
	.chart{
		/* display: flex; */
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	@media only screen and (max-width: 425px){
		main{
			display: block;
		}
		label{
			font-size: 16px;
			text-align: center;
		}
	}
</style>
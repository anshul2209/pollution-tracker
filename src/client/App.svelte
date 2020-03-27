<script>
	import axios from "axios";
	import { onMount } from 'svelte';
	import Pollution from './Pollution.svelte';
	import AqiChart from './AqiChart.svelte';
	import Advisory from './Advisory.svelte';

	const ApiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
	console.log('Api Url is', ApiUrl);

	let title = '';
	let queryparams = {
		city: '',
		state: ''
	};
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

	const getAQI = (pollutionList) => {
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
	const findAdvisory = (aqi) => {
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

	let records = [];
	const handleClick = () => {
		axios.get(`${ApiUrl}/api/pollution`, { params: queryparams })
		.then(res => {
			const result = res.data;
			title = result.title;
			records = result.records;
			getAQI(records);
		})
		.catch(err => console.log('err is', err));
	}
	onMount(() => {
		handleClick();
		setInterval(handleClick, 600000)
	});


</script>


<section class="filter">
	<h2>Real time Air Quality Index of <span>{address}</span></h2>
	<!-- <div class="form">
		<input bind:value={queryparams.city} placeholder="enter the city">
		<input bind:value={queryparams.state} placeholder="enter the state">
		<button on:click={handleClick}>
			Click me
		</button>
	</div> -->
</section>
{#if mainPollutant && aqi}
	<div class="locationinfo">
		<label>Last Updated On: {last_update}</label>
	</div>
	<main class="wrapper">
		<div class="left">
			<div class="chart">
				<AqiChart aqi={aqi} color={aqiMap[expression].color} />
				<div class="label_Data">
					<label>Main Pollutant is <span>{mainPollutant}</span></label>
					<label>AQI is <span>{aqi}</span></label>
					<label>{`Air Quality is ${aqiMap[expression].label}`}</label>
				</div>
			</div>
			<!-- <div class="pollution_stats">
				<table>
					<thead>
						<th>Pollutant:</th>
						<th>Minimum</th>
						<th>Maximum</th>
						<th>Average</th>
					</thead>
					<tbody>
						{#each records as record}
							<Pollution pollutionObj={record} />
						{/each}
					</tbody>
				</table>
			</div> -->
		</div>
		<div class="right">
			<Advisory aqiMap={aqiMap} expression={expression}/>
		</div>
	</main>
{/if}



<style>
	.filter{
		text-align: center;
	}
	.locationinfo{
		margin-top: 20px;
		padding: 10px;
		text-align: right;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.visual_data{
		display: flex;
		justify-content: space-evenly;
	}
	.polluton_details{
		/* display: flex;
		flex-wrap: wrap; */
		margin-top: 50px;
		/* justify-content: space-around; */
	}
	.label_Data{
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	label{
		display: block;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.chart{
		display: flex;
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
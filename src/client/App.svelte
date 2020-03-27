<script>
	import axios from "axios";
	import Pollution from './Pollution.svelte';
	import AqiChart from './AqiChart.svelte';

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

	function getAQI(pollutionList){
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

</script>

<main>
	<h2>Real time Air Quality Index from various location</h2>
	<div class="form">
		<input bind:value={queryparams.city} placeholder="enter the city">
		<input bind:value={queryparams.state} placeholder="enter the state">
		<button on:click={handleClick}>
			Click me
		</button>
	</div>
	{#if mainPollutant && aqi}
		<div class="polluton_details">
			<div class="visual_data">
				<AqiChart aqi={aqi} />
				<div class="pollution_data">
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
				</div>
			</div>
			<!-- <div class="label_Data">
				<label>Main Pollutant is <span>{mainPollutant}</span></label>
				<label>AQI is <span>{aqi}</span></label>
				<label>Last Updated On: {last_update}</label>
				<label>Location is: {address}</label>
			</div> -->
		</div>	
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
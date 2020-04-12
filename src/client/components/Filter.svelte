<style>
    .themed {
		--background: white;
	}
	.themed h3{
		text-align: left;
		margin: 5px;
	}
	.form{
		display: flex;
		justify-content: space-evenly;
		align-items: flex-end;
	}
	.filter{
		text-align: center;
	}
	.filterBtn{
		color: #fff !important;
		text-transform: uppercase;
		text-decoration: none;
		background: #60a3bc;
		padding: 20px;
		border-radius: 50px;
		display: inline-block;
		border: none;
		transition: all 0.4s ease 0s;
		cursor: pointer;
		outline: none;
		font-size: 16px;
		min-width: 200px;
	}
	.filterBtn:hover {
		text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
		-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
		-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
		transition: all 0.4s ease 0s;
	}
</style>
<section class="filter">
	<div class="form">
		<div class="themed">
			<h3>State</h3>
			<Select items={states} bind:selectedValue={stateObj}></Select>
		</div>
		<div class="themed">
			<h3>City</h3>
			<Select items={cities} bind:selectedValue={cityObj}></Select>
		</div>
		<div class="themed">
			<h3>Station</h3>
			<Select items={stations} bind:selectedValue={stationObj}></Select>
		</div>
		<button class="filterBtn" on:click={handleClick}>
			Get Information
		</button>
	</div>
</section>
<script>
	import Select from 'svelte-select';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import axios from "axios";
	import locationData from '../../../locationData.js';
    const dispatch = createEventDispatcher();

	const ApiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

    const handleClick = () => {
		axios.get(`${ApiUrl}/api/pollution`, { params: queryparams })
		.then(res => {
			const result = res.data;
			 dispatch('filterresults', {
				text: result.records
			});
		})
		.catch(err => console.log('err is', err));
	}
	onMount(() => {
		handleClick();
		// setInterval(handleClick, 600000)
	});
    let states = locationData.states;
	let statename;
	let cityname;
	let cities = [];
	let stations = [];
	
	$: queryparams = {
		city: cityObj.value,
		state: stateObj.value,
		station: stationObj.value
	};
	$: stateObj = {
		label: 'Haryana',
		value: 'Haryana'
	};
	$: cityObj = {
		label: 'Gurugram',
		value: 'Gurugram	'
	};
	$: stationObj = {
		label: 'Sector-51, Gurugram - HSPCB',
		value: 'Sector-51, Gurugram - HSPCB'
	};

	$: {
		if(stateObj && stateObj.value) {
			if(stateObj.value !== statename) {
				cityObj = {
					label: 'Select City*',
					value: ''
				};
				stationObj = {
					label: 'Select Station*',
					value: ''
				};
				stations = [];
			}
			statename = stateObj.value;
			cities = locationData.cities.find(obj => obj.stateID === stateObj.value).citiesInState;
		}
		if(cityObj && cityObj.value) {
			if(cityObj.value !== cityname) {
				stationObj = {
					label: 'Select Station*',
					value: ''
				}
			}
			cityname = cityObj.value;
			stations = locationData.stations.find(obj => obj.cityID === cityObj.value).stationsInCity;
		}
    }
    
</script>
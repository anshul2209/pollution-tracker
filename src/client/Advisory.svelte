<style>
    .emoji1{
        background: url('/images/aqiemoji.png') no-repeat -7px -16px;
        width: 150px;
        height: 162px;
        background-size: cover;
    }
    .emoji2{
        background: url('/images/aqiemoji.png') no-repeat -162px -28px;
        width: 150px;
        height: 167px;
        background-size: cover;

    }
    .emoji3{
        background: url('/images/aqiemoji.png') no-repeat -308px -29px;
        width: 182px;
        background-size: cover;
        height: 167px;
    }   
    .emoji4{
        background: url('/images/aqiemoji.png') no-repeat -460px -29px;
        width: 179px;
        background-size: cover;
        height: 164px;
    }
    .emoji5{
        background: url('/images/aqiemoji.png') no-repeat -650px -26px;
        background-size: cover;
        width: 177px;
        height: 171px;
    }
    .emoji6{
        background: url('/images/aqiemoji.png') no-repeat -909px -20px;
        width: 176px;
        background-size: cover;
        height: 189px;
    }
    .chart_wrapper{
        display: flex;
        align-items: center;
        
    }
    .details{
        width: 500px;
        padding: 20px;
        box-sizing: border-box;
        color: white;
        background: linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98));
    }
    label{
        font-size: 32px;
        font-weight: 700;
        line-height: 56px;
        font-family: 'Special Elite', cursive;

    }

    section{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (max-width: 425px){
		.details{
            /* display: block; */
            width: 100vw;
		}
		.details label{
			font-size: 18px;
            text-align: center;
            line-height: 18px;
		}
	}
    
</style>

<section>
    {#if expression}
        <div class={`emoji${expression}`} />
        <div class="details">
            <!-- <label>{`Air quality is ${aqiMap[expression].label}`}</label> -->
            <label>{advisory}</label>
        </div>
    {/if}
</section>

<script>
    import { onMount, afterUpdate } from 'svelte';
    export let expression;
    export let aqiMap;
    
    $: advisory = aqiMap[expression].advisory; /* The text */
</script>
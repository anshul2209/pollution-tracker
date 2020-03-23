<style>
    .wrapper{
        border: 1px solid;
    }
</style>

<tr>
    <td>{pollutionObj.pollutant_id}</td>
    <td>{pollutionObj.pollutant_min}</td>
    <td>{pollutionObj.pollutant_max}</td>
    <td>{pollutionObj.pollutant_avg}</td>
</tr>


<script>
    export let pollutionObj = {};
    // 0 to 50	Good	Green
    // 51 to 100	Moderate	Yellow
    // 101 to 150	Unhealthy for Sensitive Groups	Orange
    // 151 to 200	Unhealthy	Red
    // 201 to 300	Very Unhealthy	Purple
    // 301 to 500	Hazardous	Maroon

</script>
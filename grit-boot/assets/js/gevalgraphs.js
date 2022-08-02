TESTER = document.getElementById('gevalgraph1');

function gevalgraph1() {

    var three = document.getElementById('gevalgraph1gb');
    three = three.options[three.selectedIndex].value
    var one = 'sample_id';
    var two = 'manual_interventions';
    var four = 'length_after';

    var url = 'https://grit-realtime-api.tol.sanger.ac.uk/gritdata?select=' + one + ',' + two + ',' + three + ',' + four;

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];
        var label = [];

        data.forEach((item) => {
            x.push(item[four]/1000000000);
            y.push((item[two]/item[four])*1000000000);
            c.push(item[three]);
            label.push( 'Org: ' + item[one] + ' | MI: ' + item[two] + ' | MI per Gb: ' + (item[two]/item[four])*1000000000)
        });

        var trace1 = {
            type: 'scatter',
            x: x,
            y: y,
            mode: 'markers',
            text: label,
            transforms: [{
                type: 'groupby',
                groups: c
            }]
        };

        var datas = [trace1];

        var elmntgg1 = document.getElementById("gevalgraph1").clientWidth - 30

        var layout = {
            title: 'Manual Interventions (normalised to 1Gb) by Assembly size (Gb)',
            xaxis: {
                    title: 'Assembly Size (Gb)',
                },
            yaxis: {
                    title: 'Manual Interventions (normalised to 1Gb)',
                    tickvals: [0,1000,2000,3000,4000,5000,6000,7000],
                    ticktext: [0,1,2,3,4,5,6,7]
                },
            width: elmntgg1
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('gevalgraph1', datas, layout, config)

    })
}

gevalgraph1()
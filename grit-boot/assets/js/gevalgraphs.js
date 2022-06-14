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
            x.push(item[four]/1000000);
            y.push((item[two]/item[four])*1000000000);
            c.push(item[three]);
            label.push(item[one])
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
            title: 'Manual Interventions (normalised to 1000Mb) by Assembly size (normalised to 1000Mb)',
            xaxis: {
                    title: 'Assembly Size (normalised to 1000Mb)'
                },
            yaxis: {
                    title: 'Manual Interventions (normalised to 1000mb'
                },
            width: elmntgg1
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('gevalgraph1', datas, layout, config)

    })
}

gevalgraph1()
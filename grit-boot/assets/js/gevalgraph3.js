TESTER = document.getElementById('gevalgraph3');

function gevalgraph3() {

    var three = document.getElementById('gevalgraph3gb');
    three = three.options[three.selectedIndex].value
    var one = 'sample_id';
    var two = 'scaff_count_change';
    var four = 'length_after';

    var url = 'http://grit-realtime.tol.sanger.ac.uk:8001/gritdata?select=' + one + ',' + two + ',' + three + ',' + four;

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];
        var label = [];

        data.forEach((item) => {
            x.push(item[four]/1000000);
            y.push(item[two]);
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

        var elmntgg3 = document.getElementById("gevalgraph3").clientWidth - 30

        var layout = {
            title: 'Scaff count change (%) by Assembly size (normalised to 1000Mb)',
                xaxis: {
                    title: 'Assembly Size (normalised to 1000Mb)'
                },
                yaxis: {
                    title: 'Scaff count change (%)'
                },
            width: elmntgg3

        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('gevalgraph3', datas, layout, config)

    })
}

gevalgraph3()
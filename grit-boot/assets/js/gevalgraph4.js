TESTER = document.getElementById('gevalgraph4');

function gevalgraph4() {

    var three = document.getElementById('gevalgraph4gb');
    three = three.options[three.selectedIndex].value
    var one = 'sample_id';
    var two = 'assignment';
    var four = 'length_after';

    var url = 'https:///grit-realtime-api.tol.sanger.ac.uk/gritdata?select=' + one + ',' + two + ',' + three + ',' + four;

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];
        var label = [];

        data.forEach((item) => {
            x.push(item[four]/1000000000);
            y.push(item[two]);
            c.push(item[three]);
            label.push( 'Org: ' + item[one] + ' | Percent change: ' + item[two])
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

        var elmntgg4 = document.getElementById("gevalgraph4").clientWidth - 30

        var layout = {
            title: 'Sequence assigned to chromosome (%) by Assembly size (1Gb)',
                xaxis: {
                    title: 'Assembly Size (Gb)'
                },
                yaxis: {
                    title: 'Sequence assigned to chromosome (%)'
                },
            width: elmntgg4

        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('gevalgraph4', datas, layout, config)

    })
}

gevalgraph4()
TESTER = document.getElementById('gevalgraph4');

function gevalgraph4() {

    var three = document.getElementById('gevalgraph4gb');
    three = three.options[three.selectedIndex].value
    var one = 'sample_id';
    var two = 'assignment';
    var four = 'length_after';

    var url = 'http://localhost:3000/gritdata?select=' + one + ',' + two + ',' + three + ',' + four;

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

        var layout = {
            title: 'Sequence assigned to chromosome (%) by Assembly size (normalised to 1000Mb)',
                xaxis: {
                    title: 'Assembly Size (normalised to 1000Mb)'
                },
                yaxis: {
                    title: 'Sequence assigned to chromosome (%)'
                }

        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('gevalgraph4', datas, layout, config)

    })
}

gevalgraph4()
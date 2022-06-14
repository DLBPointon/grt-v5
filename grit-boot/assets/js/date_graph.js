TESTER = document.getElementById('dategraphLoc');

function dategrapher() {

    var one = document.getElementById('dategraphGen');
    one = one.options[one.selectedIndex].value

    var two = 'date_in_ymd'

    var three = document.getElementById('dategraphGenY');
    three = three.options[three.selectedIndex].value

    var four = 'length_after'

    var labels = 'sample_id'

    var url = 'https://grit-realtime-api.tol.sanger.ac.ukgritdata?select='+one+','+two+','+three+','+four+','+labels

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];
        var label = [];
        data.forEach((item) => {

                x.push(item[two]);

                if (item[three] === 'manual_interventions') {
                    y.push((item[three]/item[four])*1000000000)
                } else if (item[three] === 'length_after'){
                    y.push(item[three]);
                    console.log(y)
                } else {
                    y.push(item[three])
                }

                c.push(item[one]);

                label.push(item['sample_id'])
        });

        var trace1 = {
            type: 'scatter',
            mode: 'markers',
            x: x,
            y:y,
            text: label,
            transforms: [{
                type: 'groupby',
                groups: c
            }]
        };

        var datas = [trace1]

        var elmntdg = document.getElementById("dategraphLoc").clientWidth - 30

        var layout = {
            title: 'Time Series of with Rangeslider',
            xaxis: {
                title:'Date of Ticket creation',
                autorange: true,
                rangeselector: { buttons: [
                        {
                            count: 1,
                            label: '1 Month',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {
                            count: 6,
                            label: '6m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {step: 'all'}
                    ]},
                rangeslider: {
                    autorange: true
                },
                type: 'date'
            },
            yaxis: {
                autorange: true
            },
            width: elmntdg
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.newPlot('dategraphLoc', datas, layout, config);
    })
}
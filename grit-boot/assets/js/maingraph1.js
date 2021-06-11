TESTER = document.getElementById('test');

function makegraph() {

    var one = document.getElementById('MainGraphSelector1X');
    one = one.options[one.selectedIndex].value
    var two = document.getElementById('MainGraphSelector1Y');
    two = two.options[two.selectedIndex].value
    var three = document.getElementById('MainGraphSelector1C');
    three = three.options[three.selectedIndex].value

    var url = 'http://172.27.21.37:3000/gritdata?select='+one+','+two+','+three

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];

        data.forEach((item) => {
            x.push(item[one]);
            y.push(item[two]);
            c.push(item[three]);
        });

        var trace1 = {
            type: 'scatter',
            x: x,
            y: y,
            mode: 'markers',
            transforms: [{
                type: 'groupby',
                groups: c
            }],
            name: 'maingraph1',
            marker: {
                line: {width: 1,},
                symbol: 'circle',
                size: 5
            }
        };

        var datas = [trace1];

        var layout = {
            title: 'Graph showing '+ one + ' and ' + two + ' coloured by ' + three,
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: 'rgb(102, 102, 102)',
                titlefont: {font: {color: 'rgb(204, 204, 204)'}},
                tickfont: {font: {color: 'rgb(102, 102, 102)'}},
                autotick: true,
                dtick: 10,
                ticks: 'outside',
                tickcolor: 'rgb(102, 102, 102)'
            },
            margin: {
                    l: 25,
                    r: 0,
            },
            legend: {
                font: {size: 8,},
                yanchor: 'middle',
                xanchor: 'right'
            }
        };
        var config = {responsive: true, displayModeBar: true}
        Plotly.newPlot('test', datas, layout, config);
        }
    )
}

makegraph()


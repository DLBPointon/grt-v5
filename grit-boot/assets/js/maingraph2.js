TESTER = document.getElementById('maingraph2');

function rand_colour () {
    var r = Math.random()*255;
    var g = Math.random()*255;
    var b = Math.random()*255;
    return 'rgb('+r+','+g+','+b+')'
}

var colour_map = []

function getColour(project) {
    if (project in colour_map) {return colour_map[project]}
        colour_map[project] = rand_colour();
    return colour_map[project]
}

function makegraph_2() {

    var one = document.getElementById('MainGraphSelector2X');
    one = one.options[one.selectedIndex].value
    var two = document.getElementById('MainGraphSelector2Y');
    two = two.options[two.selectedIndex].value
    var three = 'project_type'

    var url = 'http://localhost:3000/gritdata?select='+one+','+two+','+three

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
            name: 'maingraph2',
            marker: {
                line: {width: 1,},
                symbol: 'circle',
                size: 5
            }
        }

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
        Plotly.react('maingraph2', datas, layout, config);
        }
    )
}

makegraph_2()
TESTER = document.getElementById('maingraph2');

function makegraph_2() {

    var one = document.getElementById('MainGraphSelector2X');
    one = one.options[one.selectedIndex].value
    var two = document.getElementById('MainGraphSelector2Y');
    two = two.options[two.selectedIndex].value
    var three = 'project_type'

    var url = 'http://172.27.21.37:3000/gritdata?select='+one+','+two+','+three

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];

        data.forEach((item) => {
            x.push(item[one]);

            if (two === 'manual_interventions,length_after') {
                y.push((item['manual_interventions']/item['length_after'])*1000000000)
            } else {
                y.push(item[two]);
            }

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

        var elmnt = document.getElementById("maingraph2").clientWidth - 60


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
                    l: 50,
                    r: 0,
            },
            legend: {
                font: {size: 8,},
                yanchor: 'middle',
                xanchor: 'right'
            },
            width: elmnt
        };
        var config = {responsive: true, displayModeBar: true}
        Plotly.react('maingraph2', datas, layout, config);
        }
    )
}

makegraph_2()

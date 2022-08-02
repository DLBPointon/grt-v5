
function cladegrapherproj() {
    var one = document.getElementById('CladeSelectorP');
    prefix = one.options[one.selectedIndex].value

    var two = document.getElementById('CladeGraphSelector1XP');
    two = two.options[two.selectedIndex].value

    var three = document.getElementById('CladeGraphSelector1YP');
    three = three.options[three.selectedIndex].value

    var four = document.getElementById('CladeGraphSelector1CP');
    four = four.options[four.selectedIndex].value

    var url = 'https://grit-realtime-api.tol.sanger.ac.uk/gritdata?order=family_name.asc&project_code=in.('
        + prefix + ')&select='+ two +',family_name,prefix_dl,' + three

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var x = [];
        var y = [];
        var c = [];

        data.forEach((item) => {
            x.push(item[two]);

            if (three.includes('length_after')) {
                y.push((item['manual_interventions']/item['length_after'])*1000000000)
            } else {
                y.push(item[three]);
            }

            c.push(item[four]);
        });

        var elmnt = document.getElementById("cladetestP").clientWidth - 60

        var trace1 = {
            type: 'scatter',
            x: x,
            y: y,
            mode: 'markers',
            transforms: [{
                type: 'groupby',
                groups: c
            }],
            name: 'cladegraph',
            marker: {
                line: {width: 1,},
                symbol: 'circle',
                size: 5
            }
        }

        var datas = [trace1];


        var layout = {
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
        Plotly.react('cladetestP', datas, layout, config);
        }
    )

}

cladegrapherproj()
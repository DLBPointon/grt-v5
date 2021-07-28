function clade_box_proj() {
    var one = document.getElementById('CladeSelectorP');
    prefix = one.options[one.selectedIndex].value

    var three = document.getElementById('CladeGraphSelector2YP');
    three = three.options[three.selectedIndex].value

    var four = document.getElementById('CladeGraphSelector2CP');
    four = four.options[four.selectedIndex].value

    var url = 'http://172.27.21.37:3000/gritdata?order=family_name.asc&project_code=in.('
        + prefix + ')&select=,family_name,prefix_dl,' + three

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var y = [];
        var c = [];


        data.forEach((item) => {
            if (three.includes('length_after')) {
                y.push((item['manual_interventions']/item['length_after'])*1000000000)
            } else {
                y.push(item[three]);
            }

            c.push(item[four]);
        });

        var trace1 = {
            type: 'box',
            x: c,
            y: y,
            transforms: [{
                type: 'groupby',
                groups: c
            }]
        };

        var datas = [trace1];

        var elmntr1 = document.getElementById("cladeboxP").clientWidth - 30


        var layout = {
            width: elmntr1,
            autosize: true,
            margin: {
                l: 50,
                r: 50,
                t: 0
            },
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('cladeboxP', datas, layout, config)
    })

}

clade_box_proj()
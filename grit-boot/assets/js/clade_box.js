function clade_box() {
    var one = document.getElementById('CladeSelector');
    prefix = one.options[one.selectedIndex].value

    var three = document.getElementById('CladeGraphSelector2Y');
    three = three.options[three.selectedIndex].value

    var four = document.getElementById('CladeGraphSelector2C');
    four = four.options[four.selectedIndex].value

    var url = 'https://grit-realtime-api.tol.sanger.ac.ukgritdata?order=family_name.asc&prefix_sl=in.('
        + prefix + ')&select=family_name,prefix_dl,' + three

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

        var elmntr1 = document.getElementById("cladebox").clientWidth - 30


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
        Plotly.react('cladebox', datas, layout, config)
    })

}

clade_box()
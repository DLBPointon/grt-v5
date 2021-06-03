TESTER = document.getElementById('rightgraph1');

function makegraph_box() {

    var two = document.getElementById('RightGraphSelector1Y');
    two = two.options[two.selectedIndex].value
    var three = document.getElementById('RightGraphSelector1C');
    three = three.options[three.selectedIndex].value

    var url = 'http://localhost:3000/gritdata?select='+two+','+three

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var y = [];
        var c = [];


        data.forEach((item) => {
            y.push(item[two]);
            c.push(item[three]);
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

        var layout = {
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('rightgraph1', datas, layout, config)
    })
}

makegraph_box()
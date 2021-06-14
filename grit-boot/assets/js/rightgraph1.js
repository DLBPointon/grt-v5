TESTER = document.getElementById('rightgraph1');

function makegraph_box() {

    var two = document.getElementById('RightGraphSelector1Y');
    two = two.options[two.selectedIndex].value
    var three = document.getElementById('RightGraphSelector1C');
    three = three.options[three.selectedIndex].value

    var url = 'http://172.27.21.37:3000/gritdata?select='+two+','+three

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

        var elmntr1 = document.getElementById("rightgraph1").clientWidth - 30


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
        Plotly.react('rightgraph1', datas, layout, config)
    })
}

makegraph_box()
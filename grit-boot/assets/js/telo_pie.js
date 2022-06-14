function telo_pie() {

    var one = document.getElementById('telo_selector1');
    one = one.options[one.selectedIndex].value

    var url = 'http://grit-realtime.tol.sanger.ac.uk:8001/gritdata?select='+one

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var c = [];
        var count = {};

        data.forEach((item) => {
            c.push(item[one]);
        });

        for (var i = 0; i < c.length; ++i) {
            if (!count[c[i]])
                count[c[i]] = 0;
            ++count[c[i]];
        }

        var datas = [{
        values: Object.values(count),
        labels: Object.keys(count),
        type:'pie'
        }];

        var elmntr2 = document.getElementById("telo_right1").clientWidth - 30

        var layout = {
            width: elmntr2,
            autosize: true,
            margin: {
                l: 50,
                r: 50,
                t: 0
            },
        };

        var config = {responsive: true, displayModeBar: true}
        Plotly.react('telo_right1', datas, layout, config);
    })
}


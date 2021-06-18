function cladetabler() {

    var one = document.getElementById('CladeSelector');
    prefix = one.options[one.selectedIndex].value

    var url = 'http://172.27.21.37:3000/gritdata?order=family_name.asc&prefix_sl=in.('+ prefix +')&select=sample_id,family_name,manual_interventions,chromosome_assignments'

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var one = [];
        var two = [];
        var three = [];
        var four = [];

        data.forEach((item) => {
            if (error) return console.warn(error);
            one.push(item['sample_id']);
            two.push(item['family_name'])
            three.push(item['manual_interventions'])
            four.push(item['chromosome_assignments'])
        });

        var all_values = [one, two, three, four]

        var datas = [{
                type: 'table',
                header:
                    {
                        values: [["Sample ID"], ['Family'],
                            ['Manual Interventions'], ['Chromosome Count Outcome']],
                        align: "center"
                    },
                cells:
                    {
                        values: all_values,
                        align: "center"
                    }
            }];

        Plotly.react('clade', datas)
    })
}

cladetabler()
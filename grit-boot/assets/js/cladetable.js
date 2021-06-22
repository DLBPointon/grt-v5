function cladetabler() {

    var one = document.getElementById('CladeSelector');
    prefix = one.options[one.selectedIndex].value

    var url = 'http://172.27.21.37:3000/gritdata?order=family_name.asc&prefix_sl=in.('+ prefix +')' +
        '&select=sample_id,family_name,manual_interventions,chromosome_assignments,chromosome_naming,' +
        'expected_sex,observed_sex,curated_allosomes,curated_autosomes'

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var one = [];
        var two = [];
        var three = [];
        var five = [];
        var six = [];
        var seven = [];
        var eight = [];
        var nine = [];

        data.forEach((item) => {
            if (error) return console.warn(error);
            one.push(item['sample_id']);
            two.push(item['family_name']);
            three.push(item['manual_interventions']);
            five.push(item['chromosome_naming']);
            six.push(item['expected_sex']);
            seven.push(item['observed_sex']);
            eight.push(item['curated_allosomes']);
            nine.push(item['curated_autosomes'])
        });

        var all_values = [one, two, three, five, six, seven, eight, nine]

        var datas = [{
                type: 'table',
                header:
                    {
                        values: [["Sample ID"], ['Family'],
                            ['Manual Interventions'], ['Curation Outcome'],
                            ['Expected Sex'], ['Observed Sex'],
                            ['Curated Allosomes'], ['Curated Autosomes']],
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
function tabler() {

    var url = 'http://172.27.21.37:3000/gritdata?select=sample_id,prefix_sl,family_name,length_change,scaff_n50_change,scaff_count_change,manual_interventions,date_in_ymd'

    d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        var one = [];
        var two = [];
        var three = [];
        var four = [];
        var five = [];
        var six = [];
        var seven1 = [];
        var eight1 = [];

        data.forEach((item) => {
            if (error) return console.warn(error);
            one.push(item['sample_id']);
            two.push(item['prefix_sl'])
            three.push(item['family_name'])
            four.push(item['length_change'])
            five.push(item['scaff_n50_change'])
            six.push(item['scaff_count_change'])
            seven1.push(item['manual_interventions'])
            eight1.push(item['date_in_ymd'])
        });

        var all_values = [one, two,
            three, four,
            five, six,
            seven1, eight1]

        var datas = [{
                type: 'table',
                header:
                    {
                        values: [["sample_id"], ['prefix_sl'],
                            ['family_name'], ['length_change'],
                            ['scaff_n50_change'], ['scaff_count_change'],
                            ['manual_interventions'], ['date_in_ymd']],
                        align: "center"
                    },
                cells:
                    {
                        values: all_values,
                        align: "center"
                    }
            }];

        Plotly.react('tableLoc', datas)
    })
}
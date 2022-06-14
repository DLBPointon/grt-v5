function tabulatortableOri() {

    var tableData = 'http://grit-realtime.tol.sanger.ac.uk:8001/gritdata?order=family_name.asc&' +
        'select=sample_id,prefix_dl,family_name,manual_interventions,' +
        'chromosome_assignments,chromosome_naming,expected_sex,observed_sex,' +
        'curated_allosomes,curated_autosomes,project_code'

    var avgauto = function(values, data, calcparams){
        var calc = 0
        var notodivide = 0
        values.forEach(function(value){
            if (value > 0) {
                calc = calc + value;
                notodivide = notodivide + 1;
                console.log(calc);
                console.log(notodivide)
            }
        });
        return calc / notodivide
    }

    var table = new Tabulator("#clade", {
        ajaxURL: tableData,
        pagination: 'local',
        paginationSize: 20,
        movableColumns: true,
        layout:'fitColumns',
        groupBy:"prefix_dl",
        groupClosedShowCalcs:true,
        columns: [
            {
                title: "Sample ID",
                field: "sample_id",
                headerFilter: 'input',
                topCount: 'count'
            },
            {
                title: "Prefix_DL",
                field: "prefix_dl",
                headerFilter: 'input'
            },
            {
                title: "Project",
                field: "project_code",
                headerFilter: 'input'
            },
            {
                title: "Family Name",
                field: "family_name",
                headerFilter: 'input'
            },
            {
                title: "Manual Interventions",
                field: "manual_interventions",
                topCalc: 'avg'
            },
            {
                title: "Chr Naming",
                field: "chromosome_naming",
            },
            {
                title: "E-Sex",
                field: "expected_sex",
            },
            {
                title: "O-Sex",
                field: "observed_sex",
            },
            {
                title: "C-Allosomes",
                field: "curated_allosomes",
                topCalc: 'count'
            },
            {
                title: "C-Autosomes",
                field: "curated_autosomes",
                topCalc:avgauto
            },
        ],
    });
}

tabulatortableOri()
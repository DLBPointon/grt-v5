function tabulatortable() {

    var one = document.getElementById('CladeSelector');
    prefix = one.options[one.selectedIndex].value

    var tableData = 'http://172.27.21.37:3000/gritdata?order=family_name.asc&' +
        'select=sample_id,prefix_dl,family_name,manual_interventions,' +
        'chromosome_assignments,chromosome_naming,expected_sex,observed_sex,' +
        'curated_allosomes,curated_autosomes'

    var table = new Tabulator("#clade", {
        ajaxURL: tableData,
        pagination: 'local',
        paginationSize: 20,
        movableColumns: true,
        layout:'fitColumns',
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
                topCalc:'sum'
            },
        ],
    });
}
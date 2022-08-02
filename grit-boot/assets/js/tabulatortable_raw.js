function tabulatortableraw() {

    d3.json('https://grit-realtime-api.tol.sanger.ac.uk/gritdata?', function (error, data) {
        var table = new Tabulator("#tableLoc", {
            data: data,
            pagination: 'local',
            paginationSize: 40,
            movableColumns: true,
            columns: [
                {
                    title: "Sample ID",
                    field: "sample_id",
                    headerFilter: 'input',
                    //topCount: 'count',
                    frozen: true
                },
                {
                    title: "Project ID",
                    field: "project_code",
                    headerFilter: 'input'
                },
                {
                    title: "Latin Name",
                    field: "latin",
                },
                {
                    title: "Prefix_DL",
                    field: "prefix_dl",
                    headerFilter: 'input'
                },
                {
                    title: "Prefix_FN",
                    field: "prefix_fn",
                    headerFilter: 'input'
                },
                {
                    title: "Family Name",
                    field: "family_name",
                    headerFilter: 'input'
                },
                {
                    title: "Length Before",
                    field: "length_before",
                    topCalc:'sum'
                },
                {
                    title: "Length After",
                    field: "length_after",
                    topCalc:'sum'
                },
                {
                    title: "Length Change",
                    field: "length_change",
                },
                {
                    title: "Scaff No. Before",
                    field: "scaff_count_before",
                    topCalc:'sum'
                },
                {
                    title: "Scaff No. After",
                    field: "scaff_count_after",
                    topCalc:'sum'
                },
                {
                    title: "Scaff No. Change",
                    field: "scaff_count_change",
                },
                {
                    title: "Scaff N50 Before",
                    field: "scaff_n50_before",
                    topCalc:'sum'
                },
                {
                    title: "Scaff N50 After",
                    field: "scaff_n50_after",
                    topCalc:'sum'
                },
                {
                    title: "Scaff N50 Change",
                    field: "scaff_n50_change",
                },
                {
                    title: "Manual Interventions",
                    field: "manual_interventions",
                    topCalc: 'avg'
                },
                {
                    title: "Seq to Chr",
                    field: "assignment",
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
                }
            ],
        });
    });
    
}
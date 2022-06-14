function tabulatortabletelo() {

    var tata = 'https://grit-realtime-api.tol.sanger.ac.ukgritdata?'

    var table = new Tabulator("#teloTableLoc", {
        ajaxURL: tata,
        pagination: 'local',
        paginationSize: 40,
        movableColumns: true,
        virtualDomHoz:true,
        columns: [
            {
                title: "Sample ID",
                field: "sample_id",
                headerFilter: 'input',
                topCount: 'count',
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
                title: "Telomere Motif",
                field: "telo_motif",
                headerFilter: 'input'
            },
            {
                title: "Telomere Length",
                field: "telo_length",
                headerFilter: 'input'
            }
        ],
    });
}
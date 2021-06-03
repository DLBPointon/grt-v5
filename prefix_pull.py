import openpyxl

xlsx_file = 'prefix_assignment_kj2.xlsx'

opened = openpyxl.load_workbook(xlsx_file)

sheet = opened.active

dl_dict = {}

for i, row in enumerate(sheet.iter_rows(values_only=True)):
    if row[2] is None:
        rown = (str(row[0]), '')
    else:
        rown = (str(row[0]), str(row[2]))
    dl_dict[''.join(rown)] = row[4]

print(dl_dict)
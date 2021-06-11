
this_run=$(date +'%F:%R')

/home/grit/conda_env/python /home/grit/grt-v5/scripts/jira_2_db_update.py > $(this_run).log

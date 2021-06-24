cd /home/grit/grt-v5/scripts/;
rm /home/grit/grt-v5/grit-boot/output/*;
/home/grit/miniconda3/envs/grt-env/bin/python /home/grit/grt-v5/scripts/jira_connect.py;
# This needs to be updated to using dot loader
# /home/grit/miniconda3/envs/grt-env/bin/python /home/grit/grt-v5/scripts/jira_2_db_update.py > logs/$(date +'%F:%R').log
cd /home/grit/grt-v5/;
docker-compose down --volumes;
git pull;
docker-compose up &


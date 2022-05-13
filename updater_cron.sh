rm /home/grit/grt-v5/grit-boot/output/jira_dump.tsv;
rm /home/grit/grt-v5/grit-boot/output/jira_dump.tsv.sorted;
cd /home/grit/grt-v5/scripts/ &&
/home/grit/miniconda3/envs/grt-env/bin/python3 /home/grit/grt-v5/scripts/jira_connect.py &&
sleep 10 &&
cd /home/grit/grt-v5/ &&
/usr/local/bin/docker-compose down --volumes &&
sleep 10 &&
git pull origin production-sos &&
sleep 5 &&
/usr/local/bin/docker-compose up &

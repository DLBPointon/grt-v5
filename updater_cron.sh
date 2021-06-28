cd /home/grit/grt-v5/scripts/;
rm /home/grit/grt-v5/grit-boot/output/jira_dump.tsv;
rm /home/grit/grt-v5/grit-boot/output/jira_dump.tsv.sorted;
/home/grit/miniconda3/envs/grt-env/bin/python3 /home/grit/grt-v5/scripts/jira_connect.py;
sleep 5;
cd /home/grit/grt-v5/;
/usr/local/bin/docker-compose down --volumes;
sleep 5;
git pull;
sleep 5;
/usr/local/bin/docker-compose up &

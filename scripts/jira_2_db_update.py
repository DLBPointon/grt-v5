"""
Intended to be run on cron job
Python 3 script to retrieve latest date in db and use that as the minimum date to retrieve data from jira.
"""
from jira_connect import *
import requests
import sys
import re
from jira import JIRA
from datetime import date
from dotenv import load_dotenv

# Global variable for db url
URL = 'http://172.27.21.37:3000/gritdata'


def dotloader():
    load_dotenv()
    jira_user = os.getenv('JIRA_USER')
    jira_pass = os.getenv('JIRA_PASS')
    return jira_user, jira_pass


def get_db_data():
    sample_id_list = []

    url = URL + '?limit=1&order=date_in_ymd.desc&select=date_in_ymd'
    db_req = requests.get(url)
    print(f'Connection Status Code: {db_req.status_code}')

    most_recent = db_req.json()[0]
    latest_date = most_recent.get('date_in_ymd')
    if latest_date == str(date.today()):
        print('Already up to date')
        sys.exit()
    else:
        print(f'DB could do with an update, last ticket date is: {latest_date}')

    for i in db_req.json():
        db_name = i.get('jira_key')
        if db_name in sample_id_list:
            pass
        else:
            sample_id_list.append(db_name)

    return latest_date, sample_id_list


def auth_jira(username, password):
    jira = "https://grit-jira.sanger.ac.uk"
    auth_jira = JIRA(jira, basic_auth=(username, password))
    return auth_jira


def get_jira_data(auth, sample_id_list):
    record = []
    projects = auth.search_issues('project = "Assembly curation" and status = Done OR '
                                  'project = "Assembly curation" and status = Submitted OR '
                                  'project = "Assembly curation" and status = "In Submission OR '
                                  'project = "Assembly curation" and status = "Post Processing++" '
                                  'ORDER BY key ASC',
                                  maxResults=10000)

    for i in projects:
        issue = auth.issue(f'{i}')
        if str(issue) in sample_id_list:
            print('Already in DB')
            pass
        else:
            print('Not in DB - appending for update')
            project_type = issue.fields.issuetype
            summary = issue.fields.summary
            summary_search = re.search(r'(not being curated)', summary)
            if summary_search:
                nbc = summary_search.group(1)
                if nbc == '(not being curated)':
                    pass
            else:
                if issue.fields.customfield_10226 is None:
                    pass
                else:
                    #  --- Block requires no parsing
                    project_type = issue.fields.issuetype
                    lat_name = issue.fields.customfield_10215
                    #  -- End of Block

                    name_acc, lat_name, family_data, length_before, length_after, length_change_per, n50_before, \
                    n50_after, n50_change_per, scaff_count_before, scaff_count_after, scaff_count_per, chr_ass, \
                    ass_percent, ymd_date, interventions = record_maker(issue)

                    prefix, prefix_v, prefix_label = reg_make_prefix(name_acc)

                    record = [name_acc, lat_name, prefix, prefix_v, prefix_label, family_data, issue, project_type,
                              length_before, length_after, length_change_per, n50_before, n50_after, n50_change_per,
                              scaff_count_before, scaff_count_after, scaff_count_per, chr_ass, ass_percent, ymd_date,
                              interventions]

    return record


def update_psql(record):
    """
    Updates the psql
    :param record:
    :return:
    """
    post_url = URL
    post_object = '{' + \
                  f'"sample_id": {record[0]},' + \
                  f'"latin": {record[1]},' + \
                  f'"prefix_sl": {record[2]},' + \
                  f'"prefix_dl": {record[3]},' + \
                  f'"prefix_fn": {record[4]},' + \
                  f'"family_name": {record[5]},' + \
                  f'"jira_key": {record[6]},' + \
                  f'"project_type": {record[7]},' + \
                  f'"length_before": {record[8]},' + \
                  f'"length_after": {record[9]},' + \
                  f'"length_change": {record[10]},' + \
                  f'"scaff_n50_before": {record[11]},' + \
                  f'"scaff_n50_after": {record[12]},' + \
                  f'"scaff_n50_change": {record[13]},' + \
                  f'"scaff_count_before": {record[14]},' + \
                  f'"scaff_count_after": {record[15]},' + \
                  f'"scaff_count_change": {record[16]},' + \
                  f'"chromosome_assignments": {record[17]},' + \
                  f'"assignment": {record[18]},' + \
                  f'"date_in_ymd": {record[19]},' + \
                  f'"manual_interventions": {record[20]}' + \
                  '}'
    post_req = requests.post(post_url, data=post_object)


def main():
    latest_date, sample_id_list = get_db_data()

    username, password = dotloader()

    auth = auth_jira(username, password)

    record = get_jira_data(auth, sample_id_list)

    update_psql(record)


if __name__ == "__main__":
    main()

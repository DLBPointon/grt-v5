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

# Global variable for db url
URL = 'http://localhost:3000/gritdata'


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


def auth_jira():
    jira = "https://grit-jira.sanger.ac.uk"
    auth_jira = JIRA(jira, basic_auth=(sys.argv[1], sys.argv[2]))
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
    post_object = '{' \
                  f'"sample_id": {record["name_acc"]},' \
                  f'"latin": {record["lat_name"]},' \
                  f'"prefix_sl": {record["prefix"]},' \
                  f'"prefix_dl": {record["prefix_v"]},' \
                  f'"prefix_fn": {record["prefix_label"]},' \
                  f'"family_name": {record["family_data"]},' \
                  f'"jira_key": {record["issue"]},' \
                  f'"project_type": {record["project_type"]},' \
                  f'"length_before": {record["length_before"]},' \
                  f'"length_after": {record["length_after"]},' \
                  f'"length_change": {record["length_change"]},' \
                  f'"scaff_n50_before": {record["n50_before"]},' \
                  f'"scaff_n50_after": {record["n50_after"]},' \
                  f'"scaff_n50_change": {record["n50_change_per"]},' \
                  f'"scaff_count_before": {record["scaff_count_before"]},' \
                  f'"scaff_count_after": {record["scaff_count_after"]},' \
                  f'"scaff_count_change": {record["scaff_count_per"]},' \
                  f'"chromosome_assignments": {record["chr_ass"]},' \
                  f'"assignment": {record["ass_percent"]},' \
                  f'"date_in_ymd": {record["ymd_date"]},' \
                  f'"manual_interventions": {record["interventions"]}' \
                  '}'
    post_req = requests.post(post_url, data=post_object)


def main():
    latest_date, sample_id_list = get_db_data()

    auth = auth_jira()

    record = get_jira_data(auth, sample_id_list)

    update_psql(record)


if __name__ == "__main__":
    main()

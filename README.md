# Implementing real time surveillance of genome curation impact on assembly quality
By Damon-Lee B Pointon (dp24)

This project was originally released as grit-realtime, an RShiny app. However, due to organisational changes
it was decided that this project should be re-written in the java framework javascript and HTML
as well as in a modernised tripartite docker container system controlled by docker-compose.

grt-v5 is the initial step towards creating a dashboard for GRIT (Genome Reference Informatics Team)
and offer decentralised access to metrics related to genome curation.

## Containers:

grt-v5_server_1 : postgrest, a swagger api wrapper for PostgreSQL databases. It produces a usable API but with the one endpoint which is not ideal.

grt-v5_client_1 : The website it self, written via Bootstrap and HTML5.

grt-v5_db_1 : The PostgreSQL database, this will contain all of the information pulled from the attached scripts.

### Optional Container:

grt-v5_swagger_1 : A Swagger API UI.

### Notes:
The docker-compose.yaml volumes are currently hardcoded for my machine, these will need changing.

## Proposal:
Genome assembly curation has a significant impact on assembly quality,
and allows for the identification of opportunities for improvement within automated assembly generation.
Analysis of a multitude of assembly parameters is required, ideally in real time,
in order to document the impact and elucidate opportunities.
This is currently implemented by ad hoc extraction of the data from a Jira tracking database with a
perl script and subsequent graph generation in Excel,
a system that requires significant manual intervention. 

In order to streamline and further extend and adapt the process, I have produced
a system which uses Docker, Python (3.7) and Javascript to generate graphs in an
automated and consistent fashion.
Ultimately this results in the production of a dashboard/website that provides a real-time
report on curation impacts for specified data groups, within a specified time frame.

## Project Outline:
### Phase 1
#### Harvesting - 
Controlled by a python script, this will download all relevant
data from Jira as well as from family data from the ENA database.

In Python 3.7, this script accesses the Jira API and pulls data related to pre and post curation statistics as well as some taxonomic data.
It also performs some basic statistics just as percentage change in the pulled data.

This will only need to be used once in order to produce a "master" TSV file, used to later populate
the PostgreSQL database.

This utilises:

|Module | Reason | Implemented?|
|---|---|---|
|Argparse    | - for cli | [X] |
|csv         | - for tsv formatted writing| [X] |
|operator    | - used in sorting the tsv| [X] |
|regex (re)  | - for extensive regex use| [X] |
|maya        | - for string to datetime| [X] |
|datetime    | - for datetime to str conversion| [X] |
|jira        | - python-jira is a python api wrapper for Jira| [X] |
|logging     | - Used for logging information from script| [ ] |
| sys | - Used for safe exiting of the script | [X] |


## Phase 2 - Docker-compose
In order to adopt a more modern approach, it was decided to utilise docker.
This would remove the need for front-end to be the point of reading data, calculation and presentation to graphs
this is now mostly moved to the PostgresSQL database and the API.
This allows the PSQL database to handle the data, the API to allow access for specific requested data and therefore
leaving only the graph production for the website.
Graphs are produced purely in Plotly.js which has proven to be a very flexible framework.

## Phase 3 - Updating
This has been simplified and automated with a python3.7 script which uses the pre-existing database to
 return the most recent date in the database and use it as the minimum date in a query to Jira.
This will return a list of records (a python list of all required data).

## Usage

#### 1 - Git Clone

`git clone https://github.com/DLBPointon/grt-v5.git`
`cd grt-v5`

#### 2 - Download DB data
For testing there is a sample TSV in the output folder so this step can be skipped.

`python3 scripts/jira_connect.py {JIRA USER} {JIRA PASS} {SAVE}`

SAVE defaults to the output folder, as this is the folder to be used for docker later.
This is an option however in case colleagues want to run their own bespoke analysis on the data.

#### 3 - Docker-compose

At this point we can now compose the containers, much of this is automated via the docker-compose 
script as well as some sql scripts to initiate then fill the database. This can be started via the simple command:

`docker-compose up`

Spinning down the containers occurs with:
`docker-compose down --volumes`

#### 4 - Updating the db

Due to the requirement of this project to be pulling jira_db data in realtime
(realistically the db will only NEED to be updated once per day due to 
the number of tickets moving through the GRIT pipeline). 
I believe it is beneficial to have the updating script run as a crontab job.

`crontab -e`

`8 * * * 0,1,2,3,4 {PYTHON LIB} jira_2_db_update.py {JIRA_USER} {JIRA_PASS}`

This will directly update the psql database via calls to the JIRA_API and then the grt-API.

## TO-DO List
Updated 28/05/2021

|Job | Done? |
| :---: | :---: |
| Website Security | [ ]|
| Docker Secrets - multiple files to compose | [ ]|
| ^- psql secrets | [ ]|
| ^- psqlREST secrets | [ ]|
| ^- nginx secrets | [ ]|
| chr assignment still needs parsing |[ ]|
| Graph borders need cleaning and pushing inside of the border | [ ]|
| Docker-compose volumes need making generic | [ ]|

# Local project installation and setup

Run these commands to set up and run the project locally for the first time.

```bash
git clone https://github.com/CodeforHawaii/HIERR.git
cd HIERR
cp -f .env.example .env # Note: You may have to update the .env file with your specific secret values.
# Use docker to set up SQL and SMTP servers locally https://www.docker.com/
# See "SMTP Cloud Server Setup" and "Prisma SQL Server Migration" sections if
# wanting to use a different set up.
UID_GID="$(id -u):$(id -g)" USER_HOME=$HOME docker compose up -d
```

Next, create database table `HIERR`. Enter the bash shell in the docker image:

```bash
docker exec -it hierr-sql-1 "bash"
```

Enter the SQL Server CLI tool

```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourStrong@Passw0rd>"
```

Create a new database and check that it was created

```bash
CREATE DATABASE HIERR;
SELECT Name from sys.databases;
GO
exit
```

Then, you may exit:

```bash
exit
```

Prepare the HIERR container:

```bash
# instal OS dependencies in HIERR container
docker exec -u 0:0 -it hierr-node-1 bash -c "apt update && apt install -y curl gpg && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg && curl https://packages.microsoft.com/config/debian/12/prod.list | tee /etc/apt/sources.list.d/mssql-release.list && apt update && ACCEPT_EULA=Y apt install -y python3 python3-dev python3.11-venv gcc g++ libodbc2 msodbcsql18"
# open hierr container and install Node.js dependencies
docker exec -it hierr-node-1 bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
exit
docker exec -it hierr-node-1 bash
cd /HIERR
nvm install
nvm use
npm install
```

Finally, run the DB migration scripts and run the dev server:

```bash
# still inside the HIERR container...
npx prisma migrate dev
npx prisma db push

# Load demographic survey questions
python3 -mvenv venv
source venv/bin/activate
cd prisma/dataimport
pip install -r requirements.txt
DB_SERVER='hierr-sql-1' DB_NAME='HIERR' USERID='SA' PWD='<YourStrong@Passw0rd>' python3 ./dataimport.py

# Run dev server on http://localhost:3000
npm run dev
```

You can now access HIERR from http://localhost:3000

The SMTP email web interface is available at http://localhost:3001.

# Update Prisma

Run these commands for specific Prisma tasks.

1. Update schema.prisma with your model

Validate your prisma model

```
npx prisma validate
```

Format the prisma file

```
npx prisma format
```

Generate Prisma Client

```
npx prisma generate
```

Update the database

```
npx prisma db push
```

# SMTP Cloud Server Setup

Follow these directions for setting up an SMTP server in the cloud, as opposed to setting one up on your local machine.

- Gmail
  - Follow the steps at this YouTube video for setting up an SMTP gmail account
    - [Youtube](https://www.youtube.com/watch?v=1YXVdyVuFGA)
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
    - EMAIL_SERVER="smtps://{username}:{password}@{smtpserver}:{port}"
    - EMAIL_FROM={Email sending the verification link}
- [Brevo (formerly Sendinblue)](https://app.brevo.com)
  - Create an account
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
    - EMAIL_SERVER=smtp://LOGIN:SMTP_KEY_VALUE@smtp-relay.brevo.com:587
      - Replace LOGIN and SMTP_KEY_VALUE from [SMTP Credentials](https://app.brevo.com/settings/keys/smtp)
    - EMAIL_FROM={Email sending the verification link}
  - Debugging [Log](https://app-smtp.brevo.com/log)

# Prisma SQL Server Migration

Follow these directions for easier database editing.

- Windows
  - Install SQL Server
    - Docker
      - [Docker Microsoft SQL Server Images Download](https://hub.docker.com/_/microsoft-mssql-server)
        - docker pull mcr.microsoft.com/mssql/server:2017-latest
      - Start SQL Server (2017)
        - docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourStrong@Passw0rd>" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest
    - Microsoft
      - [Miscrosoft SQL Server Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
      - Enable SQL Server TCP/IP
        - Open SQL Server Configuration Manager. (Search for "SQL Server Configuration Manager" in the Start Menu, or open the Start Menu and type "SQL Server Configuration Manager".)
        - In the left-hand panel, click SQL Server Network Configuration > Protocols for MSSQLSERVER
        - Right-click TCP/IP and choose Enable.
  - [Download Microsoft SQL Server Management Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
  - Create a database named HIERR
  - In the .env file update the DATABASE_URL variable
  - SQL Server 2019 (local install):
    - sqlserver://localhost:1433;initial catalog=HIERR;integratedSecurity=true;trustServerCertificate=true;
  - SQL Server 2017 (docker):
    - sqlserver://localhost:1433;database=HIERR;user=sa;password=<YourStrong@Passw0rd>;encrypt=DANGER_PLAINTEXT;
    - Note: Connection string uses the default user and password from docker. Also the DANGER_PLAINTEXT is used because of an issue with TLS.
  - Other OS systems:
    - sqlserver://HOST:PORT;database=HIERR;user=sa;password=<YourStrong@Passw0rd>;encrypt=true
    - Note: Be sure to change USER and PASSWORD to your system's requirements
  - Docs: https://www.prisma.io/docs/concepts/database-connectors/sql-server
- Run the following prisma commands
  - `npx prisma migrate dev`
  - `npx prisma db push`
- Run the application and confirm it works

# Prisma SQLite

## Why use SQLite?

SQLite is a light-weight alternative to Microsoft SQL Server that provides an easier setup solution for those running the project locally.

## Getting started with SQLite

Firstly, check if your machine already has SQLite. Many operating systems today come with SQLite pre-installed, but to verify run the following command:

```bash
$sqlite3
```

If already installed, a message similar to the following will display:

```bash
SQLite version 3.37.2 2022-01-06 13:25:41
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.
sqlite>
```

If not already installed, continue below:

Windows Users

- Checkout [SQLiteTutorial.net](https://www.sqlitetutorial.net/download-install-sqlite/) for a quick and simple Windows setup.

Mac and Linux Users

1. Go to the [SQLite download page](https://www.sqlite.org/download.html) and download sqlite-autoconf-\*.tar.gz from the **Source Code** section.
2. Run the following commands:

```bash
$tar xvfz sqlite-autoconf-3071502.tar.gz
$cd sqlite-autoconf-3071502
$./configure --prefix=/usr/local
$make
$make install
```

Configuration

- Update the schema.prisma file to use the following provider

`provider = "sqlite"`

- Update the env file to specify the database file

`DATABASE_URL="file:./db.sqlite"`

- Run the following command to update the database

```bash
npx prisma db push
```

> Note: The demographic questions will not populate because they are hard-coded in the SQL migrations.

# Add Google Analytics Environment variable

- In the .env file add

```
NEXT_PUBLIC_GA_ID = {MyGoogleAnalyticsID}
```

- This will enable google analytics on the site

# Working with prisma

When the data model changes, run the following to update your local database with the latest migrations

```
npx prisma migrate dev
```

Docs: https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/team-development

# Adding Pol.is surveys to the application

In the .env file, add the following environment variable with the survey ids comma separated.

Read the dataimport readme and follow it's instructions.

# Exporting data from Pol.is survey data

Visit http://{hierr server}/polisconvert. You must be an administrator to be able to export data. Upload a participant-votes.csv file when prompted by the form. A CSV with census tract and zip code data from users (joined by xid) will be returned.

# Preparing a new release

1. Open [the Github page to create a new release](https://github.com/CodeforHawaii/HIERR/releases/new).
1. Enter a release title with the date (yyyy-mm-dd) and basic description of changes.
1. Click the "Choose a tag" popup, enter the current date (yyyy-mm-dd) as a tag, and click "Create new tag: yyyy-mm-dd on publish".
1. Click the "Publish release" at the bottom of the page.
1. On the following page, copy the link for "Source code (zip)"
1. Paste that link into the installation instructions [Google Document in the Node.js installation instructions](https://docs.google.com/document/d/1evPMUb8FKiK-BrtP1ILxUfEr9OE8Vwxyew7zUsragCw/edit#heading=h.c5qw6vbumyf6).

# Running HIERR as a Windows Service

1. Download [Non-Sucking Service Manager](https://nssm.cc/download)
2. Unzip the downloaded folder
3. Add the location of the x64 executable to your PATH
   - [Add directory to path tutorial](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)
4. Install the service by running the following in powershell

```
nssm install HIERR
```

5. Set up the service details:
   - Path: Point this to your npm executable, usually located at C:\Program Files\nodejs\npm.cmd (adjust if your installation path is different).
   - Startup directory: Set this to the directory of the HIERR application where the package.json is located.
   - Arguments: run start.
   - Service name: Enter a name for your service, HIERR.
6. Dependencies: Configure the service to start after your database service.
   - Go to the Dependencies tab.
   - Enter the name of your database service (e.g., MSSQLSERVER).
7. Redirect output (optional): If you want to log the output:
   - Go to the I/O tab.
   - Set the output (stdout) and error (stderr) logs to files on your disk, like C:\logs\hierr-out.log and C:\logs\hierr-err.log.
8. Install the service: Click the "Install service" button.
9. Configure SQL Server
   - In SSMS, go to the Security folder under your server instance.
   - Right-click on Logins and select New Login….
   - Enter NT AUTHORITY\SYSTEM in the login name.
   - If there's an error saying the user already exists, continue to the next step
   - In the Default database dropdown, select HIERR.
   - Expand Security > Users
   - Right click users and select New User
   - User name: NT AUTHORITY\SYSTEM
   - Login name: NT AUTHORITY\SYSTEM
   - Default schema: dbo
   - Select Save
   - Right click the new user and select Properties
   - Go to Membership and select: db_datareader, db_datawriter
10. Run `nssm start HIERR` in powershell as Administrator

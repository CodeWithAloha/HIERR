# Local project installation and setup
```
git clone https://github.com/CodeforHawaii/HIERR.git
cd HIERR
npm install
touch .env
```
* Add the following to the .env:
     1. DATABASE_URL="file:./db.sqlite"
     2. NEXTAUTH_URL="http://localhost:3000"
     3. EMAIL_SERVER={your email server}
     4. EMAIL_FROM={the email to send the verification link}
```
npx prisma db push
npm run dev
```

# Update Prisma
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


# SMTP Server Setup
- Gmail
  - Follow the steps at this YouTube video for setting up an SMTP gmail account
    - [Youtube](https://www.youtube.com/watch?v=1YXVdyVuFGA)
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
    - EMAIL_SERVER="smtps://{username}:{password}@{smtpserver}:{port}"
    - EMAIL_FROM={Email sending the verification link}
- [Sendinblue](https://app.sendinblue.com)
  - Create an account
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
    - EMAIL_SERVER=smtp://LOGIN:SMTP_KEY_VALUE@smtp-relay.sendinblue.com:587
      - [SMTP Credentials](https://app.sendinblue.com/settings/keys/smtp)
    - EMAIL_FROM={Email sending the verification link}
  - Debugging [Log](https://app-smtp.sendinblue.com/log)

# Prisma SQL Server Migration
- Windows
  - Install SQL Server
    - Docker
      - [Docker Microsoft SQL Server Images Download](https://hub.docker.com/_/microsoft-mssql-server)
        - docker pull mcr.microsoft.com/mssql/server:2017-latest
      - Start SQL Server (2017)
        - docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest
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
     - sqlserver://localhost:1433;database=HIERR;user=sa;password=yourStrong(!)Password;encrypt=DANGER_PLAINTEXT;
     - Note: Connection string uses the default user and password from docker. Also the DANGER_PLAINTEXT is used because of an issue with TLS.
   - Other OS systems:
     - sqlserver://HOST:PORT;database=HIERR;user=USER;password=PASSWORD;encrypt=true
     - Note: Be sure to change USER and PASSWORD to your system's requirements
   - Docs: https://www.prisma.io/docs/concepts/database-connectors/sql-server
- Run the following prisma commands
  - ```npx prisma migrate dev```
  - ```npx prisma db push```
- Run the application and confirm it works

# Working with prisma
When the data model changes, run the following to update your local database with the latest migrations

```
npx prisma migrate dev
```

Docs: https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/team-development


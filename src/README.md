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
1. Follow the steps at this YouTube video for setting up an SMTP gmail account
   1. https://www.youtube.com/watch?v=1YXVdyVuFGA
- Gmail
  - Follow the steps at this YouTube video for setting up an SMTP gmail account
    - https://www.youtube.com/watch?v=1YXVdyVuFGA
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
- [Sendinblue](https://app.sendinblue.com)
  - Create an account
  - Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
    - EMAIL_SERVER
      - smtp://LOGIN:SMTP_KEY_VALUE@smtp-relay.sendinblue.com:587
      - [SMTP Credentials](https://app.sendinblue.com/settings/keys/smtp)
  - [Log](https://app-smtp.sendinblue.com/log)
   1. EMAIL_SERVER="smtps://{username}:{password}@{smtpserver}:{port}"
   2. EMAIL_FROM={Email sending the verification link} 

# Prisma SQL Server Migration
1. Download Microsoft SQL Server Management Studio
2. Create a database named HIERR
3. In the .env file update the DATABASE_URL variable
   1. If on windows:
      1. sqlserver://localhost:1433;initial catalog=HIERR;integratedSecurity=true;trustServerCertificate=true;
   2. Other OS systems:
      1. sqlserver://HOST:PORT;database=HIERR;user=USER;password=PASSWORD;encrypt=true
      2. Note: Be sure to change USER and PASSWORD to your system's requirements
   3. Docs: https://www.prisma.io/docs/concepts/database-connectors/sql-server
4. Enable SQL Server TCP/IP
   1. Open SQL Server Configuration Manager. (Search for "SQL Server Configuration Manager" in the Start Menu, or open the Start Menu and type "SQL Server Configuration Manager".)
   2. In the left-hand panel, click SQL Server Network Configuration > Protocols for MSSQLSERVER
   3. Right-click TCP/IP and choose Enable.
   4. Docs: https://www.prisma.io/docs/concepts/database-connectors/sql-server/sql-server-local
5. Run the following prisma commands
   1. ```npx prisma migrate dev```
   2. ```npx prisma db push```
6. Run the application and confirm it works

# Working with prisma
When the data model changes, run the following to update your local database with the latest migrations

```
npx prisma migrate dev
```

Docs: https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/team-development


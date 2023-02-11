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
2. Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
   1. EMAIL_SERVER="smtps://{username}:{password}@{smtpserver}:{port}"
   2. EMAIL_FROM={Email sending the verification link} 

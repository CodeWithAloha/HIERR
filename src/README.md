# Local project installation and setup
1. git clone https://github.com/CodeforHawaii/HIERR.git
2. cd HIERR
3. npm install
4. touch .env
5. Add the following:
     1. DATABASE_URL="file:./db.sqlite"
     2. NEXTAUTH_URL="http://localhost:3000"
     3. EMAIL_SERVER={your email server}
     4. EMAIL_FROM={the email to send the verification link}
6. npx prisma db push
7. npm run dev
# Update Prisma
1. Update schema.prisma with your model
2. npx prisma validate
3. npx prisma format
4. npx prisma generate
5. npx prisma db push


# SMTP Server Setup
1. Follow the steps at this YouTube video for setting up an SMTP gmail account
   1. https://www.youtube.com/watch?v=1YXVdyVuFGA
2. Fill in the .env variables for EMAIL_SERVER and EMAIL_FROM
   1. EMAIL_SERVER="smtps://{username}:{password}@{smtpserver}:{port}"
   2. EMAIL_FROM={Email sending the verification link} 

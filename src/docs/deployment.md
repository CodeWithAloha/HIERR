# HIERR Application Assumptions
1. Windows Server 2022

> Some additional components may need to be installed if this is not the version of Windows used

# HIERR Application Download link
You will be prompted to download this file in the instructions below.

[Releases · CodeWithAloha/HIERR · GitHub](https://github.com/CodeWithAloha/HIERR/releases)

# Update Instructions
1. Download the HIERR application package from the link above.
2. Expand the zip file to a new directory (do not overwrite the existing HIERR application directory).
3. Open PowerShell and run the following commands (open a new PowerShell window if one running the HIERR application is already open)
     1. `cd <new expanded HIERR directory>`
     1. `dir`
         * Make sure that you see a README.md file in this directory
     1. `cp ..\<old HIERR app directory>\.env .env`

4. If the HIERR application is running in a different PowerShell window, click that window and:
     1.  Press Ctrl-C, then type “Y” and enter to stop the previous version of the HIERR application
     2.  Close the old PowerShell window
5. In the new PowerShell window:

```bash
npm install
npx prisma db push
npm run build
npm run start
```

# Installation Instructions
## Directions
1. Download Node.js installer (https://nodejs.org/dist/v18.14.2/node-v18.14.2-x64.msi)
2. Run installer to install Node.js
    a. When prompted to install necessary tools, make sure to click this “on” before proceeding.
    b. When prompted with a new text console window for “Tools for Node.js Native Modules Installation Script” press y on the keyboard. You will need to press y twice.
    c. At some point, an installer for PowerShell will appear. Proceed with PowerShell installation.
3. Download Microsoft SQL Server Express Installer (https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x409&culture=en-us&country=us)
4. Run installer to install Microsoft SQL Server Express
5. Download Microsoft SQL Server Management Studio (https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
6. Open SQL Server Configuration Manager
    a. Select SQL Server Network Configuration from the left sidebar
    b. Select Protocols for MSSQL Server
    c. Set TCP/IP to enable
    d. Restart SQL Server
7. Download HIERR application package from Github (link)
8. Expand the zip file
9. Open PowerShell and run the following commands (and leave PowerShell open)
    a. `cd <expanded HIERR directory>`
    b. `dir`
      1. Make sure that you see a README.md file in this directory
    
    c. `New-Item .env -type file`
10. Open Notepad, and open the newly created .env file in the expanded HIERR directory (you may need to select all files in the open file dialog box), and add the following four lines:
    a. `DATABASE_URL="sqlserver://localhost:1433;initial catalog=<YourDBName>;integratedSecurity=true;trustServerCertificate=true;"`
    b. `NEXTAUTH_URL="<YourURL>"`
    c. `NEXTAUTH_SECRET=<YourSecret>`
    d. `EMAIL_SERVER=<YourEmailServer>`
    e. `EMAIL_FROM=<YourEmailAddress>`
    f. `AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={path to file that contains a list of email addresses (one per line) whose users are authorized to export POLIS data}`
      For example: AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={YourAuthorizedEmailTextFile}
11.  Save and close the Nodepad file.
12.  Back in PowerShell, run the following commands:
``` 
npm install
npx prisma db push
npm run build
npm run start
```
1.   Visit http://localhost:3000 from the same computer and verify that you can see the HIERR application.
  a. Do not proceed if you cannot load the HIERR main page through this link.
1.   Turn on IIS
  a. Open “Control Panel”
  b. Click “Turn Windows Features on and off”
  c. Click “Add Roles and Features”
  d. Click “Next” on “Before You Begin” screen (if it appears)
  e. Select “Role or feature-based installation”
  f. On the server selection screen, click “Next”.
  g. Click “Web Server (IIS)” and click Management tools on, then click “Next”
  h. Click “Next” on the Features screen. If “Next” is greyed out, then this is likely already installed. Skip to step j.
  i. Run that installation until it completes 
  j. Download and install URL rewrite module https://www.iis.net/downloads/microsoft/application-request-routing - use x64 version
  k. Download and install Application Request Routing 3.0 https://iis-umbraco.azurewebsites.net/downloads/microsoft/application-request-routing - use x64 version
1.   Download Certify the Web (https://certifytheweb.s3.amazonaws.com/downloads/archive/CertifyTheWebSetup_V5.6.8.exe)
2.   Run Certify the Web installer.
3.   Run Certify the Web once it’s installed.
  a. Click “New Certificate”
  b. Click “OK” when prompted to register a new contact.
  c. Enter an email address for the HIERR application administrator. Scott’s email is fine.
  d. Click “Yes, I agree” with the terms for the Let’s Encrypt Certificate Authority, then click “Register Contact”.
  e. In the next window, select “Default web site”, type “<YourDomain>” in the “Add domains to certificate” field, then click the green Plus sign.
  f. Click the “Test” button in the top right of the screen and verify that the test succeeds.
  g. Click the back left arrow button.
  h. Click the “Request Certificate” button
  i. Wait until page says “Success” and “Request Completed”.
  j. Click the back left arrow button if one shows up.
  k. Close Certify the Web
1.   Add a reverse proxy in IIS from inbound port 80 to port 3000 in the VM and inbound port 443 to port 3000 in the VM
  a. Open “Internet Information Services (IIS) manager”
  b. Click on the “Default Web Site” from the tree view on the left under the server tree under “Sites”
  c. Double check the “URL Rewrite” Icon from the middle pane.
  d. Click “Add Rule(s)…”
  e. Select “Blank rule” in the Inbound rules section, then click the OK button.
  f. Type “HTTPS Redirect” for the name.
  g. In the Matched URL section:
      i. Set Requested URL: to Matches the Pattern.
     ii. Set Using to Regular Expressions.
    iii. Enter (.*) as the Pattern.
     iv. Check Ignore case.
  h. Scroll down to Conditions and expand the section if necessary. Select Match All for Logical grouping, then click the Add… button.
  i. A dialog box will open:
      i. Type {HTTPS} in the Condition input field.
     ii. Set Check if input string to Matches the Pattern.
    iii. Type ^OFF$ in the Pattern field.
     iv. Check Ignore case.
      v. Click the OK button.
  j. You should now see your condition in the list.
  k. Scroll down to the Action section and enter these settings:
      i. Select Redirect as the Action type.
     ii. Type https://{HTTP_HOST}/{REQUEST_URI} in the Redirect URL field.
    iii. Uncheck Append query string.
     iv. Set Redirect type to Permanent (301).
  l. Click Apply in the right-hand Actions menu.
  m. Choose the ‘Add Rule’ action from the right pane of the management console, and select the ‘Reverse Proxy Rule’ from the ‘Inbound and Outbound Rules’ category.
  n. If asked to enable proxy functionality, click “OK”.
  o. Enter localhost:3000 as where requests will be forwarded
  p. Click on enable SSL offloading
  q. Click on Rewrite domain names
      i. From localhost:3000 to <YourDomain>
  r. Click the OK button.
  s. You should now see a second condition in the list.
1.   Turn on TLS on port 443
  a. Navigate to your website in IIS (left sidebar) and select “Bindings…” on the right hand side.
  b. Specify https and hostname is <YourDomain>
  c. Save that
  d. This page should now show http and https bindings. Close the window.
1.   Visit http://<YourDomain> from a web browser other than the VM. Your browser should be redirected to https://<YourDomain> and it should use TLS to secure the website.

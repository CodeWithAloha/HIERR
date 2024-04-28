# HIERR Application Assumptions

1. Windows Server 2022

> Some additional components may need to be installed if this is not the version of Windows used

# Update Instructions

1. Download the HIERR application package from the [releases page](https://github.com/CodeWithAloha/HIERR/releases).
2. Expand the zip file to a new directory (do not overwrite the existing HIERR application directory).
3. Open PowerShell and run the following commands (open a new PowerShell window if one running the HIERR application is already open)

   1. `cd <new expanded HIERR directory>`
   1. `dir`
      - Make sure that you see a README.md file in this directory
   1. `cp ..\<old HIERR app directory>\.env .env`

4. If the HIERR application is running in a different PowerShell window, click that window and:
   1. Press Ctrl-C, then type “Y” and enter to stop the previous version of the HIERR application
   2. Close the old PowerShell window
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
9. Do this N times (for each environment you want to create: production, test, etc.)
    1. Open PowerShell and run the following commands (and leave PowerShell open)
        1. `cd <expanded HIERR directory>`
        2. `dir`
            * Make sure that you see a README.md file in this directory
        3. `New-Item .env -type file`
    2. Open Notepad, and open the newly created .env file in the expanded HIERR directory (you may need to select all files in the open file dialog box), and add the following four lines:
        * `DATABASE_URL="sqlserver://localhost:1433;initial catalog=<YourDBName for Environment>;integratedSecurity=true;trustServerCertificate=true;"`
        * `NEXTAUTH_URL="<YourURL>"`
        * `NEXTAUTH_SECRET=<YourSecret>`
        * `EMAIL_SERVER=<YourEmailServer>`
        * `EMAIL_FROM=<YourEmailAddress>`
        * `AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={path to file that contains a list of email addresses (one per line) whose users are authorized to export POLIS data}`
           * For example: `AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={YourAuthorizedEmailTextFile}`
    3. Save and close the Nodepad file.
    4. Run the HIERR with for the given environment as a service:
        1. TODO - Back in PowerShell, run the following commands (each environment needs a unique port; 3000 for production, 4000 for test, etc):
            ```
            npm install
            npx prisma db push
            npm run build
            // Linux
            PORT=<Environment Port> npm run start
            // Windows
            npm run start -- --port=<Environment Port>
            ```
10. Visit http://localhost:<Environment port> from the same computer and verify that you can see the HIERR application.
    * **Do not proceed if you cannot load the HIERR main page through this link**. Go to the instructions above and verify that you have set everything up as written.
11. Turn on IIS
    1. Open “Control Panel”
    2. Click “Turn Windows Features on and off”
    3. Click “Add Roles and Features”
    4. Click “Next” on “Before You Begin” screen (if it appears)
    5. Select “Role or feature-based installation”
    6. On the server selection screen, click “Next”.
    7. Click “Web Server (IIS)” and click Management tools on, then click “Next”
    8. Click “Next” on the Features screen. If “Next” is greyed out, then this is likely already installed. Skip to step j.
    9. Run that installation until it completes
    10. Download and install URL rewrite module https://www.iis.net/downloads/microsoft/application-request-routing - use x64 version
    11. Download and install Application Request Routing 3.0 https://iis-umbraco.azurewebsites.net/downloads/microsoft/application-request-routing - use x64 version
12.  Download Certify the Web (https://certifytheweb.s3.amazonaws.com/downloads/archive/CertifyTheWebSetup_V5.6.8.exe)
13.  Run Certify the Web installer.
14.  Run Certify the Web once it’s installed.
    1. Do this N times (for each environment you want to create: production, test, etc.) inside of Certify the Web
        1. Click “New Certificate”
        2. Click “OK” when prompted to register a new contact.
        3. Enter an email address for the HIERR application administrator. Scott’s email is fine.
        4. Click “Yes, I agree” with the terms for the Let’s Encrypt certificate Authority, then click “Register Contact”.
        5. In the next window, select “Default web site”, type “<YourDomainForEnvironment>” in the “Add domains to certificate” field, then click the green Plus sign.
        6. Click the “Test” button in the top right of the screen  and verify that the test succeeds.
        7. Click the back left arrow button.
        8. Click the “Request Certificate” button
        9. Wait until page says “Success” and “Request Completed”.
        10. Click the back left arrow button if one shows up.
        11. Close Certify the Web
15. Open “Internet Information Services (IIS) manager”:
    1. Do this N times (for each environment you want to create: production, test, etc.) inside of Certify the Web
        1. Add a reverse proxy in IIS from inbound port 80 to port <Environment port> in the VM and inbound port 443 to port <Environment port> in the VM
            1. Right-click "Sites" on the left under the server and select "Add Website"
            2. Double check the “URL Rewrite” Icon from the middle pane.
            3. Click “Add Rule(s)…”
            4. Select “Blank rule” in the Inbound rules section, then click the OK button.
            5. Type “HTTPS Redirect” for the name.
            6. In the Matched URL section:
                1. Set Requested URL: to Matches the Pattern.
                2. Set Using to Regular Expressions.
                3. Enter (.\*) as the Pattern.
                4. Check Ignore case.
            7. Scroll down to Conditions and expand the section if necessary. Select Match All for Logical grouping, then click the Add… button.
            8. A dialog box will open:
                1. Type {HTTPS} in the Condition input field.
                2. Set Check if input string to Matches the Pattern.
                3. Type ^OFF$ in the Pattern field.
                4. Check Ignore case.
            9. Click the OK button.
            10. You should now see your condition in the list.
            11. Scroll down to the Action section and enter these settings:
                1. Select Redirect as the Action type.
                2. Type https://{HTTP_HOST}/{REQUEST_URI} in the Redirect URL field.
                3. Uncheck Append query string.
                4. Set Redirect type to Permanent (301).
            12. Click Apply in the right-hand Actions menu.
            13. Click "Back to Rules"
            13. Choose the ‘Add Rule’ action from the right pane of the management console, and select the ‘Reverse Proxy Rule’ from the ‘Inbound and Outbound Rules’ category.
            14. If asked to enable proxy functionality, click “OK”.
            15. Enter localhost:<Environment port> as where requests will be forwarded
            16. Click on enable SSL offloading.
            17. Click on Use Server Name Indication.
            17. In Outbound rules, Click on Rewrite domain names
                * From localhost:<Environment port> to <YourDomain>
            18. Click the OK button.
            19. You should now see a second condition in the list.
        2.  Turn on TLS on port 443. This will use [Server Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) to use multiple TLS certs, one for each environment:
            1. Navigate to your website in IIS (left sidebar) and select “Bindings…” on the right hand side.
            2. Specify https and hostname is <YourDomain>
            3. Save that
            4. This page should now show http and https bindings. Close the window.
        3. Visit http://<YourDomain> from a web browser other than the VM. Your browser should be redirected to https://<YourDomain> and it should use TLS to secure the website.

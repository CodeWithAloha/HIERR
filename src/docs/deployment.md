# HIERR Application Assumptions

* Windows Server 2022

> Some additional components may need to be installed if this is not the version of Windows used

# Update Instructions

1. Download the HIERR application package from the [releases page](https://github.com/CodeWithAloha/HIERR/releases).
1. Expand the zip file to a new directory (do not overwrite the existing HIERR application directory).
1. Open PowerShell and run the following commands (open a new PowerShell window if one running the HIERR application is already open)
    1. `cd <new expanded HIERR directory>`
    1. `dir`
        * Make sure that you see a README.md file in this directory
    1. `cp ..\<old HIERR app directory>\.env .env`
1. If the HIERR application is running in a different PowerShell window, click that window and:
    1. Press Ctrl-C, then type “Y” and enter to stop the previous version of the HIERR application
    1. Close the old PowerShell window
1. In the new PowerShell window:
    ```bash
    npm install
    npx prisma db push
    npm run build
    # Linux
    PORT=<Environment Port> npm run start
    # Windows
    npm run start -- --port=<Environment Port>
    ```

# Installation Instructions

## Directions

1. Download Node.js installer (https://nodejs.org/dist/v18.14.2/node-v18.14.2-x64.msi)
1. Run installer to install Node.js
    1. When prompted to install necessary tools, make sure to click this “on” before proceeding.
    1. When prompted with a new text console window for “Tools for Node.js Native Modules Installation Script” press y on the keyboard. You will need to press y twice.
    1. At some point, an installer for PowerShell will appear. Proceed with PowerShell installation.
1. Download Microsoft SQL Server Express Installer (https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x409&culture=en-us&country=us)
1. Run installer to install Microsoft SQL Server Express
1. Download Microsoft SQL Server Management Studio (https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
1. Open SQL Server Configuration Manager
    1. Select SQL Server Network Configuration from the left sidebar
    1. Select Protocols for MSSQL Server
    1. Set TCP/IP to enable
    1. Restart SQL Server
1. Download HIERR application package from Github (link)
1. Expand the zip file
1. Do this N times (for each environment you want to create: production, test, etc.)
    1. Open PowerShell and run the following commands (and leave PowerShell open)
        1. `cd <expanded HIERR directory>`
        1. `dir`
            * Make sure that you see a README.md file in this directory
        1. `New-Item .env -type file`
    1. Open Notepad, and open the newly created .env file in the expanded HIERR directory (you may need to select all files in the open file dialog box), and add the following four lines:
        * `DATABASE_URL="sqlserver://localhost:1433;initial catalog=<YourDBName for Environment>;integratedSecurity=true;trustServerCertificate=true;"`
        * `NEXTAUTH_URL="<YourURL>"`
        * `NEXTAUTH_SECRET=<YourSecret>`
        * `EMAIL_SERVER=<YourEmailServer>`
        * `EMAIL_FROM=<YourEmailAddress>`
        * `AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={path to file that contains a list of email addresses (one per line) whose users are authorized to export POLIS data}`
           * For example: `AUTHORIZED_POLIS_CONVERT_EMAILS_FILE={YourAuthorizedEmailTextFile}`
    1. Save and close the Nodepad file.
    1. Run the HIERR with for the given environment as a service:
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
1. Visit http://localhost:<Environment port> from the same computer and verify that you can see the HIERR application.
    * **Do not proceed if you cannot load the HIERR main page through this link**. Go to the instructions above and verify that you have set everything up as written.
1. Turn on IIS
    1. Open “Control Panel”
    1. Click “Turn Windows Features on and off”
    1. Click “Add Roles and Features”
    1. Click “Next” on “Before You Begin” screen (if it appears)
    1. Select “Role or feature-based installation”
    1. On the server selection screen, click “Next”.
    1. Click “Web Server (IIS)” and click Management tools on, then click “Next”
    1. Click “Next” on the Features screen. If “Next” is greyed out, then this is likely already installed. Skip to step j.
    1. Run that installation until it completes
    1. Download and install URL rewrite module https://www.iis.net/downloads/microsoft/application-request-routing - use x64 version
    1. Download and install Application Request Routing 3.0 https://iis-umbraco.azurewebsites.net/downloads/microsoft/application-request-routing - use x64 version
1.  Download Certify the Web (https://certifytheweb.s3.amazonaws.com/downloads/archive/CertifyTheWebSetup_V5.6.8.exe)
1.  Run Certify the Web installer.
1.  Run Certify the Web once it’s installed.
    1. Do this N times (for each environment you want to create: production, test, etc.) inside of Certify the Web
        1. Click “New Certificate”
        1. Click “OK” when prompted to register a new contact.
        1. Enter an email address for the HIERR application administrator. Scott’s email is fine.
        1. Click “Yes, I agree” with the terms for the Let’s Encrypt certificate Authority, then click “Register Contact”.
        1. In the next window, select “Default web site”, type “<YourDomainForEnvironment>” in the “Add domains to certificate” field, then click the green Plus sign.
        1. Click the “Test” button in the top right of the screen  and verify that the test succeeds.
        1. Click the back left arrow button.
        1. Click the “Request Certificate” button
        1. Wait until page says “Success” and “Request Completed”.
        1. Click the back left arrow button if one shows up.
        1. Close Certify the Web
1. Open “Internet Information Services (IIS) manager”:
    1. Do this N times (for each environment you want to create: production, test, etc.) inside of Certify the Web
        1. Add a reverse proxy in IIS from inbound port 80 to port <Environment port> in the VM and inbound port 443 to port <Environment port> in the VM
            1. Right-click "Sites" on the left under the server and select "Add Website"
            1. Double click the “URL Rewrite” Icon from the middle pane.
            1. Click “Add Rule(s)…”
            1. Select “Blank rule” in the Inbound rules section, then click the OK button.
            1. Type “HTTPS Redirect” for the name.
            1. In the Matched URL section:
                1. Set Requested URL: to Matches the Pattern.
                1. Set Using to Regular Expressions.
                1. Enter (.\*) as the Pattern.
                1. Check Ignore case.
            1. Scroll down to Conditions and expand the section if necessary. Select Match All for Logical grouping, then click the Add… button.
            1. A dialog box will open:
                1. Type {HTTPS} in the Condition input field.
                1. Set Check if input string to Matches the Pattern.
                1. Type ^OFF$ in the Pattern field.
                1. Check Ignore case.
            1. Click the OK button.
            1. You should now see your condition in the list.
            1. Scroll down to the Action section and enter these settings:
                1. Select Redirect as the Action type.
                1. Type https://<Replace with your host name>/ in the Redirect URL field.
                1. Uncheck Append query string.
                1. Set Redirect type to Permanent (301).
            1. Click Apply in the right-hand Actions menu.
            1. Click "Back to Rules"
            1. Choose the ‘Add Rule’ action from the right pane of the management console, and select the ‘Reverse Proxy Rule’ from the ‘Inbound and Outbound Rules’ category.
            1. If asked to enable proxy functionality, click “OK”.
            1. Enter localhost:<Environment port> as where requests will be forwarded
            1. Click on enable SSL offloading.
            1. Click on Use Server Name Indication.
            1. In Outbound rules, Click on Rewrite domain names
                * From localhost:<Environment port> to <YourDomain>
            1. Click the OK button.
            1. You should now see a second condition in the list.
        1. Turn off other features
            1. Turn off dynamic content compression
            1. Turn off Output caching - turn off enable cache and enable kernel cache
        1.  Turn on TLS on port 443. This will use [Server Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) to use multiple TLS certs, one for each environment:
            1. Navigate to your website in IIS (left sidebar) and select “Bindings…” on the right hand side.
            1. Specify https and hostname is <YourDomain>
            1. Save that
            1. This page should now show http and https bindings. Close the window.
        1. Visit http://<YourDomain> from a web browser other than the VM. Your browser should be redirected to https://<YourDomain> and it should use TLS to secure the website.

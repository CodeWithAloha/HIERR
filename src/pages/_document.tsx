import Document, { Html, Head, Main, NextScript } from "next/document";
// Importing the Google Analytics Measurement ID from the environment variable
const gaTag = process.env.NEXT_PUBLIC_GA_ID ?? "";
const gtag = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Analytics Measurement ID*/}
          <script async src={gtag} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTag}', {
                  page_path: window.location.pathname
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

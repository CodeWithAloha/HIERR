import Document, { Html, Head, Main, NextScript } from "next/document";
// Importing the Google Analytics Measurement ID from the environment variable
const gaTag = process.env.NEXT_PUBLIC_GA_ID ?? "";
const gtag = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
            integrity="sha384-o/2yZuJZWGJ4s/adjxVW71R+EO/LyCwdQfP5UWSgX/w87iiTXuvDZaejd3TsN7mf"
            crossOrigin="anonymous"
          />

          <script
            src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
            integrity="sha384-okbbMvvx/qfQkmiQKfd5VifbKZ/W8p1qIsWvE1ROPUfHWsDcC8/BnHohF7vPg2T6"
            async
            crossOrigin="anonymous"
          />

          <script
            src="https://unpkg.com/esri-leaflet@3.0.12/dist/esri-leaflet.js"
            integrity="sha384-twf8YFpk0FSzm0AmW2GRJjjnqIuQ2y86vZXh2roYI8O+kFbEBjSUDUT6U72w8shL"
            async
            crossOrigin="anonymous"
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/esri-leaflet-geocoder@3.1.4/dist/esri-leaflet-geocoder.css"
            integrity="sha384-29tCxPoeXnj1Eu4bPYJptxWeuI1WdrXSrGlz1J5lP6voxpJXn2f98srAoeG6KXCi"
            crossOrigin="anonymous"
          />
          <script
            src="https://unpkg.com/esri-leaflet-geocoder@3.1.4/dist/esri-leaflet-geocoder.js"
            integrity="sha384-4LYfv8nxzrIglv5c92vOwCL7CJOPTE9QU2s7rngYvVD9JwJoz9bEnLmwZsZ8Dvgu"
            async
            crossOrigin="anonymous"
          />

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

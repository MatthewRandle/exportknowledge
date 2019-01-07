import Document, { Head, Main, NextScript } from 'next/document';
const { detect } = require('detect-browser');

export default class MyDocument extends Document {
    componentDidMount() {
        const browser = detect();

        console.log(browser.name);
    }

    render() {
        return (
            <html>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
const React = require('react');

const Def = (html) => {
    return (
        <html>
            <head>
                <title>Title</title>
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
                    integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN'
                    crossOrigin='anonymous'
                />
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
                ></link>
                <link rel='stylesheet' href='/css/style.css' />
                <script
                    src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js'
                    integrity='sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+'
                    crossOrigin='anonymous'
                ></script>
            </head>
            <body>
                <nav>
                    <ul>
                        <li>
                            <a href='/'>Home</a>
                        </li>
                        <li>
                            <a href='/places'>Places</a>
                        </li>
                        <li>
                            <a href='/places/new'>Add Place</a>
                        </li>
                    </ul>
                </nav>
                {html.children}
            </body>
        </html>
    );
};

module.exports = Def;

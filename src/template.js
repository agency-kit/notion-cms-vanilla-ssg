// Define the HTML layout template
const htmlTemplate = (pageTitle, pageContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
</head>
<body>
    <header>
        <h1>${pageTitle}</h1>
    </header>
    <main>
        ${pageContent}
    </main>
    <footer>
        <p>&copy; ${new Date().getFullYear()} Your Website</p>
    </footer>
</body>
</html>
`;

export default htmlTemplate;

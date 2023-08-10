import fs from 'fs';
import NotionCMS from '@agency-kit/notion-cms';
import htmlTemplate from './template.js';

const outputFolder = process.argv[2] || './dist';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const notion = new NotionCMS({
    databaseId: process.env.NOTION_DATABASE_ID,
    notionAPIKey: process.env.NOTION_API_KEY,
});

await notion.pull()

for (const route of notion.routes) {
    console.log(`building: ${route}`);

    const routeParts = route.split('/').filter(part => part.trim() !== ''); // Split route into parts
    let currentPath = outputFolder;

    for (const part of routeParts) {
        currentPath = `${currentPath}/${part}`;
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    }

    const page = notion.queryByPath(route);
    const pageTitle = page.name;
    const pageContent = page.content.html;

    const dataFilePath = `${currentPath}/index.html`;
    const pageHtml = htmlTemplate(pageTitle, pageContent);

    fs.writeFileSync(dataFilePath, pageHtml);
}

// Export data to a JSON file
notion.export({ pretty: true, path: './notion-data.json' });

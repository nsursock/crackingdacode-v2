const config = require('./config'); // Create a config.js file
require('dotenv').config({ path: '../.env' })
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');
const fs = require('fs');
const matter = require('gray-matter');
const cheerio = require('cheerio');

const sourceDirectory = '../src/blog/';
const numVariations = 3 // variations for images
const isDebugMode = false // when json have been generated

// ----------------------------------------------------------------

async function processFile(jsonDocument, file) {
  // Prepare the document for analysis
  const beforeContent = createMarkdownFromJSON(jsonDocument);
  const rest = await generateMetadata(beforeContent, file)
  const article = await generateArticle(beforeContent, file)
  const music = await generateCritic(file, jsonDocument)

  for (let i = 0; i < numVariations; i++) {
    const finalContent = await generateFormalText(article, music)
    const frontMatter = await generateFrontMatter(file, article, rest, jsonDocument)

    try {
      const filePath = `../src/posts/${createSlug(JSON.parse(article.content).keyword)}-${i + 1}.md`
      fs.writeFileSync(filePath, frontMatter + finalContent.join('\n'), 'utf-8');
      console.log(`Content has been successfully written to ${filePath}`);

      const sourceDirectory = '../src/blog';
      const destinationDirectory = '../formalize/processed';
      const fileName = file;

      const sourcePath = path.join(sourceDirectory, fileName);
      const destinationPath = path.join(destinationDirectory, fileName);

      // Move the file
      if (i === 0)
        fs.rename(sourcePath, destinationPath, (err) => {
          if (err) {
            console.error(`Error moving file: ${err}`);
          } else {
            console.log('File moved successfully!');
          }
        })

    } catch (err) {
      console.error('Error writing to the file:', err);
    }
  }
}

async function generateFrontMatter(file, article, rest, json) {
  const splitTitle = splitHeadlineBalanced(JSON.parse(rest.content).metadata.title);
  // const photo = await extractUnplashMetadata(json.head.featured, true)
  const photo = await getRandomUnsplashImage(JSON.parse(rest.content).keywords)
  // const photo = await getDallEImage(JSON.parse(rest.content).metadata.prompt + ', digital art', true)

  const yamlMusic = {
    track: json.head.track,
    versions: json.head.versions
  }

  let frontmatter =
    `---
title: "${splitTitle[0]}"
title2: "${splitTitle[1]}"
description: "${JSON.parse(rest.content).metadata.description.replace(/"/g, '')}"
${yaml.dump(JSON.parse(rest.content).metadata.variations)}
author: Nicolas Sursock
date: ${new Date(json.head.date).toISOString().slice(0, -5) + 'Z'}
featured: ${photo.urls.raw}&auto=format&fit=crop&q=80
alt: ${photo.alt_description}
name: ${photo.user.name}
handle: ${photo.user.username}
keywords: ${JSON.parse(article.content).keyword}
original: ${file}
tags: [${JSON.parse(rest.content).categories}, processed]
layout: layouts/post.njk
${yaml.dump(yamlMusic)}
${yaml.dump(JSON.parse(rest.content).metadata.misc)}
---
`
  return frontmatter
}

async function generateFormalText(article, music) {
  let finalContent = await Promise.all(JSON.parse(article.content).sections.map(async (section, index) => {
    const title = `## ${section.title}`
    let markdown = ''

    const photo = await getRandomUnsplashImage(section.keywords)
    markdown += '\n' + title + '\n' + `
![${photo.alt_description}](${photo.urls.raw}&auto=format&fit=crop&q=80)
*Photo by [${photo.user.name}](https://unsplash.com/@${photo.user.username}?utm_source=crackingdacode&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=crackingdacode&utm_medium=referral)*
<!-- 
prompt: ${section.prompt}
keyword: ${section.keywords.join(', ')}
-->
`
    markdown += '\n' + (section.content.join('\n')).replace(/\n/g, '\n\n');
    return markdown;
  }))

  const markdownMusic = JSON.stringify(music.content)
    .replace(/\\"/g, '"')          // Replace \" with "
    .replace(/\\n\\n/g, '\n\n')    // Replace \n\n with new line
    .replace(/\\n/g, '  \n');       // Replace \n with two spaces and new line
  finalContent.unshift(markdownMusic.substring(1, markdownMusic.length - 1))

  return finalContent
}

function createMarkdownFromJSON(json) {
  return json.content.sections.map((section) => {
    const title = section.title === '' ? '' : `## ${section.title}`
    return '\n' + title + '\n' + (section.paragraphs.join('\n')).replace(/\n/g, '\n\n');
  }).join('\n')
}

async function generateMetadata(content, file) {
  let rest = null
  if (!isDebugMode) {
    conversation = [
      { role: 'system', content: 'You are an experienced copy writer who knows how to grab attention.' },
      { role: 'user', content: config.promptRest },
      { role: 'assistant', content: content },
    ]
    rest = await sendToChatGPT(conversation)
    writeJsonToFile(rest, `./processed/${file}.rest.json`)
  } else {
    rest = readJsonFromFile(`./processed/${file}.rest.json`)
  }
  // console.log(JSON.stringify(JSON.parse(rest.content), null, 2))
  return rest
}

async function generateArticle(content, file) {
  let article = null
  if (!isDebugMode) {
    conversation = [
      { role: 'system', content: 'You are an experienced editor who takes text input and rewrites for a more formal tone.' },
      { role: 'user', content: config.promptArticle },
      { role: 'assistant', content: content },
    ]
    article = await sendToChatGPT(conversation)
    writeJsonToFile(article, `./processed/${file}.article.json`)
  } else {
    article = readJsonFromFile(`./processed/${file}.article.json`)
  }
  // console.log(JSON.stringify(JSON.parse(article.content), null, 2))
  return article
}

async function generateCritic(file, json) {
  let music = null
  if (!isDebugMode) {
    conversation = [
      { role: 'system', content: 'You are an experienced musician who writes positive critics.' },
      { role: 'user', content: config.promptMusic + `${json.head.track} by ${json.head.versions[0].artist}` },
      // { role: 'assistant', content:  },
    ]
    music = await sendToChatGPT(conversation, false)
    writeJsonToFile(music, `./processed/${file}.music.json`)
  } else {
    music = readJsonFromFile(`./processed/${file}.music.json`)
  }
  // console.log(JSON.stringify(music.content))
  return music
}

// ----------------------------------------------------------------

function writeJsonToFile(jsonObj, filePath) {
  try {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(jsonObj, null, 2);

    // Write the string to a file synchronously
    fs.writeFileSync(filePath, jsonString, 'utf-8');

    console.log(`JSON object has been written to ${filePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

function readJsonFromFile(filePath) {
  try {
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse the JSON content
    const jsonObj = JSON.parse(fileContent);

    return jsonObj;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function removeAccents(str) {
  // Use the normalize method to convert accented characters to their non-accented equivalents
  const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Use a regular expression to remove any remaining non-alphanumeric characters
  const removedAccentsStr = normalizedStr.replace(/[^a-zA-Z0-9]/g, " ");

  return removedAccentsStr;
}

async function sendToChatGPT(convo, json = true) {
  const start = performance.now();

  // Prepare the request payload
  const payload = {
    messages: convo,
    temperature: 0.7,
    model: "gpt-4-1106-preview",
    // model: "gpt-3.5-turbo",
  }
  if (json)
    payload.response_format = { type: "json_object" }

  // Define the API endpoint
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const end = performance.now();
    console.log(`Total time taken: ${convertMillis(end - start)}`);
    return response.data.choices[0].message

  } catch (e) {
    console.error(e.message)
  }
}

async function getRandomUnsplashImage(query) {

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}&orientation=landscape`);
    if (!response.ok) {
      throw new Error(`Failed to fetch random image: ${response.statusText}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching random image:', error);
    return null;
  }
}

function splitHeadlineBalanced(headline) {
  const words = headline.split(' ');
  const totalWords = words.length;

  if (totalWords < 2) {
    return [headline]; // Can't split if there are less than 2 words
  }

  const middle = Math.ceil(totalWords / 2);
  const firstPart = words.slice(0, middle).join(' ');
  const secondPart = words.slice(middle).join(' ');

  return [firstPart.replace(/"/g, ''), secondPart.replace(/"/g, '')];
}

function createSlug(input) {
  const minusAccents = removeAccents(input)
  return minusAccents
    .toLowerCase()                // Convert to lowercase
    .replace(/[^\w\s-]/g, '')     // Remove special characters
    .replace(/[\s]+/g, '-')      // Replace spaces with hyphens
    .trim();                     // Trim any leading/trailing spaces
}

function convertMillis(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Convert to mm:ss format
  const formattedTime = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;

  return formattedTime;
}

function convertJson(filePath) {
  // Read the Markdown file
  const markdownContent = fs.readFileSync(filePath, 'utf8');

  // Extract front matter using Gray Matter
  const { data: frontMatter, content: markdownBody } = matter(markdownContent);

  // Load the content without front matter into Cheerio
  const $ = cheerio.load(markdownBody);

  // Initialize an array to store HTML content from asides
  const htmlContainers = [];

  // Iterate over each 'aside' element
  $('aside').each((index, element) => {
    // Extract HTML content within each 'aside' element
    const htmlContent = $(element).html();

    // Store HTML content in the array
    htmlContainers.push(htmlContent);

    // Remove the 'aside' element from the main body
    $(element).remove();
  });

  // Extract content without front matter and the three dashes
  const contentWithoutFrontMatter = $('body').html().replace(/^---\n/, '');

  // Split the content into sections based on '##' tags
  const sections = contentWithoutFrontMatter.split(/\n(?=##)/);

  // Check if the last section ends with a code block
  const lastSectionIndex = sections.length - 1;
  const lastSectionContent = sections[lastSectionIndex];

  if (lastSectionContent.trim().endsWith('```')) {
    // Remove the last code block
    sections[lastSectionIndex] = lastSectionContent.replace(/```[\s\S]*$/, '');
  }

  // Organize sections into the desired JSON format
  const organizedSections = {
    sections: sections.map((section) => {
      const titleMatch = section.match(/^##\s+(.*)/);
      const title = titleMatch ? titleMatch[1] : '';
      const paragraphs = section.split('\n').slice(1).filter(paragraph => paragraph.trim() !== '');
      return { title, paragraphs };
    }),
  };

  // Pretty print the JSON
  // const prettyPrintedJSON = JSON.stringify(organizedSections, null, 2);

  // console.log('Front Matter:', frontMatter);
  // console.log('HTML Containers:', htmlContainers);
  // console.log('Organized Sections:', prettyPrintedJSON);

  return {
    head: frontMatter, asides: htmlContainers, content: organizedSections
  }
}

// ----------------------------------------------------------------

(async () => {
  // Entry point
  const files = fs.readdirSync(sourceDirectory);

  // Process each file
  for (const file of files) {
    const startTime = performance.now();

    // Check if the file has a .md extension
    if (file.endsWith('.md')) {
      let filePath = `${sourceDirectory}/${file}`;
      let jsonDocument = convertJson(filePath);

      // Create variations and process file
      console.log('Processing: ', file);
      await processFile(jsonDocument, file);
    }

    const endTime = performance.now();
    console.log(`Elapsed time: ${convertMillis(endTime - startTime)}`);

    return
  }
})();
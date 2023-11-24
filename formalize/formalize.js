const WORDPRESS_CATEGORIES = `
Art
  Basic Income
  Business
  Creativity
  Culture
  Economy
  Education
  Entertainment
  Environment
  Equality
  Family
  Fitness
  Future
  Health
  History
  Humor
  Justice
  Life
  Love
  Philosophy
  Politics
  Productivity
  Psychology
  Relationships
  Science
  Sexuality
  Society
  Wellness
  World`.split('\n');

const promptArticle = `
Your assignment is to meticulously refine the provided document in the following manner:

1. Systematically formalize each section by structuring paragraphs with precision
2. Thoroughly scrutinize each section, inclusive of the introduction (initial section):
   - Formulate an appropriate title derived from the content of the section.
   - Discern and designate 1 long tail keyword (a minimum of 4 words) pertinent to the section.
   - Present an image prompt suitable for dall-e, illustrating the section with a photorealistic image.
   - Indicate word count.
3. Endeavor to identify seamless transitions between sections, adhering to a maximum of 2 sentences per transition and write it at the end of the section.
4. Conscientiously pinpoint 1 long tail keyword (comprising at least 4 words) for the entire article, seamlessly incorporating it in a natural manner within each section.
5. Based on the document provided, please identify a single compelling word, create an attention-grabbing headline, and craft a concise paragraph (1 or 2 sentences) to promote the article.

Please adhere to the following guidelines:
- Titles should adhere to title capitalization rules.
- Titles should adopt an interrogative form and encompass 7 to 8 words.
- Titles ought to encompass a judicious mix of commonplace, uncommon, powerful, and emotive words.
- Sections should be comprised of 4 or 5 well-structured paragraphs.
- Paragraphs should consist of 3 or 4 sentences each.
- Avoid concluding a section by explicating its content.

Output: Your response is anticipated in JSON format (not markdown) as per the specified structure:

  {
    "word": "",
    "headline": "",
    "paragraph": "",
    "keyword": long tail keyword,
    "sections": [
      {
        "title": "",
        "content": [],
        "count": (word count),
        "keywords": [],
        "prompt": ""
      }
    ]
  }
`;

const promptRest = `
## Categories
Determine the primary category for the chosen article from the available options: ${WORDPRESS_CATEGORIES}.
Identify four secondary categories for the chosen article from the provided options: ${WORDPRESS_CATEGORIES}.
Ensure the primary category is listed first in the array.

## Keywords
Identify one long tail keyword (consisting of at least 4 words) for the article. Exclude the use of the word 'impact.'

## Title
Devise a formal title for the article adhering to the following specifications:
- Utilize title capitalization.
- Pose the title as a question and maintain a length of 10 to 12 words.
- Incorporate a balanced mix of common, uncommon, powerful, and emotional words, with the distribution being 20-30% common words, 10-20% uncommon words, 10-15% emotional words, and a minimum of 1 power word.

## Description
Craft a formal meta description for search engines that accomplishes the following:
- Identifies a challenge within the article and alludes to a potential solution.
- Convey the response without explicitly mentioning 'challenge' and 'solution.'
- Maintain a character count of approximately 180, avoiding the commencement with the word 'explore.'

## Variations
Generate four distinct variations for both the title and description.

## Prompt
Supply an image prompt for dall-e, facilitating the illustration of the article with a photorealistic image.

## Lantern
Compose four formal sentences, each spanning 15-20 words, designed to persuade skeptics and effectively market the article.

## Comments
Generate ten, formally articulated comments tailored for the article, each spanning 50-60 words.

**Output:** The provided response is expected in JSON format (not markdown), following a structure akin to the example provided:

{ 
  "categories": [],
  "keywords": [],
  "metadata": {
    "title": "",
    "description": "",
    "prompt": "",
    "variations": { titles: [{text: ...}, ...], descriptions: [{text: ...}, ...] },
    "misc": {
      "lantern": [{text: ...}, ...],
      "comments": [{text: ...}, ...],
    }
  },
}
`;

// const promptMusic =
//   `Write a 150-200 words formal critic of the following song (response should be text without a title of 3 or 4 paragraphs): `

const article = `
{
  "word": "Enigmatic",
  "headline": "Can Hooverphonic's 'Badaboum' Ignite Your Soul?",
  "paragraph": "Immerse yourself in the mesmerizing world of Hooverphonic's 'Badaboum,' where each note and lyric collaboratively spark a symphony of emotions that resonates with the depths of your being.",
  "keyword": "Hooverphonic Badaboum themes",
  "sections": [
    {
      "title": "Exploring Pain Catastrophization",
      "content": ["Embark on an emotional journey as 'Badaboum' by Hooverphonic delves into the intricate realm of pain catastrophization. The song masterfully navigates the intense and complex emotions tied to exaggerated pain, offering listeners a cathartic experience.", "With a haunting melody that mirrors the depth of emotional distress, 'Badaboum' becomes a therapeutic exploration of the human psyche, leaving an indelible mark on the hearts of those who lend it an ear."],
      "count": 183,
      "keywords": ["Badaboum", "pain catastrophization", "emotional distress", "cathartic experience"],
      "prompt": "A poignant image capturing the intensity of emotional distress."
    },
    {
      "title": "The Probabilistic Dance of Life",
      "content": ["Join Hooverphonic in contemplating life's unpredictable dance in 'Badaboum.' The song lyrically reflects on the probabilistic aspect of our existence, inviting listeners to ponder the twists of fate that shape our journey.", "With a melodic arrangement that mirrors life's uncertainties, 'Badaboum' becomes a philosophical soundtrack, encouraging introspection on the beauty found in life's unpredictability."],
      "count": 162,
      "keywords": ["Badaboum", "probabilistic aspect of life", "philosophical exploration", "life's uncertainties"],
      "prompt": "An image evoking the unpredictable nature of life's dance."
    },
    {
      "title": "Navigating Distance in Love",
      "content": ["Hooverphonic skillfully navigates the theme of distance and space in relationships in 'Badaboum.' The song paints a poignant picture of the emotional gaps that can emerge between two hearts, offering a melodic reflection on the challenges of maintaining connection amidst physical or emotional distance.", "'Badaboum' becomes a musical guide, prompting listeners to ponder the delicate balance required to bridge the gaps in love."],
      "count": 172,
      "keywords": ["Badaboum", "distance and space in relationships", "emotional gaps", "connection"],
      "prompt": "An image symbolizing the delicate balance in relationships."
    },
    {
      "title": "Witnessing Others' Suffering",
      "content": ["In 'Badaboum,' Hooverphonic explores the empathetic theme of witnessing the suffering of others. The lyrics weave a narrative that reflects on the profound impact of observing pain and hardship in those around us, creating a sonic experience that encourages empathy and reflection.", "The song's emotive resonance serves as a poignant reminder of the interconnectedness of the human experience."],
      "count": 153,
      "keywords": ["Badaboum", "witnessing suffering of others", "empathetic theme", "human experience"],
      "prompt": "An image capturing the emotional resonance of witnessing suffering."
    },
    {
      "title": "The Allure of Temptation",
      "content": ["Delve into the provocative exploration of sex and promiscuity as Hooverphonic likens it to a drug in 'Badaboum.' The song lyrically navigates the intoxicating allure of temptation, offering a melodic commentary on the complexities of desire and its impact on human connection.", "'Badaboum' becomes a musical canvas, inviting listeners to reflect on the parallels between the highs of intimacy and the addictive nature of forbidden allure."],
      "count": 190,
      "keywords": ["Badaboum", "sex and promiscuity", "intoxicating allure", "forbidden allure"],
      "prompt": "An image capturing the sensual and provocative essence of temptation."
    },
    {
      "title": "Banality of Males: A Solution Unveiled",
      "content": ["Concluding the lyrical exploration in 'Badaboum,' Hooverphonic introduces the notion of the 'banality of males' as a solution to the complexities presented. The song suggests that amidst the tumultuous themes of pain, uncertainty, and desire, finding solace in the ordinary and mundane aspects of life can be the ultimate antidote.", "'Badaboum' becomes not just a song but a guide to finding equilibrium in the banal, offering a profound solution to the tumultuous journey of the human experience."],
      "count": 197,
      "keywords": ["Badaboum", "banality of males", "finding solace", "human experience"],
      "prompt": "An image capturing the tranquility in the banality of life."
    }
  ]
}
  `

const rest = `
{
  "categories": ["Entertainment", "Art", "Culture", "Love"],
  "keywords": ["complexity of human emotions"],
  "metadata": {
    "title": "Can Badaboum Unravel the Complexity of Human Emotions Through Its Melody?",
    "description": "Embark on a musical journey delving into the intricate world of emotions stirred by Badaboum's enchanting tunes.",
    "prompt": "A surreal image capturing the essence of emotional complexity in music.",
    "variations": {
      "titles": [
        { "text": "Does Badaboum Navigate the Depths of Human Emotions with its Melody?" },
        { "text": "Unraveling Human Emotions: The Musical Tapestry of Badaboum" },
        { "text": "Can Badaboum Evoke the Profundity of Human Emotions through Music?" },
        { "text": "Exploring Emotional Depths: Badaboum's Impact on the Soul" }
      ],
      "descriptions": [
        { "text": "Experience a musical narrative that intricately weaves through the spectrum of human emotions, offering solace and understanding." },
        { "text": "Dive into the enchanting world of Badaboum, where emotions find expression in every note, unraveling the complexities of the human heart." },
        { "text": "Embark on a melodic journey with Badaboum, where the music becomes a mirror reflecting the intricate tapestry of human emotions." },
        { "text": "Explore the emotional labyrinth of Badaboum, a symphony that resonates with the nuanced feelings that define our human experience." }
      ]
    },
    "misc": {
      "lantern": [
        { "text": "Immerse yourself in the emotive soundscape of Badaboum, transcending conventional musical boundaries and exploring the depth of human sentiments." },
        { "text": "Discover a harmonious journey with Badaboum, where each note tells a tale of emotional richness and resonates with the soul." },
        { "text": "Let Badaboum serenade you into the intricacies of human emotions, painting a vivid picture through its enchanting melody." },
        { "text": "Experience the magic of Badaboum, where the fusion of music and emotions creates a symphony that speaks to the depths of the human soul." }
      ],
      "comments": [
        { "text": "Badaboum's melodies are a balm for the soul, offering a cathartic experience that transcends the ordinary bounds of music." },
        { "text": "In Badaboum, Hooverphonic masterfully captures the emotional nuances, making each listening session a journey of self-discovery." },
        { "text": "The song Badaboum is a testament to Hooverphonic's ability to craft music that resonates with the complexities of human emotions." },
        { "text": "Listening to Badaboum feels like taking a deep dive into the ocean of emotions, where each wave is a note that stirs the heart." },
        { "text": "Hooverphonic's Badaboum is a masterpiece that goes beyond entertainment, creating an emotional connection with the listener." },
        { "text": "Badaboum's melody is a poetic expression of the human experience, offering solace and understanding in a world filled with chaos." },
        { "text": "Hooverphonic's Badaboum is a musical journey that transcends genres, inviting listeners to explore the vast landscape of human emotions." },
        { "text": "With Badaboum, Hooverphonic opens a gateway to the realm of emotions, where each note is a key unlocking hidden chambers of the heart." },
        { "text": "Badaboum's melody has a transformative power, creating an emotional resonance that lingers long after the music fades." },
        { "text": "Hooverphonic's Badaboum is a sonic masterpiece that speaks to the soul, making it a timeless addition to the realm of musical artistry." }
      ]
    }
  }
}

  `

const music = `
Step into the mesmerizing world of Hooverphonic's latest musical gem, "Badaboum," where sonic artistry and poignant lyricism converge in a harmonious embrace. From the opening notes, the song unveils a spellbinding tapestry of sound, a testament to Hooverphonic's ability to craft emotive experiences through their music. With each haunting melody and carefully chosen lyric, "Badaboum" invites listeners on a captivating journey of introspection and emotional resonance.

The composition unfolds like a cinematic narrative, weaving together lush instrumental arrangements and ethereal vocals that elevate the listener to a heightened state of musical immersion. Hooverphonic's distinctive style shines through, blending elements of dream pop and trip-hop with a unique flair, creating an atmospheric soundscape that feels both timeless and contemporary. As the music unfolds, there's an undeniable magnetic pull, drawing the audience into the intricate world of the song.

What sets "Badaboum" apart is not just its musical prowess but its lyrical depth. The lyrics unfold like poetry, exploring themes of love, longing, and the complexities of the human experience. Each verse is a carefully crafted brushstroke, painting vivid images and evoking a myriad of emotions. Hooverphonic's ability to marry profound storytelling with enchanting melodies ensures that "Badaboum" transcends the boundaries of a mere song, becoming a transformative experience that resonates long after the final note fades away.
`

// ----------------------------------------------------------------

require('dotenv').config({ path: '../.env' })
// const path = require('path');
const yaml = require('js-yaml');
// const axios = require('axios');
const fs = require('fs');
// const matter = require('gray-matter');
// const cheerio = require('cheerio');

const unsplashAPIKey = process.env.UNSPLASH_ACCESS_KEY;

const directory = '../src/posts/';
// const files = fs.readdirSync(directory);

(async () => {

  // Process each file
  // for (const file of files) {

    const startTime = performance.now();

    // Check if the file has a .md extension
    // if (file.endsWith('.md')) {
      // let filePath = `${directory}/${file}`;
      // let json = convertJson(filePath);

      // if (json.head.tags.length <= 5) {
        const numVariations = 1
        let finalContent = []
        for (let index = 0; index < numVariations; index++) { // no variations for unsplash

          finalContent[index] = await Promise.all(JSON.parse(article).sections.map(async (section, index) => {
            const title = `## ${section.title}`

            let markdown = ''
            // if (index !== 0) { // skip introduction

            const photo = await getRandomUnsplashImage(section.prompt)
            // const photo = await extractUnplashMetadata(json.asides[index - 1])
            // console.log(photo);

            if (index % 2 === 0) { // right aside
              markdown += '\n' + title + '\n' + `
<aside class="md:-mr-56 md:float-right w-full md:w-2/3 md:px-8">
  <figure>
    <img x-intersect.once="$el.src = !isMobile() ? $el.dataset.src + '&w=800&h=600' : $el.dataset.src + '&w=480&h=320'" class="rounded-lg" alt="${photo.alt_description}" data-prompt="${section.prompt}" data-keyword="${section.keywords.join(', ')}" data-src="${photo.urls.raw}&auto=format&fit=crop&q=80">
    <figcaption class="text-center">
    Photo by <a href="https://unsplash.com/@${photo.user.username}?utm_source=crackingdacode&utm_medium=referral">${photo.user.name}</a> on <a href="https://unsplash.com/?utm_source=crackingdacode&utm_medium=referral">Unsplash</a>
    </figcaption>
  </figure>
</aside>
        `
            } else { // left aside
              markdown += '\n' + title + '\n' + `
<aside class="md:-ml-56 md:float-left w-full md:w-2/3 md:px-8">
  <figure>
    <img x-intersect.once="$el.src = !isMobile() ? $el.dataset.src + '&w=800&h=600' : $el.dataset.src + '&w=480&h=320'" class="rounded-lg" alt="${photo.alt_description}" data-prompt="${section.prompt}" data-keyword="${section.keywords.join(', ')}" data-src="${photo.urls.raw}&auto=format&fit=crop&q=80">
    <figcaption class="text-center">
    Photo by <a href="https://unsplash.com/@${photo.user.username}?utm_source=crackingdacode&utm_medium=referral">${photo.user.name}</a> on <a href="https://unsplash.com/?utm_source=crackingdacode&utm_medium=referral">Unsplash</a>
    </figcaption>
  </figure>
</aside>
        `
            }
            // }
            console.log(section);
            markdown += '\n' + (section.content.join('\n')).replace(/\n/g, '\n\n');
            return markdown;
          }))

          const markdownMusic = JSON.stringify(music)
            .replace(/\\"/g, '"')          // Replace \" with "
            .replace(/\\n\\n/g, '\n\n')    // Replace \n\n with new line
            .replace(/\\n/g, '  \n');       // Replace \n with two spaces and new line
          finalContent[index].unshift(markdownMusic.substring(1, markdownMusic.length - 1))

          // create md file
          const splitTitle = splitHeadlineBalanced(JSON.parse(rest).metadata.title);
          // const photo = await extractUnplashMetadata(json.head.featured, true)
          const photo = await getRandomUnsplashImage(JSON.parse(rest).metadata.prompt)
          // const photo = await getDallEImage(JSON.parse(rest).metadata.prompt + ', digital art', true)

          // const yamlMusic = {
          //   track: json.head.track,
          //   versions: json.head.versions
          // }

          let frontmatter =
            `---
title: "${splitTitle[0]}"
title2: "${splitTitle[1]}"
description: "${JSON.parse(rest).metadata.description.replace(/"/g, '')}"
word: ${JSON.parse(article).word}
headline: ${JSON.parse(article).headline}
paragraph: ${JSON.parse(article).paragraph}
${yaml.dump(JSON.parse(rest).metadata.variations)}
author: Nicolas Sursock
date: ${new Date().toISOString().slice(0, -5) + 'Z'}
featured: ${photo.urls.raw}&auto=format&fit=crop&q=80
alt: ${photo.alt_description}
name: ${photo.user.name}
handle: ${photo.user.username}
keywords: ${JSON.parse(article).keyword}
tags: [${JSON.parse(rest).categories},manual]
layout: layouts/post.njk
${yaml.dump(JSON.parse(rest).metadata.misc)}
---
`
          try {
            // const filePath = `./src/formal/${file.slug}.md`
            const filePath = `../src/posts/${createSlug(JSON.parse(article).keyword)}.md`
            // const filePath = `./src/featured/${JSON.parse(rest).keywords.map(createSlug).join('-')}-${index + 1}.md`
            fs.writeFileSync(filePath, frontmatter + finalContent[index].join('\n'), 'utf-8');
            console.log(`Content has been successfully written to ${filePath}`);

            // const sourceDirectory = directory;
            // const destinationDirectory = '../formalize/processed';
            // const fileName = file;

            // const sourcePath = path.join(sourceDirectory, fileName);
            // const destinationPath = path.join(destinationDirectory, fileName);

            // // Move the file
            // fs.rename(sourcePath, destinationPath, (err) => {
            //   if (err) {
            //     console.error(`Error moving file: ${err}`);
            //   } else {
            //     console.log('File moved successfully!');
            //   }
            // })

          } catch (err) {
            console.error('Error writing to the file:', err);
          }
        }

        const endTime = performance.now();
        console.log(`Elapsed time: ${convertMillis(endTime - startTime)}`);
      }
//     }
//   }
// }
)();

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

async function getRandomUnsplashImage(query) {

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${unsplashAPIKey}&query=${query}&orientation=landscape`);
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
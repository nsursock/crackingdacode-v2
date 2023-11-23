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

const promptMusic =
  `Write a 150-200 words formal critic of the following song (response should be text without a title of 3 or 4 paragraphs): `

const article = `
{
  "keyword": "journey through the symphony",
  "sections": [
    {
      "title": "Is Distance the Silent Conductor of Everlasting Love?",
      "content": [
        "Immerse yourself in the soul-stirring melody of Hooverphonic's 'Badaboum,' where a profound question emerges: Does distance hold the unspoken key to enduring love? The song delicately unfolds the notion that space in relationships is not merely a choice but a necessity for personal growth and transformation.",
        "Hooverphonic challenges ingrained notions, inviting contemplation on the intricate dance between closeness and the mandated distance for authentic connections. Can formality coexist with genuine, unguarded expressions of love? Explore the unconventional wisdom surrounding relationships and the symphony of love in this reflective exploration. The haunting echoes of 'Badaboum' linger, raising questions about the delicate balance between intimacy and space in the pursuit of lasting connections.",
        "As the music weaves its intricate tale, 'Badaboum' invites us to reevaluate the conventional wisdom surrounding relationships. Can formality coexist with the genuine, unguarded expressions of love? Through its melodic nuances, the song raises a thought-provoking query, beckoning listeners to explore the intricate dance between closeness and the mandated distance for authentic, enduring connections."
      ],
      "keywords": ["distance in relationships", "symphony of love", "personal growth", "enduring connections"],
      "prompt": "A photorealistic image illustrating the delicate balance between closeness and distance in a relationship."
    },
    {
      "title": "Harmony or Discord: Navigating Emotional Turmoil's Inevitability",
      "content": [
        "As 'Badaboum' unfolds, a poignant question emerges: In life's symphony, is stumbling upon emotional turmoil an inevitable note? The haunting beauty of Hooverphonic's composition explores life's probabilistic nature, suggesting encounters with toxicity might be an unavoidable aspect of the human experience.",
        "Reflect on whether navigating emotional turmoil is intrinsic to life's journey, pondering the probability of encountering those who cause distress along the way. Embark on a contemplative journey through the unpredictability of life's emotional landscapes with 'Badaboum.' The song becomes a poignant soundtrack to life's uncertainties, prompting reflection on the twists and turns that shape our emotional landscapes.",
        "Hooverphonic's composition raises a contemplative query on whether navigating emotional turmoil is an intrinsic part of life's journey. In the pursuit of love and self-discovery, does the probability of encountering those who cause emotional distress become an unavoidable chapter in the narrative of our lives? 'Badaboum' becomes a soundtrack to life's uncertainties, prompting us to reflect on the inevitable twists and turns that shape our emotional landscapes."
      ],
      "keywords": ["life's symphony", "emotional turmoil", "human experience", "unavoidable encounters"],
      "prompt": "A photorealistic image capturing the unpredictable nature of life's emotional landscapes."
    },
    {
      "title": "Catastrophic Thoughts: Prelude to Despair or Resilience?",
      "content": [
        "In the melodic cascade of 'Badaboum,' a profound question lingers: Can catastrophic thoughts, like haunting refrains, become crippling echoes in the human psyche? The song delicately unravels the tapestry of the mind, exploring the potency of negative thinking. The lyrics suggest that dwelling on catastrophic scenarios can be akin to a musical crescendo, building into a paralyzing force that impedes personal growth.",
        "As the haunting notes play on, 'Badaboum' becomes a poignant exploration of the emotional toll of such thoughts. The composition implies that these dark melodies have the potential to trap individuals in a cycle of self-destructive contemplation, hindering the pursuit of happiness. The narrative within the song encourages reflection on the weight of catastrophic thoughts and their impact on our mental landscapes.",
        "However, amidst the shadows, 'Badaboum' also hints at the possibility of a transformative counterpoint. Can the very echoes that threaten to be crippling also serve as a prelude to resilience? The song prompts us to consider whether, like a musical resolution, navigating through catastrophic thoughts may lead to a symphony of strength and emotional fortitude."
      ],
      "keywords": ["catastrophic thoughts", "negative thinking", "emotional fortitude", "transformative counterpoint"],
      "prompt": "A photorealistic image symbolizing the intricate dance between dark thoughts and the resilience of the human mind."
    },
    {
      "title": "Navigating Life's Symphony with 'Badaboum': From Despair to Hope",
      "content": [
        "In the haunting echoes of life's catastrophes explored in 'Badaboum,' a resounding question emerges: How did we descend into the hellish symphony of our own thoughts, and can we find our way back to the harmonious horizons of hope? The song, with its introspective lyricism and emotive melodies, metaphorically paints a journey into the depths of personal struggles, confronting the darkness within.",
        "As the composition weaves through the complexities of toxic relationships, encounters with emotional turmoil, and the paralyzing grip of catastrophic thoughts, it leaves us at a crucial juncture—a juncture of introspection and potential rebirth. Amidst the tumultuous cadence of life, 'Badaboum' becomes not just a symphony of trials but a testament to the enduring human spirit.",
        "It encourages us to look beyond the cacophony of our struggles, towards the promise of brighter days on the horizon. As the narrative unfolds, it becomes apparent that the intricate dance of love and relationships explored in 'Badaboum' delves into the complexity of human connections. The intertwining of sex and love, often likened to powerful drugs, reveals that these intense emotions can lead one to cross paths with the wrong person."
      ],
      "keywords": ["life's symphony", "personal struggles", "enduring human spirit", "brighter days"],
      "prompt": "A photorealistic image representing the journey from despair to hope, inspired by the symphony of life."
    }
  ]
}
  `

const rest = `
  {
    "categories": ["Love", "Relationships", "Life", "Society", "Philosophy"],
    "keywords": ["navigating the complexities of love"],
    "metadata": {
      "title": "Is Navigating the Complexities of Love a Symphony or Discord in Life's Journey?",
      "description": "Embark on a journey through the symphony of love, exploring challenges and potential harmonies in life's intricate dance.",
      "prompt": "A photorealistic illustration capturing the delicate balance between love's complexities and life's unpredictable journey.",
      "variations": {
        "titles": [
          {"text": "Does Love's Complexity Harmonize or Discord in Life's Intricate Symphony?"},
          {"text": "Navigating Love's Intricacies: A Symphony or Discord in Life's Journey?"},
          {"text": "Can Life's Journey Harmonize Love's Complexity or Descend into Discord?"},
          {"text": "Exploring Love's Complexity: A Symphony or Discord in Life's Unique Journey?"}
        ],
        "descriptions": [
          {"text": "Embark on a journey through the symphony of love, exploring challenges and potential harmonies in life's intricate dance."},
          {"text": "Delve into the intricate dance of love, navigating challenges and seeking harmonies in the symphony of life's journey."},
          {"text": "Can love's complexities find harmony in life's journey? Explore the intricate dance and potential resolutions."},
          {"text": "Discover the symphony of love amidst life's complexities, navigating challenges and seeking harmonies along the journey."}
        ]
      },
      "misc": {
        "lantern": [
          {"text": "Unlock the secrets of love's symphony as we navigate life's intricate journey together."},
          {"text": "Embark on a profound exploration of love's complexities and the harmonious possibilities within life's journey."},
          {"text": "Join us on a journey through the symphony of love, unraveling challenges and discovering the beauty within life's intricate dance."},
          {"text": "Experience the transformative power of love's symphony as we navigate life's journey, embracing both challenges and harmonies."}
        ],
        "comments": [
          {"text": "This article beautifully captures the nuances of love and life's journey. A must-read!"},
          {"text": "Navigating love's complexities is an art, and this article does it with elegance and insight."},
          {"text": "I appreciate the exploration of love's symphony and the intricate dance within life's journey."},
          {"text": "The title drew me in, and the content delivered a thoughtful reflection on love and life."},
          {"text": "A symphony of words that resonates with the challenges and beauty of love's journey."},
          {"text": "This article provides a fresh perspective on love, navigating complexities with grace."},
          {"text": "The exploration of love's complexities is profound, and the writing is captivating."},
          {"text": "I enjoyed the journey through love's symphony and the insights into life's intricate dance."},
          {"text": "The title poses an intriguing question, and the article provides a rich exploration of the topic."},
          {"text": "Navigating love's complexities is beautifully portrayed in this well-crafted article."}
        ]
      }
    }
  }  
  `

const music = `
  In the evocative and haunting composition "Badaboum" by Hooverphonic, the Belgian band seamlessly weaves together layers of melancholy and introspection. The song's ethereal melody serves as a captivating backdrop to thought-provoking lyrics that delve into the complexities of human emotions and relationships. The title itself, an onomatopoeic representation of a sudden, impactful event, foreshadows the emotional depth explored within the song.

The narrative unfolds like a poetic exploration of love and its intricate dance, challenging conventional notions ingrained in us from a young age. Hooverphonic invites listeners to reconsider the role of distance in relationships, pondering whether it is not merely a choice but an essential element for personal growth. The lyrics subtly question the formalities often associated with matters of the heart, urging us to embrace genuine, unguarded expressions of love.

The haunting beauty of "Badaboum" extends beyond its melodic nuances to confront the inevitability of encountering emotional turmoil in life's symphony. The song delicately explores the probabilistic nature of such encounters, suggesting that, like the unpredictability of music, moments with toxic individuals might be an unavoidable part of the human experience. Amidst the shadows, the composition hints at the possibility of resilience, portraying catastrophic thoughts as potential preludes to emotional fortitude.

Overall, "Badaboum" stands as a testament to Hooverphonic's ability to craft emotionally charged and intellectually stimulating music. The song's melancholic charm, coupled with its profound exploration of love, emotional turmoil, and resilience, leaves a lasting impression that transcends the boundaries of conventional pop music.
  `

// ----------------------------------------------------------------

require('dotenv').config({ path: '../.env' })
const path = require('path');
const yaml = require('js-yaml');
// const axios = require('axios');
const fs = require('fs');
const matter = require('gray-matter');
const cheerio = require('cheerio');

const unsplashAPIKey = process.env.UNSPLASH_ACCESS_KEY;

const directory = '../src/posts/';
const files = fs.readdirSync(directory);

(async () => {

  // Process each file
  for (const file of files) {

    const startTime = performance.now();

    // Check if the file has a .md extension
    if (file.endsWith('.md')) {
      let filePath = `${directory}/${file}`;
      let json = convertJson(filePath);

      if (json.head.tags.length <= 5) {
        const numVariations = 1
        let finalContent = []
        for (let index = 0; index < numVariations; index++) { // no variations for unsplash

          finalContent[index] = await Promise.all(JSON.parse(article).sections.map(async (section, index) => {
            const title = `## ${section.title}`

            let markdown = ''
            // if (index !== 0) { // skip introduction

            const photo = await getRandomUnsplashImage(section.keywords)
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
          const photo = await getRandomUnsplashImage(JSON.parse(rest).keywords)
          // const photo = await getDallEImage(JSON.parse(rest).metadata.prompt + ', digital art', true)

          const yamlMusic = {
            track: json.head.track,
            versions: json.head.versions
          }

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
date: ${new Date(json.head.date).toISOString().slice(0, -5) + 'Z'}
featured: ${photo.urls.raw}&auto=format&fit=crop&q=80
alt: ${photo.alt_description}
name: ${photo.user.name}
handle: ${photo.user.username}
keywords: ${JSON.parse(article).keyword}
original: ${file}
tags: [${JSON.parse(rest).categories},blog,formal,featured,processed]
layout: layouts/post.njk
${yaml.dump(yamlMusic)}
${yaml.dump(JSON.parse(rest).metadata.misc)}
---
`
          try {
            // const filePath = `./src/formal/${file.slug}.md`
            const filePath = `../src/posts/${createSlug(JSON.parse(article).keyword)}.md`
            // const filePath = `./src/featured/${JSON.parse(rest).keywords.map(createSlug).join('-')}-${index + 1}.md`
            fs.writeFileSync(filePath, frontmatter + finalContent[index].join('\n'), 'utf-8');
            console.log(`Content has been successfully written to ${filePath}`);

            const sourceDirectory = directory;
            const destinationDirectory = '../formalize/processed';
            const fileName = file;

            const sourcePath = path.join(sourceDirectory, fileName);
            const destinationPath = path.join(destinationDirectory, fileName);

            // Move the file
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

        const endTime = performance.now();
        console.log(`Elapsed time: ${convertMillis(endTime - startTime)}`);
      }
    }
  }
})();

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
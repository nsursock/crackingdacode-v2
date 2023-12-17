
// config.js

module.exports = {
  tags: [
    'Art', 'Basic Income', 'Business', 'Creativity', 'Culture', 'Economy',
    'Education', 'Entertainment', 'Environment', 'Equality', 'Family', 'Fitness',
    'Future', 'Health', 'History', 'Humor', 'Justice', 'Life', 'Love', 'Philosophy',
    'Politics', 'Productivity', 'Psychology', 'Relationships', 'Science', 'Sexuality',
    'Society', 'Wellness', 'World',
  ],

  // Add other configuration options as needed
  promptArticle: `
  Your assignment is to meticulously refine the provided document in the following manner:
  
  1. Systematically formalize each section by structuring paragraphs with precision
  2. Thoroughly scrutinize each section, inclusive of the introduction (initial section):
     - Formulate an appropriate title derived from the content of the section.
     - Discern and designate 1 long tail keyword (a minimum of 4 words) pertinent to the section.
     - Present an image prompt suitable for dall-e, illustrating the section with a photorealistic image.
     - Indicate word count.
  3. Endeavor to identify seamless transitions between sections, adhering to a maximum of 2 sentences 
    per transition and write it at the end of the section.
  4. Conscientiously pinpoint 1 long tail keyword (comprising at least 4 words) for the entire article, 
    seamlessly incorporating it in a natural manner within each section.
  5. Based on the document provided, please identify a single compelling word, create an attention-grabbing 
    headline, and craft a concise paragraph (1 or 2 sentences) to promote the article.
  
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
  `,

  promptRest: `
  ## Categories
  Determine the primary category for the chosen article from the available options: ${this.tags}.
  Identify four secondary categories for the chosen article from the provided options: ${this.tags}.
  Ensure the primary category is listed first in the array.
  
  ## Keywords
  Identify one long tail keyword (consisting of at least 4 words) for the article.
  
  ## Title
  Devise a formal title for the article adhering to the following specifications:
  - Utilize title capitalization.
  - Pose the title as a question and maintain a length of 10 to 12 words.
  - Incorporate a balanced mix of common, uncommon, powerful, and emotional words, with the 
    distribution being 20-30% common words, 10-20% uncommon words, 10-15% emotional words, and a minimum of 1 power word.
  
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
  Compose four formal sentences, each spanning 15-20 words, designed to progressively persuade
     skeptics and effectively market the article.
  
  ## Comments
  Generate ten, positive formally articulated comments tailored for the article, each spanning 50-60 words.
  
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
  `,

  promptMusic:
    `Write a 150-200 words formal positive critic of the following song (response should be text without a title of 3 or 4 paragraphs): `

};
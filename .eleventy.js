const yaml = require('js-yaml')
const format = require('date-fns/format')
const { devMode, statPwd } = require('./src/_data/env')
const websiteId = 'ca5ab971-2008-4b4e-b29b-291db540c3af'

module.exports = function (eleventyConfig) {

  // Utility functions
  eleventyConfig.addFilter('latest', function (items) {
    return items.reverse().slice(0, 9)
  })

  eleventyConfig.addFilter('format', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  eleventyConfig.addNunjucksFilter("json", function (value) {
    return JSON.stringify(value);
  });

  // Statistics functions
  eleventyConfig.addNunjucksAsyncFilter('top', async function (posts, callback) {
    let token = (await (await fetch(
      'https://statumami.vercel.app/api/auth/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: statPwd,
        }),
        // agent: httpsAgent,
      }
    )).json()).token

    let endAt = new Date().getTime()
    startAt = new Date().getTime() - 30 * 24 * 60 * 60 * 1000

    let data = await fetch(
      `https://statumami.vercel.app/api/websites/${websiteId}/metrics?startAt=${startAt}&endAt=${endAt}&type=url`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    let json = await data.json()
    let tops = json?.filter((item) => item.x.includes('/blog/') || item.x.includes('/featured/'))
      .filter((item) => !item.x.includes('just-solution'))

    tops = tops.map((top) => {
      const index = posts.findIndex((post) => post.url === top.x)
      if (index !== -1) return posts[index]
    }).filter((top) => top !== undefined)

    callback(
      null,
      tops?.slice(0, Math.min(tops.length, 3))
    )
  })

  // Copy static assets
  eleventyConfig.addPassthroughCopy("static");

  // Set up Markdown for posts
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("src/featured/*.md");
  });

  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents))

  return {
    format: "html",
    dir: {
      input: "src",
      output: "dist",
      // includes: "_includes",
      // data: "_data"
    },
    htmlTemplateEngine: 'njk',
  };
};

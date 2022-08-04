const less = require('less');
const crypto = require("crypto");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/images': '/images',
    'src/fonts': '/fonts',
    'src/files': '/files',
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addWatchTarget("./src/less/");
  eleventyConfig.addWatchTarget("./src/images/");
  eleventyConfig.addWatchTarget("./src/fonts/");
  eleventyConfig.addWatchTarget("./src/files/");

  // build less - see `src/content/_less.liquid`
  eleventyConfig.addTransform('less', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await less.render(content).then(result => result.css);
    }
    return content;
  });

  // cache buster
  // adapted from https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  const bust = crypto.randomBytes(20).toString('hex');
  this.bust = bust;
  eleventyConfig.addFilter('bust', (url) => {
    const [ urlPart, paramPart ] = url.split('?');
    const params = new URLSearchParams(paramPart || '');
    params.set('v', bust);
    return `${urlPart}?${params}`;
  });

  return {
    dir: {
      input: 'src/pages',
    },
  };
};

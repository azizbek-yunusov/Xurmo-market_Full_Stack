const createSlug = (string) => {
  let slug = string.toLowerCase().replace(/\s+/g, '-'); 
  slug = slug.replace(/[^a-zA-Z0-9\-]+/g, '');
  return slug;
}

module.exports = {
  createSlug,
};
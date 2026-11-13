export default function (eleventyConfig) {
  // Static files copied as-is
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Services / menu items, sorted by "order" field
  eleventyConfig.addCollection("services", (api) =>
    api
      .getFilteredByGlob("src/services/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("telLink", (phone = "") => "tel:" + phone.replace(/[^\d+]/g, ""));
  eleventyConfig.addFilter("mapsLink", (a = {}) =>
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent([a.street, a.city, a.state, a.zip].filter(Boolean).join(", "))
  );
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  // "9:00 AM – 6:00 PM" -> "09:00-18:00" (schema.org openingHours format). Returns "" if unparseable.
  eleventyConfig.addFilter("hours24", (str = "") => {
    const t = [...str.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi)].map(([, h, m = "00", ap]) => {
      let hr = parseInt(h, 10) % 12;
      if (ap.toLowerCase() === "pm") hr += 12;
      return String(hr).padStart(2, "0") + ":" + m;
    });
    return t.length === 2 ? `${t[0]}-${t[1]}` : "";
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

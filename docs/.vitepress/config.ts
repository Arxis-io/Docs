export default {
  lang: "nl-NL",
  title: "eCatalog Docs",
  description: "eCatalog Docs",

  themeConfig: {
    repo: "Arxis-io/eCatalog",
    docsDir: "docs",

    editLinks: false,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [{ text: "Home", link: "/" }],

    sidebar: {
      "/": getGuideSidebar(),
      "/ecat/": getGuideSidebar(),
      "/ltx/": getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: "eCat",
      children: [
        { text: "Intro", link: "/ecat/intro" },
        { text: "Specs", link: "/ecat/specs" },
        { text: "Samples", link: "/ecat/samples" },
        { text: "Archief", link: "/ecat/archive" },
      ],
    },
    {
      text: "LTX",
      children: [
        { text: "Intro", link: "/ltx/intro" },
        { text: "Specs", link: "/ltx/specs" },
        { text: "Samples", link: "/ltx/samples" },
        { text: "Archief", link: "/ltx/archive" },
      ],
    },
  ];
}

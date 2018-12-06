var N050 = "#FAFBFC";
var N100 = "#F7F9FA";
var N400 = "#D4D8DB";
var N900Primary = "#1B2733";

var purple800 = "#BF73E6";
var deepPurple800 = "#8257D9";
var indigo800 = "#4D4DBF";
var blue800 = "#2483B3";
var lightBlue800 = "#17A1E6";
var teal800 = "#00B3B3";
var green800 = "#39BF7C";
var lime800 = "#ADCC14";
var orange800 = "#FF8C19";

var navy900 = "#031F29";

var yellow800 = "#FFC600";
var red800 = "#FF4040";

Redoc.init(
  "open-api.yaml",
  {
    theme: {
      spacing: {
        unit: 5,
        sectionHorizontal: ({ spacing }) => spacing.unit * 8,
        sectionVertical: ({ spacing }) => spacing.unit * 8
      },
      breakpoints: {
        small: "50rem",
        medium: "85rem",
        large: "105rem"
      },
      colors: {
        tonalOffset: 0.3,
        primary: {
          main: teal800
        },
        success: {
          main: green800
        },
        warning: {
          main: yellow800
        },
        error: {
          main: red800
        },
        text: {
          primary: N900Primary,
          secondary: ({ colors }) => colors.text.primary
        },
        responses: {
          success: {
            color: () => N100,
            backgroundColor: ({ colors }) => colors.success.main
          },
          error: {
            color: ({ colors }) => colors.error.main,
            backgroundColor: ({ colors }) => colors.error.main
          },
          redirect: {
            color: orange800,
            backgroundColor: ({ colors }) => colors.responses.redirect.color
          },
          info: {
            color: lightBlue800,
            backgroundColor: ({ colors }) => colors.responses.info.color
          }
        },
        http: {
          get: green800,
          post: blue800,
          put: lime800,
          options: purple800,
          patch: deepPurple800,
          delete: indigo800,
          basic: N400,
          link: lightBlue800,
          head: purple800
        }
      },
      schema: {
        linesColor: theme => theme.colors.primary.main,
        defaultDetailsWidth: "75%",
        typeNameColor: theme => theme.colors.text.secondary,
        typeTitleColor: theme => theme.schema.typeNameColor,
        requireLabelColor: theme => theme.colors.error.main,
        labelsTextSize: "0.9em",
        nestingSpacing: "1em",
        nestedBackground: N050,
        arrow: {
          size: "1.1em",
          color: theme => theme.colors.text.secondary
        }
      },
      typography: {
        fontSize: "14px",
        lineHeight: "1.5em",
        fontWeightRegular: "400",
        fontWeightBold: "600",
        fontWeightLight: "300",
        fontFamily: "Roboto, sans-serif",
        smoothing: "antialiased",
        optimizeSpeed: true,
        headings: {
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400"
        },
        code: {
          fontSize: "13px",
          fontFamily: "Courier, monospace",
          lineHeight: ({ typography }) => typography.lineHeight,
          fontWeight: ({ typography }) => typography.fontWeightRegular,
          color: red800,
          backgroundColor: "rgba(38, 50, 56, 0.05)",
          wrap: false
        },
        links: {
          color: ({ colors }) => colors.primary.main,
          visited: ({ typography }) => typography.links.color,
          hover: ({ typography }) => typography.links.color
        }
      },
      menu: {
        width: "300px",
        backgroundColor: navy900,
        textColor: N100,
        groupItems: {
          textTransform: "uppercase"
        },
        level1Items: {
          textTransform: "none"
        },
        arrow: {
          size: "1.5em",
          color: theme => theme.menu.textColor
        }
      },
      logo: {
        maxHeight: ({ menu }) => menu.width,
        maxWidth: ({ menu }) => menu.width
      },
      rightPanel: {
        backgroundColor: navy900,
        width: "45%",
        textColor: N100
      },
      codeSample: {
        backgroundColor: ({ rightPanel }) => rightPanel.backgroundColor
      }
    }
  },
  document.getElementById("redoc-container")
);

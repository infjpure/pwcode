export const fileNames = {
  html: "/index.html",
  css: "/styles.css",
  javascript: "/index.js",
};

export const localFileName = "sandpack-files";

export const souceCodeDefault = {
  html: `
<!DOCTYPE html>
<html>

<head>
  <title>Hello Project</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <h1>Hello world</h1>

  <script src="/index.js"></script>
</body>

</html>`.trim(),
  css: `
body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}`.trim(),
  javascript: `
console.log('Hello, world!');
`.trim(),
};

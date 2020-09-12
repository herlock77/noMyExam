module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  }, list: function (filelist) {
    var list = '<ul>';
    filelist.forEach((filename) => {
      list = list + `<li><a href="/page/${filename}">${filename}</a></li>`;
    });
    list = list + '</ul>';
    return list;
  }
}

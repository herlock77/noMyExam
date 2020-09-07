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
  },
  list: function (topics) {
    var list = '<ul>';
    var i = 0;
    while (i < topics.length) {
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  },
  authorSelect: function (authors) {
    var tag = '';
    authors.forEach((author) => {
      tag += `<option value = ${author.id}> ${author.name} </option> `;
    });
    return `<select name = 'author' >
                ${tag}
            </select>`;
  },
  authorSelect: function (authors, selected_id) {
    var tag = '';
    authors.forEach((author) => {
      if (author.id === selected_id) {
        tag += `<option value = ${author.id} selected> ${author.name} </option> `;
      } else {
        tag += `<option value = ${author.id}> ${author.name} </option> `;
      }

    });
    return `<select name = 'author' >
                ${tag}
            </select>`;
  }
}

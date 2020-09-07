var template = {
    html:function(title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEBa - ${title}</title>
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

    list:function(_filelist){
        var _urllist = `<ul>\n`;
        _filelist.forEach(filename => {
        _urllist += `\t\t\t<li><a href="/?id=${filename}"> ${filename} </a></li>\n`
        });
        _urllist += `</ul>\n`; 
        return _urllist;
    }
}

module.exports = template;
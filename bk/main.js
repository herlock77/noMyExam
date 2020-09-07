var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

//var template = require('/lib/template.js');

const { report } = require('process');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  var title = queryData.id;

  if(pathName === "/"){
    if(queryData.id === undefined){
      title = 'Welcome';
      description = "Hello, Node.js!!!";

      fs.readdir('./data', (err, filelist) => {
        response.writeHead(200);
        response.end(template.html(title, template.list(filelist),
                      `<h2>${title}</h2> <p>${description}</p>`,
                      `<a href="/create"> Create </a>`));
      });
    } else {
      var urllist = "";
      fs.readdir('./data', (err, filelist) => {
        urllist = template.list(filelist);
      });

      fs.readFile("data/"+title, 'utf8', (e, description) => {
        response.writeHead(200);
        response.end(template.html(title, urllist, 
                `<h2>${title}</h2> <p>${description}</p>`, 
                `<a href="/create"> Create </a> 
                <a /href="/update?id=${title}">update</a>
                <form action = "delete_process" method = "post" >
                  <input type = "hidden" name = "id" value ="${title}">
                  <input type = "submit" value = "delete">
                </form>`));
      });
    }  
  } else if ( pathName === "/create") {
    title = 'Create';
    description = `
        <form action = "/process_create" method = "POST">
        <P><input type = "text" name="title"></P>
        <P>
            <textarea name="description"></textarea>
        </P>
        <p>
            <input type = "submit">
        </p>
        </form>
      `;
    
    fs.readdir('./data', (err, filelist) => {
      response.writeHead(200);
      response.end(template.html(title, template.list(filelist) , 
                `<h2>${title}</h2> <p>${description}</p>`,
                `<a href="/create"> Create </a>`));
    });
  } else if( pathName === "/process_create"){
    title = 'Create Process';
    description = 'Now Processing.';
    
    if (request.method == 'POST') {
      var body = '';
      request.on('data', (data) => {
        body += data;
        if(body.length > 1e6);
      })
      
      request.on('end', () => {
        var post = qs.parse(body);
        fs.writeFile(`data/${post.title}`, post.description, 'utf8', (e) =>{
          response.writeHead(200);
          response.end('failed to save..');
        });
        response.writeHead(302, {Location: `/?id=${post.title}`});
      response.end();
      });      
    }
  } else if(pathName === "/update"){
    title = queryData.id;
    
    var urllist = "";
    fs.readdir('./data', (err, filelist) => {
      urllist = template.list(filelist);
    });

    fs.readFile("data/"+title, 'utf8', (e, description) => {
      var formTmpl = `
        <form action = "/process_update" method = "POST">
          <P>
            <input type = "text" name="new_title" value = "${title}" >
            <input type = "hidden" name="title" value = "${title}" >
          </P>
          <P>
            <textarea name="description">${description}</textarea>
          </P>
          <p>
            <input type = "submit">
          </p>
        </form>`;     

      response.writeHead(200);
      response.end(template.html(title, urllist, 
              `<h2>${title}</h2> <p>${formTmpl}</p>`, 
              `<a href="/create"> Create </a>`));
    });
  } else if(pathName === "/process_update") {
    title = 'Update Process';
    description = 'Now Update Processing.';

    if (request.method == 'POST') {
      var body = '';
      request.on('data', (data) => {
        body += data;
        if(body.length > 1e6);
      })
      
      request.on('end', () => {
        var post = qs.parse(body);

        fs.rename(`data/${post.title}`, `data/${post.new_title}`, (e) =>{
          console.log(`Rename complete! : ${post.title} -> ${post.new_title}`);
          fs.writeFile(`data/${post.new_title}`, post.description, 'utf8', (e) =>{
            if(e) throw(e);
            console.log("파일 저장에 실패하였습니다.");
          });
        });

        response.writeHead(302, {Location: `/?id=${post.new_title}`});
        response.end();
      });
      
    }
  } else if(pathName === "/delete_process") {
    title = 'delete Process';
    description = 'Now deleting Processing.';

    if (request.method == 'POST') {
      var body = '';
      request.on('data', (data) => {
        body += data;
        if(body.length > 1e6);
      })
      
      request.on('end', () => {
        var post = qs.parse(body);
        console.log(post.id);
        fs.unlink(`data/${post.id}`, (e) =>{
          response.writeHead(302, {Location: `/`});
          response.end();
        });        
      });      
    }
  }else {
    response.writeHead(404);
    response.end('Not Found');
  }
});

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

app.listen(3000);
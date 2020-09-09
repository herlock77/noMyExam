var db = require('./db.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var sanitizeHTML = require('sanitize-html');


exports.list = function (request, response) {
    db.query(`select id, title from topic`, (err, topics) => {
        if (err) throw (err);

        db.query(`select * from author`, (err2, authors) => {
            if (err2) throw err2;

            var title = 'Author List';
            var list = template.list(topics);
            var html = template.HTML(sanitizeHTML(title), list,
                '',
                `<h2>${title}</h2>
                ${template.authorTable(authors)}
                <form action="/author/create_process" method="post">
                    <p><input type="text" name="name" placeholder="author name"></p>
                    <p>
                    <textarea name="proflie" placeholder="author's profile"></textarea>
                    </p>
                    <p>
                    <input type="submit" value = "Add Author">
                    </p>
                </form>`
            );
            response.writeHead(200);
            response.end(html);
        });

    });
}

exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var name = post.name;
        var profile = post.proflie;
        db.query('insert into author (name, profile) values (?, ?)',
            [name, profile],
            (err, result) => {
                if (err) throw err;

                response.writeHead(302, { Location: `/author` });
                response.end();
            });
    });
}

exports.update = function (request, response) {
    db.query(`select id, title from topic`, (err, topics) => {
        if (err) throw (err);
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`select * from author`, (err2, authors) => {
            if (err2) throw err2;
            db.query(`select * from author where id = ?`,
                [Number(queryData.id)],
                (err3, author) => {
                    if (err3) throw err3;

                    var title = 'Author List';
                    var list = template.list(topics);
                    var html = template.HTML(title, list,
                        '',
                        `<h2>${title}</h2>
                            ${template.authorTable(authors)}
                            <form action="/author/update_process" method="post">
                                <input type = hidden name = "author_id" value = "${queryData.id}">
                                <p><input type="text" name="name" placeholder="author name" value = "${sanitizeHTML(author[0].name)}"></p>
                                <p>
                                <textarea name="proflie" placeholder="author's profile">${sanitizeHTML(author[0].profile)}</textarea>
                                </p>
                                <p>
                                <input type="submit" value = "Update">
                                </p>
                            </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
        });
    });

}

exports.update_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        console.log(post);
        // var name = post.name;
        var profile = post.proflie;
        // var author_id = Number(post.author_id);
        db.query('update author set name = ?, profile =? where id = ?',
            [post.name, profile, post.author_id],
            (err, result) => {
                if (err) throw err;

                response.writeHead(302, { Location: `/author` });
                response.end();
            });
    });
}

exports.delete_process = function (request, response) {
    var body = '';
    request.on('data', (data) => {
        body = body + data;
    });
    request.on('end', () => {
        var post = qs.parse(body);
        db.query('delete from topic where author_id = ?', [post.author_id], (err, result) => {
            if (err) throw err;
            db.query('delete from author where id = ?', [post.author_id], (err2, result) => {
                if (err2) throw err2;

                response.writeHead(302, { Location: `/author` });
                response.end();
            });
        });

    });
}

require('dotenv').config();

const Client = require('ftp')
const fs = require('fs');
const moment = require('moment');
const tar = require('tar');

const config = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS
};

const c = new Client();
const file = `${moment().format('MM-DD-YYYY')}.tgz`;

const targz = () => tar.c({ gzip: true, file },
    [process.env.BACKUP_FOLDER]
);

c.on('ready', function() {
//   c.list(function(err, list) {
//     if (err) throw err;
//     console.dir(list);
    
    

//     c.end();
//   });

    targz().then(_ => {
        c.put(file, `www/${file}`, function(err) {
            console.log('err', err);            
            if (err) throw err;
            console.log('uploaded success');            
            c.end();
        });
    });
});

c.connect({...config});
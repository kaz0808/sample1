const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imgfile')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });
app.use(express.static('imgfile'));
app.get('/', (req, res) => {
    // カレントディレクトリ
    const path = process.cwd();
    // ファイル名の一覧
    const filenames = fs.readdirSync('imgfile');
    console.log(filenames);
    res.render('index.ejs', { filenames: filenames });
});
app.post('/upload', upload.single('image'), (req, res) => {
    // ファイルの情報は req.file でアクセスできる
    console.log(req.file);

    // ファイルのアップロードが成功した場合の処理
    if (req.file) {
        console.log('File uploaded successfully');
        res.redirect('/');
    } else {
        console.log('Failed to upload file');
        res.redirect('/');
    }
});
app.post('/display', (req, res) => {
    const path = process.cwd();
    const displaytype = req.body.displaytype;
    const time= req.body.time;
    const images = fs.readdirSync('imgfile');
    console.log(time);
        console.log(displaytype);
    res.render('display.ejs', { images,time,displaytype});
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
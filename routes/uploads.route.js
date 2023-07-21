const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');


const upload = multer({ dest: './public/uploads'});


router.get("/",   (req, res) => {
    const html = fs.readFileSync("./pages/index.html", 'utf-8');
    res.send(html);
})

router.post("/", upload.single("avatar"), async (req, res) => {
    // res.send(req.file.path.split('/').slice(1).join('/'));

    // const html = fs.readFileSync("./pages/render.html", 'utf-8');
    // res.send(html);

    try {
        if(!req.file) {
            res.status(400).json({msg: "No file uploaded"});
            return;
        }
        res.status(200).json(req.file.path);
    } catch (error) {   
        res.status(500).json(error);
    }
})

module.exports = router;  
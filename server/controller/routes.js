var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './client/public/uploaded_images'); // set the destination
    },
    filename: function(req, file, callback){
    	console.log(file)
        callback(null, file.originalname); // set the file name and extension
    }
});
var upload = multer({storage: storage});

var router = express.Router();

var html_creator = require('../helpers/html_creator.js');

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.post('/fileupload', upload.single('myFile'), (req,res) => {
	res.json({result: "Image Uploaded"})
});

router.get('/images', function(req,res){
	var images = []
	fs.readdirSync(path.join(__dirname, '../../client/public/uploaded_images')).forEach((name) => {
		images.push(name)
	});
	res.json(images)
});

module.exports = router;
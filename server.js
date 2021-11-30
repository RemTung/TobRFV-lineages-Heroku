var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const newickToAuspiceJson = require('./src/parseNewick');

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, "save." + file.originalname.split(".").pop() )
  }
});

var upload = multer({ storage: storage }).array('file');

// run the usher command; create output files in './public/temp'
app.get('/', (req, res) => {
  exec("docker exec usher usher -i ./data/temp/global_assignments.pb -v ./data/temp/save.vcf -u -d ./data/temp/", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });  
  return res.end();
}); 

// read './public/temp/uncondensed-final-tree.nh if it exists'
// write ./public/temp/update.json for auspice to display the new tree
app.get('/tree', (req, res) => {
  try {
    const content = fs.readFileSync(__dirname + '/public/temp/uncondensed-final-tree.nh');
    const auspiceJson = newickToAuspiceJson('tree', content.toString(), 'merged.sorted.bam');
    fs.writeFileSync(__dirname + '/public/temp/update.json', JSON.stringify(auspiceJson), (error) => {
      if (error) {
        console.log(error);
      }
    });
    return res.end(content.toString());
  } catch (err) {
    return res.end();
  }
});

// clean all newly created files in './public' folder
// returns './public' folder to its original state
app.get('/clean', (req, res) => {
  exec("npm run build", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
  });  
  return res.end();
})

// stores the uploaded file in './public/temp' folder
app.post('/upload', (req, res) => {
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
  
    return res.status(200).send(req.file)

  })

});

app.listen(7000, function() {

  console.log('Server running on port 7000');

});
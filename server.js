var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, "save." + file.originalname.split(".").pop() )
  }
});

var upload = multer({ storage: storage }).array('file');

app.get('/', (req, res) => {
  exec("docker exec usher usher -i ./data/global_assignments.pb -v ./data/calls.vcf.gz -u -d ./data/output/", (error, stdout, stderr) => {
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

app.get('/tree', (req, res) => {
  try {
    const content = fs.readFileSync(__dirname + '/public/output/uncondensed-final-tree.nh');
    return res.end(content.toString());
  } catch (err) {
    return res.end();
  }
});

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    exec("docker exec usher usher -i ./data/global_assignments.pb -v ./data/calls.vcf.gz -u -d ./data/output/", (error, stdout, stderr) => {
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
  
    return res.status(200).send(req.file)

  })

});

app.listen(7000, function() {

  console.log('Server running on port 7000');

});
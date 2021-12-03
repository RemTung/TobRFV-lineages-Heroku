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
    // read the tree
    const content = fs.readFileSync(__dirname + '/public/temp/uncondensed-final-tree.nh');
  
    // get a list of newly added nodes
    const stats = fs.readFileSync(__dirname + '/public/temp/placement_stats.tsv');
    const lines = stats.toString().split('\n');
    var nodes = [];
    for (var i = 0; i < lines.length; i++) { 
      nodes.push(lines[i].split('\t')[0]);    
    }
    nodes.pop();

    // convert newick to json
    const auspiceJson = newickToAuspiceJson('tree', content.toString(), nodes);

    // create json file
    if (fs.existsSync(__dirname + '/public/temp/update.json')) {
      // remove update.json if it already exists
      fs.unlinkSync(__dirname + '/public/temp/update.json');
    }
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

// read './public/temp/placement_stats.tsv' and
//   return a list of objects representing each node
app.get('/stat', (req, res) => {
  try {
    const content = fs.readFileSync(__dirname + '/public/temp/placement_stats.tsv');
    const lines = content.toString().split('\n');
    var result = [];
    for (var i = 0; i < lines.length -  1; i++) { 
      var node = {};
      node.id = lines[i].split('\t')[0];
      node.parsimony_score = lines[i].split('\t')[1];
      node.num_parsimony_optimal_placements = lines[i].split('\t')[2];
      result.push(node);    
    }
    return res.send(result);
  } catch (err) {
    return res.end();
  }  
})

// read './public/temp/placement_stats.tsv' and 
//   return a list of newly added node names
app.get('/nodes', (req, res) => {
  try {
    const content = fs.readFileSync(__dirname + '/public/temp/placement_stats.tsv');
    const lines = content.toString().split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) { 
      result.push(lines[i].split('\t')[0]);    
    }
    result.pop();
    return res.send(result);
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
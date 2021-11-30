### How to run the program locally?

1. Install UShER using docker

   git clone https://github.com/yatisht/usher.git

   cd usher

   docker build --no-cache -t usher install/

   docker run -p 8000:8000 -v "{the directory you downloaded the program}\ToBRFV-lineages\public:/HOME/usher/data" -t -i usher /bin/bash

2. Rename the newly created docker container to "usher"

   docker rename <orignal_name> usher

3. Run "npm install"

4. Run "npm start"

### Important Notes

1. The usher container in docker needs to be running while running this program

2. The web app only supports uploading one file for now

### How to use the web page and how it works?

1. Upload a .fasta file to the file dropbox

2. Click "Upload" button. It sends a post request to the express server running in the background (see server.js). The file uploaded is then stored in './public/save.fasta'.

3. Click "Start analysis" button. It sends a get reqest to the express server which responds by executing an UShER command to produce three output files in './public' folder: 'mutation-paths.txt', 'placement_stats.tsv' and 'uncondensed-final-tree.nh'. 'uncondensed-final-tree.nh' contains the new tree in newick format to be displayed.

_Note: (a) You need to have the usher container in docker running for this button to work
(b) For now, it ignores the uploaded fasta and uses './public/calls.vcf' instead. (To be updated)_

4. Click "Update tree". It sends a get request to the express server which reads './public/uncondensed-final-tree' and responds with the newick string. The phylogenetic tree then displays the returned newick string. A new json file named 'update.json' will also appears in './auspice'. It is prepared for auspice to visualize the new tree (see ./src/parseNewick.js for details about how the json file is produced).

5. Click "Visualize with auspice". There should be a new link named "update" which will display the new tree.

6. You can go back to the react page and refresh the page so that you can upload another file. By refreshing the page, all newly created files in './public' are deleted. This is necessary if you want to upload a new file.

### TODO

1. complete Docs page

2. Complete My data page

3. color the newly added node in the new tree

4. convert fasta to vcf

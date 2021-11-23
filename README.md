### How to run the program locally?

1. Install UShER using docker

   git clone https://github.com/yatisht/usher.git
   cd usher
   docker build --no-cache -t usher install/
   docker run -p 8000:8000 -v "<{the directory you downloaded the program}\ToBRFV-lineages\public>:/HOME/usher/data" -t -i usher /bin/bash

2. Rename the newly created docker container to "usher"

   docker rename <orignal_name> usher

3. Run "npm install"

4. Run "npm start"

### Important Notes

1. The usher container in docker needs to be running while running this program

2. The web app only supports uploading one file for now

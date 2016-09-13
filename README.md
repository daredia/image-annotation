# image-annotation
  > Image annotation endpoint and admin panel
  
## Getting Started

First, make sure mongodb is installed locally. Then, from within the root directory:
```sh
npm install
npm start
```

Import and run these [Postman requests](https://www.getpostman.com/collections/6accabf871dada638334) to populate the db with sample tasks. 
- The first request creates a task with `with_labels` set to `false`
- The second request creates a task with `with_labels` set to `true`
- The third request fetches all `pending` tasks from the db

Then visit localhost on port 4567 to access the admin panel. 

## Going Forward

Please see the [Issues tab](https://github.com/daredia/image-annotation/issues) for a list of known issues and suggested enhancements

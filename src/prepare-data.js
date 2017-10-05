
const _ = require('lodash');
const toMarkdown = require('to-markdown');
const slugify = require('slugify')
const fs = require('fs');
const path = require('path');

// JSON Zoo export used as input
const nodes = require('../imports/content/task-forces.json')

// Output of prepared data.
const jsonPath = path.join(__dirname, '..', 'imports', 'content', 'zoo.json');
const fieldTypes = ['textpro', 'textareapro'];

function parse(items) {
  let r = {};

  _.map(items, (i) => {
    if (fieldTypes.indexOf(i.type) != -1) {

      if (i.name == 'Task Force Number'){
        r.number = i.data['0'].value;
      }

      if (i.name == 'Chairs'){
        let a = i.data['0'].value.split('&');
        if (a.length === 1) a = i.data['0'].value.split(' and ');

        r.chairs = a.map((v) => v.trim());
      }

      if (i.name == 'TF Description'){
        r.content = {
          leadParagraph: toMarkdown(i.data['0'].value),
          body: i.data['1'] ? toMarkdown(i.data['1'].value) : ''
        };
      }
    }
  });

  return r;    
}

  module.exports = {
    process: () => {
      const data = JSON.stringify(_.map(nodes.items, (o) => {
        const e = parse(o.elements)
        
        return {
          title: o.name,
          slug: slugify(o.name.trim().toLowerCase()),
          number: e.number, 
          chairs: e.chairs, 
          leadParagraph: e.content.leadParagraph, 
          body: e.content.body
        };
      }));
      
      if(fs.existsSync(jsonPath)){
        console.log('A file already exists, deleting it...');
        fs.unlink(jsonPath, function(err, data){
          if (err){
            console.log(err);
          } else {
            console.log('Output file deleted.');
          }
        });
      }
    
      fs.writeFile(jsonPath, data, {flag: 'w+'}, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('File saved! Ready to import');
      }); 
    }
  };


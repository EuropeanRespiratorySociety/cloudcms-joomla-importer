# Joomla importer
[This tutorial](https://idealley.gitbooks.io/cloud-cms-how-to-manage-menus/content/) walks you trough the different steps to create a menu graph that is connected to your content graph:

## Aim
* Import from Zoo
* Import from other components [comming]

## Setup
The setup of Cloud CMS is handled by a CLI. You need to provide API Keys. If you do not have any [check the documentation](https://www.cloudcms.com/apikeys.html).
Then clone this repository and:
* `$ npm install`
* `$ node setup`
    * select **Zoo Setup importer**
* run again `$ node setup` (soon option will be back)
    * select **Zoo Import content**

The first step imports models and forms, the second content.
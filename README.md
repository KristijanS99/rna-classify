# rna-classify
Classify RNA structures into 'harmful' and 'unharmful' sequences based on LTSM network of sequences from <https://rnacentral.org/search?q=rna>.

Harmful are sequences found in <https://www.malacards.org/> provider from RNACentral as such those sequences are associated with a disease.
 
Unharmful are sequences that are not present on MalaCards and are not known to be associated with a disease yet.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```
cp .env.example .env
```
Fill in the values in the .env file.

```sh
npm install
npm run dev
```

Your app should now be running on [localhost:8080](http://localhost:8080/) unless changes have been made to the PORT variable.

## Building

```
npm run build
```
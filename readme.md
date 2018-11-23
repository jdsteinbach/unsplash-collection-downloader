# Unsplash Collection Downloader

A node module to download an Unsplash collection of your choice into a directory of your choice

## Installation

```sh
npm i -g unsplash-collection-downloader
```

## Authorization

[Register an app](https://unsplash.com/developers) and get your own keys from Unsplash.

Create `.env` and add your keys:

```
ACCESS_KEY=YOUR_ACCESS_KEY_HERE
SECRET_KEY=YOUR_SECRET_KEY_HERE
```

## Choose a Collection

You can add the collection ID to your `.env`. This is useful if you have a single collection you always want this package to retrieve:

```
COLLECTION_ID=YOUR_COLLECTION_ID
```

Or, you can pass the collection ID with a flag when you run the package. This allows you to download specific collections easily:

```sh
$ unsplash-collection-downloader --c=116851
```

## Choose a Directory

Images will be downloaded to the directory you run this package in.

You can override that directory with a flag (_do not_ include a trailing slash):

```sh
$ unsplash-collection-downloader --dir="path/dir"
```

## Pagination

This plugin requires paginated requests to run properly with Unsplash's API. The default value is `25`. If you run into any issues that require you to reduce the number of images per page, there's a flag for that override too:

```sh
$ unsplash-collection-downloader --p=10
```

## Roadmap

* [ ] Add tests
* [ ] Better error handling
* [ ] Flag for specific image size, maybe?

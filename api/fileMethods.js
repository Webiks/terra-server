const express = require('express');
const config = require('../config/configJson');
const fs = require('fs-extra');

module.exports = function() {
    this.setOptions = (uploadDir) => {
        return {
            encoding: 'utf-8',
            maxFileSize: config.maxFileSize,
            uploadDir: uploadDir,
            multiples: true, // req.files to be arrays of files
            keepExtensions: true
        };
    };

    this.findFileType = (reqType) => {
        const splitReqType = (reqType).split('/');
        if (splitReqType[1] === 'tiff' || splitReqType[1] === 'tif' ){
            return 'raster';
        }
        else{
            return 'vector';
        }
    };

    this.renameFile = (temp_path, new_path) => {
        fs.rename(temp_path, new_path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`success to save the '${new_path}'!`);
            }
        });
    };

    this.removeFile = (filePath) => {
        fs.remove(filePath, err => {
            if (err) return console.error(err);
            console.log(`the file '${filePath}' was removed!'`);
        });
    };

    this.writeFile = (dirpath, file) => {
        fs.writeFile(dirpath, JSON.stringify(file), 'utf8', err => {
            if (err) return console.error(err);
        });
    };

    this.fileToZip = (filename, uploadPath) => {
        // define the layers parameters for the zip operation
        return [
            {
                content: '',
                name: filename,
                mode: 0o755,
                comment: '',
                date: new Date(),
                type: 'file' },
            {
                path: uploadPath,
                name: 'uploads'
            }
        ];
    };
};

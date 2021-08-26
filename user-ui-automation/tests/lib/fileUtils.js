const fs = require('fs');
const writeJsonFile = require('write-json-file');

module.exports = {

    fileExists: function(path)
    {
        return fs.existsSync(path);
    },
    filesInFolder: function(folderPath)
    {
        return fs.readdirSync(folderPath);
    },
    modificationTime: function(filePath)
    {
        return fs.statSync(filePath).mtime;
    },
    fileExists: function(filePath)
    {
        return fs.existsSync(filePath);
    },
    readFile: function(path)
    {
        let data = null;
        try {
            const rawdata = fs.readFileSync(path);
            data = JSON.parse(rawdata);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        return data;
    },

    createDirectoryIfNotExists(path)
    {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    },

    copyFile: function(path1, path2)
    {
        fs.copyFileSync(path1, path2, (err) => {
            if (err){
                console.log(err);
                throw err;
            }
        });
    },

    openImageStream: function(imagePath) {
        const s = fs.createReadStream(imagePath);
        return s;
    },

    writeJsonFile: function(filePath, jsonContent)
    {
        writeJsonFile.sync(filePath, {jsonContent});
    },

    deleteFile: function(filePath)
    {
        fs.unlinkSync(filePath);
    },

    writeImage(data, filePath)
    {
        fs.writeFileSync(filePath, data, 'base64');
    },

    getAllLines: function(filePath)
    {
        const lines = [];
        fs.readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach(function(line){
            lines.push(line);
        });
        return lines;
    },

    writeTxtInFile(filePath, txt)
    {
        fs.writeFileSync(filePath, txt);
    },

    renameFile(oldFilePath, newFilePath)
    {
        fs.renameSync(oldFilePath, newFilePath);
    }
}
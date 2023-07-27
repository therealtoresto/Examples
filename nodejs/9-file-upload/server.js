const createError = require('http-errors');
const express = require('express');
const multer = require('multer');

const path = require('node:path');
const fs = require('node:fs').promises;

const app = express();
const uploadDir = path.join(process.cwd(), 'uploads');
const storageImage = path.join(process.cwd(), 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1048576
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('picture'), async (req, res, next) => {
    const { description } = req.body;
    const { path: temporaryName, originalname } = req.file;
    const fileName = path.join(storageImage, originalname);

    try {
        await fs.rename(temporaryName, fileName);
    } catch (err) {
        await fs.unlink(temporaryName);
        return next(err);
    }

    res.json({ description, message: 'File successfuly uploaded', status: 200 });
});

// 404
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message, status: err.status });
});

const isAccessible = async (path) => {
    return fs.access(path)
        .then(() => true)
        .catch(() => false);
};

const createFolder = async (folder) => {
    if (!(await isAccessible(folder))) {
        await fs.mkdir(folder);
    }
};

const PORT = 8000;

app.listen(PORT, 'localhost', async () => {
    createFolder(uploadDir);
    createFolder(storageImage);

    console.log(`Express server is started on ${PORT} port`);
});
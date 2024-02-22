import multer from 'multer';

// Configure multer to specify where to store uploaded files and their filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for uploaded files
  }
});

// Create the multer instance with the configured storage options
const upload = multer({ storage: storage });

export { upload };

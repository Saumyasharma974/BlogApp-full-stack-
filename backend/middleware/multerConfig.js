import multer from 'multer';
import path from 'path';

// Set up the Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the folder where files will be uploaded temporarily
        cb(null, 'utils/');  // This folder will store the files temporarily
    },
    filename: (req, file, cb) => {
        // Define the file naming convention
        const ext = path.extname(file.originalname);  // Get the file extension (e.g., .jpg, .png)
        cb(null, Date.now() + ext);  // Add timestamp to avoid name conflicts
    }
});

// Set up file upload limits and filters
const upload = multer({
    storage: storage, // The storage configuration defined above
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Define allowed file formats
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedFormats.includes(file.mimetype)) {
            return cb(new Error('Only JPG and PNG formats are allowed'));
        }
        cb(null, true);  // Accept the file if it's valid
    }
});

// Export the multer configuration
export default upload;

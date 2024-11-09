import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; 
import { Button, Box } from '@mui/material'; 
const ShopMore = () => {
  const pdfFile = '/pdfs/CigarettesCatalog.pdf';

  return (
    <Box 
      position="relative" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" 
    >
      {/* PDF Viewer Component with Worker */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
  <Viewer fileUrl={pdfFile} />
</Worker>

      {/* Button positioned inside the PDF viewer */}
      <a href={pdfFile} download>
        <Button
          variant="contained"
          sx={{
            position: 'absolute', 
            bottom: '1200px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#0056b3', 
            },
          }}
        >
          Download PDF
        </Button>
      </a>
    </Box>
  );
};

export default ShopMore;
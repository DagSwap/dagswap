import React from 'react'

const ViewPdfPage = () => {
  // Make sure to place your PDF file in the /public directory
  const pdfUrl = '/DagSwapDex.pdf'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <iframe
        src={pdfUrl}
        title='PDF Viewer'
        style={{ flexGrow: 1, border: 'none' }}
        width='100%'
      />
    </div>
  )
}

export default ViewPdfPage

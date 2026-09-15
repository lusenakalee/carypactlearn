'use client'
import React, { useState } from 'react'
import Footer from './Footer'

export default function SiteFooter() {
      const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
        const [pdfModalOpen, setPdfModalOpen] = useState(false);
      
    
  return (
    <div>
          {/* Footer */}
              <Footer
                onOpenPdf={() => setPdfModalOpen(true)}
                onOpenNewsletter={() => setNewsletterModalOpen(true)}
              />
    </div>
  )
}

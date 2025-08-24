import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ToneAnalysis } from '../types';

// Fallback PDF export without canvas capture
export const exportToPDFSimple = (analysis: ToneAnalysis) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Email Tone Analysis Report', 20, yPosition);
    yPosition += 15;

    // Date
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    pdf.text(`Generated on: ${currentDate}`, 20, yPosition);
    yPosition += 15;

    // Separator line
    pdf.setDrawColor(229, 231, 235);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Overall Sentiment
    pdf.setFontSize(16);
    pdf.setTextColor(31, 41, 55);
    pdf.text('Overall Sentiment Analysis', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(14);
    pdf.text(`Sentiment: ${analysis.overallSentiment.toUpperCase()}`, 25, yPosition);
    yPosition += 8;
    pdf.text(`Confidence: ${Math.round(analysis.confidence * 100)}%`, 25, yPosition);
    yPosition += 15;

    // Tone Breakdown
    pdf.setFontSize(16);
    pdf.text('Tone Breakdown', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    Object.entries(analysis.tones).forEach(([tone, score]) => {
      pdf.text(`${tone.charAt(0).toUpperCase() + tone.slice(1)}: ${Math.round(score)}%`, 25, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    // Keywords
    pdf.setFontSize(16);
    pdf.text('Key Words', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    const keywordsText = analysis.keywords.join(', ');
    const keywordsLines = pdf.splitTextToSize(keywordsText, pageWidth - 40);
    pdf.text(keywordsLines, 25, yPosition);
    yPosition += keywordsLines.length * 6 + 10;

    // Suggestions
    pdf.setFontSize(16);
    pdf.text('AI Suggestions', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    analysis.suggestions.forEach((suggestion, index) => {
      const suggestionText = `${index + 1}. ${suggestion}`;
      const suggestionLines = pdf.splitTextToSize(suggestionText, pageWidth - 40);
      pdf.text(suggestionLines, 25, yPosition);
      yPosition += suggestionLines.length * 6 + 5;
    });

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    const footerY = pdf.internal.pageSize.getHeight() - 15;
    pdf.text('Email Tone Analyzer - AI-Powered Analysis', 20, footerY);

    // Save
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.T]/g, '-');
    const filename = `email-tone-analysis-simple-${timestamp}.pdf`;
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error('Simple PDF export failed:', error);
    return false;
  }
};

export const exportToPDF = async (analysis: ToneAnalysis, elementId: string) => {
  try {
    console.log('Starting visual PDF export...');
    
    // Show loading state
    const exportButton = document.querySelector('#export-btn') as HTMLButtonElement;
    if (exportButton) {
      exportButton.disabled = true;
      exportButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Capturing Dashboard...
      `;
    }

    // Get the element to convert to PDF - this should be the main results content
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Dashboard element not found:', elementId);
      console.log('Falling back to simple PDF export...');
      const success = exportToPDFSimple(analysis);
      if (success) {
        console.log('Simple PDF export successful');
        return true;
      }
      throw new Error('Dashboard content not found for PDF export');
    }

    console.log('Dashboard element found, preparing for capture...');
    
    // Temporarily modify styles for better PDF capture
    const originalStyles = {
      backgroundColor: element.style.backgroundColor,
      minHeight: element.style.minHeight,
      width: element.style.width,
      overflow: element.style.overflow,
    };
    
    // Add PDF export class for better styling
    element.classList.add('pdf-export-ready');
    
    // Set styles for better PDF capture
    element.style.backgroundColor = '#ffffff';
    element.style.minHeight = 'auto';
    element.style.width = 'auto'; // Ensure full width
    element.style.overflow = 'visible'; // Ensure nothing is hidden
    
    // Also apply to parent container if it exists
    const parentContainer = element.parentElement;
    if (parentContainer) {
      parentContainer.classList.add('pdf-export-ready');
      parentContainer.style.overflow = 'visible';
    }
    
    // Wait a moment for styles to apply
    await new Promise(resolve => setTimeout(resolve, 800));

    if (exportButton) {
      exportButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Rendering Dashboard...
      `;
    }
    
    // Configure html2canvas options for high-quality dashboard capture
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp text and graphics
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: element.offsetWidth, // Use offsetWidth instead of scrollWidth
      height: element.offsetHeight, // Use offsetHeight instead of scrollHeight
      scrollX: 0,
      scrollY: 0,
      x: 0, // Ensure capture starts from left edge
      y: 0, // Ensure capture starts from top edge
      logging: false,
      removeContainer: false,
      foreignObjectRendering: true, // Enable for better CSS rendering
      imageTimeout: 15000, // Longer timeout for complex content
      onclone: (clonedDoc, clonedElement) => {
        // Ensure all styles are properly cloned and full width is captured
        const clonedStyles = clonedDoc.querySelectorAll('*');
        clonedStyles.forEach((el: any) => {
          if (el.style) {
            // Force visible backgrounds for cards and components
            if (el.classList?.contains('glass') || el.classList?.contains('bg-white')) {
              el.style.backgroundColor = '#ffffff';
              el.style.opacity = '1';
            }
            // Ensure gradients are visible
            if (el.style.background?.includes('gradient')) {
              el.style.opacity = '1';
            }
            // Ensure full width is maintained
            if (el.style.width) {
              el.style.minWidth = el.style.width;
            }
          }
        });
        return clonedElement;
      }
    });

    // Restore original styles
    element.classList.remove('pdf-export-ready');
    element.style.backgroundColor = originalStyles.backgroundColor;
    element.style.minHeight = originalStyles.minHeight;
    element.style.width = originalStyles.width;
    element.style.overflow = originalStyles.overflow;
    
    // Restore parent container if modified
    if (parentContainer) {
      parentContainer.classList.remove('pdf-export-ready');
      parentContainer.style.overflow = '';
    }

    console.log('Dashboard captured successfully, creating PDF...');

    if (exportButton) {
      exportButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating PDF...
      `;
    }

    // Calculate PDF dimensions for optimal dashboard display
    const imgData = canvas.toDataURL('image/png', 1.0); // Max quality PNG
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to preserve dashboard appearance and prevent content cutoff
    const margin = 15; // Standard margin
    const availableWidth = pdfWidth - (margin * 2); // Equal margins on both sides
    const availableHeight = pdfHeight - 40; // Space for header
    
    const widthRatio = availableWidth / (imgWidth / 2); // Divide by 2 due to scale factor
    const heightRatio = availableHeight / (imgHeight / 2);
    const ratio = Math.min(widthRatio, heightRatio);
    
    const finalWidth = (imgWidth / 2) * ratio;
    const finalHeight = (imgHeight / 2) * ratio;

    console.log('PDF layout calculated, adding dashboard content...');

    // Add minimal header
    pdf.setFontSize(18);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Email Tone Analysis Dashboard', margin, 20);
    
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    pdf.text(`Generated: ${currentDate}`, margin, 27);

    // Add the dashboard screenshot - centered to prevent content cutoff
    const startY = 35;
    const centerX = (pdfWidth - finalWidth) / 2; // Center the content to prevent cutoff
    
    if (finalHeight <= (pdfHeight - startY - 10)) {
      // Single page - centered to show full content
      pdf.addImage(imgData, 'PNG', centerX, startY, finalWidth, finalHeight);
    } else {
      // Multiple pages needed for full dashboard
      const pageHeight = pdfHeight - startY - 10;
      const totalPages = Math.ceil(finalHeight / pageHeight);
      
      console.log(`Dashboard requires ${totalPages} pages`);
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
          // Minimal header for continuation pages
          pdf.setFontSize(14);
          pdf.setTextColor(59, 130, 246);
          pdf.text('Dashboard (continued)', margin, 15);
          pdf.setDrawColor(229, 231, 235);
          pdf.line(margin, 18, pdfWidth - margin, 18);
        }
        
        const yOffset = i * pageHeight;
        const remainingHeight = Math.min(pageHeight, finalHeight - yOffset);
        
        // Calculate source coordinates for this page
        const srcY = (yOffset / finalHeight) * imgHeight;
        const srcHeight = (remainingHeight / finalHeight) * imgHeight;
        
        // Create canvas for this page section
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCanvas.width = imgWidth;
          pageCanvas.height = srcHeight;
          
          // Draw the section of the dashboard for this page
          pageCtx.drawImage(canvas, 0, srcY, imgWidth, srcHeight, 0, 0, imgWidth, srcHeight);
          
          const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
          const pageStartY = i === 0 ? startY : 25;
          
          // Use centered positioning for all pages to prevent cutoff
          pdf.addImage(pageImgData, 'PNG', centerX, pageStartY, finalWidth, remainingHeight);
        }
      }
    }

    // Add footer with analysis info
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    const footerY = pdfHeight - 8;
    pdf.text(
      `Sentiment: ${analysis.overallSentiment.toUpperCase()} | Confidence: ${Math.round(analysis.confidence * 100)}% | Email Tone Analyzer`, 
      margin, 
      footerY
    );

    console.log('PDF assembly complete, saving...');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:.T]/g, '-');
    const filename = `email-tone-dashboard-${timestamp}.pdf`;

    // Save the PDF
    pdf.save(filename);

    console.log('Dashboard PDF saved successfully:', filename);

    // Show success message
    if (exportButton) {
      exportButton.innerHTML = `
        <svg class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Dashboard Saved!
      `;
      
      // Reset after 3 seconds
      setTimeout(() => {
        if (exportButton) {
          exportButton.innerHTML = `
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          `;
          exportButton.disabled = false;
        }
      }, 3000);
    }

    return true;
  } catch (error) {
    console.error('Dashboard PDF export failed:', error);
    
    // Try fallback simple export
    console.log('Attempting fallback simple PDF export...');
    try {
      const success = exportToPDFSimple(analysis);
      if (success) {
        console.log('Fallback PDF export successful');
        
        // Show success message for fallback
        const exportButton = document.querySelector('#export-btn') as HTMLButtonElement;
        if (exportButton) {
          exportButton.innerHTML = `
            <svg class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Text PDF Saved
          `;
          
          setTimeout(() => {
            if (exportButton) {
              exportButton.innerHTML = `
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              `;
              exportButton.disabled = false;
            }
          }, 3000);
        }
        return true;
      }
    } catch (fallbackError) {
      console.error('Fallback export also failed:', fallbackError);
    }
    
    // Reset button state on error
    const exportButton = document.querySelector('#export-btn') as HTMLButtonElement;
    if (exportButton) {
      exportButton.disabled = false;
      exportButton.innerHTML = `
        <svg class="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Export Failed
      `;
      
      // Reset after 5 seconds
      setTimeout(() => {
        if (exportButton) {
          exportButton.innerHTML = `
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          `;
        }
      }, 5000);
    }
    
    // Show user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    alert(`Failed to export dashboard as PDF: ${errorMessage}\n\nTips:\n• Try the "Simple PDF" button for text-based export\n• Refresh the page and try again\n• Check browser console for details`);
    return false;
  }
};

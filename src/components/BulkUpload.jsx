import { useState } from 'react';
import { parseDocument } from '../utils/simplePdfParser';
import './BulkUpload.css';

/**
 * Bulk Upload Component
 * Allows uploading multiple medical records at once
 * Supports TXT, PDF, DOC, DOCX files
 */
function BulkUpload({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    setResults([]);
    setCurrentFileIndex(0);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    setResults([]);
    setCurrentFileIndex(0);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const processFile = async (file) => {
    try {
      // Use the documentParser to handle all file types
      const result = await parseDocument(file);

      if (result.success) {
        return {
          fileName: result.fileName,
          text: result.text,
          fileType: result.fileType,
          fileSize: result.fileSize,
          status: 'success'
        };
      } else {
        return {
          fileName: result.fileName,
          fileType: result.fileType,
          error: result.error,
          status: 'error'
        };
      }
    } catch (error) {
      return {
        fileName: file.name,
        error: error.message || 'Failed to process file',
        status: 'error'
      };
    }
  };

  const processAllFiles = async () => {
    setProcessing(true);
    const processedResults = [];

    for (let i = 0; i < files.length; i++) {
      setCurrentFileIndex(i);
      try {
        const result = await processFile(files[i]);
        processedResults.push(result);
      } catch (error) {
        processedResults.push(error);
      }
    }

    setResults(processedResults);
    setProcessing(false);
    setCurrentFileIndex(files.length);

    // Pass results back to parent component
    if (onUploadComplete) {
      onUploadComplete(processedResults);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setResults([]);
    setCurrentFileIndex(0);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      default:
        return '○';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'error':
        return 'status-error';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="bulk-upload-container">
      <h2>Bulk Medical Record Upload</h2>
      <p className="bulk-upload-description">
        Upload multiple medical records at once for batch processing.
        Supported formats: TXT, PDF, DOC, DOCX
      </p>

      {/* Drop Zone */}
      <div
        className={`drop-zone ${files.length > 0 ? 'has-files' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="drop-zone-content">
          <div className="drop-zone-icon">📁</div>
          <p className="drop-zone-text">
            Drag and drop files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="file-input-hidden"
            id="bulk-file-input"
          />
          <label htmlFor="bulk-file-input" className="btn-browse">
            Browse Files
          </label>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="file-list-section">
          <div className="file-list-header">
            <h3>Selected Files ({files.length})</h3>
            {!processing && results.length === 0 && (
              <button onClick={clearFiles} className="btn-clear">
                Clear All
              </button>
            )}
          </div>

          <div className="file-list">
            {files.map((file, index) => {
              const result = results[index];
              const isProcessing = processing && index === currentFileIndex;
              const isProcessed = results.length > index;

              return (
                <div
                  key={index}
                  className={`file-item ${isProcessing ? 'processing' : ''} ${
                    isProcessed ? getStatusClass(result?.status) : ''
                  }`}
                >
                  <div className="file-item-icon">
                    {isProcessing ? (
                      <div className="spinner"></div>
                    ) : isProcessed ? (
                      <span className="status-icon">
                        {getStatusIcon(result.status)}
                      </span>
                    ) : (
                      <span className="file-type-icon">📄</span>
                    )}
                  </div>
                  <div className="file-item-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                    {isProcessed && result.error && (
                      <div className="file-error">{result.error}</div>
                    )}
                    {isProcessed && result.status === 'success' && result.fileType && (
                      <div className="file-success">
                        {result.fileType.toUpperCase()} successfully parsed
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Process Button */}
          {!processing && results.length === 0 && (
            <button onClick={processAllFiles} className="btn-process">
              Process All Files
            </button>
          )}

          {/* Processing Status */}
          {processing && (
            <div className="processing-status">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(currentFileIndex / files.length) * 100}%`
                  }}
                ></div>
              </div>
              <p className="processing-text">
                Processing file {currentFileIndex + 1} of {files.length}...
              </p>
            </div>
          )}

          {/* Results Summary */}
          {results.length > 0 && !processing && (
            <div className="results-summary">
              <h3>Processing Complete</h3>
              <div className="summary-stats">
                <div className="stat-item stat-success">
                  <span className="stat-label">Successfully Parsed:</span>
                  <span className="stat-value">
                    {results.filter(r => r.status === 'success').length}
                  </span>
                </div>
                <div className="stat-item stat-error">
                  <span className="stat-label">Failed:</span>
                  <span className="stat-value">
                    {results.filter(r => r.status === 'error').length}
                  </span>
                </div>
                <div className="stat-item stat-info">
                  <span className="stat-label">Total Files:</span>
                  <span className="stat-value">
                    {results.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BulkUpload;

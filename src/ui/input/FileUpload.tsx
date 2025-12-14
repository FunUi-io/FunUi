'use client'
import React, { useState, useRef } from 'react';
import { PiCloudArrowUp, PiFile } from 'react-icons/pi';
import Button from '../button/Button';
import Text from '../text/Text';

interface FileUploadProps {
  id?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (files: FileList) => void;
  status?: 'success' | 'warning' | 'danger' | 'info' | '';
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  button?: React.ReactNode;
  btn?: boolean;
  value?: any;
  fullWidth?: boolean;
  accept?: string;
  multiple?: boolean;
  [key: string]: any;
}

export const FileUpload: React.FC<FileUploadProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id = 'fileInput',
  name,
  onChange,
  onDrop,
  status,
  label = 'Upload File',
  helperText,
  icon,
  extra,
  button,
  btn,
  value,
  fullWidth = true,
  accept,
  multiple,
  ...rest
}) => {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
    }
    if (onChange) onChange(e);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    // Only set dragging to false if we're leaving the actual drop zone
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);

      // Update the input element's files
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
          dataTransfer.items.add(files[i]);
        }
        inputRef.current.files = dataTransfer.files;

        // Trigger onChange if provided
        if (onChange) {
          const event = {
            target: inputRef.current,
            currentTarget: inputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        }
      }

      // Call onDrop callback if provided
      if (onDrop) {
        onDrop(files);
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Enhanced drag and drop styles
  const getContainerStyles = () => {
    const baseStyles = {
      border: '0.17rem dashed var(--borderColor)',
      borderRadius: '16px',
      padding: 'var(--space-5)',
      textAlign: 'center' as const,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      margin: 'auto',
      color: 'var(--text-color)',
      position: 'relative' as const,
    };

    if (isDragOver) {
      return {
        ...baseStyles,
        borderColor: 'var(--primary)',
        backgroundColor: 'var(--lighter)',
        transform: 'scale(1.02)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      };
    }

    if (isDragging) {
      return {
        ...baseStyles,
        borderColor: 'var(--primary600)',
        backgroundColor: 'var(--lighter)',
      };
    }

    return baseStyles;
  };

  const getButtonStyles = () => {
    if (isDragOver) {
      return {
        opacity: 0.8,
        transform: 'scale(1.05)',
        transition: 'all 0.2s ease',
        backgroundColor: 'var(--primary600)',
      };
    }
    return {};
  };

  // Render file info when file is selected
  const renderFileInfo = () => {
    if (!fileName) return null;

    return (
      <div className="file-info" style={{
        marginTop: 'var(--space-3)',
        padding: 'var(--space-3)',
        backgroundColor: 'var(--light)',
        borderRadius: '8px',
        border: '1px solid var(--borderColor)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        justifyContent: 'center'
      }}>
        <PiFile style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
        <Text 
          text={fileName} 
          truncate={1} 
          block 
          size='sm'
        />
      </div>
    );
  };

  if (btn) {
    return (
      <div className="fileInput" style={{ width: fullWidth ? '100%' : 'fit-content' }}>
        {button || (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{ position: 'relative' }}
          >
            <Button
              startIcon={icon || <PiCloudArrowUp />}
              bg={isDragOver ? "primary600" : "primary"}
              fullWidth={fullWidth}
              raised
              style={getButtonStyles()}
            >
              {isDragOver ? 'Drop files here' : fileName || label}
            </Button>
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          name={name}
          onChange={handleChange}
          type="file"
          value={value}
          accept={accept}
          multiple={multiple}
          className="filedInput"
          {...rest}
        />
        {renderFileInfo()}
        {helperText && (
          <div className={`input-helper-text ${status ? `helper-${status}` : ''}`} style={{ marginTop: 'var(--space-3)' }}>
            <span>{helperText}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="_upload_container"
      style={getContainerStyles()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="_upload_label">
        <div className="_upload_icon" style={{
          fontSize: '2.4rem',
          color: isDragOver ? 'var(--primary600)' : 'var(--primary)',
          marginBottom: '0.5rem',
          transition: 'color 0.3s ease',
          transform: isDragOver ? 'translateY(-2px)' : 'none'
        }}>
          {icon || <PiCloudArrowUp />}
        </div>
        <div className="_upload_text fit">
          <Text
            text={isDragOver ? 'Drop files to upload' : fileName || label}
            truncate={1}
            block
            style={{ 
              color: isDragOver ? 'var(--primary600)' : 'var(--text-color)',
              fontWeight: isDragOver ? '600' : '400'
            }}
          />
        </div>
        
        {/* Drag overlay indicator */}
        {isDragOver && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--primary)',
            opacity: 0.1,
            borderRadius: '14px',
            pointerEvents: 'none'
          }} />
        )}
        
        {/* Drag hint text */}
        {!fileName && !isDragOver && (
          <div style={{
            marginTop: 'var(--space-3)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            opacity: 0.7
          }}>
            Click or drag files to upload
          </div>
        )}
        
        {extra && <div className="text-small opacity-3" style={{ marginTop: 'var(--space-2)' }}>{extra}</div>}
      </div>
      
      <input
        ref={inputRef}
        onChange={handleChange}
        type="file"
        id={id}
        name={name}
        className="_upload_input"
        value={value}
        accept={accept}
        multiple={multiple}
        {...rest}
      />
      
      {renderFileInfo()}
      
      {helperText && (
        <div className={`input-helper-text ${status ? `helper-${status}` : ''}`} style={{ marginTop: 'var(--space-3)' }}>
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
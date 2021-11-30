import React, { useMemo } from 'react'
import { Chip, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const Dropzone = ({ files, setFiles }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'text/csv',
    onDrop: acceptedFiles => {
      setFiles(files.concat(acceptedFiles))
    }
  })


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  const deleteFile = (file) => {
    setFiles(files.filter(f => f !== file))
  }

  return (
    <div>
      <div className="dropzone" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <CloudUploadIcon />
        <Typography variant="body1" component="div">Drop your data here</Typography>
      </div>
      <div style={{ marginTop: '0.5em' }}>
        {files.map(file =>
          <Chip
            label={file.name}
            color="success"
            variant="outlined"
            style={{ marginRight: '1em' }}
            onDelete={() => deleteFile(file)}
          />)}
      </div>
    </div>
  )
}

export default Dropzone
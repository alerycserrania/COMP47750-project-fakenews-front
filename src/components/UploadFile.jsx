
import { DropzoneArea } from 'material-ui-dropzone';
import { Button, CircularProgress, TextField, Divider, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const UploadFile = ({ setData }) => {
  const [trainingProp, setTrainingProp] = useState(0.67)
  const [isLoading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [openError, setOpenError] = useState(false)

  const handleCloseError = () => {
    setOpenError(false)
  }

  const handleWithSessionId = () => {
    setLoading(true);

    fetch(BASE_URL + '/stats/' + sessionId, { method: 'get' })
      .then(result => {
        if (result.ok) { return result.json() }
        else { throw Error() }
      })
      .then(setData)
      .catch(_ => { setOpenError(true) })
      .finally(() => { setLoading(false) })
  }

  const handleChangeFiles = (newfiles) => {
    setFiles(newfiles);
  }

  const handleUploadData = () => {
    setLoading(true);

    var data = new FormData()
    data.append('data', files[0])
    data.append('training_proportion', trainingProp)


    fetch(BASE_URL + '/fit_and_predict', {
      method: 'post',
      body: data
    })
      .then(result => result.json())
      .then(setData)
      .finally(() => { setLoading(false) })
  }

  return (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        Train model from data
      </Typography>
      <DropzoneArea
        dropzoneText="Drop your data or click here"
        onChange={handleChangeFiles}
        maxFileSize={100 * 1024 * 1024}
        filesLimit={1}
        acceptedFiles={['text/csv']}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewText="Selected files"
      />
      <TextField
        label="Training Data Proportion"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: "1",
          min: "0",
          step: "0.01"
        }}
        type="number"
        value={trainingProp}
        onChange={(ev) => {
          setTrainingProp(ev.target.valueAsNumber) 
        }}
        style={{ width: '100%', marginTop: '1em' }}
      />
      <Button variant="contained" style={{ width: '100%', marginTop: '1em' }} disabled={isLoading}
        onClick={handleUploadData}>
        {isLoading ? <CircularProgress color="inherit" size={24}/> : 'Upload'}
      </Button>
      <Divider style={{marginTop: '1em'}}>OR</Divider>
      <Typography variant="h6" component="div" gutterBottom>
        Load model from session ID
      </Typography>
      <TextField
        label="Session ID"
        InputLabelProps={{
          shrink: true,
        }}
        value={sessionId}
        onChange={(ev) => {
          setSessionId(ev.target.value) 
        }}
        style={{ width: '100%', marginTop: '1em' }}
      />
      <Button variant="contained" style={{ width: '100%', marginTop: '1em' }} disabled={isLoading}
        onClick={handleWithSessionId}>
        {isLoading ? <CircularProgress color="inherit" size={24}/> : 'Load Model'}
      </Button>
      <Typography />
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Can't find model with this id!
        </Alert>
      </Snackbar>
    </>
  );
}

export default UploadFile;

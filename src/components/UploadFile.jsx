
import { DropzoneArea } from 'material-ui-dropzone';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const UploadFile = ({ setData }) => {
  const [trainingProp, setTrainingProp] = useState(0.67)
  const [isLoading, setLoading] = useState(false)
  const [files, setFiles] = useState([])

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
    </>
  );
}

export default UploadFile;

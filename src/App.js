import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Grid } from '@mui/material';
import UploadFile from './components/UploadFile';
import Analysis from './components/Analysis';
import { useState } from 'react'
import { CssBaseline } from '@material-ui/core';


const App = () => {

  const [data, setData] = useState(null)

  const resetData = () => {
    setData(null)
  }

  return (
    <div className="App">
      <CssBaseline>
      <Grid container spacing={2}>
        {data !== null ?
          (<Grid item xs={12}>
            <Analysis data={data} resetData={resetData} />
          </Grid>)
          : (
            <>
              <Grid item md={3} xs={0} />
              <Grid item md={6} xs={12}>
                <UploadFile setData={setData} />
              </Grid>
              <Grid item md={3} xs={0} />
            </>)
        }
      </Grid>
      </CssBaseline>
    </div>
  );
}

export default App;

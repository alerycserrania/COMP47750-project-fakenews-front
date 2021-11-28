import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Grid } from '@mui/material';
import UploadFile from './components/UploadFile';
import Analysis from './components/Analysis';
import { useState } from 'react'


const App = () => {

  const [data, setData] = useState(null)
  console.log(data)
  return (
    <div className="App">
      <Grid container spacing={2}>
        {data !== null ?
          (<Grid item xs={12}>
            <Analysis data={data} />
          </Grid>)
          : (
            <>
              <Grid item md={3} xs={0} />
              <Grid item md={6} xs={12}>
                <UploadFile setData={setData}  />
              </Grid>
              <Grid item md={3} xs={0} />
            </>)
        }
      </Grid>
    </div>
  );
}

export default App;

import { Grid, Typography, Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer, PolarRadiusAxis, Label, BarChart, XAxis, YAxis, CartesianGrid, Bar, Brush, RadialBarChart, RadialBar } from 'recharts';

const COLORS = ['blue', 'red']
const COLORS_U = ['grey', 'lightgrey']

const Analysis = ({ data }) => {

  const dataArticles = Object.keys(data['nb_articles'])
    .map(key => ({ name: key, value: data['nb_articles'][key] }))

  const dataWords = Object.keys(data['nb_words'])
    .map(key => ({ name: key, value: data['nb_words'][key] }))

  const realWordsPop = data['words_popularity_in_order']['real'].map(val => ({
    name: val[0],
    value: val[1]
  }))

  const fakeWordsPop = data['words_popularity_in_order']['fake'].map(val => ({
    name: val[0],
    value: val[1]
  }))

  const tn = data['confusion_matrix'][0][0]
  const fp = data['confusion_matrix'][0][1]
  const fn = data['confusion_matrix'][1][0]
  const tp = data['confusion_matrix'][1][1]

  const precision = 100 * tp / (tp + fp)
  const recall = 100 * tp / (tp + fn)
  const accuracy = 100 * (tp + tn) / (tp + tn + fp + fn)
  const f1 = (2 * precision * recall) / (precision + recall)

  const renderLabel = (entry) => {
    return entry.value
  }

  const renderPourcentage = (entry) => {
    return entry.toFixed(2) + '%'
  }

  const getMaxAngle = (data) => {
    return 270 * Math.min(data || 0, 1000) / 1000;
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={0} md={2} />
      <Grid item container xs={12} md={8} >
        <Grid item xs={12}>
          <Typography variant="h3" component="div" gutterBottom>
            Analysis Report
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h5" component="div" gutterBottom>
          Model Evaluation
        </Typography>
        </Grid>

        {/* Accuracy */}
        <Grid item xs={12} md={3} style={{ height: '180px', padding: '0 10px' }}>
          <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
            <Typography variant="h6" component="div" gutterBottom>
              Accuracy
            </Typography>
            <ResponsiveContainer height='70%'>
              <PieChart width={300} height={150}>
                <Pie data={[{ name: 'accuracy', value: accuracy }, { name: '', value: 100 - accuracy }]} startAngle={90} endAngle={-270} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={50}>
                  {
                    [0, 1].map((_entry, index) => <Cell fill={COLORS_U[index % COLORS.length]} />)
                  }
                  <Label value={renderPourcentage(accuracy)} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Precision */}
        <Grid item xs={12} md={3} style={{ height: '180px', padding: '0 10px' }}>
          <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
            <Typography variant="h6" component="div" gutterBottom>
              Precision
            </Typography>
            <ResponsiveContainer height='70%'>
              <PieChart width={300} height={200}>
                <Pie data={[{ name: 'precision', value: precision }, { name: '', value: 100 - precision }]} startAngle={90} endAngle={-270} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={50}>
                  {
                    [0, 1].map((_entry, index) => <Cell fill={COLORS_U[index % COLORS.length]} />)
                  }
                  <Label value={renderPourcentage(precision)} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Recall */}
        <Grid item xs={12} md={3} style={{ height: '180px', padding: '0 10px' }}>
          <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
            <Typography variant="h6" component="div" gutterBottom>
              Recall
            </Typography>
            <ResponsiveContainer height='70%'>
              <PieChart width={300} height={200}>
                <Pie data={[{ name: 'recall', value: recall }, { name: '', value: 100 - recall }]} startAngle={90} endAngle={-270} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={50}>
                  {
                    [0, 1].map((_entry, index) => <Cell fill={COLORS_U[index % COLORS.length]} />)
                  }
                  <Label value={renderPourcentage(recall)} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* F1 Measure */}
        <Grid item xs={12} md={3} style={{ height: '180px', padding: '0 10px' }}>
          <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
            <Typography variant="h6" component="div" gutterBottom>
              F1 Measure
            </Typography>
            <ResponsiveContainer height='70%'>
              <PieChart width={300} height={200}>
                <Pie data={[{ name: 'f1', value: f1 }, { name: '', value: 100 - f1 }]} startAngle={90} endAngle={-270} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={50}>
                  {
                    [0, 1].map((_entry, index) => <Cell fill={COLORS_U[index % COLORS.length]} />)
                  }
                  <Label value={renderPourcentage(f1)} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        
        <Grid item xs={12}  style={{marginTop: '3em'}}>
        <Typography variant="h5" component="div" gutterBottom>
          Training data analytics
        </Typography>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={12} md={6} style={{ height: '225px', padding: '0 10px' }}>
            <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
              <Typography variant="h6" component="div" gutterBottom>
                Number of articles
              </Typography>
              <ResponsiveContainer height="90%">
                <PieChart width={300} height={200}>
                  <Legend layout="vetical" verticalAlign="middle" align="right" />
                  <Pie data={dataArticles} dataKey="value" nameKey="name" cx="40%" cy="50%" outerRadius={60} innerRadius={30} label={renderLabel}>
                    {
                      dataArticles.map((_entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} style={{ height: '225px', padding: '0 10px' }}>
            <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
              <Typography variant="h6" component="div" gutterBottom>
                Number of words
              </Typography>
              <ResponsiveContainer height="90%">
                <PieChart width={300} height={200}>
                  <Legend layout="vetical" verticalAlign="middle" align="right" />
                  <Pie data={dataWords} dataKey="value" nameKey="name" cx="40%" cy="50%" outerRadius={60} innerRadius={30} label={renderLabel}>
                    {
                      dataWords.map((_entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>

        <Grid item container xs={12} style={{ marginTop: '3em' }}>
          <Grid item xs={6} style={{ height: '400px', padding: '0 10px' }}>
            <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
              <Typography variant="h6" component="div" gutterBottom>
                Words popularity in real news
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={200}
                  data={realWordsPop}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" angle={-45} textAnchor="end" padding={{ left: 10, right: 10 }} interval={0} />
                  <YAxis x={-10} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="value" fill="blue" background={{ fill: '#eee' }} height={150} />
                  <Brush dataKey="name" height={20} y={0} stroke="#8884d8" endIndex={15} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item xs={6} style={{ height: '400px', padding: '0 10px' }}>
            <Box sx={{ p: 2, border: '1px solid #ededed', height: '100%', borderRadius: '5px' }}>
              <Typography variant="h6" component="div" gutterBottom>
                Words popularity in fake news
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={200}
                  data={fakeWordsPop}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" angle={-45} textAnchor="end" padding={{ left: 10, right: 10 }} interval={0} />
                  <YAxis x={-10} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="value" fill="red" background={{ fill: '#eee' }} height={150} />
                  <Brush dataKey="name" height={20} y={0} stroke="#8884d8" endIndex={15} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={2} />
    </Grid>
  )
}

export default Analysis;
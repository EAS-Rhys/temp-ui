import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CodeEditor from '@uiw/react-textarea-code-editor';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import tasks from './tasks.json';
import { Container } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tasks.map((task,index) => (
            <Tab label={task.name} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

{tasks.map((task,index) => (
      <CustomTabPanel value={value} index={index}>
        <TextField
        fullWidth
          label="Name"
          defaultValue={task.name}
        />
        <br/>
        <TextField
        fullWidth
          label="Description"
          defaultValue={task.description}
        />
        <br/>
        <TextField
        fullWidth
          label="Image"
          defaultValue={task.image}
        />
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <h3>Instructions</h3>
         {task.directions.map((instruction,index) => (
          <div>
        <p> <b>Instruction: </b> {instruction.instruction}</p>

        {instruction.checks.map((check) => (
          <p> <b>Check: </b>{check}</p>
        ))}
        </div>
        ))}
      


          
          </Grid>
          <Grid item xs={6}>
          <h3>Check Script</h3>
        <CodeEditor
        data-color-mode='dark'
        minHeight={400}
      value={task.check_script}
      language="shell"
      placeholder="Please enter JS code."
      // onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
    </Grid>
      </Grid>
      </CustomTabPanel>
      ))}
    </Box>
  );
}

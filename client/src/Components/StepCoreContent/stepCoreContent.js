// import { React } from 'react';

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import StepOneImageListBlock from "../StepOneImageListBlock/StepOneImageListBlock";
import Step3 from "../Step3/step3";
import Step4 from "../Step4/step4";
import Step5 from "../Step5/step5";
import DroneCatelog from "../DroneCatelog/droneCatelog";

const StepCoreContent = (props) => {
  const step = props.step;
  const setSelectedFarmLand = props.setSelectedFarmLand;
  const setdroneSelected = props.setdroneSelected;
  const selectedFarmLand = props.selectedFarmLand;
  const droneSelected = props.droneSelected;
  let component;
  switch (step + 1) {
    case 1:
      component = (
        <StepOneImageListBlock
          setSelectedFarmLand={setSelectedFarmLand}
          selectedFarmLand={selectedFarmLand}
        />
      );
      break;
    case 2:
      component = (
        <DroneCatelog
          selectedFarmLand={selectedFarmLand}
          setdroneSelected={setdroneSelected}
          handleDateRange={props.handleDateRange}
        />
      );
      break;
    case 3:
      component = (
        <Step3
          selectedFarmLand={selectedFarmLand}
          droneSelected={droneSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 4:
      component = (
        <Step4
          selectedFarmLand={selectedFarmLand}
          droneSelected={droneSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 5:
      component = (
        <Step5
          selectedFarmLand={selectedFarmLand}
          droneSelected={droneSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    default:
      break;
  }
  return (
    <Box mt={2}>
      {component}
      {selectedFarmLand && (
        <Typography sx={{ mt: 1 }}>
          {" "}
          Selected FarmLand: {selectedFarmLand.title}{" "}
        </Typography>
      )}
    </Box>
  );
};

export default StepCoreContent;

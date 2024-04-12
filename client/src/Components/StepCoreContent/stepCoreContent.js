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
  const setSelectedService = props.setSelectedService;
  const setProviderSelected = props.setProviderSelected;
  const selectedService = props.selectedService;
  const providerSelected = props.providerSelected;
  let component;
  switch (step + 1) {
    case 1:
      component = (
        <StepOneImageListBlock
          setSelectedService={setSelectedService}
          selectedService={selectedService}
        />
      );
      break;
    case 2:
      component = (
        <DroneCatelog
          selectedService={selectedService}
          setProviderSelected={setProviderSelected}
          handleDateRange={props.handleDateRange}
        />
      );
      break;
    case 3:
      component = (
        <Step3
          selectedService={selectedService}
          providerSelected={providerSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 4:
      component = (
        <Step4
          selectedService={selectedService}
          providerSelected={providerSelected}
          dateRange={props.dateRange}
        />
      );
      break;
    case 5:
      component = (
        <Step5
          selectedService={selectedService}
          providerSelected={providerSelected}
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
      {selectedService && (
        <Typography sx={{ mt: 1 }}>
          {" "}
          Selected Service: {selectedService.title}{" "}
        </Typography>
      )}
    </Box>
  );
};

export default StepCoreContent;

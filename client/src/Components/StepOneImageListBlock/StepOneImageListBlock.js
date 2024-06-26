import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import CommentIcon from "@mui/icons-material/Comment";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Radio, Typography } from "@mui/material";
import cleaning from "../../Assets/Cleaning.webp";
import driving from "../../Assets/driving.webp";
import gym from "../../Assets/gym.webp";
import painting from "../../Assets/painting.webp";
import packing from "../../Assets/packing.webp";
import plumbing from "../../Assets/plumbing.webp";
import repairs from "../../Assets/repairs.webp";
import saloon from "../../Assets/saloon.webp";
import "./StepOneImageListBlock.css";
// import { height } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StepOneImageListBlock = (props) => {
  const [checked, setChecked] = React.useState([]);

  const services = [
    {
      title: "Cleaning and Organizational Services",
      category: "At-Home sevice",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: cleaning,
      //"https://res.cloudinary.com/dtpgi0zck/image/upload/s--D1_2IbT3--/c_fill,h_580,w_860/v1/EducationHub/photos/crops-growing-in-thailand.webp",
    },

    {
      title: "Health and Wellness Services",
      category: "At-Home service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: painting,
      //   image:
      //     "http://www.encyclopediaofukraine.com/pic%5CA%5CP%5CApple%20orchard%20in%20Kyiv%20oblast.jpg",
    },
    {
      title: "Pet Services",
      category: "At-Home service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: plumbing,
      //   image:
      //     "https://www.pthorticulture.com/media/3580/promix-green-house-growing-nursery-crops-and-bark-media.jpg",
    },

    {
      title: "Home Maintenance and Repair Services",
      category: "At-Home service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: repairs,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
    {
      title: "Beauty and Personal Grooming Services",
      category: "At-Home/Studio service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: saloon,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
    {
      title: "Food and Beverage Services",
      category: "External Service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
     image: driving,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
    {
      title: "Gardening and Landscaping Services",
      category: "At-Home/External service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: gym,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
    {
      title: "Educational and Entertainment Services",
      category: "External service",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: packing,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
  ];

  const handleItemSelection = (value, index) => () => {
    const newChecked = [];
    newChecked.push(index);
    setChecked(newChecked);
    props.setSelectedService(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {services.map((value, index) => {
          return (
            <Grid item xs={3} key={index}>
              <Item>
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleItemSelection(value, index)}
                    dense
                  >
                    <ListItemIcon>
                      <Radio
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ImageListItem key={index}>
                      <img
                        src={`${value.image}?w=120&h=120`}
                        className="farmlandimages"
                        width="5px"
                        alt={" "}
                      />
                    </ImageListItem>
                  </ListItemButton>
                </ListItem>
                <Typography>{value.title}</Typography>
                <Typography>{value.category}</Typography>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default StepOneImageListBlock;

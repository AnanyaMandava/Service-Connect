import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Radio, Typography } from "@mui/material";
// import MyCrop from "./crop.jpg";
import MyFruit from "../../Assets/fruit.jpg";
import MyNursery from "../../Assets/nursery.jpg";
import MyLiveStock from "../../Assets/livestock.jpg";
import "./StepOneImageListBlock.css";
import { height } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StepOneImageListBlock = (props) => {
  const [checked, setChecked] = React.useState([]);

  const formLands = [
    {
      title: "West Plot A",
      category: "Crop",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      //   image: "./crop.jpg",
      image:
        "https://res.cloudinary.com/dtpgi0zck/image/upload/s--D1_2IbT3--/c_fill,h_580,w_860/v1/EducationHub/photos/crops-growing-in-thailand.webp",
    },

    {
      title: "North Plot B",
      category: "Fruit",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: MyFruit,
      //   image:
      //     "http://www.encyclopediaofukraine.com/pic%5CA%5CP%5CApple%20orchard%20in%20Kyiv%20oblast.jpg",
    },
    {
      title: "South Plot C",
      category: "Nursery",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: MyNursery,
      //   image:
      //     "https://www.pthorticulture.com/media/3580/promix-green-house-growing-nursery-crops-and-bark-media.jpg",
    },

    {
      title: "East Plot D",
      category: "Livestock",
      location: "2237 Old Toll Road, Mariposa CA 95195338",
      image: MyLiveStock,
      // image:
      // "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm.jpg",
    },
  ];

  const handleItemSelection = (value, index) => () => {
    console.log("Handling the selected formland", index);
    const newChecked = [];

    newChecked.push(index);

    setChecked(newChecked);
    props.setSelectedFarmLand(value);
    console.log("Saved the selected formland");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {formLands.map((value, index) => {
          return (
            <Grid item xs={6} key={index}>
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
                        // inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ImageListItem key={index}>
                      <img
                        src={`${value.image}?w=120&h=120`}
                        className="farmlandimages"
                        // srcSet={require("../../Assets/crop.jpg")}
                        // src={
                        //   "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm-280x720.jpg"
                        // }
                        // srcSet={
                        //   "https://blog.taxact.com/wp-content/uploads/TXA200201-FebBlogs-Farm-150*150.jpg?w=150&h=150"
                        // }
                        width="10px"
                        alt={" "}
                        // loading="lazy"
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

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList(props) {
  const time=props.time;
  const itemData = [
    {
      img: 'https://as1.ftcdn.net/v2/jpg/05/16/28/34/1000_F_516283457_IwCCXjVFHtLKdHahpBMFDAuyU1X5J9Iy.jpg',
      title: time,
      author: '08:00',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/00/69/02/42/1000_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.jpg',
      title: time,
      author: '08:00',
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/01/78/38/80/1000_F_178388074_v7Fi8wj1K9AydlUh59bjpSIRJR62nGMY.jpg',
      title: time,
      author: '08:20',
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/03/05/10/42/1000_F_305104292_OoLx9IXRsSUFuWKWUTH8DLG2jLmTOKbd.jpg',
      title: time,
      author: '08:56',
      cols: 2,
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/00/69/02/42/1000_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.jpg',
      title: time,
      author: '09:12',
      cols: 2,
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/01/78/38/80/1000_F_178388074_v7Fi8wj1K9AydlUh59bjpSIRJR62nGMY.jpg',
      title: time,
      author: '09:30',
      rows: 2,
      cols: 2,
      featured: true,
    }
  ];
  return (
    <ImageList sx={{ width: 800, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Service Images</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}



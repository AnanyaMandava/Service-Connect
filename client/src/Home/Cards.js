import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

export default function Cards() {
  const [overview,setOverview]=React.useState();
  
React.useEffect(()=>{
  const auth = JSON.parse(localStorage.getItem("auth"));
  const url='http://localhost:8080/agriDrone/getAllFarmerBookings/'+auth.loginjson[0].userName;
  axios.get(url).then((res)=>{
    let active=0;
    let total=0;
    res.data.map((x)=>{
      total++;
      if(x.status=="active"){
        active=active+1;
      }
    })
    setOverview({total:total,active:active});
  })
},[])

  return (<>
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="http://dslv9ilpbe7p1.cloudfront.net/gnoSzE3ZY8U7Kt8TMd1aLg_store_banner_image.jpeg"
            srcSet="http://dslv9ilpbe7p1.cloudfront.net/gnoSzE3ZY8U7Kt8TMd1aLg_store_banner_image.jpeg"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            
          </Typography>
        </CardContent>
      </Card>

      
      
    </Box>
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2, m: 0 }}
    >
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="http://dslv9ilpbe7p1.cloudfront.net/gnoSzE3ZY8U7Kt8TMd1aLg_store_banner_image.jpeg"
            srcSet="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRMYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDisZFRk3Ny0rKy0rLS0rKy0tKys3NzcrKys3Ky0tKy0tNy0rKystLSsrKy0rKysrLSsrKy0tN//AABEIAJ8BPgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAgADBAb/xAAbEAEBAQEBAQEBAAAAAAAAAAAAARESAhMDMf/EABgBAQEBAQEAAAAAAAAAAAAAAAEAAgUD/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREgIT/9oADAMBAAIRAxEAPwD7shnJd9TAkKhEJZV5UmEhUVExUajNXFREXGoxVxcc46RuMVcXHOKlajFdIYiU60zi9Oo06RimTraRitFGjQWqabU0GCoqrUVitxFRV1FZrcTUVVTWK9ImpporNaiaDgtDQqTQKYGagFmghgJIhIMUmKhZMVExUIMXERUMZq4qIio1GauLlc5VxuMVcqpXOVUrWs2OmnXPTp1nF6dc9OnVi9bUa2rVi9Gp1rVqxWptTotGmQ2otNqLWbWpGqKbU1mtxNTTRWa1E1NVU1huDU0igwVJoDTBqwIIMSMLMQYqJhQUqJMaCoqJMLK4YlXlqM1cOo0ws4uKlRKToxetqdOnWcVranSdWHW0MtWHW1OjVqxWi0DRpxrRaLQNONU1rRWWoKmmprNagTVVNDQFKaCARQ0KCAWV/BWSJghiRhBhZVDEwkKMEJCoUxULNVDEKlIUpB0sqOp06dCtbUk6sOtoC1HWA0asOgaETU2taLQWoYWhoekkUGCpNDLQFIBANFBB5A1FiGSVDBDEiYDCySDEDCmGEKMqSQqUpMpGKlMqdYjF6UaZUFtqNbTqxetqdGjVitbU6NSxWptGtqOMw0aDhtSwBaitRUWTVVILUGgEUUihoBmSZgUTCmKiCjExULNVDRrQgsWQZo2HCGZmSLaG1JejU62rVi9bUadWrFa2o1tWrFa2p1ksOtoZJmZkgxGJBiAQlVSi1SpNoMArUBpmYIghkVGJKC/NOolVCzioqIlVKhVmJioWacONDCyMGLw4lrngx15HKxa5YzryOUtc2Xw3AOoZfDcpag4ueFcnBrnjY6ctysWoxsXgxDU4FVNRFSam0NRqGlTai1qa1orLUFZgmmDBJiGRJDJKMqSguUyolMpZsdJVSucqpSzY6yqjlKuUsWOsVI5z0uUs1UiuRKuNMWp4bh1kXIsZ6ef5t83p5PBxdvL82+b1cC+VyO3n4HLvYmjD048ix0qLQ1EVNNqLQ3GtRa1qbQ3I1qLWtFoakapta0VlpqGCaahgizMyTYzWhIkMkSGSUUHUFyqiD59Fmukp6c9MpZx2lXPThKqeiLHonp08+nknpc9nWL5evz7dJ7eKfoqfq1rzvh7Z7PbxfU/U9M/N7OxfbyfUfUdH5vTfbn69uF/RN/Qa1PDtfTnfTnfab6Gtzyu+kWptTrLcirU2ijU1I1otFoBZgA0zMEWZmSY/wfwakCGRLApFgUCwKROpKCjKkkK06htQxenpz1tSx07btzTUsjt9G+jhratXLv8ARvo4adWrl27bpx06ly69DUa2pYvWSLSleqlgDjaGALMwRZmCTHoBJmZkX//Z"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent sx={{ marginTop:"35px" }}>
          <Typography
            level="h3"
            
            textColor="#1a3447"
            
            fontSize="30px"
          >
            Total Bookings <br></br> {overview && overview.total}
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQ0uOnCjD_1K1oY2uVHk_KP91PxhY1Wr3BQ&usqp=CAU"
            srcSet="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRMYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDisZFRk3Ny0rKy0rLS0rKy0tKys3NzcrKys3Ky0tKy0tNy0rKystLSsrKy0rKysrLSsrKy0tN//AABEIAJ8BPgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAgADBAb/xAAbEAEBAQEBAQEBAAAAAAAAAAAAARESAhMDMf/EABgBAQEBAQEAAAAAAAAAAAAAAAEAAgUD/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREgIT/9oADAMBAAIRAxEAPwD7shnJd9TAkKhEJZV5UmEhUVExUajNXFREXGoxVxcc46RuMVcXHOKlajFdIYiU60zi9Oo06RimTraRitFGjQWqabU0GCoqrUVitxFRV1FZrcTUVVTWK9ImpporNaiaDgtDQqTQKYGagFmghgJIhIMUmKhZMVExUIMXERUMZq4qIio1GauLlc5VxuMVcqpXOVUrWs2OmnXPTp1nF6dc9OnVi9bUa2rVi9Gp1rVqxWptTotGmQ2otNqLWbWpGqKbU1mtxNTTRWa1E1NVU1huDU0igwVJoDTBqwIIMSMLMQYqJhQUqJMaCoqJMLK4YlXlqM1cOo0ws4uKlRKToxetqdOnWcVranSdWHW0MtWHW1OjVqxWi0DRpxrRaLQNONU1rRWWoKmmprNagTVVNDQFKaCARQ0KCAWV/BWSJghiRhBhZVDEwkKMEJCoUxULNVDEKlIUpB0sqOp06dCtbUk6sOtoC1HWA0asOgaETU2taLQWoYWhoekkUGCpNDLQFIBANFBB5A1FiGSVDBDEiYDCySDEDCmGEKMqSQqUpMpGKlMqdYjF6UaZUFtqNbTqxetqdGjVitbU6NSxWptGtqOMw0aDhtSwBaitRUWTVVILUGgEUUihoBmSZgUTCmKiCjExULNVDRrQgsWQZo2HCGZmSLaG1JejU62rVi9bUadWrFa2o1tWrFa2p1ksOtoZJmZkgxGJBiAQlVSi1SpNoMArUBpmYIghkVGJKC/NOolVCzioqIlVKhVmJioWacONDCyMGLw4lrngx15HKxa5YzryOUtc2Xw3AOoZfDcpag4ueFcnBrnjY6ctysWoxsXgxDU4FVNRFSam0NRqGlTai1qa1orLUFZgmmDBJiGRJDJKMqSguUyolMpZsdJVSucqpSzY6yqjlKuUsWOsVI5z0uUs1UiuRKuNMWp4bh1kXIsZ6ef5t83p5PBxdvL82+b1cC+VyO3n4HLvYmjD048ix0qLQ1EVNNqLQ3GtRa1qbQ3I1qLWtFoakapta0VlpqGCaahgizMyTYzWhIkMkSGSUUHUFyqiD59Fmukp6c9MpZx2lXPThKqeiLHonp08+nknpc9nWL5evz7dJ7eKfoqfq1rzvh7Z7PbxfU/U9M/N7OxfbyfUfUdH5vTfbn69uF/RN/Qa1PDtfTnfTnfab6Gtzyu+kWptTrLcirU2ijU1I1otFoBZgA0zMEWZmSY/wfwakCGRLApFgUCwKROpKCjKkkK06htQxenpz1tSx07btzTUsjt9G+jhratXLv8ARvo4adWrl27bpx06ly69DUa2pYvWSLSleqlgDjaGALMwRZmCTHoBJmZkX//Z"
            loading="lazy"
            alt=""
            
            
          />
        </CardCover>
        <CardContent sx={{ marginTop:"35px" }}>
          <Typography
            level="h3"
            
            textColor="#1a3447"
            
            fontSize="30px"
          >
            Active  <br></br> {overview && overview.active}
          </Typography>
        </CardContent>
      </Card>
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src="http://dslv9ilpbe7p1.cloudfront.net/gnoSzE3ZY8U7Kt8TMd1aLg_store_banner_image.jpeg"
            srcSet="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRMYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDisZFRk3Ny0rKy0rLS0rKy0tKys3NzcrKys3Ky0tKy0tNy0rKystLSsrKy0rKysrLSsrKy0tN//AABEIAJ8BPgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAgADBAb/xAAbEAEBAQEBAQEBAAAAAAAAAAAAARESAhMDMf/EABgBAQEBAQEAAAAAAAAAAAAAAAEAAgUD/8QAGREBAQEBAQEAAAAAAAAAAAAAAAEREgIT/9oADAMBAAIRAxEAPwD7shnJd9TAkKhEJZV5UmEhUVExUajNXFREXGoxVxcc46RuMVcXHOKlajFdIYiU60zi9Oo06RimTraRitFGjQWqabU0GCoqrUVitxFRV1FZrcTUVVTWK9ImpporNaiaDgtDQqTQKYGagFmghgJIhIMUmKhZMVExUIMXERUMZq4qIio1GauLlc5VxuMVcqpXOVUrWs2OmnXPTp1nF6dc9OnVi9bUa2rVi9Gp1rVqxWptTotGmQ2otNqLWbWpGqKbU1mtxNTTRWa1E1NVU1huDU0igwVJoDTBqwIIMSMLMQYqJhQUqJMaCoqJMLK4YlXlqM1cOo0ws4uKlRKToxetqdOnWcVranSdWHW0MtWHW1OjVqxWi0DRpxrRaLQNONU1rRWWoKmmprNagTVVNDQFKaCARQ0KCAWV/BWSJghiRhBhZVDEwkKMEJCoUxULNVDEKlIUpB0sqOp06dCtbUk6sOtoC1HWA0asOgaETU2taLQWoYWhoekkUGCpNDLQFIBANFBB5A1FiGSVDBDEiYDCySDEDCmGEKMqSQqUpMpGKlMqdYjF6UaZUFtqNbTqxetqdGjVitbU6NSxWptGtqOMw0aDhtSwBaitRUWTVVILUGgEUUihoBmSZgUTCmKiCjExULNVDRrQgsWQZo2HCGZmSLaG1JejU62rVi9bUadWrFa2o1tWrFa2p1ksOtoZJmZkgxGJBiAQlVSi1SpNoMArUBpmYIghkVGJKC/NOolVCzioqIlVKhVmJioWacONDCyMGLw4lrngx15HKxa5YzryOUtc2Xw3AOoZfDcpag4ueFcnBrnjY6ctysWoxsXgxDU4FVNRFSam0NRqGlTai1qa1orLUFZgmmDBJiGRJDJKMqSguUyolMpZsdJVSucqpSzY6yqjlKuUsWOsVI5z0uUs1UiuRKuNMWp4bh1kXIsZ6ef5t83p5PBxdvL82+b1cC+VyO3n4HLvYmjD048ix0qLQ1EVNNqLQ3GtRa1qbQ3I1qLWtFoakapta0VlpqGCaahgizMyTYzWhIkMkSGSUUHUFyqiD59Fmukp6c9MpZx2lXPThKqeiLHonp08+nknpc9nWL5evz7dJ7eKfoqfq1rzvh7Z7PbxfU/U9M/N7OxfbyfUfUdH5vTfbn69uF/RN/Qa1PDtfTnfTnfab6Gtzyu+kWptTrLcirU2ijU1I1otFoBZgA0zMEWZmSY/wfwakCGRLApFgUCwKROpKCjKkkK06htQxenpz1tSx07btzTUsjt9G+jhratXLv8ARvo4adWrl27bpx06ly69DUa2pYvWSLSleqlgDjaGALMwRZmCTHoBJmZkX//Z"
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent sx={{ marginTop:"35px" }}>
          <Typography
            level="h3"
            
            textColor="#1a3447"
            
            fontSize="30px"
          >
            Completed  <br></br> {overview && (overview.total-overview.active)}
          </Typography>
        </CardContent>
      </Card>

      
      
    </Box>
    </>
  );
}

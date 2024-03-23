import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function Chips( props) {
  return (
    <Card
      variant="outlined"
      row
      sx={{
        width: 320,
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="data:image/png;base64,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"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {props.title}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {props.date}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          {props.serviceType}
        </Chip>
      </div>
    </Card>
  );
}

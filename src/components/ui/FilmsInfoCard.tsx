import Image from "next/image"
import { Box, Chip, Grid, Typography } from "@mui/material"
import { PlayCircleOutlineOutlined } from "@mui/icons-material"
import { FilmsHoverInfo } from './FilmsHoverInfo';
import { TrendingResults } from '@/interfaces/trendingResults';
import { FC, useState } from 'react';

interface Props { 
    movie:TrendingResults; 
}


export const FilmsInfoCard:FC<Props> = ({ movie }) => {

    const [movieInfo, setMovieInfo] = useState({
        filmId: 0,
        genre_ids: [] as number[]
    }); 
    
    const [ isMouseEnter, setIsMouseEnter ] = useState(true);
    
    const handleMouseEnter = (movie:TrendingResults) => {
        setMovieInfo({
            filmId: movie.id,
            genre_ids: movie.genre_ids
        })
    }

  return (
    <Grid 
        item 
        key={movie.id}
        sx={{
            '&:hover':{
                '& > div > div': {
                    display: "flex",
                    '& > span':{
                        display: "none",
                    }
                },

            },
        mb:3,
        textAlign:"center"
    }}  
>
    <Box
        sx={{
            '&:hover':{
                cursor: "pointer",
            }
        }}
        onMouseEnter={() => handleMouseEnter(movie)}
    >
        <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title!}
            width={190}
            height={300}
            style={{
                borderRadius: 9,
            }}
        />
        <Chip
            label={`${movie.release_date}`.split("-")[0]}
            color="primary"
            sx={{
                position: "absolute",
                mt:34,
                ml:-7,
                height: 20,
            }}
        />
       <Box display="none">
            <FilmsHoverInfo movieInfo={movieInfo} />
       </Box>
    </Box>
    <Box
        display="flex"
        justifyContent="center"
        sx={{
            width: 230,
        }}
    >
        <Typography
            color="white"
            variant="body2"
            fontWeight={300}
        >
            { movie.title }
        </Typography>
    </Box>
</Grid>
  )
}
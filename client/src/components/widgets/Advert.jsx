import React from 'react'
import { Typography } from '@mui/material'
import WidgetWrapper from './WidgetWrapper'
import {useTheme} from "@mui/material/styles";
export default function Advert() {
    const { palette } = useTheme();
    const dark=palette.neutral.dark;
    const main=palette.primary.main;
    const medium = palette.neutral.medium;
  return (
    <div>
      <WidgetWrapper>
        <div className='flex justify-between items-center'>
        <Typography className={`text-${dark} font-[500]`}>Sponsored</Typography>
        <Typography className={`text-${medium} ]`}>Advertise here</Typography>
        </div>
        <img className='w-full h-auto rounded-[0.75rem] mx-[0.75rem] my-0 ' src="http://localhost:3001/assets/info4.jpeg"/>
        <div className="flex justify-between items-center">
        <Typography className={`text-${main} font-[500]`}>Sponsored</Typography>
        <Typography className={`text-${medium} ]`}>Advertise here</Typography>
        </div>
        <Typography className={`text-${medium} mx-2 my-0`}>Lorem</Typography>
      </WidgetWrapper>
    </div>
  )
}

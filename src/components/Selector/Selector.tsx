/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { SxProps } from '@mui/material'

interface Props {
  options?: any[]
  styles?: React.CSSProperties
  value: any
  placeholder?: string
  disabled?: boolean
  onChange?: (event: SelectChangeEvent, child: React.ReactNode) => void
  getValueFromId: (id: string, placeholder: string) => string
}

const selectorStyle: SxProps = {
  borderRadius: 30,
  height: 35,
  width: 380,
  padding: '25px 10px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--background-color)'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--dualpadel-gray)'
  }
}

export const Selector = ({ options, styles, onChange, value, getValueFromId, placeholder, disabled }: Props) => {
  return (
    <div className='selector'>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        onChange={onChange}
        disabled={disabled}
        displayEmpty
        sx={{ height: 26, ...selectorStyle, ...styles }}
        renderValue={(value) => {
          return getValueFromId(value, placeholder || '')
        }}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {
          options?.map((option) => {
            return (
              <MenuItem value={option.id} key={option._id}>{option.name}</MenuItem>
            )
          })
        }
      </Select>
    </div>
  )
}

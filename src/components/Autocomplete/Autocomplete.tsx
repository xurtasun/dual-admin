/* eslint-disable @typescript-eslint/no-explicit-any */
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { SxProps } from '@mui/material/styles'
import { SyntheticEvent } from 'react'

interface Props {
  label: string
  options: any[]
  value: string
  onChange: (event: SyntheticEvent, value: string | null, oldValue: string) => void
  placeholder: string
  disabled: boolean
  error: boolean
  index: number
  helperText: string
  getTextFromId: (id: any) => any
  onInputChange?: (event: SyntheticEvent, value: string) => void
}
interface Styles {
  container: React.CSSProperties
  input: React.CSSProperties
  option: React.CSSProperties
}
const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  input: {
    width: '100%'
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10
  }
}
const selectorStyle: SxProps = {
  borderRadius: 30,
  height: 25,
  width: 270,
  padding: '25px 0px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--background-color)'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--dualpadel-gray)'
  },
  '& .MuiInputBase-root': {
    borderRadius: 30
  }
}
export const AutocompleteComponent = ({ label, options, value, onChange, placeholder, disabled, error, helperText, index, getTextFromId, ...props }: Props) => {
  return (
    <div>
      <Autocomplete
        options={options}
        value={value}
        onChange={(event: SyntheticEvent, newValue: string | null) => onChange(event, newValue, value)}
        getOptionLabel={(option) => getTextFromId(option)}
        renderInput={(params) => {
          if (!params.inputProps.value) return (<TextField {...params} label={`Jugador/a  ${(index + 1)}`} />)
          const newParams = { ...params, inputProps: { ...params.inputProps, value: getTextFromId(params.inputProps.value) } }
          return (<TextField {...newParams} value={params.inputProps.value} label={`Jugador/a  ${(index + 1)}`} />)
        }}
        sx={{ height: 26, ...selectorStyle, ...styles }}
        {...props}
      />
    </div>
  )
}

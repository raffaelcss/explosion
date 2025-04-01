import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { ReactNode } from 'react';

interface ConfigItensProps {
  label: string;
  id: string;
  unit: string;
  value: string;
  children: ReactNode;
}
export default function ConfigItens(props: ConfigItensProps) {
  const { id, label, unit, value, children } = props;
  return (
    <div className="flex items-center gap-3 justify-center">
      <FormControl fullWidth sx={{ m: 0 }} variant="filled">
        <InputLabel htmlFor="calor">{label}</InputLabel>
        <FilledInput
          id={id}
          value={value}
          startAdornment={
            <InputAdornment position="start">{unit}</InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {children}
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

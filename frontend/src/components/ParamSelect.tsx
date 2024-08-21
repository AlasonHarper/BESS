import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
  alpha,
  makeStyles,
  styled
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { EventHandler, FC, SetStateAction, useState } from 'react';
import { IParameter, IParameterAdd } from '../utils/types';
import TextArea from './TextArea';

interface ParamSelectProps {
  options: Array<IParameter>;
  selected: IParameter | null;
  onChange: (paramter: IParameter | null) => void;
  onAdd: (parameter: IParameterAdd) => void;
  // onDelete: (id: number) => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const ParamSelect: FC<ParamSelectProps> = ({
  options,
  selected,
  onChange,
  onAdd
  // onDelete
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const handleChange = (v: SelectChangeEvent) => {
    const param: IParameter | undefined = options.find(
      (o) => o.id == v.target.value
    );
    if (param != undefined) onChange(param);
  };

  const onAddParameter = () => {
    onAdd({ clone_id: -1, title, description });
    setOpenModal(false);
  };

  return (
    <>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Select
          id="select"
          value={selected ? (selected.id as string) : ''}
          sx={{
            width: 200,
            height: 40
          }}
          onChange={handleChange}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.id as string}>
                {option.title}
              </MenuItem>
            );
          })}
        </Select>
        <Fab
          onClick={handleOpenModal}
          size="small"
          color="primary"
          aria-label="add"
          sx={{ p: 1, ml: 1 }}
        >
          <AddIcon />
        </Fab>
      </FormControl>
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Parameter
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ minWidth: '40vw' }}>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
              Title :{' '}
            </Typography>
            <TextField
              sx={{ flex: 1 }}
              value={title}
              onChange={(v) => {
                setTitle(v.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </Grid>
          <Grid
            sx={{ display: 'flex', alignItems: 'flex-start', marginTop: 1 }}
          >
            <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
              Description :{' '}
            </Typography>
            <TextArea
              style={{ flex: 1 }}
              minRows={3}
              defaultValue={description}
              onBlur={(v: any) => {
                setDescription(v.target.value);
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button autoFocus onClick={onAddParameter}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParamSelect;

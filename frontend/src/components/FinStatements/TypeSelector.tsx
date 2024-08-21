import { Button, ButtonGroup } from '@mui/material';

const GROUP_DATA = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'semi_annually', label: 'Semi annually' },
  { id: 'annualy', label: 'Annualy' }
];

const TypeSelector = ({
  active,
  setActive
}: {
  active: string;
  setActive: (active: string) => void;
}) => {
  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      {GROUP_DATA.map((g, index) => {
        return (
          <Button
            key={index}
            sx={{
              backgroundColor: active == g?.id ? '#0ff' : 'transparent'
            }}
            onClick={() => {
              setActive(g?.id);
            }}
          >
            {g?.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default TypeSelector;

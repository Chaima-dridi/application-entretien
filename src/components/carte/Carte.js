import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import carteservice from "../../services/cartes.service";
import comptesservice from"../../services/comptes.service";
import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Switch from '@mui/material/Switch';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const AppContainer = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: '100%', // Utilisation de toute la largeur disponible
  maxWidth: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#f5f5f5' // Inclure les bordures et les rembourrages dans la largeur totale
});

const TitleAndButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Aligner les éléments verticalement
  width: '100%',
  marginBottom: '10px',
  color: '#606060', // Couleur de texte pour le titre en gris foncé
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#f57a00', // Couleur d'arrière-plan pour le bouton en orange
  color: '#fff', // Couleur de texte pour le bouton en blanc
});

const OptionsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Centrer les options horizontalement
  width: '100%',
  marginTop: '20px', // Ajouter un espace en haut des options
});

const SelectStyled = styled(Select)({
  marginBottom: '10px', // Ajouter une marge basse entre les options
});

function Carte() {
   const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);

    // Rechercher le type de la carte sélectionnée
    const selectedCardType = cards.find((card) => card.id === e.target.value)?.type;
    setSelectedType(selectedCardType);

    // Rechercher le statut de la carte sélectionnée
    const selectedCardStatus = cards.find((card) => card.id === e.target.value)?.status;
    setSelectedStatus(selectedCardStatus);
  };

  useEffect(() => {
    const fetchedAccounts = comptesservice.getAccounts();
    setAccounts(fetchedAccounts);
  }, []);

  useEffect(() => {
     function fetchCardsByAccountId() {
      if (selectedAccount) {
        console.log("selected account=",selectedAccount);
        const fetchedCards =  carteservice.getCardsByAccountId(selectedAccount);
        setCards(fetchedCards);
      } else {
        setCards([]);
      }
    }
    fetchCardsByAccountId();
  }, [selectedAccount]);
  useEffect(() => {
    setSelectedCard('');
    setSelectedType('');
  }, [selectedAccount]);

  return (
    <div>
      <AppContainer>
        {/* Titre et Bouton dans la même ligne */}
        <TitleAndButtonContainer>
          <h2 style={{ textAlign: 'left', margin: 0 }}>Mes cartes</h2>
          <ButtonStyled variant="contained">Ajouter une carte</ButtonStyled>
        </TitleAndButtonContainer>

        {/* Options de Sélection centrées */}
        <OptionsContainer>
        <FormControl fullWidth>
  <SelectStyled value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} displayEmpty>
    <MenuItem value="" disabled>
      Sélectionnez un compte
    </MenuItem>
    { accounts && accounts.map((account) => (
  <MenuItem key={account.id} value={account.id}>
    {account.id}
  </MenuItem>
))}
  </SelectStyled>
</FormControl>
      <FormControl fullWidth>
        <SelectStyled value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} displayEmpty>
          <MenuItem value="" disabled>
            Sélectionnez une carte
          </MenuItem>
          {cards.map((card) => (
            <MenuItem key={card.id} value={card.id}>
              {card.cardNumber}
            </MenuItem>
          ))}
        </SelectStyled>
      </FormControl>
      <FormControl fullWidth>
        <SelectStyled value={selectedCard}  onChange={handleCardChange} displayEmpty>
          <MenuItem value="" disabled>
            Sélectionnez le type
          </MenuItem>
          {cards.map((card) => (
            <MenuItem key={card.id} value={card.id}>
              {card.type}
            </MenuItem>
          ))}
        </SelectStyled>
      </FormControl>
        </OptionsContainer>
        <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
      <Typography variant="h4" sx={{ color: '#000', fontWeight: 'bold', textAlign: 'left' }}>
      {selectedType}
  </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      <div>
            <Switch
              checked={selectedStatus === 'active'}
              color={selectedStatus === 'active' ? 'success' : 'error'}
            />
            <Typography variant="body2" sx={{ color: selectedStatus === 'active' ? 'success.main' : 'error.main' }}>
              {selectedStatus === 'active' ? 'Carte active' : selectedStatus}
            </Typography>
          </div>
    </Card>
      </AppContainer>
    </div>
  );
}

export default Carte;

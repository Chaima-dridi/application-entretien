import data from '../data/CardsMock.json'; // Importez vos données JSON


const carteservice = {
  // Simule un appel GET pour obtenir toutes les cartes
  getCards: () => {
    
    console.log('datafromjsonfile==',data);
    return data.data;
  },

  getCardsByAccountId: (accountId) => {
    const fetchedCards = data.data.filter((card) => card.accountId === accountId);
    console.log('donné filtré',fetchedCards);
    return fetchedCards;
  }

}

  export default carteservice;
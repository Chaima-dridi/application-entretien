import data from '../data/accountsMock.json'; // Importez vos données JSON



const comptesservice = {
  getAccounts:  () => {
    
    console.log('data==',data);
    return data.data;
  },
};

export default comptesservice;
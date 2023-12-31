const { useContext, createContext, useState, useEffect } = require("react");

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [card, setCard] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    let existingCardItem = localStorage.getItem("card");
    if (existingCardItem) setCard(JSON.parse(existingCardItem));
  }, []);

  return (
    <CardContext.Provider
      value={{ card, setCard, selectedProduct, setSelectedProduct }}
    >
      {children}
    </CardContext.Provider>
  );
};

const useCard = () => useContext(CardContext);

export { CardProvider, useCard };

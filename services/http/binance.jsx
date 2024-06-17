const getPortfolioBinanceHTTP = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/exchange/binance`,
      { cache: "no-store", method: "GET" }
    );

    const { data } = await response.json();

    const assets = data.assets;
    const deposit = data.deposit;
    const withdraw = data.withdraw;
    const orders = data.orders;
    const history = data.history;

    return {
      assets,
      deposit,
      withdraw,
      orders,
      history,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};

export { getPortfolioBinanceHTTP };

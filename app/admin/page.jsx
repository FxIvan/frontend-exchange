import { getPortfolioBinanceHTTP } from "../../services/http/binance";
import { DataTableBinance } from "../components/admin/DataTable";

async function getData() {
  const data = await getPortfolioBinanceHTTP();

  return {
    assets: data.assets,
    deposit: data.deposit,
    withdraw: data.withdraw,
    orders: data.orders,
    history: data.history,
  };
}

export default async function Page() {
  const { assets, deposit, withdraw, orders, history } = await getData();

  return (
    <div>
      <DataTableBinance
        assets={assets}
        deposit={deposit}
        withdraw={withdraw}
        orders={orders}
        history={history}
      />
    </div>
  );
}

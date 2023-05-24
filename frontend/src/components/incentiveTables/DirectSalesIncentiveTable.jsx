import "./widgetLg.css";

export default function DirectSalesIncentiveTable({ props, title }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{title}</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer Id</th>
          <th className="widgetLgTh">Product Id</th>
          <th className="widgetLgTh">Product Price</th>
          <th className="widgetLgTh">Incentive Earned</th>
          <th className="widgetLgTh">Date</th>
        </tr>
        {props.length
          ? props.map((e) => {
              return (
                <tr className="widgetLgTr">
                  <td className="widgetLgCustomerId">
                    <span className="widgetLgCustomerId">{e.customerId}</span>
                  </td>
                  <td className="widgetLgProductId">
                    <span className="widgetLgProductId-Id">{e.productId}</span>
                  </td>
                  <td className="widgetLgProductPrice">₹ {e.productPrice}</td>
                  <td className="widgetLgAmount">₹ {e.incentiveEarned}</td>
                  <td className="widgetLgDate">{e.createdAt}</td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
}

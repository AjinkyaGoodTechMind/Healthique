import moment from "moment";
import "./widgetLg.css";

export default function ReferencesIncentiveTable({ props, title }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Pending Quotations</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer Name</th>
          <th className="widgetLgTh">Program</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Quotation</th>
        </tr>
        {props.length
          ? props.map((e, index) => {
              return (
                <tr className="widgetLgTr" key={index}>
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{e.earnedFromMemberId}</span>
                  </td>
                  <td className="widgetLgAmount">₹ {e.incentiveEarned}</td>
                  <td className="widgetLgDate">{moment(e.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
}

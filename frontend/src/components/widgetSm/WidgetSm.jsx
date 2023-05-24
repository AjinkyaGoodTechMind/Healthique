import "./widgetSm.css";
import Visibility from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import moment from "moment";

export default function WidgetSm() {
  const { membersData } = useSelector((state) => state.userSlice);
  return (
    <div className="widgetLg">
      <h3 className="widgetSmTitle">Accepted Quotations</h3>
      <ul className="widgetSmList">
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer Name</th>
            <th className="widgetLgTh">Program</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Quotation</th>
          </tr>
        </table>
      </ul>
    </div>
  );
}

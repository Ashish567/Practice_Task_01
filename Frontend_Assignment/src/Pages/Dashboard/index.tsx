import { FunctionComponent } from "react";
import steering_wheel from "../../assets/steering_wheel.png";
import "./index.css";
import Seats from "../../Components/Seats";
import { useLiveQuery } from "dexie-react-hooks";
import { LocalDB } from "../../DB/DB";

interface DashboardProps {}
const Dashboard: FunctionComponent<DashboardProps> = () => {
  const tickets = useLiveQuery(() => LocalDB.tickets.toArray());
  console.log(tickets);
  return (
    <div className="contain">
      <div className="dashboard_bgc" style={{ marginTop: "20px" }}>
        <p className="dashboard_txt">
          Click on your available seat to proceed with the transaction..
        </p>
      </div>
      <div className="layout">
        <div>
          <p>Lower Deck</p>
          <div className="lower_deck" style={{ height: "380px" }}>
            <div className="wheel_img">
              <img width={"30px"} src={steering_wheel} alt="Logo" />
            </div>
            <div className="seat_area">
              <div className="seat_row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNumber: number) => {
                  return (
                    <Seats
                      seatNumber={seatNumber}
                      status={"Occupied"}
                      direction={"row"}
                      xtraStyle={JSON.stringify({})}
                      xtrastyle_1={JSON.stringify({})}
                    />
                  );
                })}
              </div>
              <div className="seat_row">
                {[11, 12, 13, 14, 15].map((seatNumber: number) => {
                  return (
                    <Seats
                      seatNumber={seatNumber}
                      status={"Available"}
                      direction={"row"}
                      xtraStyle={JSON.stringify({})}
                      xtrastyle_1={JSON.stringify({})}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <Seats
                seatNumber={16}
                status="Booked"
                direction="col"
                xtraStyle={JSON.stringify({
                  marginLeft: "20px",
                  marginTop: "80px",
                  marginRight: "15px",
                })}
                xtrastyle_1={JSON.stringify({
                  height: "50px",
                  width: "15px",
                  borderRadius: "1px",
                  marginTop: "32px",
                })}
              />
            </div>
          </div>
        </div>

        <div style={{ margin: "20px 0 20px 0" }}>Upper Deck</div>
        <div className="lower_deck" style={{ height: "380px" }}>
          <div className="white_space"></div>
          <div className="seat_area_upper">
            <div className="seat_row" style={{ marginTop: "60px" }}>
              {[17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map(
                (seatNumber: number) => {
                  return (
                    <Seats
                      seatNumber={seatNumber}
                      status={"Occupied"}
                      direction={"row"}
                      xtraStyle={JSON.stringify({})}
                      xtrastyle_1={JSON.stringify({})}
                    />
                  );
                }
              )}
            </div>
            <div className="seat_row" style={{ marginTop: "40px" }}>
              {[27, 28, 29, 30, 31].map((seatNumber: number) => {
                return (
                  <Seats
                    seatNumber={seatNumber}
                    status={"Available"}
                    direction={"row"}
                    xtraStyle={JSON.stringify({})}
                    xtrastyle_1={JSON.stringify({})}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <Seats
              seatNumber={32}
              status="Booked"
              direction="col"
              xtraStyle={JSON.stringify({
                marginLeft: "20px",
                marginTop: "180px",
                marginRight: "15px",
              })}
              xtrastyle_1={JSON.stringify({
                height: "50px",
                width: "15px",
                borderRadius: "1px",
                marginTop: "32px",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

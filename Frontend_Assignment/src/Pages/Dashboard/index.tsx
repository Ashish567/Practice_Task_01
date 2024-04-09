import { FunctionComponent, useEffect } from "react";
import steering_wheel from "../../assets/steering_wheel.png";
import "./index.css";
import Seats from "../../Components/Seats";
import { useLiveQuery } from "dexie-react-hooks";
import { LocalDB } from "../../DB/DB";
import { Ticket_Availibilty_Atom } from "../../Atoms";
import { useRecoilState } from "recoil";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const [ticketAvailibilty, setTicketAvailibilty] = useRecoilState(
    Ticket_Availibilty_Atom
  );
  useEffect(() => {}, [ticketAvailibilty]);
  const tickets = useLiveQuery(() => LocalDB.tickets.toArray());
  if (!tickets) return null;
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatnumber: number) => {
                  return (
                    <Seats
                      key={seatnumber}
                      seatnumber={seatnumber}
                      status={
                        ticketAvailibilty[seatnumber.toString()]
                          ? ticketAvailibilty[seatnumber.toString()]
                          : "Available"
                      }
                      direction={"row"}
                      xtraStyle={JSON.stringify({})}
                      xtrastyle_1={JSON.stringify({})}
                    />
                  );
                })}
              </div>
              <div className="seat_row">
                {[11, 12, 13, 14, 15].map((seatnumber: number) => {
                  return (
                    <Seats
                      key={seatnumber}
                      seatnumber={seatnumber}
                      status={
                        ticketAvailibilty[seatnumber.toString()]
                          ? ticketAvailibilty[seatnumber.toString()]
                          : "Available"
                      }
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
                seatnumber={16}
                key={16}
                status={
                  ticketAvailibilty[16 + ""]
                    ? ticketAvailibilty[16 + ""]
                    : "Available"
                }
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
                (seatnumber: number) => {
                  return (
                    <Seats
                      key={seatnumber}
                      seatnumber={seatnumber}
                      status={
                        ticketAvailibilty[seatnumber.toString()]
                          ? ticketAvailibilty[seatnumber.toString()]
                          : "Available"
                      }
                      direction={"row"}
                      xtraStyle={JSON.stringify({})}
                      xtrastyle_1={JSON.stringify({})}
                    />
                  );
                }
              )}
            </div>
            <div className="seat_row" style={{ marginTop: "40px" }}>
              {[27, 28, 29, 30, 31].map((seatnumber: number) => {
                return (
                  <Seats
                    key={seatnumber}
                    seatnumber={seatnumber}
                    status={
                      ticketAvailibilty[seatnumber.toString()]
                        ? ticketAvailibilty[seatnumber.toString()]
                        : "Available"
                    }
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
              key={32}
              seatnumber={32}
              status={
                ticketAvailibilty[32 + ""]
                  ? ticketAvailibilty[32 + ""]
                  : "Available"
              }
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

import { useAppSelector } from "../../store/store";
import classes from "./List.module.scss";
import { IUser } from "../../interface";
import { useRef } from "react";
import Cell from "../Cell/Cell";
import Card from "../Card/Card";
import BeatLoader from "react-spinners/BeatLoader";
import { byField } from "../../helper";

function filtrationData(data: IUser[], filter: string = "Uname") {
  let sortData = [...data];
  sortData.sort(byField(filter.slice(1)));

  if (filter[0] === "D") {
    sortData.reverse();
  }

  return sortData;
}

const List = ({ search, filter }: { search: string; filter: string }) => {
  const { data, error, status } = useAppSelector((state) => state);
  const users = useRef<IUser[]>(data.students);

  if (status === "done") {
    users.current = filtrationData(data.students, filter);
  }

  return (
    <>
      {status === "error" && (
        <div className={classes.container}>
          <p>Error from Requests</p>
        </div>
      )}
      {status === "loading" && (
        <div className={classes.container}>
          <BeatLoader color="#49C2E8" />
        </div>
      )}
      {status === "done" &&
        users.current
          .filter((student) => {
            return (
              student.name.toLowerCase().indexOf(search.toLowerCase()) === 0
            );
          })
          .map((user) => {
            return (
              <div className={classes.wrapper}>
                <div className={classes.cell}>
                  <Cell user={user} />
                </div>
                <div className={classes.card}>
                  <Card user={user} />
                </div>
              </div>
            );
          })}
    </>
  );
};

export default List;

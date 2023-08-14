import { IUser } from "../../interface";
import classes from "./Cell.module.scss";
import del from "../../assets/delete.svg";
import { useAppDispatch } from "../../store/store";
import { actions } from "../../store/userSlice";
import { getAge } from "../../helper";

const Cell = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.tableItem} key={user.id}>
      <div>
        <img src={user.avatar} alt="" className={classes.avatar} />
      </div>
      <div>{user.name}</div>
      <div>{user.specialty}</div>
      <div>{user.group}</div>
      <div>{getAge(user.birthday)}</div>
      <div>{user.rating}</div>
      <div>
        <div
          className={classes.color}
          style={{ backgroundColor: `${user.color}` }}
        ></div>
      </div>
      <div>
        <img
          src={del}
          alt=""
          onClick={() => dispatch(actions.removeToList(user.id))}
        />
      </div>
    </div>
  );
};

export default Cell;

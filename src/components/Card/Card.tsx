import del from "../../assets/delete.svg";
import rating from "../../assets/rating.svg";
import { declination, getAge } from "../../helper";
import { IUser } from "../../interface";
import { useAppDispatch } from "../../store/store";
import { actions } from "../../store/userSlice";
import classes from "./Card.module.scss";

const Card = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();
  let years = getAge(user.birthday);

  return (
    <div className={classes.card} key={user.id}>
      <div className={classes.header}>
        <img className={classes.avatar} src={user.avatar} alt="" />
        <div>
          <div>{user.name}</div>
          <div className={classes.headerInfo}>
            <div className={classes.color}>
              <div style={{ backgroundColor: `${user.color}` }}></div>
            </div>
            <img src={rating} alt="" />
            <div>{user.rating}</div>
          </div>
        </div>
        <img
          className={classes.remove}
          src={del}
          alt=""
          onClick={() => dispatch(actions.removeToList(user.id))}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.li}>
          <div className={classes.marker}></div>
          <p>
            {years} {declination(years)}
          </p>
        </div>
        <div className={classes.li}>
          <div className={classes.marker}></div>
          <p>{user.specialty}</p>
        </div>
        <div className={classes.li}>
          <div className={classes.marker}></div>
          <p>{user.group}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

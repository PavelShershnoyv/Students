import { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import "./App.scss";
import { useAppDispatch } from "./store/store";
import { getUsers } from "./store/userSlice";
import List from "./components/List/List";
import Select, {
  DropdownIndicatorProps,
  OnChangeValue,
  components,
} from "react-select";
import { IOptions } from "./interface";
import sort from "./assets/sort.svg";

const options: IOptions[] = [
  { value: "Uname", label: "Имя А-Я" },
  { value: "Dname", label: "Имя Я-А" },
  { value: "Dbirthday", label: "Сначала моложе" },
  { value: "Ubirthday", label: "Сначала старше" },
  { value: "Drating", label: "Высокий рейтинг" },
  { value: "Urating", label: "Низкий рейтинг" },
];

const DropdownIndicator = (props: DropdownIndicatorProps<IOptions, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={sort} alt="" />
    </components.DropdownIndicator>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Uname");

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function getOptions() {
    return filter
      ? options.find((f) => f.label === filter)
      : { value: "", label: "" };
  }

  function onChange(newOption: OnChangeValue<IOptions, boolean>) {
    setFilter((newOption as IOptions).value);
  }

  return (
    <div className="wrapper">
      <header>
        <div className="header">
          <img src={logo} alt="" />
          <div className="header-title">
            STUDENTS{" "}
            <span className="header-title-mobile">
              by <span className="header-title__name">PavelShershnoyv</span>
            </span>
          </div>
        </div>
      </header>
      <div className="main-block">
        <p className="students">Студенты</p>
        <div className="main-block__search">
          <div className="custom-input">
            <input
              type="text"
              placeholder="Поиск по имени"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="custom-select">
            <Select
              classNamePrefix="custom-select"
              defaultValue={options[0]}
              options={options}
              value={getOptions()}
              onChange={onChange}
              isSearchable={false}
              components={{ DropdownIndicator }}
            />
          </div>
        </div>
        <div className="table">
          <div className="table-header">
            <div></div>
            <div>ФИО</div>
            <div>Специальность</div>
            <div>Группа</div>
            <div>Возраст</div>
            <div>Рейтинг</div>
          </div>
          <div className="table-items">
            <List search={search} filter={filter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

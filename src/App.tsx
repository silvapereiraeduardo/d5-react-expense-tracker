import { useEffect, useState } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
import { categories } from "./data/categories";
import { items } from "./data/items";
import { filterListByMonth, getCurrentMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/InputArea";

const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    let newList = [...list];

    newList.push(item);

    setList(newList);
  };

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      let currentCategory = filteredList[i].category;

      if (categories[currentCategory].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  return (
    <>
      <C.GlobalStyles />
      <C.Container>
        <C.Header>
          <C.HeaderText>Sistema Financeiro</C.HeaderText>
        </C.Header>

        <C.Body>
          <InfoArea
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            income={income}
            expense={expense}
          />

          <InputArea onAdd={handleAddItem} />

          <TableArea list={filteredList} />
        </C.Body>
      </C.Container>
    </>
  );
};

export default App;

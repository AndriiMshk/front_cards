import React from 'react';
import { useAppDispatch } from '../../../app/bll-dal/store';
import TableCell from '@mui/material/TableCell';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { setSortOrderAction } from '../bll-dal/packs-reducer';
import style from '../packs.module.scss';

export const SortTableCell: React.FC<SortTableCellPropsType> = ({ el, showIsAvailableToSort, changeSort }) => {

  const dispatch = useAppDispatch();

  const filterHandler = (sort: 'up' | 'down' | 'none') => {
    changeSort(el.title, sort);
    if (sort === 'down') {
      dispatch(setSortOrderAction(`1${el.value}`));
    } else if (sort === 'up') {
      dispatch(setSortOrderAction(`0${el.value}`));
    } else {
      dispatch(setSortOrderAction(undefined));
    }
  };

  return (
    <TableCell
      className={style.sortTableCell}
      onMouseEnter={() => showIsAvailableToSort(el.title, true)}
      onMouseLeave={() => showIsAvailableToSort(el.title, false)}
      align="center">
      <span>{el.title}</span>
      <span style={{ display: 'inline-block', width: '20px' }}>
        {el.isAvailableToSort && el.sort === 'none' && <SortIcon onClick={() => {filterHandler('down');}} />}
        {el.sort === 'down' && <ExpandMoreIcon onClick={() => { filterHandler('up');}} />}
        {el.sort === 'up' && <ExpandLessIcon onClick={() => { filterHandler('none');}} />}
      </span>
    </TableCell>
  );
};

type SortTableCellPropsType = {
  el: {
    title: string
    value: string
    isAvailableToSort: boolean
    sort: string
  }
  showIsAvailableToSort: (title: string, is: boolean) => void
  changeSort: (title: string, sort: 'up' | 'down' | 'none') => void
}

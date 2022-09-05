import { ParamsGetPackRequestType, ThunkType } from '../../../app/bll-dal/types';
import { setAppErrorAction, setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { packsApi } from './packsApi';
import axios from 'axios';
import {
  createPackAction,
  deletePackAction,
  setCurrentPageAction,
  setCurrentPageCountAction,
  setMinMaxCardsCountAction,
  setPacksAction, updatePackAction, updatePackNameAction,
} from './packs-reducer';

export const setPacks = (params: ParamsGetPackRequestType): ThunkType => async(dispatch) => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await packsApi.setPacks(params);
    dispatch(setCurrentPageAction(params.page || 1));
    dispatch(setCurrentPageCountAction(params.pageCount || 10));
    dispatch(setMinMaxCardsCountAction(res.data.minCardsCount, res.data.maxCardsCount))
    dispatch(setPacksAction(res.data.cardPacks, res.data.cardPacksTotalCount));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const createPack = (newPackName: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await packsApi.createPack(newPackName);
    dispatch(createPackAction(res.data.newCardsPack));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const deletePack = (packId: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await packsApi.deletePack(packId);
    dispatch(deletePackAction(packId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const updatePack = (packId: string, newPackName: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await packsApi.updatePack(packId, newPackName);
    dispatch(updatePackAction(packId, newPackName));
    dispatch(updatePackNameAction(packId, newPackName))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
